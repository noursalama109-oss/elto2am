import { useState, useMemo } from 'react';
import Layout from '@/components/layout/Layout';
import ProductFilters from '@/components/products/ProductFilters';
import ProductGrid from '@/components/products/ProductGrid';
import { products } from '@/data/products';
import { CategoryFilter, VehicleFilter } from '@/types/product';
import { TrendingUp } from 'lucide-react';

const BestSellers = () => {
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');
  const [vehicleFilter, setVehicleFilter] = useState<VehicleFilter>('all');

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => product.isBestSeller)
      .filter((product) => {
        const matchesCategory =
          categoryFilter === 'all' || product.category === categoryFilter;
        const matchesVehicle =
          vehicleFilter === 'all' ||
          product.vehicleType === vehicleFilter ||
          product.vehicleType === 'both';
        return matchesCategory && matchesVehicle;
      });
  }, [categoryFilter, vehicleFilter]);

  return (
    <Layout>
      <div className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center shadow-glow">
                <TrendingUp className="w-5 h-5 text-primary-foreground" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold">الأكثر مبيعاً</h1>
            </div>
            <p className="text-muted-foreground">
              أكثر المنتجات طلباً من عملائنا الكرام
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

export default BestSellers;
