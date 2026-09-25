export type Segment = {
  text: string
  /** Italic, muted-color emphasized words (per the Aethera hero spec) */
  accent?: boolean
}

export type ChapterDef = {
  id: string
  /** e.g. "01 / the still" */
  kicker?: string
  /** Local web-optimized clip (see VIDEO_PICKS.md for the original source URLs) */
  video: string
  poster: string
  tone: 'light' | 'dark'
  align: 'left' | 'right'
  /** Headline lines; accent segments render italic + muted */
  lines: Segment[][]
  paragraph: string
  stat?: { value: string; label: string }
  cta?: boolean
}

/**
 * One coherent story, told across eight looping videos:
 * silence -> still -> flow -> bloom -> light -> ascent -> eternal -> begin.
 * The arc goes bright and quiet -> lush and alive -> golden -> vast ->
 * night sky -> back to white: energy -> craft -> calm -> eternity.
 */
export const CHAPTERS: ChapterDef[] = [
  {
    id: 'still',
    kicker: '01 / the still',
    video: './videos/02-still.mp4',
    poster: './posters/02-still.jpg',
    tone: 'light',
    align: 'left',
    lines: [
      [{ text: 'Where the ' }, { text: 'noise', accent: true }, { text: ' ends,' }],
      [{ text: 'we ' }, { text: 'begin.', accent: true }],
    ],
    paragraph:
      'Aethera is a studio for the quiet hours. We build digital havens where attention can breathe and work can go deep.',
    stat: { value: '04h', label: 'deep-work sessions we design for' },
  },
  {
    id: 'flow',
    kicker: '02 / the flow',
    video: './videos/03-flow.mp4',
    poster: './posters/03-flow.jpg',
    tone: 'light',
    align: 'right',
    lines: [
      [{ text: 'Pure ' }, { text: 'flows,', accent: true }],
      [{ text: 'unhurried.', accent: true }],
    ],
    paragraph:
      'Like water finding its course through stone, we shape platforms that move without friction — clear, continuous, calm.',
    stat: { value: '0', label: 'friction points shipped, ever' },
  },
  {
    id: 'bloom',
    kicker: '03 / the bloom',
    video: './videos/04-bloom.mp4',
    poster: './posters/04-bloom.jpg',
    tone: 'light',
    align: 'left',
    lines: [
      [{ text: 'For brilliant ' }, { text: 'minds,', accent: true }],
      [{ text: 'thoughtful ' }, { text: 'souls.', accent: true }],
    ],
    paragraph:
      'Every interface is planted with intention. We tend the details quietly, so your ideas have room to blossom.',
    stat: { value: '120+', label: 'platforms grown from quiet beginnings' },
  },
  {
    id: 'light',
    kicker: '04 / the light',
    video: './videos/05-light.mp4',
    poster: './posters/05-light.jpg',
    tone: 'light',
    align: 'right',
    lines: [
      [{ text: 'We build in' }],
      [{ text: 'the warm ' }, { text: 'hours.', accent: true }],
    ],
    paragraph:
      'Craft cannot be rushed. We work at the speed of care, letting every decision settle in good light.',
    stat: { value: '10y', label: 'of patient, deliberate craft' },
  },
  {
    id: 'ascent',
    kicker: '05 / the ascent',
    video: './videos/06-ascent.mp4',
    poster: './posters/06-ascent.jpg',
    tone: 'light',
    align: 'left',
    lines: [
      [{ text: 'Fearless ' }, { text: 'makers', accent: true }],
      [{ text: 'climb ' }, { text: 'further.', accent: true }],
    ],
    paragraph:
      'From quiet valleys to open ridgelines, we scale what matters — without ever losing the calm we started with.',
    stat: { value: '40+', label: 'teams carried to calmer summits' },
  },
  {
    id: 'eternal',
    kicker: '06 / the eternal',
    video: './videos/07-eternal.mp4',
    poster: './posters/07-eternal.jpg',
    tone: 'dark',
    align: 'right',
    lines: [
      [{ text: 'What is built in ' }, { text: 'silence,', accent: true }],
      [{ text: 'endures.', accent: true }],
    ],
    paragraph:
      'Under the same sky, night after night, the work keeps watch — quietly, patiently, eternally.',
    stat: { value: '24/7', label: 'quietly keeping watch' },
  },
  {
    id: 'begin',
    kicker: '07 / begin',
    video: './videos/08-begin.mp4',
    poster: './posters/08-begin.jpg',
    tone: 'light',
    align: 'left',
    lines: [
      [{ text: 'Your ' }, { text: 'haven', accent: true }],
      [{ text: 'is ' }, { text: 'waiting.', accent: true }],
    ],
    paragraph:
      'Building platforms for brilliant minds, fearless makers, and thoughtful souls. Through the noise, we craft digital havens for deep work and pure flows.',
    cta: true,
  },
]

export const HERO = {
  id: 'silence',
  video: './videos/01-silence.mp4',
  poster: './posters/01-silence.jpg',
  /** Original CloudFront source of the reference clip (see VIDEO_PICKS.md) */
  sourceUrl:
    'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_083109_283f3553-e28f-428b-a723-d639c617eb2b.mp4',
}

export const ALL_IDS = ['silence', ...CHAPTERS.map((c) => c.id)]
