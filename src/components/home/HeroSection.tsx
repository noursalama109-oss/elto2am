import { Link } from 'react-router-dom';
import { ArrowLeft, ClipboardList, Send, Truck, Wallet, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import hmLogo from '@/assets/hm-logo.jpg';

// WhatsApp icon
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const HeroSection = () => {
  return (
    <section className="relative gradient-hero py-16 md:py-24 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-20 w-64 h-64 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-primary rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto text-center">
          {/* H&M Logo */}
          <div className="mb-6 animate-fade-in">
            <img 
              src={hmLogo} 
              alt="H&M Original Parts" 
              className="w-40 h-40 md:w-52 md:h-52 mx-auto object-contain"
            />
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6 animate-fade-in">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-primary text-sm font-medium">
              متوفر شحن جميع المحافظات
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-3 animate-slide-up">
            <span className="text">التوأم</span>
            <br />
            <span className="text-3xl font-bold">لقطع الغيار</span>
          </h1>
          
          {/* Authorized Distributor Badge */}
          <div className="mb-6 animate-fade-in">
            <p className="text-lg md:text-xl font-bold text-accent">
              الموزع المعتمد لدى H & M
            </p>
          </div>

          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto animate-fade-in">
            نوفر لك جميع قطع غيار الموتوسيكل والتروسيكل بأعلى جودة وأفضل الأسعار مع ضمان حقيقي
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 animate-slide-up">
            <Button asChild size="lg" className="gradient-primary shadow-glow hover:opacity-90 w-full sm:w-auto">
              <Link to="/products" className="flex items-center gap-2">
                تصفح المنتجات
                <ArrowLeft className="w-5 h-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
              <Link to="/best-sellers">الأكثر مبيعاً</Link>
            </Button>
          </div>

          {/* Bulk Order Banner */}
          <div className="bg-card border border-border rounded-2xl p-6 mb-12 animate-fade-in shadow-card">
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
              <div className="w-16 h-16 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
                <ClipboardList className="w-8 h-8 text-primary" />
              </div>
              <div className="flex-1 text-center md:text-right">
                <h3 className="text-xl font-bold mb-1">عندك كشف طلبية كبيرة؟</h3>
                <p className="text-muted-foreground">
                  ابعت لنا الكشف أو صور لنا قائمة الطلبات هنجهز الكشف وهيوصلك لحد عندك
                </p>
              </div>
              <Button
                onClick={() => {
                  const message = `*السلام عليكم* 👋

📋 *عندي كشف طلبية كبيرة*

*هبعتلكم الكشف أو صور القائمة دلوقتي*.
*ياريت تجهز وتوصلي في اسرع وقت* 👌⚡

*شكراً ليكم* 🙏`;
                  const whatsappUrl = `https://wa.me/201014868268?text=${encodeURIComponent(message)}`;
                  window.open(whatsappUrl, '_blank');
                }}
                className="gradient-primary shadow-glow hover:opacity-90 gap-2 shrink-0"
              >
                <Send className="w-4 h-4" />
                ابعت الكشف
              </Button>
            </div>
          </div>

          {/* Feature Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 animate-fade-in">
            <div className="flex items-center justify-center gap-3 bg-secondary/50 border border-border rounded-xl px-4 py-3">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <Truck className="w-5 h-5 text-primary" />
              </div>
              <span className="text-sm font-medium">شحن سريع لجميع المحافظات</span>
            </div>
            <div className="flex items-center justify-center gap-3 bg-secondary/50 border border-border rounded-xl px-4 py-3">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <Wallet className="w-5 h-5 text-primary" />
              </div>
              <span className="text-sm font-medium">الدفع عند الاستلام</span>
            </div>
            <div className="flex items-center justify-center gap-3 bg-secondary/50 border border-border rounded-xl px-4 py-3">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <span className="text-sm font-medium">ضمان أفضل سعر</span>
            </div>
          </div>

          {/* WhatsApp Button */}
          <div className="flex justify-center animate-fade-in">
            <Button
              onClick={() => {
                const message = `*السلام عليكم* 👋\n\nأريد الاستفسار عن منتجاتكم`;
                const whatsappUrl = `https://wa.me/201014868268?text=${encodeURIComponent(message)}`;
                window.open(whatsappUrl, '_blank');
              }}
              variant="outline"
              size="lg"
              className="gap-2 border-green-500/50 text-green-500 hover:bg-green-500/10 hover:text-green-400"
            >
              <WhatsAppIcon className="w-5 h-5" />
              اطلب عبر واتساب
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
