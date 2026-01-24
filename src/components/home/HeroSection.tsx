import { Link } from 'react-router-dom';
import { ArrowLeft, ClipboardList, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import hmLogo from '@/assets/hm-logo.jpg';

// Custom solid motorcycle icon
const MotorcycleIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.5 12c-1.38 0-2.6.56-3.5 1.47V12h-3l-1.5-3h2V7h-5v2h1.47l.73 1.47L8.27 12H5.5c-.55 0-1 .45-1 1s.45 1 1 1h2.77l1.5-1.5.73 1.47c-.94.76-1.5 1.9-1.5 3.18 0 2.21 1.79 4 4 4s4-1.79 4-4c0-.62-.14-1.21-.39-1.73l1.89-1.89c.3.51.5 1.09.5 1.73 0 1.93-1.57 3.5-3.5 3.5v2c3.04 0 5.5-2.46 5.5-5.5S22.54 12 19.5 12zM13 18.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5zM5.5 6C4.12 6 3 7.12 3 8.5S4.12 11 5.5 11 8 9.88 8 8.5 6.88 6 5.5 6z"/>
  </svg>
);

// Custom solid tricycle icon
const TricycleIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 4c-.55 0-1 .45-1 1v2H8v2h3v2.5l-4.5 5H5c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3c0-.55-.15-1.06-.41-1.5h4.82c-.26.44-.41.95-.41 1.5 0 1.66 1.34 3 3 3s3-1.34 3-3c0-.55-.15-1.06-.41-1.5h.91c1.66 0 3-1.34 3-3 0-.83-.34-1.58-.88-2.12l-3.12-3.12V9h3V7h-3V5c0-.55-.45-1-1-1h-5zm0 2h3v4.38l2.62 2.62H6.5l4.5-5V9h-2V6h3zM5 18c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm10 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm3.5-3c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/>
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

          {/* Vehicle Types */}
          <div className="flex items-center justify-center gap-8 animate-fade-in">
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center">
                <MotorcycleIcon className="w-7 h-7 text-primary" />
              </div>
              <span className="text-sm font-medium">موتوسيكل</span>
            </div>
            <div className="w-px h-12 bg-border" />
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center">
                <TricycleIcon className="w-7 h-7 text-primary" />
              </div>
              <span className="text-sm font-medium">تروسيكل</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
