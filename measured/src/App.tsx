import { Navbar } from './components/Navbar';
import { SurfaceSection } from './components/SurfaceSection';
import { SURFACES } from './data/surfaces';

export default function App() {
  return (
    <div className="bg-black font-sans text-white">
      <Navbar />
      <main>
        {SURFACES.map((cfg) => (
          <SurfaceSection key={cfg.id} cfg={cfg} />
        ))}
      </main>
    </div>
  );
}
