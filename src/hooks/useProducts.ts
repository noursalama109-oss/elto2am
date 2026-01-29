import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Product, ProductSection, ProductSubSection } from '@/types/product';

interface SupabaseProduct {
  id: string;
  name: string;
  price: number;
  original_price: number | null;
  image: string;
  section: string;
  sub_section: string;
  description: string | null;
  in_stock: boolean;
}

const mapSupabaseProduct = (p: SupabaseProduct): Product => ({
  id: p.id,
  name: p.name,
  price: p.price,
  originalPrice: p.original_price ?? undefined,
  image: p.image,
  section: p.section as ProductSection,
  subSection: p.sub_section as ProductSubSection,
  description: p.description ?? undefined,
  inStock: p.in_stock,
});

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: async (): Promise<Product[]> => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching products:', error);
        throw error;
      }

      return (data as SupabaseProduct[]).map(mapSupabaseProduct);
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useProductsBySection = (section: ProductSection) => {
  return useQuery({
    queryKey: ['products', 'section', section],
    queryFn: async (): Promise<Product[]> => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('section', section)
        .gt('price', 0)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching products by section:', error);
        throw error;
      }

      return (data as SupabaseProduct[]).map(mapSupabaseProduct);
    },
    staleTime: 1000 * 60 * 5,
  });
};

export const useProductsBySubSection = (section: ProductSection, subSection: ProductSubSection) => {
  return useQuery({
    queryKey: ['products', 'section', section, 'subSection', subSection],
    queryFn: async (): Promise<Product[]> => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('section', section)
        .eq('sub_section', subSection)
        .gt('price', 0)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching products by subsection:', error);
        throw error;
      }

      return (data as SupabaseProduct[]).map(mapSupabaseProduct);
    },
    staleTime: 1000 * 60 * 5,
  });
};

export const useDiscountedProducts = () => {
  return useQuery({
    queryKey: ['products', 'discounted'],
    queryFn: async (): Promise<Product[]> => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .not('original_price', 'is', null)
        .gt('price', 0)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching discounted products:', error);
        throw error;
      }

      // Filter where original_price > price
      return (data as SupabaseProduct[])
        .filter(p => p.original_price && p.original_price > p.price)
        .map(mapSupabaseProduct);
    },
    staleTime: 1000 * 60 * 5,
  });
};

export const useSearchProducts = (searchQuery: string) => {
  return useQuery({
    queryKey: ['products', 'search', searchQuery],
    queryFn: async (): Promise<Product[]> => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .gt('price', 0)
        .or(`name.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error searching products:', error);
        throw error;
      }

      return (data as SupabaseProduct[]).map(mapSupabaseProduct);
    },
    enabled: !!searchQuery,
    staleTime: 1000 * 60 * 5,
  });
};
