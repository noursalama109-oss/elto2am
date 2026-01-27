-- Create products table
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  price NUMERIC NOT NULL DEFAULT 0,
  original_price NUMERIC,
  image TEXT NOT NULL DEFAULT '/placeholder.svg',
  category TEXT NOT NULL DEFAULT 'essentials',
  brand TEXT NOT NULL DEFAULT 'other',
  section TEXT NOT NULL,
  sub_section TEXT NOT NULL,
  description TEXT,
  in_stock BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (products should be viewable by everyone)
CREATE POLICY "Products are publicly viewable"
  ON public.products
  FOR SELECT
  USING (true);

-- Create policy to prevent public modifications
CREATE POLICY "No public insert"
  ON public.products
  FOR INSERT
  WITH CHECK (false);

CREATE POLICY "No public update"
  ON public.products
  FOR UPDATE
  USING (false);

CREATE POLICY "No public delete"
  ON public.products
  FOR DELETE
  USING (false);

-- Create index for common queries
CREATE INDEX idx_products_section ON public.products(section);
CREATE INDEX idx_products_sub_section ON public.products(sub_section);
CREATE INDEX idx_products_brand ON public.products(brand);
CREATE INDEX idx_products_in_stock ON public.products(in_stock);