# For Thel Thel Lay — Your 22nd Chapter

A personal birthday experience for **Su Lai Yadanar**, from **Zwe Shin Thant Htun**. React, Vite, Tailwind CSS, Framer Motion, and Lucide React.

## Run

Requires Node.js 20.19+ or 22.12+ and npm.

```sh
npm install
npm run dev
```

```sh
npm run build
npm run preview
```

Deploy the generated `dist` folder to a static host. No backend or environment variables are required. The lockfile uses the WebAssembly implementation of esbuild to support restricted Windows environments; it adds no browser runtime weight.

## Personal details

Edit `src/data/siteConfig.js` for names, nickname, birthday, relationship date, song title, and messages.

- Birthday: November 5, 2004; celebration: November 5, 2026.
- First meeting: October 2, 2025.
- The live counter starts at midnight in Yangon (UTC+06:30), explicitly configured in the start timestamp.
- The number of calendar days from the first meeting to the birthday is calculated in code, not hard-coded.
- Before November 5, 2026 at 12:00 AM Yangon time, visitors see a live days/hours/minutes/seconds countdown. At midnight it changes automatically to an anniversary-date unlock screen. The correct date is configured separately in `siteConfig.js`.
- A temporary preview button opens the birthday page directly for testing. It disappears automatically on November 4, 2026 at 12:00 AM Yangon time and does not permanently unlock the countdown.

## Add your photos

All 12 supplied Ngwe Saung photographs are included unchanged. The animated beach album displays every photo, and six selected highlights appear in the main memories gallery. Tap any beach photograph to view it fully, swipe left/right on phones, or use arrow keys and Escape.

- `ngwesaung1.jpg` through `ngwesaung12.jpg` — all 12 real beach-trip photographs.
- `her1.jpg`, `her2.jpg`, `her3.jpg` — optional placeholder slots for additional portraits.
- `us1.jpg`, `us2.jpg`, `us3.jpg` — optional placeholder slots for additional memories. The current gallery uses real beach photographs instead.

Edit captions and paths in `src/data/memories.js`. Missing photos have a styled fallback. The gallery supports a lightbox, arrow keys, and Escape. The roses image is original AI-generated decorative artwork, not a personal photograph.

## Music

Add a permitted copy of **Anyone** at `public/music/our-song.mp3`, or change the path in `siteConfig.js`. No song file is bundled. Music starts only after the opening button, fades in, and has pause and volume controls. The site remains usable without audio.

## Experience

The revised first half includes a chocolate-toned intro, a cinematic introduction, personal birthday hero, birthday-date dedication, the October 2 beginning, a live relationship counter, a Ngwe Saung Polaroid memory and reveal, and the personal photo gallery.

The original 22 reasons, letter, love-heart interaction, candle wish, secret gift, and ending are retained, with the supplied personal names. The design includes staggered word reveals, a gently tilting hero, floating Polaroids, 3D reason cards, an unfolding letter, a reading-progress line, and heart bursts from the touched control. Reduced-motion users receive static alternatives.

## Accessibility and performance

Keyboard controls, native modal focus containment and return, reduced-motion alternatives, a skip control for the cinematic opening, bounded particles, lazy photos, and mobile layouts. Reduced-motion users advance the opening story manually. The live timer does not announce every second to screen readers.

No analytics or stored personal data. Fonts use Google Fonts with system fallbacks when offline.

Sites hosting starts private to the owner. Change the audience before sending a hosted link to someone else. The downloadable source archive omits the account-specific Sites manifest.

