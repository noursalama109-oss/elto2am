import { Wallet, Truck, CreditCard, Shield } from 'lucide-react';

const PaymentMethods = () => {
  const methods = [
    {
      icon: Wallet,
      title: 'فودافون كاش',
      description: 'ادفع بسهولة عن طريق محفظة فودافون كاش',
      available: true,
    },
    {
      icon: Truck,
      title: 'الدفع عند الاستلام',
      description: 'استلم طلبك وادفع نقداً للمندوب',
      available: true,
    },
    {
      icon: CreditCard,
      title: 'فيزا / ماستركارد',
      description: 'ادفع ببطاقتك الائتمانية بأمان',
      available: false,
    },
    {
      icon: Shield,
      title: 'ضمان الجودة',
      description: 'جميع منتجاتنا أصلية ومضمونة',
      available: true,
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-card">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">طرق الدفع</h2>
          <p className="text-muted-foreground">
            نوفر لك خيارات دفع متعددة لراحتك
          </p>
        </div>

        {/* Methods Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {methods.map((method, index) => {
            const Icon = method.icon;
            return (
              <div
                key={index}
                className={`relative bg-background rounded-xl border border-border p-6 text-center transition-all duration-300 hover:border-primary/50 hover:-translate-y-1 ${
                  !method.available ? 'opacity-60' : ''
                }`}
              >
                {!method.available && (
                  <span className="absolute top-3 left-3 text-xs bg-secondary text-muted-foreground px-2 py-1 rounded-full">
                    قريباً
                  </span>
                )}
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl gradient-primary flex items-center justify-center shadow-glow">
                  <Icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="font-bold mb-2">{method.title}</h3>
                <p className="text-sm text-muted-foreground">{method.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PaymentMethods;
