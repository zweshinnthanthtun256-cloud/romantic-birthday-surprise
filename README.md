# Your 22nd Chapter

A complete romantic birthday experience built with React, Vite, Tailwind CSS, Framer Motion, and Lucide React.

## Run locally

Requires Node.js 20.19+ or 22.12+ and npm.

```sh
npm install
npm run dev
```

Create production files with `npm run build`. Preview with `npm run preview`. Deploy `dist` to a static host. No backend or environment variables are required.

## Make it yours

1. Edit `src/data/siteConfig.js`: her name, your name, birthday, relationship date, letter, music path, hero message, and ending. This experience is written for a 22nd birthday. Changing age also requires revising the ordinal copy and 22 reasons.
2. Edit `src/data/memories.js`: timeline dates, descriptions, image paths, and photo captions. Add objects to extend the story or gallery.
3. Edit `src/data/reasons.js`: exactly 22 reveal cards are included.
4. Replace `public/images/memory1.jpg` through `memory6.jpg` with personal photographs. The included files are abstract color placeholders. Missing images display an elegant fallback. Cards crop with `object-fit: cover`; the lightbox displays the complete photo.
5. Add a permitted music file at `public/music/our-song.mp3`. No audio file is included. Music starts only after the opening button, fades in, and has pause and volume controls. Missing audio leaves the site usable in silence.

The roses image is original AI-generated decorative artwork. Names, dates, and memories are editable placeholders. Personalize before sharing.

## Included interactions

Opening reveal, animated year/month counters, story timeline, six-image lightbox (arrow keys and Escape), 22 reveal cards, unfolding love letter, growing love heart, 22-candle wish with confetti, secret gift reveal, cinematic ending with skip/replay, active section navigation, and optional music. Candle blowing uses a button; microphone permission is never requested.

## Accessibility and performance

Semantic controls, keyboard focus styles, native dialog focus containment and focus return, reduced-motion support, bounded particles, lazy gallery images, responsive layout, and missing-media fallbacks. No analytics or stored personal data. Google Fonts have readable system fallbacks when offline.

## Publishing

The Sites manifest is `.openai/hosting.json`. Sites deployments start private to the owner. Change the site's audience before sending its link to another person. The `dist` folder also works on other static hosting services.
