import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { usePrefersReducedMotion } from '../lib/motion';

type Props = {
  src: string;
  className?: string;
  /** Optional still shown while loading, when the video fails, or under reduced motion. */
  poster?: string;
  /** Start downloading media before the first paint (use for the hero only). */
  eager?: boolean;
};

/**
 * Decorative, muted, looping background video that:
 *  - only plays while it is on screen (IntersectionObserver) — offscreen
 *    videos are paused so five clips never decode at once;
 *  - stays paused (poster / dark plate) when the user prefers reduced motion;
 *  - swaps to a neutral plate if the source fails to load, so a dead CDN link
 *    never leaves an empty black hole behind the copy.
 */
const BackgroundVideo = forwardRef<HTMLVideoElement, Props>(function BackgroundVideo(
  { src, className = '', poster, eager = false },
  ref,
) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);
  const reduced = usePrefersReducedMotion();

  useImperativeHandle(ref, () => videoRef.current as HTMLVideoElement, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || failed) return;

    if (reduced) {
      video.pause();
      return;
    }

    video.muted = true;
    const attemptPlay = () => {
      video.play().catch(() => {
        /* autoplay can be blocked until first user gesture; the poster stays. */
      });
    };

    if (typeof IntersectionObserver === 'undefined') {
      attemptPlay();
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) attemptPlay();
        else video.pause();
      },
      { threshold: 0.05 },
    );
    io.observe(video);
    return () => {
      io.disconnect();
      video.pause();
    };
  }, [reduced, failed]);

  if (failed) {
    return (
      <div
        className={`${className} bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.08),_#000_70%)]`}
        style={poster ? { backgroundImage: `url(${poster})`, backgroundSize: 'cover' } : undefined}
        aria-hidden="true"
      />
    );
  }

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      className={className}
      // autoPlay is intentionally omitted: playback is driven by the observer
      // above so offscreen and reduced-motion videos never start.
      muted
      loop
      playsInline
      preload={eager && !reduced ? 'auto' : 'metadata'}
      aria-hidden="true"
      tabIndex={-1}
      onError={() => setFailed(true)}
    />
  );
});

export default BackgroundVideo;
