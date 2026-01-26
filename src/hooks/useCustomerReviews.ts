import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Reply {
  id: string;
  reply_text: string;
  created_at: string;
}

interface Review {
  id: string;
  rating: number;
  comment: string;
  vehicle_type: string | null;
  created_at: string;
  replies: Reply[];
}

interface SubmitReviewData {
  comment: string;
  rating: number;
}

export const useCustomerReviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmittingReply, setIsSubmittingReply] = useState(false);
  const { toast } = useToast();

  const fetchReviews = async () => {
    try {
      // Fetch reviews
      const { data: reviewsData, error: reviewsError } = await supabase
        .from('customer_reviews_public')
        .select('*')
        .order('created_at', { ascending: false });

      if (reviewsError) throw reviewsError;

      // Fetch all replies
      const { data: repliesData, error: repliesError } = await supabase
        .from('review_replies')
        .select('*')
        .order('created_at', { ascending: true });

      if (repliesError) throw repliesError;

      // Map replies to their reviews
      const reviewsWithReplies = (reviewsData || []).map(r => ({
        id: r.id || '',
        rating: r.rating || 0,
        comment: r.comment || '',
        vehicle_type: r.vehicle_type,
        created_at: r.created_at || '',
        replies: (repliesData || [])
          .filter(reply => reply.review_id === r.id)
          .map(reply => ({
            id: reply.id,
            reply_text: reply.reply_text,
            created_at: reply.created_at
          }))
      }));

      setReviews(reviewsWithReplies);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const submitReview = async (data: SubmitReviewData): Promise<boolean> => {
    if (!data.comment.trim() || data.rating === 0) {
      toast({
        title: "برجاء ملء جميع الحقول",
        description: "التعليق والتقييم مطلوبين",
        variant: "destructive"
      });
      return false;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('customer_reviews')
        .insert({
          name: 'عميل',
          comment: data.comment.trim(),
          rating: data.rating,
          location: 'غير محدد',
          vehicle_type: ''
        });

      if (error) throw error;

      toast({
        title: "شكراً لك! ✨",
        description: "تم إضافة تقييمك بنجاح"
      });

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

  const submitReply = async (reviewId: string, replyText: string): Promise<boolean> => {
    if (!replyText.trim()) {
      toast({
        title: "برجاء كتابة الرد",
        variant: "destructive"
      });
      return false;
    }

    setIsSubmittingReply(true);
    try {
      const { error } = await supabase
        .from('review_replies')
        .insert({
          review_id: reviewId,
          reply_text: replyText.trim()
        });

      if (error) throw error;

      toast({
        title: "تم إضافة الرد ✨",
      });

      await fetchReviews();
      return true;
    } catch (error) {
      console.error('Error submitting reply:', error);
      toast({
        title: "حدث خطأ",
        description: "لم نتمكن من إضافة الرد، حاول مرة أخرى",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsSubmittingReply(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return {
    reviews,
    isLoading,
    isSubmitting,
    isSubmittingReply,
    submitReview,
    submitReply,
    refetch: fetchReviews
  };
};
