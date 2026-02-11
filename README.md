# 💝 Valentine's Day Immersive Experience

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

An ultra-premium, interactive web application designed as a deeply personal digital gift. This experience combines minimalist aesthetics with immersive haptics and audio to create a truly memorable romantic gesture.

---

## 🌟 Premium Experience

This is not a template; it's a high-fidelity digital haptic experience.

*   **🎀 Cinema Studio Ribbon**: An organic, physics-based 3D weaving ribbon that flows through the content. Featuring **Adaptive Sampling** for mobile and **Matte-Satin Physical Modeling** for a premium silk-like appearance.
*   **🔘 Ribbon visibility Toggle**: A minimal, floating control (bottom-left) that allows users to show or hide the ribbon at any time, with persistent state saved locally.
*   **🎟️ Interactive Love Coupons**: A digital booklet of redeemable "tickets" (Dinner Date, Massage, etc.) featuring a unique **Tear-Off Animation** and randomized paper rip sounds.
*   **🔊 Polyphonic Audio Engine**: A custom-built sound system that supports overlapping audio effects. Features snappy pops, celebratory chimes, and tactile feedback.
*   **✍️ Handwritten Letter**: A secret, typewriter-style love letter that reveals itself character-by-character, accompanied by a **Looped Pen-on-Paper Writing Sound**.

## ✨ Core Features

*   **The Big Question**: A playful interaction where the "No" button shrinks and retreats, ensuring a eventual, celebratory "Yes."
*   **Curated Soundtrack**: A horizontally scrollable music player with smooth YouTube integration, allowing you to set the perfect mood.
*   **Resonant Reasons**: An elegant card deck cycling through "Why you're special," designed with clean typography and soft transitions.
*   **Mobile-Optimized**: A full responsive overhaul ensures the experience is just as beautiful on an iPhone or Android as it is on a desktop.
*   **✨ Romantic Atmosphere**: Features a **Noise Grain Overlay** for texture, **Text Glow** effects, and a **Cursor Heart Trail** (desktop only) for a magical touch.

## 🛠️ Performance & Optimization (Silk Smooth 60fps)

*   **Adaptive Geometry**: The Cinema Ribbon automatically adjusts its vertex density (380 steps on desktop, 120 on mobile) to maintain peak performance without sacrificing visual quality.
*   **Smart Audio Priority**: A custom audio engine that prioritizes key interactions (clicks, success chimes) and intelligently throttles background hover sounds to prevent audio clutter.
*   **Optimized Assets**: All sound effects are locally hosted to bypass potential SSL/network issues. Images use `next/image` for automatic format selection and lazy loading.
*   **GPU Hardware Acceleration**: Utilizes `will-change: transform` hints to prioritize hardware-accelerated rendering for all fluid animations.
*   **Throttled Height Physics**: Refined `MutationObserver` and resize listeners are throttled to 10fps to minimize CPU load during layout shifts.
*   **Data-Driven Customization**: 100% of the content is externalized into `content.json` for effortless white-labeling.

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
    "click": "/sfx/click.mp3",
    "hover": "/sfx/hover.mp3",
    "success": "/sfx/success.mp3",
    "type": "/sfx/type.mp3",
    "tear": ["/sfx/tear_1.mp3", "/sfx/tear_4.mp3"]
}
```

---

## 💖 Technical Pedigree

Built with **Next.js 15**, **React 19**, and **Tailwind CSS**. 
Featuring animations by **Framer Motion** (via CSS transitions) and **Canvas Confetti**.

*Designed for maximum impact with minimum effort.* 🌹
