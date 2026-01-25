import { Link } from 'react-router-dom';
import { ProductSection, ProductSubSection, subSectionLabels } from '@/types/product';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft } from 'lucide-react';

interface SubCategoryCardProps {
  section: ProductSection;
  subSection: ProductSubSection;
  productCount: number;
}

const SubCategoryCard = ({ section, subSection, productCount }: SubCategoryCardProps) => {
  return (
    <Link to={`/products/${section}/${subSection}`}>
      <Card className="group hover:shadow-lg transition-all duration-300 hover:border-primary/50 cursor-pointer h-full">
        <CardContent className="p-6 flex items-center justify-between">
          <div className="flex-1">
            <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">
              {subSectionLabels[subSection]}
            </h3>
            <p className="text-sm text-muted-foreground">
              {productCount} منتج
            </p>
          </div>
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
            <ChevronLeft className="w-5 h-5" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default SubCategoryCard;
