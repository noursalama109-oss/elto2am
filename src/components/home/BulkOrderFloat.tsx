import { useState } from 'react';
import { ClipboardList, X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BulkOrderFloat = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleWhatsApp = () => {
    const message = `مرحباً، عندي كشف طلبية كبيرة وعايز أبعتلكم القائمة 📋`;
    const whatsappUrl = `https://wa.me/201014868268?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed bottom-6 left-6 z-50">
      {/* Expanded Card */}
      {isExpanded && (
        <div className="absolute bottom-16 left-0 w-72 bg-card border border-border rounded-xl shadow-lg p-4 animate-fade-in">
          <button
            onClick={() => setIsExpanded(false)}
            className="absolute top-2 left-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          
          <div className="text-center">
            <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-primary/20 flex items-center justify-center">
              <ClipboardList className="w-7 h-7 text-primary" />
            </div>
            <h3 className="font-bold text-lg mb-2">عندك كشف طلبية كبيرة؟</h3>
            <p className="text-muted-foreground text-sm mb-4">
              ابعت لنا الكشف أو صور لنا قائمة الطلبات وهنجهز الكشف وهيوصلك لحد عندك
            </p>
            <Button 
              onClick={handleWhatsApp}
              className="w-full gap-2"
            >
              <Send className="w-4 h-4" />
              ابعت الكشف دلوقتي
            </Button>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-glow transition-all duration-300 flex items-center justify-center animate-pulse-glow"
      >
        {isExpanded ? (
          <X className="w-6 h-6" />
        ) : (
          <ClipboardList className="w-6 h-6" />
        )}
      </button>
    </div>
  );
};

export default BulkOrderFloat;
