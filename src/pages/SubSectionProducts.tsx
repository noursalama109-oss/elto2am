import { useMemo } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import ProductGrid from '@/components/products/ProductGrid';
import ProductBreadcrumbs from '@/components/products/ProductBreadcrumbs';
import { products } from '@/data/products';
import { 
  ProductSection, 
  ProductSubSection,
  sectionLabels,
  subSectionLabels,
  sectionSubSections 
} from '@/types/product';

const validSections: ProductSection[] = [
  'engine', 'electrical', 'suspension', 'brakes', 
  'drivetrain', 'fuel', 'body', 'wheels', 'oils', 'accessories'
];

const SubSectionProducts = () => {
  const { section, subSection } = useParams<{ section: string; subSection: string }>();

  // Validate section
  if (!section || !validSections.includes(section as ProductSection)) {
    return <Navigate to="/products" replace />;
  }

  const currentSection = section as ProductSection;
  const validSubSections = sectionSubSections[currentSection];
  
  // Validate sub-section
  if (!subSection || !validSubSections.includes(subSection as ProductSubSection)) {
    return <Navigate to={`/products/${section}`} replace />;
  }

  const currentSubSection = subSection as ProductSubSection;

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSection = product.section === currentSection;
      const matchesSubSection = product.subSection === currentSubSection;
      const hasPrice = product.price > 0;
      return matchesSection && matchesSubSection && hasPrice;
    });
  }, [currentSection, currentSubSection]);

  return (
    <Layout>
      <div className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          {/* Breadcrumbs */}
          <ProductBreadcrumbs section={currentSection} subSection={currentSubSection} />

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              {subSectionLabels[currentSubSection]}
            </h1>
            <p className="text-muted-foreground">
              {filteredProducts.length} منتج في قسم {sectionLabels[currentSection]} - {subSectionLabels[currentSubSection]}
            </p>
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <ProductGrid products={filteredProducts} />
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

export default SubSectionProducts;
