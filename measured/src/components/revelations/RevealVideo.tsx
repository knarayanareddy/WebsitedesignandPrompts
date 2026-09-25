import { memo, useEffect, useRef, useState } from 'react';

/** Animated stand-in used while the video is loading or if it fails to load. */
function VideoFallback() {
  return (
    <div
      className="absolute inset-0"
      style={{
        background:
          'radial-gradient(85% 65% at 50% 58%, #0d1210 0%, #050505 62%, #000 100%)',
      }}
    >
      <div className="absolute left-1/2 top-1/2 h-[36vmin] w-[36vmin] -translate-x-1/2 -translate-y-1/2">
        <div className="absolute inset-0 rounded-full border border-white/10" />
        <div
          className="absolute rounded-full border border-emerald-400/20"
          style={{ inset: '8%' }}
        />
        <div className="absolute inset-0 overflow-hidden rounded-full">
          <div
            className="absolute"
            style={{
              inset: '-40%',
              background:
                'conic-gradient(from 0deg, transparent 0deg, rgba(16,185,129,0.22) 40deg, transparent 95deg, transparent 200deg, rgba(255,255,255,0.07) 255deg, transparent 310deg)',
              animation: 'kf-spin 9s linear infinite',
              animationPlayState: 'var(--play, running)',
            }}
          />
        </div>
        <div className="a-pulse absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400" />
      </div>
    </div>
  );
}

export const RevealVideo = memo(function RevealVideo({
  src,
  active,
}: {
  src?: string;
  active: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [failed, setFailed] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || failed || !src) return;
    if (active) v.play().catch(() => {});
    else v.pause();
  }, [active, failed, src]);

  if (!src || failed) return <VideoFallback />;

  return (
    <div className="absolute inset-0">
      <video
        ref={videoRef}
        src={src}
        muted
        loop
        playsInline
        autoPlay
        preload="auto"
        aria-hidden
        onPlaying={() => setPlaying(true)}
        onError={() => setFailed(true)}
        className="h-full w-full object-cover"
      />
      {!playing && <div aria-hidden className="absolute inset-0 bg-black" />}
    </div>
  );
});
