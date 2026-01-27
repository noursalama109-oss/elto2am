import { useMemo } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import ProductBreadcrumbs from '@/components/products/ProductBreadcrumbs';
import SubCategoryCard from '@/components/products/SubCategoryCard';
import { useProductsBySection } from '@/hooks/useProducts';
import { Loader2 } from 'lucide-react';
import { 
  ProductSection, 
  sectionLabels,
  sectionIcons,
  sectionSubSections 
} from '@/types/product';

const validSections: ProductSection[] = [
  'engine', 'electrical', 'suspension', 'brakes', 
  'drivetrain', 'fuel', 'body', 'wheels', 'oils', 'accessories'
];

const SectionProducts = () => {
  const { section } = useParams<{ section: string }>();

  // Validate section
  if (!section || !validSections.includes(section as ProductSection)) {
    return <Navigate to="/products" replace />;
  }

  const currentSection = section as ProductSection;
  const subSections = sectionSubSections[currentSection];
  const SectionIcon = sectionIcons[currentSection];
  const sectionLabel = sectionLabels[currentSection];

  const { data: products = [], isLoading } = useProductsBySection(currentSection);

  // Get products and images per sub-section
  const subSectionData = useMemo(() => {
    const data: Record<string, { count: number; images: string[] }> = {};
    subSections.forEach((sub) => {
      const subProducts = products.filter(
        (p) => p.subSection === sub && p.price > 0
      );
      data[sub] = {
        count: subProducts.length,
        images: subProducts.map((p) => p.image).filter((img) => img !== '/placeholder.svg'),
      };
    });
    return data;
  }, [products, subSections]);

  // Total products in section
  const totalProducts = products.filter((p) => p.price > 0).length;

  return (
    <Layout>
      <div className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          {/* Breadcrumbs */}
          <ProductBreadcrumbs section={currentSection} />

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                <SectionIcon className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold">{sectionLabel}</h1>
                <p className="text-muted-foreground">
                  {totalProducts} منتج متوفر • {subSections.length} قسم فرعي
                </p>
              </div>
            </div>
          </div>

          {/* Sub-sections Cards */}
          <div className="mb-6">
            <h3 className="font-semibold mb-4 text-lg">اختر القسم الفرعي</h3>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center min-h-[300px]">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : subSections.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {subSections.map((sub, index) => (
                <div
                  key={sub}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <SubCategoryCard
                    section={currentSection}
                    subSection={sub}
                    productCount={subSectionData[sub]?.count || 0}
                    productImages={subSectionData[sub]?.images || []}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                لا توجد أقسام فرعية متاحة
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default SectionProducts;
