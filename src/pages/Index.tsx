import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/home/HeroSection';
import DiscountedProducts from '@/components/home/DiscountedProducts';
import ProductsPreview from '@/components/home/ProductsPreview';
import BulkOrderSection from '@/components/home/BulkOrderSection';
import CustomerVideos from '@/components/home/CustomerVideos';
import CustomerReviews from '@/components/home/CustomerReviews';
import ComplaintsSection from '@/components/home/ComplaintsSection';


const Index = () => {
  return (
    <Layout hideHeaderPadding>
      <HeroSection />
      <BulkOrderSection />
      <DiscountedProducts />
      <ProductsPreview />
      <section id="customer-videos">
        <CustomerVideos />
      </section>
      <section id="customer-reviews">
        <CustomerReviews />
      </section>
      <section id="complaints">
        <ComplaintsSection />
      </section>
    </Layout>
  );
};

export default Index;
