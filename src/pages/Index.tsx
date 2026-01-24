import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/home/HeroSection';
import DiscountedProducts from '@/components/home/DiscountedProducts';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import CustomerReviews from '@/components/home/CustomerReviews';
import ComplaintsSection from '@/components/home/ComplaintsSection';
import PaymentMethods from '@/components/home/PaymentMethods';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <DiscountedProducts />
      <FeaturedProducts />
      <CustomerReviews />
      <ComplaintsSection />
      <PaymentMethods />
    </Layout>
  );
};

export default Index;
