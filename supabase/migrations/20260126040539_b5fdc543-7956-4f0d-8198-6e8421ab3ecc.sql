-- Create table for review replies
CREATE TABLE public.review_replies (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    review_id UUID NOT NULL REFERENCES public.customer_reviews(id) ON DELETE CASCADE,
    reply_text TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.review_replies ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read replies
CREATE POLICY "Anyone can read replies"
ON public.review_replies
FOR SELECT
USING (true);

-- Allow anyone to insert replies
CREATE POLICY "Anyone can submit replies"
ON public.review_replies
FOR INSERT
WITH CHECK (true);

-- No updates allowed
CREATE POLICY "No updates allowed"
ON public.review_replies
FOR UPDATE
USING (false)
WITH CHECK (false);

-- No deletes allowed
CREATE POLICY "No deletes allowed"
ON public.review_replies
FOR DELETE
USING (false);