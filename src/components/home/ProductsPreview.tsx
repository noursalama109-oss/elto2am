import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Package, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useProducts } from '@/hooks/useProducts';
import { ProductSection, sectionLabels, sectionIcons } from '@/types/product';
import ScrollReveal from '@/components/ui/scroll-reveal';
import ProductCard from '@/components/products/ProductCard';

// Show only first 3 sections on homepage
const previewSections: ProductSection[] = ['engine', 'electrical', 'suspension'];

const ProductsPreview = () => {
  const { data: products = [], isLoading } = useProducts();

  // Get valid products (price > 0)
  const validProducts = useMemo(() => {
    return products.filter(p => p.price > 0);
  }, [products]);

  // Get products for preview sections
  const sectionData = useMemo(() => {
    return previewSections.map((section) => {
      const sectionProducts = validProducts.filter((p) => p.section === section);
      return {
        section,
        products: sectionProducts.slice(0, 6), // Show max 6 products per section
        totalCount: sectionProducts.length,
      };
    }).filter((data) => data.totalCount > 0);
  }, [validProducts]);

  if (isLoading) {
    return (
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container mx-auto px-4 flex justify-center items-center min-h-[300px]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </section>
    );
  }

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
        {sectionData.map(({ section, products: sectionProducts, totalCount }, sectionIndex) => {
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
                    <Link to="/products" className="flex items-center gap-2">
                      عرض الكل
                      <ArrowLeft className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </ScrollReveal>
              
              {/* Products Horizontal Scroll */}
              <div className="overflow-x-auto scrollbar-hide -mx-4 px-4">
                <div className="flex gap-4 pb-4" style={{ minWidth: 'max-content' }}>
                  {sectionProducts.map((product, productIndex) => (
                    <ScrollReveal key={product.id} variant="fadeUp" delay={(sectionIndex * 0.1) + (productIndex * 0.05)}>
                      <div className="w-[260px] sm:w-[280px] md:w-[300px] flex-shrink-0">
                        <ProductCard product={product} />
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ProductsPreview;
