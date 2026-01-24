import { Link } from 'react-router-dom';
import { Phone, MapPin, Clock, CreditCard, Wallet, Truck, Facebook, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center">
                <span className="text-green-600 font-bold text-sm">H & M</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg leading-tight">التوأم</span>
                <span className="text-xs text-muted-foreground">لقطع الغيار</span>
              </div>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              نوفر لك أفضل قطع الغيار الأصلية للموتوسيكل والتروسيكل بأسعار منافسة وجودة عالية.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">روابط سريعة</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-muted-foreground hover:text-primary transition-colors">
                  جميع المنتجات
                </Link>
              </li>
              <li>
                <Link to="/best-sellers" className="text-muted-foreground hover:text-primary transition-colors">
                  الأكثر مبيعاً
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4">تواصل معنا</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-muted-foreground">
                <Phone className="w-4 h-4 text-primary" />
                <span dir="ltr">+201014868268 </span>
              </li>
              <li className="flex items-start gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary mt-1 shrink-0" />
                <div className="flex flex-col gap-1">
                  <span>الشهداء - شارع عبدالحكيم عامر</span>
                  <span className="text-xs">بجوار دار المناسبات - محل التوأم</span>
                  <a 
                    href="https://maps.app.goo.gl/vBDypH4iC4aYmBd59" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline text-xs flex items-center gap-1 mt-1"
                  >
                    <MapPin className="w-3 h-3" />
                    عرض على خريطة جوجل
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Clock className="w-4 h-4 text-primary" />
                <span>11 صباحاً - 10 مساءً</span>
              </li>
            </ul>
          </div>

          {/* Payment Methods */}
          <div>
            <h3 className="font-bold text-lg mb-4">طرق الدفع</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-muted-foreground">
                <Wallet className="w-4 h-4 text-primary" />
                <span>فودافون كاش</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Truck className="w-4 h-4 text-primary" />
                <span>الدفع عند الاستلام</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <CreditCard className="w-4 h-4 text-primary" />
                <span>فيزا (قريباً)</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-muted-foreground text-sm">© {new Date().getFullYear()} التوأم لقطع الغيار. جميع الحقوق محفوظة.</p>
            
            <div className="flex items-center gap-4">
              <span className="text-muted-foreground text-sm">تابعنا على:</span>
              <a
                href="https://www.facebook.com/share/17zNhjai5L/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.tiktok.com/@elto2am10?_r=1&_t=ZS-93KgDN13YTl"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="TikTok"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
              <a
                href="https://www.instagram.com/to2am10?igsh=MXJ0Mzh3cHdjOW04NA=="
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
