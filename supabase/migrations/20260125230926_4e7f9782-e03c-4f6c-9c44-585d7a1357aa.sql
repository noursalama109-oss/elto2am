-- Create a public view that excludes location (PII)
CREATE VIEW public.customer_reviews_public
WITH (security_invoker = on) AS
SELECT 
  id,
  name,
  rating,
  comment,
  vehicle_type,
  created_at
FROM public.customer_reviews;

-- Grant SELECT on the view to anon and authenticated roles
GRANT SELECT ON public.customer_reviews_public TO anon, authenticated;

-- Drop the existing permissive SELECT policy
DROP POLICY IF EXISTS "Anyone can view reviews" ON public.customer_reviews;

-- Create a restrictive policy that denies direct SELECT on the base table
CREATE POLICY "No direct read access to base table"
ON public.customer_reviews
FOR SELECT
USING (false);