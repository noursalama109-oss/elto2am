import { Link } from 'react-router-dom';
import { ArrowLeft, Bike, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6 animate-fade-in">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-primary text-sm font-medium">
              متوفر شحن جميع المحافظات
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-slide-up">
            <span className="text-sm font-medium">التوأم</span>
            <br />
            <span className="text-foreground">لقطع الغيار</span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto animate-fade-in">
            نوفر لك جميع قطع غيار الموتوسيكل والتروسيكل بأعلى جودة وأفضل الأسعار مع ضمان حقيقي
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-slide-up">
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

          {/* Vehicle Types */}
          <div className="flex items-center justify-center gap-8 animate-fade-in">
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center">
                <Bike className="w-7 h-7 text-primary" />
              </div>
              <span className="text-sm font-medium">موتوسيكل</span>
            </div>
            <div className="w-px h-12 bg-border" />
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center">
                <Truck className="w-7 h-7 text-primary" />
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
