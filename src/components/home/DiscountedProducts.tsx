import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { products } from '@/data/products';
import ProductCard from '@/components/products/ProductCard';
import { Button } from '@/components/ui/button';
import { Percent, ArrowLeft } from 'lucide-react';

const DiscountedProducts = () => {
  const discountedProducts = useMemo(() => {
    return products
      .filter((product) => product.originalPrice && product.originalPrice > product.price)
      .slice(0, 4);
  }, []);

  if (discountedProducts.length === 0) return null;

  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-primary/5 to-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Percent className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">العروض والخصومات</h2>
              <p className="text-muted-foreground">وفّر أكثر مع عروضنا الحصرية</p>
            </div>
          </div>
          <Link to="/products?discount=true">
            <Button variant="outline" className="gap-2">
              عرض الكل
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {discountedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DiscountedProducts;
