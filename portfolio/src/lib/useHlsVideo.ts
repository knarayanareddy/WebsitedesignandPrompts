import { useEffect, useRef, type RefObject } from 'react';
import Hls from 'hls.js';
import { prefersReducedMotion } from './motion';

interface HlsVideoOptions {
  /** Attach and start the stream immediately instead of when the element nears the viewport. */
  readonly eager?: boolean;
}

const NATIVE_HLS_MIME = 'application/vnd.apple.mpegurl';
const NEAR_VIEWPORT_MARGIN = '200px';

/**
 * Attaches an HLS (.m3u8) source to a <video> element — lazily.
 *
 *  - The stream is only attached once the element is within 200px of the
 *    viewport (or immediately with `eager`), so two sections sharing the same
 *    playback ID no longer download it twice on page load.
 *  - Playback is paused whenever the element leaves the viewport.
 *  - Native HLS (Safari / iOS) is preferred over hls.js when available.
 *  - Under `prefers-reduced-motion` the stream is never attached; the poster
 *    frame stays in place.
 *  - Fatal hls.js errors tear the instance down and leave the poster visible.
 */
export function useHlsVideo(
  source: string,
  { eager = false }: HlsVideoOptions = {},
): RefObject<HTMLVideoElement> {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video: HTMLVideoElement | null = videoRef.current;
    if (!video || prefersReducedMotion()) return;

    let hls: Hls | null = null;
    let attached = false;
    let failed = false;

    const attach = (): void => {
      if (attached || failed) return;
      attached = true;

      if (video.canPlayType(NATIVE_HLS_MIME)) {
        video.src = source;
        return;
      }

      if (Hls.isSupported()) {
        hls = new Hls({ enableWorker: true });
        hls.on(Hls.Events.ERROR, (_event, data) => {
          if (!data.fatal) return;
          failed = true;
          hls?.destroy();
          hls = null;
        });
        hls.loadSource(source);
        hls.attachMedia(video);
        return;
      }

      // No MSE and no native HLS: nothing to play, the poster stays.
      failed = true;
    };

    const play = (): void => {
      attach();
      if (failed) return;
      video.muted = true;
      video.play().catch(() => {
        /* Autoplay can be blocked until the first user gesture; poster remains. */
      });
    };

    if (eager || typeof IntersectionObserver === 'undefined') {
      play();
    }

    const observer: IntersectionObserver | null =
      typeof IntersectionObserver === 'undefined'
        ? null
        : new IntersectionObserver(
            ([entry]) => {
              if (entry.isIntersecting) play();
              else if (attached) video.pause();
            },
            { rootMargin: NEAR_VIEWPORT_MARGIN, threshold: 0 },
          );
    observer?.observe(video);

    return () => {
      observer?.disconnect();
      video.pause();
      if (hls) {
        hls.destroy();
        hls = null;
      } else if (attached) {
        video.removeAttribute('src');
        video.load();
      }
    };
  }, [source, eager]);

  return videoRef;
}
