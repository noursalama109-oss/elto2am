import { useState } from 'react';
import { FileText, ShoppingCart, Send, Search, Plus, Minus, X, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useProducts } from '@/hooks/useProducts';
import { Product } from '@/types/product';
import { ScrollArea } from '@/components/ui/scroll-area';

interface SelectedProduct {
  product: Product;
  quantity: number;
}

const BulkOrderSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [orderType, setOrderType] = useState<'ready' | 'select' | null>(null);
  const [readyOrderText, setReadyOrderText] = useState('');
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  const { data: products = [] } = useProducts();

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addProduct = (product: Product) => {
    const existing = selectedProducts.find(sp => sp.product.id === product.id);
    if (existing) {
      setSelectedProducts(prev => 
        prev.map(sp => 
          sp.product.id === product.id 
            ? { ...sp, quantity: sp.quantity + 1 }
            : sp
        )
      );
    } else {
      setSelectedProducts(prev => [...prev, { product, quantity: 1 }]);
    }
  };

  const removeProduct = (productId: string) => {
    setSelectedProducts(prev => prev.filter(sp => sp.product.id !== productId));
  };

  const updateQuantity = (productId: string, delta: number) => {
    setSelectedProducts(prev => 
      prev.map(sp => {
        if (sp.product.id === productId) {
          const newQty = sp.quantity + delta;
          return newQty > 0 ? { ...sp, quantity: newQty } : sp;
        }
        return sp;
      }).filter(sp => sp.quantity > 0)
    );
  };

  const getProductQuantity = (productId: string) => {
    return selectedProducts.find(sp => sp.product.id === productId)?.quantity || 0;
  };

  const sendToWhatsApp = () => {
    let message = '';
    
    if (orderType === 'ready') {
      message = `السلام عليكم 👋\n\nعندي كشف طلبية:\n\n${readyOrderText}\n\nياريت تجهزوهالي وتوصلي في اسرع وقت 👌⚡\n\nشكراً ليكم 🙏`;
    } else if (orderType === 'select') {
      const productsList = selectedProducts
        .map(sp => `• ${sp.product.name} - الكمية: ${sp.quantity}`)
        .join('\n');
      const total = selectedProducts.reduce((sum, sp) => sum + (sp.product.price * sp.quantity), 0);
      
      message = `السلام عليكم 👋\n\nعندي كشف طلبية:\n\n${productsList}\n\n💰 الإجمالي التقريبي: ${total} جنيه\n\nياريت تجهزوهالي وتوصلي في اسرع وقت 👌⚡\n\nشكراً ليكم 🙏`;
    }
    
    const whatsappUrl = `https://wa.me/201014868268?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    // Reset state
    setIsOpen(false);
    setOrderType(null);
    setReadyOrderText('');
    setSelectedProducts([]);
    setSearchQuery('');
  };

  const canSend = orderType === 'ready' 
    ? readyOrderText.trim().length > 0 
    : selectedProducts.length > 0;

  const totalItems = selectedProducts.reduce((sum, sp) => sum + sp.quantity, 0);
  const totalPrice = selectedProducts.reduce((sum, sp) => sum + (sp.product.price * sp.quantity), 0);

  return (
    <section className="py-12 bg-gradient-to-br from-accent/5 via-background to-primary/5">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-card rounded-2xl shadow-xl border border-border overflow-hidden">
            <div className="bg-gradient-to-r from-accent to-primary p-6 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                طلب كشف خاص 📋
              </h2>
              <p className="text-white/90 text-sm md:text-base">
                عندك كشف كبير؟ ابعتهولنا ونجهزهولك في أسرع وقت!
              </p>
            </div>
            
            <div className="p-6 text-center">
              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                  <Button 
                    size="lg" 
                    className="gap-2 text-lg px-8 py-6 bg-accent hover:bg-accent/90 text-white shadow-lg hover:shadow-xl transition-all"
                  >
                    <Send className="w-5 h-5" />
                    ابعت الكشف
                  </Button>
                </DialogTrigger>
                
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
                  <DialogHeader>
                    <DialogTitle className="text-xl text-center">
                      {!orderType && 'اختر طريقة إرسال الكشف'}
                      {orderType === 'ready' && 'كشف جاهز'}
                      {orderType === 'select' && 'اختر من المنتجات'}
                    </DialogTitle>
                  </DialogHeader>
                  
                  {!orderType && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                      <button
                        onClick={() => setOrderType('ready')}
                        className="flex flex-col items-center gap-4 p-6 rounded-xl border-2 border-border hover:border-accent hover:bg-accent/5 transition-all group"
                      >
                        <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                          <FileText className="w-8 h-8 text-accent" />
                        </div>
                        <div className="text-center">
                          <h3 className="font-bold text-lg mb-1">كشف جاهز</h3>
                          <p className="text-sm text-muted-foreground">
                            اكتب الكشف أو ارفق صورة
                          </p>
                        </div>
                      </button>
                      
                      <button
                        onClick={() => setOrderType('select')}
                        className="flex flex-col items-center gap-4 p-6 rounded-xl border-2 border-border hover:border-primary hover:bg-primary/5 transition-all group"
                      >
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <ShoppingCart className="w-8 h-8 text-primary" />
                        </div>
                        <div className="text-center">
                          <h3 className="font-bold text-lg mb-1">اختر من المنتجات</h3>
                          <p className="text-sm text-muted-foreground">
                            اختر من منتجات الموقع
                          </p>
                        </div>
                      </button>
                    </div>
                  )}
                  
                  {orderType === 'ready' && (
                    <div className="flex flex-col gap-4 p-4">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setOrderType(null)}
                        className="self-start gap-1"
                      >
                        <X className="w-4 h-4" />
                        رجوع
                      </Button>
                      
                      <div className="space-y-3">
                        <p className="text-sm text-muted-foreground">
                          اكتب الكشف هنا وهنبعته على الواتساب. لو عندك صورة، ابعتها على الواتساب مباشرة بعد الضغط على إرسال.
                        </p>
                        <Textarea
                          placeholder="اكتب الكشف هنا... مثال:
- تيل فرامل أمامي هوجان 3 - عدد 2
- فلتر هواء دايون 40 - عدد 1
- مساعد خلفي CMG - عدد 2"
                          value={readyOrderText}
                          onChange={(e) => setReadyOrderText(e.target.value)}
                          className="min-h-[200px] text-right"
                          dir="rtl"
                        />
                      </div>
                      
                      <Button 
                        onClick={sendToWhatsApp}
                        disabled={!canSend}
                        className="gap-2 bg-green-600 hover:bg-green-700"
                      >
                        <MessageCircle className="w-5 h-5" />
                        إرسال على الواتساب
                      </Button>
                    </div>
                  )}
                  
                  {orderType === 'select' && (
                    <div className="flex flex-col gap-4 p-4 flex-1 overflow-hidden">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setOrderType(null)}
                        className="self-start gap-1"
                      >
                        <X className="w-4 h-4" />
                        رجوع
                      </Button>
                      
                      {/* Search */}
                      <div className="relative">
                        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          placeholder="ابحث عن منتج..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pr-10 text-right"
                          dir="rtl"
                        />
                      </div>
                      
                      {/* Selected Products Summary */}
                      {selectedProducts.length > 0 && (
                        <div className="bg-accent/10 rounded-lg p-3 border border-accent/20">
                          <div className="flex items-center justify-between text-sm">
                            <span className="font-medium">
                              {totalItems} منتج - {totalPrice} جنيه
                            </span>
                            <span className="text-accent font-bold">المحدد</span>
                          </div>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {selectedProducts.map(sp => (
                              <div 
                                key={sp.product.id}
                                className="bg-background rounded-full px-3 py-1 text-xs flex items-center gap-2"
                              >
                                <span>{sp.product.name} ({sp.quantity})</span>
                                <button 
                                  onClick={() => removeProduct(sp.product.id)}
                                  className="text-destructive hover:text-destructive/80"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Products List */}
                      <ScrollArea className="flex-1 -mx-4 px-4">
                        <div className="grid grid-cols-1 gap-2 pb-4">
                          {filteredProducts.map(product => {
                            const qty = getProductQuantity(product.id);
                            return (
                              <div 
                                key={product.id}
                                className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${
                                  qty > 0 
                                    ? 'border-accent bg-accent/5' 
                                    : 'border-border hover:border-muted-foreground'
                                }`}
                              >
                                <img 
                                  src={product.image} 
                                  alt={product.name}
                                  className="w-12 h-12 object-cover rounded"
                                />
                                <div className="flex-1 min-w-0">
                                  <p className="font-medium text-sm truncate">{product.name}</p>
                                  <p className="text-xs text-muted-foreground">{product.price} جنيه</p>
                                </div>
                                
                                {qty > 0 ? (
                                  <div className="flex items-center gap-2">
                                    <Button 
                                      size="icon" 
                                      variant="outline"
                                      className="h-8 w-8"
                                      onClick={() => updateQuantity(product.id, -1)}
                                    >
                                      <Minus className="w-3 h-3" />
                                    </Button>
                                    <span className="w-6 text-center font-medium">{qty}</span>
                                    <Button 
                                      size="icon" 
                                      variant="outline"
                                      className="h-8 w-8"
                                      onClick={() => updateQuantity(product.id, 1)}
                                    >
                                      <Plus className="w-3 h-3" />
                                    </Button>
                                  </div>
                                ) : (
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    onClick={() => addProduct(product)}
                                    className="gap-1"
                                  >
                                    <Plus className="w-4 h-4" />
                                    أضف
                                  </Button>
                                )}
                              </div>
                            );
                          })}
                          
                          {filteredProducts.length === 0 && (
                            <div className="text-center py-8 text-muted-foreground">
                              لا توجد منتجات مطابقة للبحث
                            </div>
                          )}
                        </div>
                      </ScrollArea>
                      
                      {/* Send Button */}
                      <Button 
                        onClick={sendToWhatsApp}
                        disabled={!canSend}
                        className="gap-2 bg-green-600 hover:bg-green-700 sticky bottom-0"
                      >
                        <MessageCircle className="w-5 h-5" />
                        إرسال {totalItems > 0 && `(${totalItems} منتج)`} على الواتساب
                      </Button>
                    </div>
                  )}
                </DialogContent>
              </Dialog>
              
              <p className="text-sm text-muted-foreground mt-4">
                اضغط على الزر واختار طريقة إرسال الكشف المناسبة ليك
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BulkOrderSection;
