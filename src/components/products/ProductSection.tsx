import { Link } from 'react-router-dom';
import { Product, ProductSection as ProductSectionType, sectionLabels, sectionIcons, sectionSubSections, subSectionLabels, subSectionDescriptions } from '@/types/product';
import { ChevronLeft, Package } from 'lucide-react';

interface ProductSectionProps {
  section: ProductSectionType;
  products: Product[];
}

const ProductSection = ({ section, products }: ProductSectionProps) => {
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
      image: subProducts.find((p) => p.image !== '/placeholder.svg')?.image,
    };
  }).filter((data) => data.count > 0);

  return (
    <section className="mb-12">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <SectionIcon className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-bold">{sectionLabels[section]}</h2>
          <span className="text-muted-foreground text-sm">({validProducts.length} منتج)</span>
        </div>
      </div>
      
      {/* Sub-sections Grid - Same style as ProductCard */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {subSectionData.map(({ subSection: sub, count, image }) => (
          <Link key={sub} to={`/products/${section}/${sub}`}>
            <div className="group bg-card rounded-xl border border-border overflow-hidden shadow-card hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 h-full">
              {/* Image */}
              <div className="relative aspect-square bg-muted overflow-hidden">
                {image ? (
                  <img
                    src={image}
                    alt={subSectionLabels[sub]}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Package className="w-12 h-12 text-muted-foreground/30" />
                  </div>
                )}
                
                {/* Count badge */}
                <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded-full shadow-lg">
                  {count} منتج
                </div>
              </div>
              
              {/* Content */}
              <div className="p-3">
                <div className="mb-1">
                  <span className="text-[10px] text-primary font-medium">
                    اضغط للتصفح
                  </span>
                </div>
                <h3 className="font-bold text-sm text-foreground mb-1 line-clamp-1 group-hover:text-primary transition-colors">
                  {subSectionLabels[sub]}
                </h3>
                {subSectionDescriptions[sub] && (
                  <p className="text-[9px] text-muted-foreground mb-2 line-clamp-2 leading-tight">
                    ({subSectionDescriptions[sub]})
                  </p>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{count} قطعة</span>
                  <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                    <ChevronLeft className="w-4 h-4 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ProductSection;
