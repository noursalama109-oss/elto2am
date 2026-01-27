import { useMemo, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import ProductGrid from '@/components/products/ProductGrid';
import ProductBreadcrumbs from '@/components/products/ProductBreadcrumbs';
import { useProductsBySubSection } from '@/hooks/useProducts';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2 } from 'lucide-react';
import { 
  ProductSection, 
  ProductSubSection,
  sectionLabels,
  subSectionLabels,
  sectionSubSections,
  Brand,
  brandLabels
} from '@/types/product';

const validSections: ProductSection[] = [
  'engine', 'electrical', 'suspension', 'brakes', 
  'drivetrain', 'fuel', 'body', 'wheels', 'oils', 'accessories'
];

const SubSectionProducts = () => {
  const { section, subSection } = useParams<{ section: string; subSection: string }>();
  const [selectedBrand, setSelectedBrand] = useState<Brand | 'all'>('all');

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

  const { data: allSubSectionProducts = [], isLoading } = useProductsBySubSection(currentSection, currentSubSection);

  // Get available brands with counts
  const availableBrands = useMemo(() => {
    const brandCounts: Record<string, number> = {};
    allSubSectionProducts.forEach((product) => {
      brandCounts[product.brand] = (brandCounts[product.brand] || 0) + 1;
    });
    
    return Object.entries(brandCounts)
      .filter(([_, count]) => count > 0)
      .map(([brand, count]) => ({
        value: brand as Brand,
        label: brandLabels[brand as Brand] || brand,
        count
      }));
  }, [allSubSectionProducts]);

  // Filter products by selected brand
  const filteredProducts = useMemo(() => {
    if (selectedBrand === 'all') {
      return allSubSectionProducts;
    }
    return allSubSectionProducts.filter((product) => product.brand === selectedBrand);
  }, [allSubSectionProducts, selectedBrand]);

  return (
    <Layout>
      <div className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          {/* Breadcrumbs */}
          <ProductBreadcrumbs section={currentSection} subSection={currentSubSection} />

          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              {subSectionLabels[currentSubSection]}
            </h1>
            <p className="text-muted-foreground">
              {filteredProducts.length} منتج في قسم {sectionLabels[currentSection]} - {subSectionLabels[currentSubSection]}
            </p>
          </div>

          {/* Brand Filter */}
          {availableBrands.length > 1 && (
            <div className="bg-card rounded-xl border border-border p-4 mb-8">
              <h3 className="font-semibold mb-3 text-sm text-muted-foreground">فلتر حسب الماركة</h3>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedBrand === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedBrand('all')}
                  className={selectedBrand === 'all' ? 'gradient-primary shadow-glow text-white' : ''}
                >
                  الكل
                  <Badge variant="secondary" className="mr-2 text-xs">
                    {allSubSectionProducts.length}
                  </Badge>
                </Button>
                {availableBrands.map((brand) => (
                  <Button
                    key={brand.value}
                    variant={selectedBrand === brand.value ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedBrand(brand.value)}
                    className={selectedBrand === brand.value ? 'gradient-primary shadow-glow text-white' : ''}
                  >
                    {brand.label}
                    <Badge variant="secondary" className="mr-2 text-xs">
                      {brand.count}
                    </Badge>
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Products Grid */}
          {isLoading ? (
            <div className="flex justify-center items-center min-h-[300px]">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : filteredProducts.length > 0 ? (
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
