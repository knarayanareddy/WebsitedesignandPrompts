import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CinematicText from './components/CinematicText';
import Metrics from './components/Metrics';
import Technology from './components/Technology';
import Architecture from './components/Architecture';
import Footer from './components/Footer';

export default function App() {
  return (
    <div id="top" className="bg-black text-white antialiased">
      <Navbar />
      <main>
        <Hero />
        <CinematicText />
        <Metrics />
        <Technology />
        <Architecture />
      </main>
      <Footer />
    </div>
  );
}
