import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/home/HeroSection';
import DiscountedProducts from '@/components/home/DiscountedProducts';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import CustomerVideos from '@/components/home/CustomerVideos';
import CustomerReviews from '@/components/home/CustomerReviews';
import ComplaintsSection from '@/components/home/ComplaintsSection';
import PaymentMethods from '@/components/home/PaymentMethods';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <DiscountedProducts />
      <FeaturedProducts />
      <section id="customer-videos">
        <CustomerVideos />
      </section>
      <section id="customer-reviews">
        <CustomerReviews />
      </section>
      <section id="complaints">
        <ComplaintsSection />
      </section>
      <section id="payment-methods">
        <PaymentMethods />
      </section>
    </Layout>
  );
};

export default Index;
