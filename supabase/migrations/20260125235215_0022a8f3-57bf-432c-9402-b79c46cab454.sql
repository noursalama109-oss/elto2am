-- Update view to exclude name completely
DROP VIEW IF EXISTS customer_reviews_public;

CREATE VIEW customer_reviews_public
WITH (security_invoker=on) AS
SELECT 
  id,
  rating,
  comment,
  vehicle_type,
  created_at
FROM customer_reviews;

-- Drop the spam prevention trigger since we're not tracking by name anymore
DROP TRIGGER IF EXISTS review_spam_prevention ON customer_reviews;
DROP FUNCTION IF EXISTS prevent_review_spam();