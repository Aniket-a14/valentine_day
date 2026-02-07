# 💝 Valentine's Day Immersive Experience

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

An ultra-premium, interactive web application designed as a deeply personal digital gift. This experience combines minimalist aesthetics with immersive haptics and audio to create a truly memorable romantic gesture.

---

## 🌟 Premium Experience

This is not a template; it's a high-fidelity digital haptic experience.

*   **🎟️ Interactive Love Coupons**: A digital booklet of redeemable "tickets" (Dinner Date, Massage, etc.) featuring a unique **Tear-Off Animation** and randomized paper rip sounds.
*   **🔊 Polyphonic Audio Engine**: A custom-built sound system that supports overlapping audio effects. Features snappy pops, celebratory chimes, and tactile feedback that makes the digital interface feel physical.
*   **✍️ Handwritten Letter**: A secret, typewriter-style love letter that reveals itself character-by-character, accompanied by a **Looped Pen-on-Paper Writing Sound** for authentic intimacy.
*   **🖱️ Cursor Heart Trail**: A graceful, floating heart trail that follows every movement, adding a layer of magical interaction.

## ✨ Core Features

*   **The Big Question**: A playful interaction where the "No" button shrinks and retreats, ensuring a eventual, celebratory "Yes."
*   **Curated Soundtrack**: A horizontally scrollable music player with smooth YouTube integration, allowing you to set the perfect mood.
*   **Resonant Reasons**: An elegant card deck cycling through "Why you're special," designed with clean typography and soft transitions.
*   **Mobile-Optimized**: A full responsive overhaul ensures the experience is just as beautiful on an iPhone or Android as it is on a desktop.

## 🛠️ Performance & Optimization

*   **Low-Latency Triggers**: The "Yes" click logic is staggered to prioritize audio threads, ensuring zero-delay confirmation sounds.
*   **Polyphonic Playback**: Uses `cloneNode()` logic in the `useSound` hook to allow rapid, overlapping sound effects without clipping.
*   **Strict Duration Control**: Critical action sounds (like coupon tearing) are programmatically capped at 800ms to maintain a snappy, high-end feel.
*   **Data-Driven**: 100% of the content is externalized into a single JSON file for effortless white-labeling.

---

## 🚀 Getting Started

### 1. Installation
```bash
npm install
# or
yarn install
```

### 2. Development
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view your creation.

---

## 📝 The Customization Engine (`app/content.json`)

All magic happens in `app/content.json`. You can completely re-brand the app in minutes without writing a single line of React.

### 🎥 Music & Soundtrack
Modify the `songs` array. Use the YouTube Video ID (the string after `v=`).
```json
{
  "id": "ZX6XN8Ud2vU",
  "title": "Jeena Laga Hoon",
  "quote": "I'm falling for you, every single day."
}
```

### 🎟️ Love Coupons
Add or remove gifts from the `coupons` array.
```json
{
  "title": "Wish Card",
  "description": "One wish granted. Terms apply ;)",
  "color": "bg-pink-500"
}
```

### 🔊 Audio Customization
Replace URLs in the `audio` object to use custom MP3s.
```json
"audio": {
    "click": "https://assets.mixkit.co/...",
    "type": "/my-custom-sound.mp3",
    "tear": ["/rip-1.mp3", "/rip-2.mp3"]
}
```

---

## 💖 Technical Pedigree

Built with **Next.js 15**, **React 19**, and **Tailwind CSS**. 
Featuring animations by **Framer Motion** (via CSS transitions) and **Canvas Confetti**.

*Designed for maximum impact with minimum effort.* 🌹
