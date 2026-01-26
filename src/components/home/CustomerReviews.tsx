import { useState } from 'react';
import { Star, Quote, Send, Loader2, MessageCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ScrollReveal from '@/components/ui/scroll-reveal';
import { useCustomerReviews } from '@/hooks/useCustomerReviews';

const CustomerReviews = () => {
  const { reviews, isLoading, isSubmitting, isSubmittingReply, submitReview, submitReply } = useCustomerReviews();
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [expandedReplies, setExpandedReplies] = useState<Set<string>>(new Set());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const success = await submitReview({ comment, rating });
    
    if (success) {
      setComment('');
      setRating(0);
    }
  };

  const handleReplySubmit = async (reviewId: string) => {
    const success = await submitReply(reviewId, replyText);
    
    if (success) {
      setReplyText('');
      setReplyingTo(null);
      setExpandedReplies(prev => new Set(prev).add(reviewId));
    }
  };

  const toggleReplies = (reviewId: string) => {
    setExpandedReplies(prev => {
      const newSet = new Set(prev);
      if (newSet.has(reviewId)) {
        newSet.delete(reviewId);
      } else {
        newSet.add(reviewId);
      }
      return newSet;
    });
  };

  const renderStars = (starRating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < starRating
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
    : '5.0';

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
                <Button 
                  type="submit" 
                  className="w-full gap-2"
                  disabled={isSubmitting}
                  aria-label="إرسال التقييم"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                  {isSubmitting ? 'جاري الإرسال...' : 'إرسال التقييم'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </ScrollReveal>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <p>لا توجد تقييمات بعد. كن أول من يشاركنا رأيه!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reviews.map((review, index) => (
              <ScrollReveal key={review.id} variant="fadeUp" delay={index * 0.1}>
                <Card
                  className="bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow h-full flex flex-col"
                >
                  <CardContent className="p-6 flex flex-col flex-1">
                    <Quote className="w-8 h-8 text-primary/30 mb-4" />
                    
                    <p className="text-foreground/90 text-sm leading-relaxed mb-4">
                      "{review.comment}"
                    </p>

                    <div className="flex items-center gap-1 mb-3">
                      {renderStars(review.rating)}
                    </div>

                    {review.vehicle_type && (
                      <div className="border-t border-border pt-4 mb-3">
                        <span className="inline-block text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                          {review.vehicle_type}
                        </span>
                      </div>
                    )}

                    {/* Replies Section */}
                    <div className="mt-auto pt-3 border-t border-border">
                      {review.replies.length > 0 && (
                        <button
                          onClick={() => toggleReplies(review.id)}
                          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors mb-2"
                        >
                          <MessageCircle className="w-3 h-3" />
                          <span>{review.replies.length} رد</span>
                          {expandedReplies.has(review.id) ? (
                            <ChevronUp className="w-3 h-3" />
                          ) : (
                            <ChevronDown className="w-3 h-3" />
                          )}
                        </button>
                      )}

                      {/* Show Replies */}
                      {expandedReplies.has(review.id) && review.replies.length > 0 && (
                        <div className="space-y-2 mb-3">
                          {review.replies.map((reply) => (
                            <div
                              key={reply.id}
                              className="bg-muted/50 rounded-lg p-2 text-xs text-foreground/80"
                            >
                              {reply.reply_text}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Reply Form */}
                      {replyingTo === review.id ? (
                        <div className="space-y-2">
                          <Input
                            placeholder="اكتب ردك..."
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            className="text-xs h-8"
                            maxLength={200}
                            disabled={isSubmittingReply}
                          />
                          <div className="flex gap-1">
                            <Button
                              size="sm"
                              className="h-7 text-xs flex-1"
                              onClick={() => handleReplySubmit(review.id)}
                              disabled={isSubmittingReply}
                            >
                              {isSubmittingReply ? (
                                <Loader2 className="w-3 h-3 animate-spin" />
                              ) : (
                                'إرسال'
                              )}
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-7 text-xs"
                              onClick={() => {
                                setReplyingTo(null);
                                setReplyText('');
                              }}
                              disabled={isSubmittingReply}
                            >
                              إلغاء
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-7 text-xs w-full"
                          onClick={() => setReplyingTo(review.id)}
                        >
                          <MessageCircle className="w-3 h-3 ml-1" />
                          رد
                        </Button>
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
