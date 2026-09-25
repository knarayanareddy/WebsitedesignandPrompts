import { useEffect, useRef, type RefObject } from 'react';
import Hls from 'hls.js';

/**
 * Attaches an HLS (.m3u8) source to a <video> element.
 * Uses hls.js when MSE is supported, otherwise falls back to the
 * browser's native HLS playback via `video.src`.
 */
export function useHlsVideo(source: string): RefObject<HTMLVideoElement> {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video: HTMLVideoElement | null = videoRef.current;
    if (!video) return;

    let hls: Hls | null = null;

    if (Hls.isSupported()) {
      hls = new Hls();
      hls.loadSource(source);
      hls.attachMedia(video);
    } else {
      video.src = source;
    }

    return () => {
      if (hls) {
        hls.destroy();
        hls = null;
      }
    };
  }, [source]);

  return videoRef;
}
