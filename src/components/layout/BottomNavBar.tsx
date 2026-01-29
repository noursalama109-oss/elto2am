import { Link, useLocation } from 'react-router-dom';
import { Home, ShoppingBag, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

const BottomNavBar = () => {
  const location = useLocation();

  const scrollToBulkOrder = () => {
    if (location.pathname !== '/') {
      window.location.href = '/#bulk-order';
    } else {
      const element = document.getElementById('bulk-order');
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    {
      name: 'الرئيسية',
      icon: Home,
      path: '/',
      isLink: true,
    },
    {
      name: 'المنتجات',
      icon: ShoppingBag,
      path: '/products',
      isLink: true,
    },
    {
      name: 'طلب كشف',
      icon: FileText,
      action: scrollToBulkOrder,
      isLink: false,
    },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-t border-border shadow-lg">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.isLink && location.pathname === item.path;

          if (item.isLink) {
            return (
              <Link
                key={item.name}
                to={item.path!}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 flex-1 h-full transition-colors",
                  isActive 
                    ? "text-primary" 
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs font-medium">{item.name}</span>
              </Link>
            );
          }

          return (
            <button
              key={item.name}
              onClick={item.action}
              className="flex flex-col items-center justify-center gap-1 flex-1 h-full text-muted-foreground hover:text-foreground transition-colors"
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-medium">{item.name}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavBar;
