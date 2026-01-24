import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Product, ProductSection as ProductSectionType, sectionLabels } from '@/types/product';
import ProductCard from './ProductCard';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

interface ProductSectionProps {
  section: ProductSectionType;
  products: Product[];
  showViewAll?: boolean;
}

const ProductSection = ({ section, products, showViewAll = true }: ProductSectionProps) => {
  // Filter out products with price 0 (placeholders)
  const validProducts = products.filter(p => p.price > 0);
  
  if (validProducts.length === 0) return null;

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-8 bg-primary rounded-full" />
          <h2 className="text-2xl md:text-3xl font-bold">{sectionLabels[section]}</h2>
          <span className="text-muted-foreground text-sm">({validProducts.length} منتج)</span>
        </div>
        {showViewAll && (
          <Button asChild variant="outline" size="sm">
            <Link to={`/products/${section}`} className="flex items-center gap-2">
              عرض الكل
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </Button>
        )}
      </div>
      
      <Carousel
        opts={{
          align: 'start',
          loop: validProducts.length > 3,
          direction: 'rtl',
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {validProducts.map((product) => (
            <CarouselItem 
              key={product.id} 
              className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
            >
              <ProductCard product={product} />
            </CarouselItem>
          ))}
        </CarouselContent>
        {validProducts.length > 3 && (
          <>
            <CarouselPrevious className="hidden md:flex -right-12 left-auto" />
            <CarouselNext className="hidden md:flex -left-12 right-auto" />
          </>
        )}
      </Carousel>
    </section>
  );
};

export default ProductSection;
