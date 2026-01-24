import { useState, useMemo, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Phone, Search, CreditCard, Star, MessageSquareWarning } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { products } from '@/data/products';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const mobileSearchRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { name: 'الرئيسية', path: '/' },
    { name: 'المنتجات', path: '/products' },
  ];

  const scrollToSection = (sectionId: string) => {
    setIsMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const sectionLinks = [
    { name: 'آراء العملاء', id: 'customer-reviews', icon: Star },
    { name: 'الشكاوى والمقترحات', id: 'complaints', icon: MessageSquareWarning },
    { name: 'طرق الدفع', id: 'payment-methods', icon: CreditCard },
  ];

  // Filter products based on search query
  const suggestions = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.trim().toLowerCase();
    return products
      .filter((product) => 
        product.name.toLowerCase().includes(query) ||
        product.description?.toLowerCase().includes(query)
      )
      .slice(0, 5);
  }, [searchQuery]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current && !searchRef.current.contains(event.target as Node) &&
        mobileSearchRef.current && !mobileSearchRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (productName: string) => {
    navigate(`/products?search=${encodeURIComponent(productName)}`);
    setSearchQuery('');
    setShowSuggestions(false);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-14 h-14 rounded-lg bg-white border border-gray-200 flex items-center justify-center">
              <span className="text-green-600 font-bold text-xl">H & M</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg leading-tight">التوأم</span>
              <span className="text-xs text-muted-sm font-medium">لقطع الغيار</span>
              <span className="text-xs font-bold text-accent">الموزع المعتمد لدى H & M</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative font-medium transition-colors hover:text-primary ${
                  isActive(link.path) ? 'text-primary' : 'text-foreground'
                }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <span className="absolute -bottom-1 right-0 left-0 h-0.5 bg-primary rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          {/* Search Bar with Suggestions */}
          <div ref={searchRef} className="hidden md:block flex-1 max-w-md mx-4 relative">
            <form onSubmit={handleSearch} className="flex items-center gap-2">
              <div className="relative w-full">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="ابحث عن قطع الغيار... (مثال: تيل فرامل، بستم)"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  className="pr-10 text-right"
                />
              </div>
            </form>
            
            {/* Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full right-0 left-0 mt-1 bg-background border border-border rounded-lg shadow-lg z-50 overflow-hidden">
                {suggestions.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => handleSuggestionClick(product.name)}
                    className="w-full px-4 py-3 text-right hover:bg-accent transition-colors flex items-center gap-3 border-b border-border last:border-b-0"
                  >
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-10 h-10 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-sm">{product.name}</p>
                      <p className="text-xs text-muted-foreground">{product.price} جنيه</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <a
              href="tel:+201014868268"
              className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>اتصل بنا</span>
            </a>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Search with Suggestions */}
        <div ref={mobileSearchRef} className="md:hidden py-2 border-t border-border relative">
          <form onSubmit={handleSearch}>
            <div className="relative w-full">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="ابحث عن قطع الغيار..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                className="pr-10 text-right"
              />
            </div>
          </form>
          
          {/* Mobile Suggestions Dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full right-0 left-0 mt-1 bg-background border border-border rounded-lg shadow-lg z-50 overflow-hidden mx-4">
              {suggestions.map((product) => (
                <button
                  key={product.id}
                  onClick={() => handleSuggestionClick(product.name)}
                  className="w-full px-4 py-3 text-right hover:bg-accent transition-colors flex items-center gap-3 border-b border-border last:border-b-0"
                >
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-10 h-10 object-cover rounded"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-sm">{product.name}</p>
                    <p className="text-xs text-muted-foreground">{product.price} جنيه</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border animate-slide-up">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block py-3 font-medium transition-colors ${
                  isActive(link.path) ? 'text-primary' : 'text-foreground'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            <div className="border-t border-border mt-2 pt-2">
              <span className="text-xs text-muted-foreground px-1">أقسام الصفحة الرئيسية</span>
              {sectionLinks.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className="flex items-center gap-2 py-3 w-full text-right font-medium text-foreground hover:text-primary transition-colors"
                  >
                    <Icon className="w-4 h-4" />
                    <span>{section.name}</span>
                  </button>
                );
              })}
            </div>
            
            <a
              href="tel:+201014868268"
              className="flex items-center gap-2 py-3 text-muted-foreground border-t border-border mt-2 pt-2"
            >
              <Phone className="w-4 h-4" />
              <span>اتصل بنا</span>
            </a>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
