import { useMemo, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import ProductGrid from '@/components/products/ProductGrid';
import { products } from '@/data/products';
import { 
  ProductSection, 
  ProductSubSection,
  sectionLabels,
  sectionIcons,
  subSectionLabels,
  sectionSubSections 
} from '@/types/product';
import { Button } from '@/components/ui/button';

const validSections: ProductSection[] = [
  'engine', 'electrical', 'suspension', 'brakes', 
  'drivetrain', 'fuel', 'body', 'wheels', 'oils', 'accessories'
];

const SectionProducts = () => {
  const { section } = useParams<{ section: string }>();
  const [selectedSubSection, setSelectedSubSection] = useState<ProductSubSection | 'all'>('all');

  // Validate section
  if (!section || !validSections.includes(section as ProductSection)) {
    return <Navigate to="/products" replace />;
  }

  const currentSection = section as ProductSection;
  const subSections = sectionSubSections[currentSection];
  const SectionIcon = sectionIcons[currentSection];

  const sectionProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSection = product.section === currentSection;
      const matchesSubSection = selectedSubSection === 'all' || product.subSection === selectedSubSection;
      const hasPrice = product.price > 0;
      return matchesSection && matchesSubSection && hasPrice;
    });
  }, [currentSection, selectedSubSection]);

  const sectionLabel = sectionLabels[currentSection];

  return (
    <Layout>
      <div className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                <SectionIcon className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold">{sectionLabel}</h1>
                <p className="text-muted-foreground">
                  {sectionProducts.length} منتج متوفر في هذا القسم
                </p>
              </div>
            </div>
          </div>

          {/* Sub-sections Filter */}
          {subSections.length > 0 && (
            <div className="mb-8">
              <h3 className="font-semibold mb-3 text-sm text-muted-foreground">الأقسام الفرعية</h3>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedSubSection === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedSubSection('all')}
                  className={selectedSubSection === 'all' ? 'gradient-primary shadow-glow text-white' : ''}
                >
                  الكل
                </Button>
                {subSections.map((sub) => (
                  <Button
                    key={sub}
                    variant={selectedSubSection === sub ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedSubSection(sub)}
                    className={selectedSubSection === sub ? 'gradient-primary shadow-glow text-white' : ''}
                  >
                    {subSectionLabels[sub]}
                  </Button>
                ))}
              </div>
            </div>
          )}

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
