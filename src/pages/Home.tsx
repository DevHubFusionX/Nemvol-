import Hero from '../components/Hero';
import StatsSection from '../components/Stats';
import CardsSection from '../components/Cards';
import HubSection from '../components/Hub';
import FeaturesSection from '../components/Features';
import TestimonialsSection from '../components/Testimonials';
import PricingSection from '../components/Pricing';
import CTASection from '../components/CTA';
import BlogSection from '../components/Blog';

export default function Home() {
  return (
    <div>
      <Hero />
      <StatsSection />
      <CardsSection />
      <FeaturesSection />
      <HubSection />
      <TestimonialsSection />
      <PricingSection />
      <CTASection />
      <BlogSection />


    </div>
  );
}
