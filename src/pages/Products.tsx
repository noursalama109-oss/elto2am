import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import ProductGrid from '@/components/products/ProductGrid';
import ProductBreadcrumbs from '@/components/products/ProductBreadcrumbs';
import SectionFilter from '@/components/products/SectionFilter';
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
  const [selectedSection, setSelectedSection] = useState<ProductSectionType | 'all'>('all');

  const { data: allProducts = [], isLoading: isLoadingAll } = useProducts();
  const { data: discountedProducts = [], isLoading: isLoadingDiscounted } = useDiscountedProducts();
  const { data: searchResults = [], isLoading: isLoadingSearch } = useSearchProducts(searchQuery);

  // Filter products with price > 0
  const validProducts = useMemo(() => {
    return allProducts.filter(p => p.price > 0);
  }, [allProducts]);

  // Get product counts per section
  const productCounts = useMemo(() => {
    const counts: Record<ProductSectionType, number> = {
      engine: 0,
      electrical: 0,
      suspension: 0,
      brakes: 0,
      drivetrain: 0,
      fuel: 0,
      body: 0,
      wheels: 0,
      oils: 0,
      accessories: 0,
    };

    validProducts.forEach((product) => {
      if (product.section && counts[product.section] !== undefined) {
        counts[product.section]++;
      }
    });

    return counts;
  }, [validProducts]);

  // Determine which products to show based on filters
  const filteredProducts = useMemo(() => {
    if (searchQuery) {
      return searchResults;
    }
    if (discountOnly) {
      return discountedProducts;
    }
    
    // Filter by selected section
    if (selectedSection === 'all') {
      return validProducts;
    }
    
    return validProducts.filter(p => p.section === selectedSection);
  }, [searchQuery, discountOnly, searchResults, discountedProducts, validProducts, selectedSection]);

  const isLoading = isLoadingAll || (discountOnly && isLoadingDiscounted) || (searchQuery && isLoadingSearch);

  // If searching or filtering by discount, show grid view without section filter
  if (searchQuery || discountOnly) {
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

  // Default: All products view with section filter
  return (
    <Layout>
      <div className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          {/* Breadcrumbs */}
          <ProductBreadcrumbs />

          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">جميع المنتجات</h1>
            <p className="text-muted-foreground">
              تصفح مجموعتنا الكاملة من قطع الغيار ({validProducts.length} منتج)
            </p>
          </div>

          {/* Section Filter Bar */}
          <SectionFilter
            sections={sectionOrder}
            selectedSection={selectedSection}
            onSectionChange={setSelectedSection}
            productCounts={productCounts}
          />

          {/* Loading State */}
          {isLoading ? (
            <div className="flex justify-center items-center min-h-[300px]">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : (
            <>
              {/* Section Title when filtered */}
              {selectedSection !== 'all' && (
                <div className="mb-6">
                  <h2 className="text-xl md:text-2xl font-bold text-primary">
                    {sectionLabels[selectedSection]}
                  </h2>
                  <p className="text-muted-foreground text-sm">
                    {filteredProducts.length} منتج
                  </p>
                </div>
              )}
              
              {/* Products Grid */}
              <ProductGrid products={filteredProducts} />
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Products;
