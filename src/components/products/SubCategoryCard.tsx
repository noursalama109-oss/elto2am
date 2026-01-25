import { Link } from 'react-router-dom';
import { ProductSection, ProductSubSection, subSectionLabels } from '@/types/product';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, Package } from 'lucide-react';

interface SubCategoryCardProps {
  section: ProductSection;
  subSection: ProductSubSection;
  productCount: number;
  productImages: string[];
}

const SubCategoryCard = ({ section, subSection, productCount, productImages }: SubCategoryCardProps) => {
  // Get up to 3 images for preview
  const previewImages = productImages.slice(0, 3);
  const hasImages = previewImages.length > 0;

  return (
    <Link to={`/products/${section}/${subSection}`}>
      <Card className="group hover:shadow-xl transition-all duration-500 hover:border-primary/50 cursor-pointer h-full overflow-hidden hover:-translate-y-1">
        {/* Images Preview Section */}
        <div className="relative h-32 bg-gradient-to-br from-muted/50 to-muted overflow-hidden">
          {hasImages ? (
            <div className="absolute inset-0 flex items-center justify-center gap-2 p-4">
              {previewImages.map((img, index) => (
                <div
                  key={index}
                  className="relative w-20 h-20 rounded-lg overflow-hidden shadow-lg transition-all duration-500 group-hover:scale-105"
                  style={{
                    transform: `rotate(${(index - 1) * 5}deg)`,
                    zIndex: previewImages.length - index,
                  }}
                >
                  <img
                    src={img}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))}
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <Package className="w-12 h-12 text-muted-foreground/30" />
            </div>
          )}
          
          {/* Overlay gradient on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Product count badge */}
          <div className="absolute top-3 left-3 bg-primary/90 text-primary-foreground text-xs font-bold px-2.5 py-1 rounded-full shadow-lg backdrop-blur-sm">
            {productCount} منتج
          </div>
        </div>

        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="font-bold text-lg mb-0.5 group-hover:text-primary transition-colors duration-300">
                {subSectionLabels[subSection]}
              </h3>
              <p className="text-xs text-muted-foreground">
                اضغط للتصفح
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
              <ChevronLeft className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default SubCategoryCard;
