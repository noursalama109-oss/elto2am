import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import ProductFilters from '@/components/products/ProductFilters';
import ProductGrid from '@/components/products/ProductGrid';
import { products } from '@/data/products';
import { CategoryFilter, VehicleFilter } from '@/types/product';

const Products = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');
  const [vehicleFilter, setVehicleFilter] = useState<VehicleFilter>('all');

  // Reset filters when search query changes
  useEffect(() => {
    if (searchQuery) {
      setCategoryFilter('all');
      setVehicleFilter('all');
    }
  }, [searchQuery]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = searchQuery
        ? product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (product.description?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false)
        : true;
      const matchesCategory =
        categoryFilter === 'all' || product.category === categoryFilter;
      const matchesVehicle =
        vehicleFilter === 'all' ||
        product.vehicleType === vehicleFilter ||
        product.vehicleType === 'both';
      return matchesSearch && matchesCategory && matchesVehicle;
    });
  }, [categoryFilter, vehicleFilter, searchQuery]);

  return (
    <Layout>
      <div className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              {searchQuery ? `نتائج البحث: "${searchQuery}"` : 'جميع المنتجات'}
            </h1>
            <p className="text-muted-foreground">
              {searchQuery
                ? `تم العثور على ${filteredProducts.length} منتج`
                : 'تصفح مجموعتنا الكاملة من قطع الغيار'}
            </p>
          </div>

          {/* Filters */}
          <ProductFilters
            categoryFilter={categoryFilter}
            vehicleFilter={vehicleFilter}
            onCategoryChange={setCategoryFilter}
            onVehicleChange={setVehicleFilter}
          />

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-sm text-muted-foreground">
              عرض {filteredProducts.length} منتج
            </p>
          </div>

          {/* Products Grid */}
          <ProductGrid products={filteredProducts} />
        </div>
      </div>
    </Layout>
  );
};

export default Products;
