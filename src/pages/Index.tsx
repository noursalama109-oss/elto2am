import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/home/HeroSection';
import DiscountedProducts from '@/components/home/DiscountedProducts';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import PaymentMethods from '@/components/home/PaymentMethods';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <DiscountedProducts />
      <FeaturedProducts />
      <PaymentMethods />
    </Layout>
  );
};

export default Index;
