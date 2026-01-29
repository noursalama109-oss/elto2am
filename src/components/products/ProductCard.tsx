import { useState } from 'react';
import { MessageCircle, Maximize2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Product } from '@/types/product';
import PaymentMethodDialog from '@/components/checkout/PaymentMethodDialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [showImageDialog, setShowImageDialog] = useState(false);

  const whatsappMessage = `أهلاً، أريد طلب المنتج التالي:%0A%0A📦 المنتج: ${product.name}%0A💰 السعر: ${product.price} جنيه`;

  return (
    <>
      <div className="group bg-card rounded-xl border border-border overflow-hidden shadow-card hover:border-primary/50 transition-all duration-300 hover:-translate-y-1">
        {/* Image */}
        <div className="relative aspect-square bg-muted overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          
          {/* View Full Image Button */}
          <button
            onClick={() => setShowImageDialog(true)}
            className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-black/60 flex items-center justify-center text-white hover:bg-black/80 transition-colors opacity-0 group-hover:opacity-100"
            aria-label="عرض الصورة كاملة"
          >
            <Maximize2 className="w-4 h-4" />
          </button>

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
        <div className="p-3 sm:p-4">
          <h3 className="font-semibold text-foreground mb-1 sm:mb-2 line-clamp-1 text-xs sm:text-sm">{product.name}</h3>
          {product.description && (
            <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3 line-clamp-2">
              {product.description}
            </p>
          )}
          {/* Price and Button - Stack on mobile */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
              <span className="text-lg sm:text-xl font-bold text-primary">{product.price}</span>
              <span className="text-xs sm:text-sm text-muted-foreground">جنيه</span>
              {product.originalPrice && (
                <span className="text-xs sm:text-sm text-muted-foreground line-through">
                  {product.originalPrice}
                </span>
              )}
            </div>
            <Button
              size="sm"
              disabled={!product.inStock}
              onClick={() => setShowPaymentDialog(true)}
              className="gradient-primary shadow-glow hover:opacity-90 text-white w-full text-xs sm:text-sm"
            >
              <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4" />
              اطلب الآن
            </Button>
          </div>
        </div>
      </div>

      {/* Full Image Dialog */}
      <Dialog open={showImageDialog} onOpenChange={setShowImageDialog}>
        <DialogContent className="max-w-4xl w-[95vw] p-0 bg-transparent border-none shadow-none">
          <VisuallyHidden>
            <DialogTitle>صورة {product.name}</DialogTitle>
          </VisuallyHidden>
          <div className="relative">
            {/* Close Button */}
            <button
              onClick={() => setShowImageDialog(false)}
              className="absolute top-2 left-2 z-10 w-10 h-10 rounded-full bg-black/60 flex items-center justify-center text-white hover:bg-black/80 transition-colors"
              aria-label="إغلاق"
            >
              <X className="w-5 h-5" />
            </button>
            
            {/* Product Name Badge */}
            <div className="absolute bottom-4 right-4 left-4 z-10">
              <div className="bg-black/70 backdrop-blur-sm rounded-lg p-3">
                <h3 className="text-white font-bold text-lg">{product.name}</h3>
                <p className="text-white/80 text-sm">{product.price} جنيه</p>
              </div>
            </div>

            {/* Image */}
            <img
              src={product.image}
              alt={product.name}
              className="w-full max-h-[85vh] object-contain rounded-xl"
            />
          </div>
        </DialogContent>
      </Dialog>

      <PaymentMethodDialog
        open={showPaymentDialog}
        onOpenChange={setShowPaymentDialog}
        whatsappMessage={whatsappMessage}
      />
    </>
  );
};

export default ProductCard;
