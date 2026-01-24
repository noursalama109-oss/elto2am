import { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/types/product';
import PaymentMethodDialog from '@/components/checkout/PaymentMethodDialog';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);

  const vehicleTypeLabel = {
    motorcycle: 'موتوسيكل',
    tricycle: 'تروسيكل',
    both: 'موتوسيكل & تروسيكل',
  };

  const whatsappMessage = `أهلاً، أريد طلب المنتج التالي:%0A%0A📦 المنتج: ${product.name}%0A💰 السعر: ${product.price} جنيه${product.originalPrice ? ` (بدلاً من ${product.originalPrice} جنيه)` : ''}%0A🏍️ نوع المركبة: ${vehicleTypeLabel[product.vehicleType]}${product.description ? `%0A📝 الوصف: ${product.description}` : ''}`;

  return (
    <>
      <div className="group bg-card rounded-xl border border-border overflow-hidden shadow-card hover:border-primary/50 transition-all duration-300 hover:-translate-y-1">
        {/* Image */}
        <div className="relative aspect-square bg-muted overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {!product.inStock && (
            <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
              <span className="text-muted-foreground font-medium">غير متوفر</span>
            </div>
          )}
          {product.originalPrice && product.inStock && (
            <Badge variant="secondary" className="absolute top-3 left-3">
              خصم {Math.round((1 - product.price / product.originalPrice) * 100)}%
            </Badge>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="mb-2">
            <span className="text-xs text-primary font-medium">
              {vehicleTypeLabel[product.vehicleType]}
            </span>
          </div>
          <h3 className="font-bold text-foreground mb-2 line-clamp-1">{product.name}</h3>
          {product.description && (
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
              {product.description}
            </p>
          )}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-primary">{product.price}</span>
              <span className="text-sm text-muted-foreground">جنيه</span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  {product.originalPrice}
                </span>
              )}
            </div>
            <Button
              size="sm"
              disabled={!product.inStock}
              onClick={() => setShowPaymentDialog(true)}
              className="gradient-primary shadow-glow hover:opacity-90 text-white shrink-0 whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4" />
              اطلب الآن
            </Button>
          </div>
        </div>
      </div>

      <PaymentMethodDialog
        open={showPaymentDialog}
        onOpenChange={setShowPaymentDialog}
        whatsappMessage={whatsappMessage}
      />
    </>
  );
};

export default ProductCard;
