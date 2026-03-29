import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import StatsBar from '@/components/StatsBar';
import ProductsSection from '@/components/ProductsSection';
import PlanosSection from '@/components/PlanosSection';
import CtaSection from '@/components/CtaSection';
import Footer from '@/components/Footer';
import ParticlesBackground from '@/components/ParticlesBackground';

const Index = () => (
  <div className="min-h-screen bg-background selection:bg-primary selection:text-primary-foreground relative">
    <ParticlesBackground />
    <div className="relative z-10">
      <Navbar />
      <Hero />
      <StatsBar />
      <ProductsSection />
       <PlanosSection />
      <CtaSection />
      <Footer />
    </div>
  </div>
);

export default Index;
