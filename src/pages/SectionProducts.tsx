import { useMemo } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import ProductGrid from '@/components/products/ProductGrid';
import { products } from '@/data/products';
import { ProductSection, sectionLabels } from '@/types/product';

const validSections: ProductSection[] = [
  'towing', 'shocks', 'filters', 'electrical', 
  'wheels', 'lights', 'covers', 'horns', 'other'
];

const SectionProducts = () => {
  const { section } = useParams<{ section: string }>();

  // Validate section
  if (!section || !validSections.includes(section as ProductSection)) {
    return <Navigate to="/products" replace />;
  }

  const sectionProducts = useMemo(() => {
    return products.filter(
      (product) => product.section === section && product.price > 0
    );
  }, [section]);

  const sectionLabel = sectionLabels[section as ProductSection];

  return (
    <Layout>
      <div className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-1.5 h-10 bg-primary rounded-full" />
              <h1 className="text-3xl md:text-4xl font-bold">{sectionLabel}</h1>
            </div>
            <p className="text-muted-foreground">
              {sectionProducts.length} منتج متوفر في هذا القسم
            </p>
          </div>

          {/* Products Grid */}
          {sectionProducts.length > 0 ? (
            <ProductGrid products={sectionProducts} />
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                لا توجد منتجات في هذا القسم حالياً
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default SectionProducts;
