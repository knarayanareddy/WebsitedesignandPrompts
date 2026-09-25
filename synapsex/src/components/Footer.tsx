import SynapseXLogo from './SynapseXLogo';

const FOOTER_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_080203_fd7f4f85-3a86-4837-8192-85e7bfe68e75.mp4';

export default function Footer() {
  return (
    <footer id="footer" className="relative grid min-h-[70dvh] grid-cols-1 bg-black md:grid-cols-2">
      {/* Left: video filling half width */}
      <div className="relative min-h-[45dvh] overflow-hidden md:min-h-full">
        <video
          src={FOOTER_VIDEO}
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          tabIndex={-1}
        />
      </div>

      {/* Right: logo, mission, copyright */}
      <div className="flex flex-col justify-between border-l border-white/10 p-10 md:p-16">
        <div>
          <div className="flex items-center gap-4">
            <SynapseXLogo className="h-12 w-12 text-white" />
            <span className="text-xl font-bold tracking-wider">SynapseX</span>
          </div>

          <p className="mt-10 max-w-md text-base leading-relaxed text-white/70 md:text-lg">
            We are building the interface layer between biology and machines —
            one network for brain and body, available to everyone who moves,
            builds, and thinks.
          </p>
        </div>

        <div className="mt-16 text-xs tracking-wider text-white/40">(c) 2026 SynapseX Labs</div>
      </div>
    </footer>
  );
}
