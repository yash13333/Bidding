import HeroSection from '@/components/home/hero-section';
import CategoriesSection from '@/components/home/categories-section';
import FeaturedProductsSection from '@/components/home/featured-products-section';
import HowItWorksSection from '@/components/home/how-it-works-section';

export default function Home() {
  return (
    <>
      <HeroSection />
      {/* The following sections are not visible in the screenshot but are kept for content completeness */}
      {/* <CategoriesSection />
      <FeaturedProductsSection />
      <HowItWorksSection /> */}
    </>
  );
}
