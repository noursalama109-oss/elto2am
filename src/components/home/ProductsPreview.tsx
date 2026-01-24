import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { products } from '@/data/products';
import ProductCard from '@/components/products/ProductCard';
import { ProductSection, sectionLabels } from '@/types/product';
import ScrollReveal from '@/components/ui/scroll-reveal';

// Show only first 3 sections on homepage
const previewSections: ProductSection[] = ['towing', 'shocks', 'electrical'];

const ProductsPreview = () => {
  const productsBySection = useMemo(() => {
    const grouped: Partial<Record<ProductSection, typeof products>> = {};
    
    previewSections.forEach((section) => {
      const sectionProducts = products
        .filter((p) => p.section === section && p.price > 0)
        .slice(0, 4);
      if (sectionProducts.length > 0) {
        grouped[section] = sectionProducts;
      }
    });
    
    return grouped;
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
        {previewSections.map((section, sectionIndex) => {
          const sectionProducts = productsBySection[section];
          if (!sectionProducts || sectionProducts.length === 0) return null;

          return (
            <div key={section} className="mb-10 last:mb-0">
              <ScrollReveal variant="fadeRight" delay={sectionIndex * 0.1}>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-8 bg-primary rounded-full" />
                    <h3 className="text-xl md:text-2xl font-bold">{sectionLabels[section]}</h3>
                  </div>
                  <Button asChild variant="outline" size="sm">
                    <Link to={`/products/${section}`} className="flex items-center gap-2">
                      عرض الكل
                      <ArrowLeft className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </ScrollReveal>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {sectionProducts.map((product, productIndex) => (
                  <ScrollReveal key={product.id} variant="fadeUp" delay={(sectionIndex * 0.1) + (productIndex * 0.05)}>
                    <ProductCard product={product} />
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
