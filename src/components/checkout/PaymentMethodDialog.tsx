import { useState } from 'react';
import { MessageCircle, Wallet, CreditCard, Banknote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

interface PaymentMethodDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  whatsappMessage: string;
}

const paymentMethods = [
  {
    id: 'cod',
    name: 'الدفع عند الاستلام',
    nameEn: 'Cash on Delivery',
    icon: Banknote,
    enabled: true,
  },
  {
    id: 'vodafone',
    name: 'فودافون كاش',
    nameEn: 'Vodafone Cash',
    icon: Wallet,
    enabled: true,
  },
  {
    id: 'visa',
    name: 'فيزا',
    nameEn: 'Visa',
    icon: CreditCard,
    enabled: false,
    comingSoon: true,
  },
];

const PaymentMethodDialog = ({ open, onOpenChange, whatsappMessage }: PaymentMethodDialogProps) => {
  const [selectedMethod, setSelectedMethod] = useState('cod');

  const handleConfirm = () => {
    const method = paymentMethods.find(m => m.id === selectedMethod);
    const paymentText = method ? `%0A%0A💳 طريقة الدفع: ${method.name}` : '';
    const fullMessage = whatsappMessage + paymentText;
    window.open(`https://wa.me/201014868268?text=${fullMessage}`, '_blank');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-right">اختر طريقة الدفع</DialogTitle>
          <DialogDescription className="text-right">
            اختر طريقة الدفع المفضلة لإتمام طلبك
          </DialogDescription>
        </DialogHeader>
        
        <RadioGroup
          value={selectedMethod}
          onValueChange={setSelectedMethod}
          className="gap-3 mt-4"
        >
          {paymentMethods.map((method) => {
            const Icon = method.icon;
            return (
              <div
                key={method.id}
                className={`relative flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 ${
                  method.enabled
                    ? selectedMethod === method.id
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50 hover:bg-secondary/50 cursor-pointer'
                    : 'border-border/50 bg-muted/30 cursor-not-allowed opacity-60'
                }`}
                onClick={() => method.enabled && setSelectedMethod(method.id)}
              >
                <RadioGroupItem
                  value={method.id}
                  id={method.id}
                  disabled={!method.enabled}
                  className="shrink-0"
                />
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  method.enabled ? 'bg-primary/20' : 'bg-muted'
                }`}>
                  <Icon className={`w-5 h-5 ${method.enabled ? 'text-primary' : 'text-muted-foreground'}`} />
                </div>
                <Label
                  htmlFor={method.id}
                  className={`flex-1 cursor-pointer font-medium ${
                    !method.enabled && 'cursor-not-allowed text-muted-foreground'
                  }`}
                >
                  {method.name}
                </Label>
                {method.comingSoon && (
                  <Badge variant="secondary" className="text-xs">
                    قريباً
                  </Badge>
                )}
              </div>
            );
          })}
        </RadioGroup>

        <div className="flex gap-3 mt-6">
          <Button
            onClick={handleConfirm}
            className="flex-1 gradient-primary shadow-glow text-white gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            تأكيد الطلب
          </Button>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="flex-1"
          >
            إلغاء
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentMethodDialog;
