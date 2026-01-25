import { useState } from 'react';
import { Star, Quote, Send } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import ScrollReveal from '@/components/ui/scroll-reveal';
import { useCustomerReviews } from '@/hooks/useCustomerReviews';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';

const CustomerReviews = () => {
  const { reviews, isLoading, addReview } = useCustomerReviews();
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !location.trim() || !comment.trim() || rating === 0) {
      toast({
        title: "برجاء ملء جميع الحقول",
        description: "الاسم والبلد والتعليق والتقييم مطلوبين",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    const success = await addReview({ name, location, rating, comment });
    
    if (success) {
      setName('');
      setLocation('');
      setComment('');
      setRating(0);
    }
    setIsSubmitting(false);
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

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : '0';

  return (
    <section className="py-16 bg-gradient-to-b from-background to-card">
      <div className="container mx-auto px-4">
        <ScrollReveal variant="fadeUp">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              آراء <span className="text-3xl md:text-4xl font-bold mb-4">عملائنا</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              نفتخر بثقة عملائنا ونسعى دائماً لتقديم أفضل خدمة وأعلى جودة
            </p>
          </div>
        </ScrollReveal>

        {/* نموذج إضافة تقييم */}
        <ScrollReveal variant="scale" delay={0.1}>
          <Card className="max-w-2xl mx-auto mb-12 bg-card/50 backdrop-blur-sm border-primary/20">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4 text-center">شاركنا رأيك ✍️</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    placeholder="اسمك"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-background/50"
                    maxLength={50}
                    disabled={isSubmitting}
                  />
                  <Input
                    placeholder="البلد (مثال: الإسماعيلية)"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="bg-background/50"
                    maxLength={50}
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <Textarea
                    placeholder="اكتب تجربتك معانا..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="bg-background/50 min-h-[100px]"
                    maxLength={300}
                    disabled={isSubmitting}
                  />
                </div>
                <div className="flex flex-col items-center gap-2">
                  <span className="text-sm text-muted-foreground">تقييمك</span>
                  <div className="flex gap-1 rtl:flex-row-reverse">
                    {renderInteractiveStars()}
                  </div>
                </div>
                <Button type="submit" className="w-full gap-2" disabled={isSubmitting}>
                  <Send className="w-4 h-4" />
                  {isSubmitting ? 'جاري الإرسال...' : 'إرسال التقييم'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </ScrollReveal>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="bg-card/50">
                <CardContent className="p-6 space-y-4">
                  <Skeleton className="h-8 w-8" />
                  <Skeleton className="h-20 w-full" />
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-6 w-32" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reviews.map((review, index) => (
              <ScrollReveal key={review.id} variant="fadeUp" delay={index * 0.1}>
                <Card
                  className="bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow h-full"
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
                      {review.vehicle_type && (
                        <span className="inline-block mt-2 text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                          {review.vehicle_type}
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        )}

        <ScrollReveal variant="fadeUp" delay={0.5}>
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 bg-card/50 backdrop-blur-sm border border-border rounded-full px-6 py-3">
              <div className="flex items-center gap-1">
                {renderStars(5)}
              </div>
              <span className="text-muted-foreground text-sm">
                تقييم <span className="text-primary font-bold">{averageRating}</span> من 5 بناءً على آراء العملاء
              </span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default CustomerReviews;
