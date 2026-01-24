import { Link } from 'react-router-dom';
import { ArrowLeft, ClipboardList, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import hmLogo from '@/assets/hm-logo.jpg';

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
                <Bike className="w-7 h-7 text-primary" />
              </div>
              <span className="text-sm font-medium">موتوسيكل</span>
            </div>
            <svg 
  xmlns="http://www.w3.org/2000/svg" 
  viewBox="0 0 640 512" 
  className="w-8 h-8 text-primary fill-current"
>
  <path d="M624 352h-16V243.9c0-12.7-5.1-24.9-14.1-33.9L494 110.1c-9-9-21.2-14.1-33.9-14.1H416V48c0-26.5-21.5-48-48-48H112C85.5 0 64 21.5 64 48v48H8c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h272c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H40c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h208c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H8c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h208c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H64v128c0 53 43 96 96 96s96-43 96-96h128c0 53 43 96 96 96s96-43 96-96h16c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zM160 464c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm320 0c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm80-208H416V144h44.1l99.9 100v12z"/>
</svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
