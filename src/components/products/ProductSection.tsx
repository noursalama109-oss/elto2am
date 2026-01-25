import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Product, ProductSection as ProductSectionType, sectionLabels, sectionIcons, sectionSubSections, subSectionLabels } from '@/types/product';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface ProductSectionProps {
  section: ProductSectionType;
  products: Product[];
  showViewAll?: boolean;
}

const ProductSection = ({ section, products, showViewAll = true }: ProductSectionProps) => {
  // Filter out products with price 0 (placeholders)
  const validProducts = products.filter(p => p.price > 0);
  
  if (validProducts.length === 0) return null;

  const SectionIcon = sectionIcons[section];
  const subSections = sectionSubSections[section];

  // Get product counts and images per sub-section
  const subSectionData = subSections.map((sub) => {
    const subProducts = validProducts.filter((p) => p.subSection === sub);
    return {
      subSection: sub,
      count: subProducts.length,
      images: subProducts.map((p) => p.image).filter((img) => img !== '/placeholder.svg').slice(0, 2),
    };
  }).filter((data) => data.count > 0);

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <SectionIcon className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">{sectionLabels[section]}</h2>
            <span className="text-muted-foreground text-sm">({validProducts.length} منتج)</span>
          </div>
        </div>
        {showViewAll && (
          <Button asChild variant="outline" size="sm">
            <Link to={`/products/${section}`} className="flex items-center gap-2">
              عرض الكل
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </Button>
        )}
      </div>
      
      {/* Sub-sections Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {subSectionData.map(({ subSection: sub, count, images }) => (
          <Link key={sub} to={`/products/${section}/${sub}`}>
            <Card className="group hover:shadow-lg transition-all duration-300 hover:border-primary/50 cursor-pointer h-full overflow-hidden hover:-translate-y-1">
              {/* Mini Images Preview */}
              <div className="relative h-20 bg-gradient-to-br from-muted/30 to-muted/60 overflow-hidden">
                {images.length > 0 ? (
                  <div className="absolute inset-0 flex items-center justify-center gap-1 p-2">
                    {images.map((img, index) => (
                      <div
                        key={index}
                        className="w-12 h-12 rounded-md overflow-hidden shadow transition-transform duration-300 group-hover:scale-110"
                        style={{ transform: `rotate(${(index - 0.5) * 6}deg)` }}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <SectionIcon className="w-8 h-8 text-muted-foreground/20" />
                  </div>
                )}
                {/* Count badge */}
                <div className="absolute top-1.5 left-1.5 bg-primary/90 text-primary-foreground text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {count}
                </div>
              </div>
              
              <CardContent className="p-2.5 text-center">
                <h3 className="font-semibold text-sm group-hover:text-primary transition-colors line-clamp-1">
                  {subSectionLabels[sub]}
                </h3>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ProductSection;
