-- 1. Add explicit UPDATE policy (deny all - reviews are immutable)
CREATE POLICY "No updates allowed"
ON customer_reviews
FOR UPDATE
USING (false)
WITH CHECK (false);

-- 2. Add explicit DELETE policy (deny all - maintain audit trail)
CREATE POLICY "No deletes allowed" 
ON customer_reviews
FOR DELETE
USING (false);

-- 3. Add spam prevention trigger (one review per name per 24 hours)
CREATE OR REPLACE FUNCTION prevent_review_spam()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM customer_reviews
    WHERE LOWER(TRIM(name)) = LOWER(TRIM(NEW.name))
    AND created_at > NOW() - INTERVAL '24 hours'
  ) THEN
    RAISE EXCEPTION 'يمكنك إضافة تقييم واحد فقط كل 24 ساعة';
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER review_spam_prevention
BEFORE INSERT ON customer_reviews
FOR EACH ROW
EXECUTE FUNCTION prevent_review_spam();

-- 4. Add publish_name consent column
ALTER TABLE customer_reviews ADD COLUMN publish_name BOOLEAN DEFAULT false;

-- 5. Recreate view to respect consent (show anonymized name if no consent)
DROP VIEW IF EXISTS customer_reviews_public;

CREATE VIEW customer_reviews_public
WITH (security_invoker=on) AS
SELECT 
  id,
  CASE WHEN publish_name = true THEN name ELSE CONCAT(LEFT(name, 1), '***') END AS name,
  rating,
  comment,
  vehicle_type,
  created_at
FROM customer_reviews;