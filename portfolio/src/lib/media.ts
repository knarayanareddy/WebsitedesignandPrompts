/**
 * Shared third-party media used by the hero, footer and preloader.
 *
 * Neither asset is part of this repository (see ../../ASSETS.md):
 *  - VIDEO_SRC is a public Mux HLS playback ID whose ownership is undocumented.
 *    Replace it with your own stream (Mux, Cloudflare Stream, or a self-hosted
 *    .m3u8/.mp4) before shipping this template.
 *  - POSTER_SRC is an Unsplash photo served through their CDN (Unsplash License).
 * Everything degrades to the poster if the stream cannot be attached or played.
 */
export const VIDEO_SRC =
  'https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8';

export const POSTER_SRC =
  'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1920&auto=format&fit=crop';
