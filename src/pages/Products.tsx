import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import ProductSection from '@/components/products/ProductSection';
import ProductGrid from '@/components/products/ProductGrid';
import ProductBreadcrumbs from '@/components/products/ProductBreadcrumbs';
import { products } from '@/data/products';
import { ProductSection as ProductSectionType, sectionLabels } from '@/types/product';

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

  // Filter products for search or discount
  const filteredProducts = useMemo(() => {
    if (!searchQuery && !discountOnly) return null; // Use sections view
    
    return products.filter((product) => {
      const matchesSearch = searchQuery
        ? product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (product.description?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false)
        : true;
      const matchesDiscount = discountOnly
        ? product.originalPrice && product.originalPrice > product.price
        : true;
      // Filter out placeholder products
      const hasPrice = product.price > 0;
      return matchesSearch && matchesDiscount && hasPrice;
    });
  }, [searchQuery, discountOnly]);

  // Group products by section
  const productsBySection = useMemo(() => {
    const grouped: Record<ProductSectionType, typeof products> = {
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

    products.forEach((product) => {
      if (product.section && grouped[product.section]) {
        grouped[product.section].push(product);
      }
    });

    return grouped;
  }, []);

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
            <ProductGrid products={filteredProducts} />
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

          {/* Sections */}
          {sectionOrder.map((section) => (
            <ProductSection
              key={section}
              section={section}
              products={productsBySection[section]}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Products;
