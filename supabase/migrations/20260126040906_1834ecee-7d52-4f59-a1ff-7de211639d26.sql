-- Drop the existing view
DROP VIEW IF EXISTS public.customer_reviews_public;

-- Recreate the view WITHOUT security_invoker so it can bypass base table RLS
CREATE VIEW public.customer_reviews_public AS
SELECT 
    id,
    rating,
    comment,
    vehicle_type,
    created_at
FROM public.customer_reviews;

-- Grant access to the view for anon and authenticated users
GRANT SELECT ON public.customer_reviews_public TO anon;
GRANT SELECT ON public.customer_reviews_public TO authenticated;