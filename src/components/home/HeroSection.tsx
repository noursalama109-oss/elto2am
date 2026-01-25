import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Truck, Shield, CreditCard, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, useScroll, useTransform } from 'framer-motion';
import hmLogo from '@/assets/hm-logo.jpg';
import heroImage from '@/assets/hero-motorcycle-engine.jpg';
import PaymentMethodDialog from '@/components/checkout/PaymentMethodDialog';
import ScrollReveal from '@/components/ui/scroll-reveal';

// WhatsApp icon
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const HeroSection = () => {
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [currentWhatsappMessage, setCurrentWhatsappMessage] = useState('');
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3]);

  const features = [
    { icon: Truck, text: 'شحن سريع لجميع المحافظات' },
    { icon: Award, text: 'قطع أصلية H&M' },
    { icon: CreditCard, text: 'طرق دفع متعددة' },
    { icon: Shield, text: 'ضمان الجودة' },
  ];

  return (
    <>
      {/* Hero Section - Full Screen */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Parallax Effect */}
        <motion.div 
          className="absolute inset-0"
          style={{ y: backgroundY }}
        >
          <motion.img 
            src={heroImage}
            alt="Motorcycle Engine"
            className="w-full h-[120%] object-cover"
            loading="eager"
            fetchPriority="high"
            style={{ opacity }}
          />
          {/* Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
          {/* Orange Accent Glow */}
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-accent/10 to-transparent" />
        </motion.div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 text-center pt-20">
          {/* H&M Logo */}
          <ScrollReveal variant="scale" duration={0.6}>
            <div className="mb-8">
              <img 
                src={hmLogo} 
                alt="H&M Original Parts" 
                className="w-40 h-auto md:w-56 mx-auto object-contain drop-shadow-2xl"
                width={224}
                height={150}
              />
            </div>
          </ScrollReveal>

          {/* Main Title */}
          <ScrollReveal variant="fadeUp" delay={0.2}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-4 tracking-tight">
              <span className="text-foreground drop-shadow-lg">التوأم</span>
            </h1>
            <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground/90 mb-6">
              لقطع الغيار
            </p>
          </ScrollReveal>

          {/* Authorized Distributor Badge */}
          <ScrollReveal variant="fadeUp" delay={0.3}>
            <div className="inline-flex items-center gap-3 bg-accent/20 backdrop-blur-sm border border-accent/40 rounded-full px-6 py-3 mb-10">
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <span className="text-accent font-bold text-lg md:text-xl">
                الموزع المعتمد لدى H & M
              </span>
            </div>
          </ScrollReveal>

          {/* CTA Buttons */}
          <ScrollReveal variant="fadeUp" delay={0.4}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Button 
                asChild 
                size="lg" 
                className="gradient-primary shadow-glow hover:opacity-90 text-lg px-8 py-6 rounded-full font-bold w-full sm:w-auto"
              >
                <Link to="/products" className="flex items-center gap-3">
                  تصفح المنتجات
                  <ArrowLeft className="w-5 h-5" />
                </Link>
              </Button>
              
              <Button
                onClick={() => {
                  const message = `*السلام عليكم* 👋%0A%0Aأريد الاستفسار عن منتجاتكم`;
                  setCurrentWhatsappMessage(message);
                  setShowPaymentDialog(true);
                }}
                size="lg"
                variant="outline"
                className="gap-3 border-2 border-green-500 text-green-500 hover:bg-green-500/20 hover:text-green-400 text-lg px-8 py-6 rounded-full font-bold w-full sm:w-auto backdrop-blur-sm"
              >
                <WhatsAppIcon className="w-6 h-6" />
                اطلب عبر واتساب
              </Button>
            </div>
          </ScrollReveal>

          {/* Scroll Indicator */}
          <ScrollReveal variant="fadeUp" delay={0.6}>
            <div className="animate-bounce">
              <div className="w-6 h-10 border-2 border-foreground/30 rounded-full mx-auto flex justify-center">
                <div className="w-1.5 h-3 bg-accent rounded-full mt-2 animate-pulse" />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* H&M Trust Section */}
      <section className="relative bg-card border-y border-border py-10">
        <div className="container mx-auto px-4">
          <ScrollReveal variant="fadeUp">
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-center">
              <div className="w-20 h-20 rounded-xl bg-white border border-border flex items-center justify-center shadow-lg">
                <span className="text-green-600 font-black text-2xl">H & M</span>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                  الجودة التي يثق بها المحترفون
                </p>
                <p className="text-muted-foreground text-lg">
                  قطع غيار أصلية بمعايير عالمية
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Features Strip */}
      <section className="bg-background border-b border-border py-8">
        <div className="container mx-auto px-4">
          <ScrollReveal variant="fadeUp" delay={0.1}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div 
                    key={index}
                    className="group flex flex-col items-center gap-3 bg-card border border-border rounded-xl px-4 py-5 transition-all duration-300 hover:bg-accent/10 hover:border-accent/50 hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/10"
                  >
                    <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center transition-all duration-300 group-hover:bg-accent group-hover:scale-110">
                      <Icon className="w-6 h-6 text-accent transition-colors duration-300 group-hover:text-accent-foreground" />
                    </div>
                    <span className="text-sm md:text-base font-semibold text-center transition-colors duration-300 group-hover:text-accent">
                      {feature.text}
                    </span>
                  </div>
                );
              })}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <PaymentMethodDialog
        open={showPaymentDialog}
        onOpenChange={setShowPaymentDialog}
        whatsappMessage={currentWhatsappMessage}
      />
    </>
  );
};

export default HeroSection;
