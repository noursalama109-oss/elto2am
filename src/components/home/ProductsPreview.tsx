import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Package, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { products } from '@/data/products';
import { ProductSection, sectionLabels, sectionIcons, sectionSubSections, subSectionLabels, subSectionDescriptions } from '@/types/product';
import ScrollReveal from '@/components/ui/scroll-reveal';

// Show only first 3 sections on homepage
const previewSections: ProductSection[] = ['engine', 'electrical', 'suspension'];

const ProductsPreview = () => {
  const sectionData = useMemo(() => {
    return previewSections.map((section) => {
      const sectionProducts = products.filter((p) => p.section === section && p.price > 0);
      const subSections = sectionSubSections[section];
      
      const subSectionData = subSections.map((sub) => {
        const subProducts = sectionProducts.filter((p) => p.subSection === sub);
        return {
          subSection: sub,
          count: subProducts.length,
          image: subProducts.find((p) => p.image !== '/placeholder.svg')?.image,
        };
      }).filter((data) => data.count > 0);

      return {
        section,
        totalCount: sectionProducts.length,
        subSectionData,
      };
    }).filter((data) => data.totalCount > 0);
  }, []);

  return (
    <section className="py-16 md:py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <ScrollReveal variant="fadeUp">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Package className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold">منتجاتنا</h2>
                <p className="text-muted-foreground">تصفح مجموعتنا من قطع الغيار عالية الجودة</p>
              </div>
            </div>
            <Button asChild>
              <Link to="/products" className="flex items-center gap-2">
                عرض جميع المنتجات
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </ScrollReveal>

        {/* Sections */}
        {sectionData.map(({ section, totalCount, subSectionData }, sectionIndex) => {
          const SectionIcon = sectionIcons[section];

          return (
            <div key={section} className="mb-12 last:mb-0">
              <ScrollReveal variant="fadeRight" delay={sectionIndex * 0.1}>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <SectionIcon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold">{sectionLabels[section]}</h3>
                      <span className="text-muted-foreground text-sm">({totalCount} منتج)</span>
                    </div>
                  </div>
                  <Button asChild variant="outline" size="sm">
                    <Link to={`/products/${section}`} className="flex items-center gap-2">
                      عرض الكل
                      <ArrowLeft className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </ScrollReveal>
              
              {/* Sub-sections Grid - Same style as ProductSection */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {subSectionData.map(({ subSection: sub, count, image }, subIndex) => (
                  <ScrollReveal key={sub} variant="fadeUp" delay={(sectionIndex * 0.1) + (subIndex * 0.05)}>
                    <Link to={`/products/${section}/${sub}`}>
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
                  </ScrollReveal>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ProductsPreview;
