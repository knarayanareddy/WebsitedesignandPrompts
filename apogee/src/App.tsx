import Hero from '@/components/Hero';
import Logos from '@/components/Logos';
import Metrics from '@/components/Metrics';
import Features from '@/components/Features';
import Console from '@/components/Console';
import Quote from '@/components/Quote';
import CallToAction from '@/components/CallToAction';
import SiteFooter from '@/components/SiteFooter';

function App() {
  return (
    <div className="min-h-screen bg-[#080A19]">
      <Hero />
      <Logos />
      <Metrics />
      <Features />
      <Console />
      <Quote />
      <CallToAction />
      <SiteFooter />
    </div>
  );
}

export default App;
