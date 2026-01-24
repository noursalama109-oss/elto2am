import { Star, Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface Review {
  id: number;
  name: string;
  location: string;
  rating: number;
  comment: string;
  vehicleType: string;
}

const reviews: Review[] = [
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

  return (
    <section className="py-16 bg-gradient-to-b from-background to-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            آراء <span className="text-gradient">عملائنا</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            نفتخر بثقة عملائنا ونسعى دائماً لتقديم أفضل خدمة وأعلى جودة
          </p>
        </div>

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
                  <span className="inline-block mt-2 text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                    {review.vehicleType}
                  </span>
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
