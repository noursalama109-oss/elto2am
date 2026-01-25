import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  vehicle_type: string | null;
  created_at: string;
}

interface SubmitReviewData {
  name: string;
  comment: string;
  rating: number;
  publishName: boolean;
}

export const useCustomerReviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const fetchReviews = async () => {
    try {
      const { data, error } = await supabase
        .from('customer_reviews_public')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setReviews(data?.map(r => ({
        id: r.id || '',
        name: r.name || '',
        rating: r.rating || 0,
        comment: r.comment || '',
        vehicle_type: r.vehicle_type,
        created_at: r.created_at || ''
      })) || []);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const submitReview = async (data: SubmitReviewData): Promise<boolean> => {
    if (!data.name.trim() || !data.comment.trim() || data.rating === 0) {
      toast({
        title: "برجاء ملء جميع الحقول",
        description: "الاسم والتعليق والتقييم مطلوبين",
        variant: "destructive"
      });
      return false;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('customer_reviews')
        .insert({
          name: data.name.trim(),
          comment: data.comment.trim(),
          rating: data.rating,
          location: 'غير محدد', // Required field but not displayed
          vehicle_type: '',
          publish_name: data.publishName
        });

      if (error) throw error;

      toast({
        title: "شكراً لك! ✨",
        description: "تم إضافة تقييمك بنجاح"
      });

      // Refresh reviews to show the new one
      await fetchReviews();
      return true;
    } catch (error) {
      console.error('Error submitting review:', error);
      toast({
        title: "حدث خطأ",
        description: "لم نتمكن من إضافة تقييمك، حاول مرة أخرى",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return {
    reviews,
    isLoading,
    isSubmitting,
    submitReview,
    refetch: fetchReviews
  };
};
