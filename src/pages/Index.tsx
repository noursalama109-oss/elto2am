import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/home/HeroSection';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import PaymentMethods from '@/components/home/PaymentMethods';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <FeaturedProducts />
      <PaymentMethods />
    </Layout>
  );
};

export default Index;
