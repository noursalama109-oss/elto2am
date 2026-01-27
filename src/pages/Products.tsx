import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import ProductSection from '@/components/products/ProductSection';
import ProductGrid from '@/components/products/ProductGrid';
import ProductBreadcrumbs from '@/components/products/ProductBreadcrumbs';
import { useProducts, useDiscountedProducts, useSearchProducts } from '@/hooks/useProducts';
import { ProductSection as ProductSectionType, sectionLabels } from '@/types/product';
import { Loader2 } from 'lucide-react';

// ترتيب الأقسام الرئيسية
const sectionOrder: ProductSectionType[] = [
  'engine',
  'electrical',
  'suspension',
  'brakes',
  'drivetrain',
  'fuel',
  'body',
  'wheels',
  'oils',
  'accessories',
];

const Products = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const discountOnly = searchParams.get('discount') === 'true';

  const { data: allProducts = [], isLoading: isLoadingAll } = useProducts();
  const { data: discountedProducts = [], isLoading: isLoadingDiscounted } = useDiscountedProducts();
  const { data: searchResults = [], isLoading: isLoadingSearch } = useSearchProducts(searchQuery);

  // Determine which products to show based on filters
  const filteredProducts = useMemo(() => {
    if (searchQuery) {
      return searchResults;
    }
    if (discountOnly) {
      return discountedProducts;
    }
    return null; // Use sections view
  }, [searchQuery, discountOnly, searchResults, discountedProducts]);

  // Group products by section
  const productsBySection = useMemo(() => {
    const grouped: Record<ProductSectionType, typeof allProducts> = {
      engine: [],
      electrical: [],
      suspension: [],
      brakes: [],
      drivetrain: [],
      fuel: [],
      body: [],
      wheels: [],
      oils: [],
      accessories: [],
    };

    allProducts.forEach((product) => {
      if (product.section && grouped[product.section]) {
        grouped[product.section].push(product);
      }
    });

    return grouped;
  }, [allProducts]);

  const isLoading = isLoadingAll || (discountOnly && isLoadingDiscounted) || (searchQuery && isLoadingSearch);

  // If searching or filtering, show grid view
  if (filteredProducts) {
    return (
      <Layout>
        <div className="py-8 md:py-12">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                {discountOnly 
                  ? 'العروض والخصومات' 
                  : `نتائج البحث: "${searchQuery}"`}
              </h1>
              <p className="text-muted-foreground">
                {discountOnly
                  ? `${filteredProducts.length} منتج بأسعار مخفضة`
                  : `تم العثور على ${filteredProducts.length} منتج`}
              </p>
            </div>
            {isLoading ? (
              <div className="flex justify-center items-center min-h-[300px]">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : (
              <ProductGrid products={filteredProducts} />
            )}
          </div>
        </div>
      </Layout>
    );
  }

  // Default: sections view
  return (
    <Layout>
      <div className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          {/* Breadcrumbs */}
          <ProductBreadcrumbs />

          {/* Header */}
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">جميع المنتجات</h1>
            <p className="text-muted-foreground">
              تصفح مجموعتنا الكاملة من قطع الغيار مقسمة حسب الفئات
            </p>
          </div>

          {/* Loading State */}
          {isLoading ? (
            <div className="flex justify-center items-center min-h-[300px]">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : (
            /* Sections */
            sectionOrder.map((section) => (
              <ProductSection
                key={section}
                section={section}
                products={productsBySection[section]}
              />
            ))
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Products;
