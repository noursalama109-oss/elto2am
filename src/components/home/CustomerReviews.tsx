import { useState } from 'react';
import { Star, Quote, Send } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface Review {
  id: number;
  name: string;
  location: string;
  rating: number;
  comment: string;
  vehicleType: string;
}

const initialReviews: Review[] = [
  {
    id: 1,
    name: "أحمد محمود",
    location: "الإسماعيلية",
    rating: 5,
    comment: "قطع غيار أصلية وأسعار ممتازة. تعاملت معاهم أكتر من مرة وكل مرة بيكونوا على قد المسؤولية.",
    vehicleType: "تروسيكل دايون"
  },
  {
    id: 2,
    name: "محمد علي",
    location: "أبو صوير",
    rating: 5,
    comment: "خدمة سريعة وقطع غيار بجودة عالية. الأسعار منافسة جداً مقارنة بالسوق.",
    vehicleType: "موتوسيكل هوجان"
  },
  {
    id: 3,
    name: "عبدالله حسن",
    location: "التل الكبير",
    rating: 4,
    comment: "محل محترم وناس بتفهم في شغلها. بينصحوك بالقطعة المناسبة لموتورك.",
    vehicleType: "تروسيكل CMG"
  },
  {
    id: 4,
    name: "سامي إبراهيم",
    location: "الإسماعيلية",
    rating: 5,
    comment: "أفضل محل قطع غيار في المنطقة. الشحن سريع والتغليف ممتاز.",
    vehicleType: "موتوسيكل حلاوة"
  }
];

const CustomerReviews = () => {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !comment.trim() || rating === 0) {
      toast({
        title: "برجاء ملء جميع الحقول",
        description: "الاسم والتعليق والتقييم مطلوبين",
        variant: "destructive"
      });
      return;
    }

    const newReview: Review = {
      id: Date.now(),
      name: name.trim(),
      location: "عميل جديد",
      rating,
      comment: comment.trim(),
      vehicleType: ""
    };

    setReviews([newReview, ...reviews]);
    setName('');
    setComment('');
    setRating(0);
    
    toast({
      title: "شكراً لك! ✨",
      description: "تم إضافة تقييمك بنجاح"
    });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating
            ? 'text-primary fill-primary'
            : 'text-muted-foreground'
        }`}
      />
    ));
  };

  const renderInteractiveStars = () => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-6 h-6 cursor-pointer transition-all ${
          index < (hoverRating || rating)
            ? 'text-primary fill-primary scale-110'
            : 'text-muted-foreground hover:text-primary/50'
        }`}
        onClick={() => setRating(index + 1)}
        onMouseEnter={() => setHoverRating(index + 1)}
        onMouseLeave={() => setHoverRating(0)}
      />
    ));
  };

  return (
    <section className="py-16 bg-gradient-to-b from-background to-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            آراء <span className="text-3xl md:text-4xl font-bold mb-4">عملائنا</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            نفتخر بثقة عملائنا ونسعى دائماً لتقديم أفضل خدمة وأعلى جودة
          </p>
        </div>

        {/* نموذج إضافة تقييم */}
        <Card className="max-w-2xl mx-auto mb-12 bg-card/50 backdrop-blur-sm border-primary/20">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-4 text-center">شاركنا رأيك ✍️</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  placeholder="اسمك"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-background/50"
                  maxLength={50}
                />
              </div>
              <div>
                <Textarea
                  placeholder="اكتب تجربتك معانا..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="bg-background/50 min-h-[100px]"
                  maxLength={300}
                />
              </div>
              <div className="flex flex-col items-center gap-2">
                <span className="text-sm text-muted-foreground">تقييمك</span>
                <div className="flex gap-1 rtl:flex-row-reverse">
                  {renderInteractiveStars()}
                </div>
              </div>
              <Button type="submit" className="w-full gap-2">
                <Send className="w-4 h-4" />
                إرسال التقييم
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((review) => (
            <Card
              key={review.id}
              className="bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow"
            >
              <CardContent className="p-6">
                <Quote className="w-8 h-8 text-primary/30 mb-4" />
                
                <p className="text-foreground/90 text-sm leading-relaxed mb-4">
                  "{review.comment}"
                </p>

                <div className="flex items-center gap-1 mb-3">
                  {renderStars(review.rating)}
                </div>

                <div className="border-t border-border pt-4">
                  <h4 className="font-bold text-foreground">{review.name}</h4>
                  <p className="text-xs text-muted-foreground">{review.location}</p>
                  {review.vehicleType && (
                    <span className="inline-block mt-2 text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                      {review.vehicleType}
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 bg-card/50 backdrop-blur-sm border border-border rounded-full px-6 py-3">
            <div className="flex items-center gap-1">
              {renderStars(5)}
            </div>
            <span className="text-muted-foreground text-sm">
              تقييم <span className="text-primary font-bold">4.8</span> من 5 بناءً على آراء العملاء
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
