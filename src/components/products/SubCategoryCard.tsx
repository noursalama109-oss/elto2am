import { Link } from 'react-router-dom';
import { ProductSection, ProductSubSection, subSectionLabels, subSectionDescriptions} from '@/types/product';
import { ChevronLeft, Package } from 'lucide-react';

interface SubCategoryCardProps {
  section: ProductSection;
  subSection: ProductSubSection;
  productCount: number;
  productImages: string[];
}

const SubCategoryCard = ({ section, subSection, productCount, productImages }: SubCategoryCardProps) => {
  // Get the first image for preview
  const previewImage = productImages[0];
  const hasImage = !!previewImage;

  return (
    <Link to={`/products/${section}/${subSection}`}>
      <div className="group bg-card rounded-xl border border-border overflow-hidden shadow-card hover:border-primary/50 transition-all duration-300 hover:-translate-y-1">
        {/* Image */}
        <div className="relative aspect-square bg-muted overflow-hidden">
          {hasImage ? (
            <img
              src={previewImage}
              alt={subSectionLabels[subSection]}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Package className="w-16 h-16 text-muted-foreground/30" />
            </div>
          )}
          
          {/* Product count badge */}
          <div className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-bold px-2.5 py-1 rounded-full shadow-lg">
            {productCount} منتج
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="mb-2">
            <span className="text-xs text-primary font-medium">
              اضغط للتصفح
            </span>
          </div>
          <h3 className="font-bold text-foreground mb-3 line-clamp-1">
            {subSectionLabels[subSection]}
          </h3>
          <p className="text-xs text-muted-foreground -mt-2 mb-2">
  ({subSectionDescriptions[subSection]})
</p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">{productCount} قطعة متوفرة</span>
            </div>
            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
              <ChevronLeft className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SubCategoryCard;
