import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Testimonials from '@/components/Testimonials';
import CallToAction from '@/components/CallToAction';
import Footer from '@/components/Footer';
import Pricing from '@/components/pricing';

const Home = () => {
  return (
    <main className='bg-black max-w-[1200px] mx-auto'>
      <Header />
      <Hero />
      <Features />
      <Testimonials />
      <Pricing />
      {/* <CallToAction /> */}
      <Footer />
    </main>
  );
}

export default Home;
