-- Create customer reviews table
CREATE TABLE public.customer_reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  vehicle_type TEXT DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.customer_reviews ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read reviews (public access)
CREATE POLICY "Anyone can view reviews"
ON public.customer_reviews
FOR SELECT
USING (true);

-- Allow anyone to insert reviews (public access for submitting)
CREATE POLICY "Anyone can submit reviews"
ON public.customer_reviews
FOR INSERT
WITH CHECK (true);

-- Insert initial reviews data
INSERT INTO public.customer_reviews (name, location, rating, comment, vehicle_type) VALUES
  ('أحمد محمود', 'الإسماعيلية', 5, 'قطع غيار أصلية وأسعار ممتازة. تعاملت معاهم أكتر من مرة وكل مرة بيكونوا على قد المسؤولية.', 'تروسيكل دايون'),
  ('محمد علي', 'أبو صوير', 5, 'خدمة سريعة وقطع غيار بجودة عالية. الأسعار منافسة جداً مقارنة بالسوق.', 'موتوسيكل هوجان'),
  ('عبدالله حسن', 'التل الكبير', 4, 'محل محترم وناس بتفهم في شغلها. بينصحوك بالقطعة المناسبة لموتورك.', 'تروسيكل CMG'),
  ('سامي إبراهيم', 'الإسماعيلية', 5, 'أفضل محل قطع غيار في المنطقة. الشحن سريع والتغليف ممتاز.', 'موتوسيكل حلاوة');