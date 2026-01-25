import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Review {
  id: string;
  name: string;
  location: string;
  rating: number;
  comment: string;
  vehicle_type: string;
  created_at: string;
}

export const useCustomerReviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchReviews = async () => {
    try {
      const { data, error } = await supabase
        .from('customer_reviews')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReviews(data || []);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء تحميل التقييمات",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addReview = async (review: {
    name: string;
    location: string;
    rating: number;
    comment: string;
  }) => {
    try {
      const { data, error } = await supabase
        .from('customer_reviews')
        .insert({
          name: review.name.trim(),
          location: review.location.trim(),
          rating: review.rating,
          comment: review.comment.trim(),
          vehicle_type: ''
        })
        .select()
        .single();

      if (error) throw error;

      setReviews(prev => [data, ...prev]);
      
      toast({
        title: "شكراً لك! ✨",
        description: "تم إضافة تقييمك بنجاح"
      });

      return true;
    } catch (error) {
      console.error('Error adding review:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء إرسال التقييم",
        variant: "destructive"
      });
      return false;
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return {
    reviews,
    isLoading,
    addReview,
    refetch: fetchReviews
  };
};
