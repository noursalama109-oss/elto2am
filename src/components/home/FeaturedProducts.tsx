import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { products } from '@/data/products';
import ProductCard from '@/components/products/ProductCard';

const FeaturedProducts = () => {
  const featuredProducts = products.filter((p) => p.isBestSeller).slice(0, 4);

  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">الأكثر مبيعاً</h2>
            <p className="text-muted-foreground">
              أكثر المنتجات طلباً من عملائنا
            </p>
          </div>
          <Button asChild variant="outline">
            <Link to="/best-sellers" className="flex items-center gap-2">
              عرض الكل
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </Button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
