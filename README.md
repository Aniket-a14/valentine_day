# 💝 The Ultimate Valentine's Day Web App

A beautiful, interactive, and romantic web application designed to be the perfect digital gift. It features a playful "Will you be my Valentine?" question, a celebration screen with confetti, a music player, romantic quotes, and a secret love letter.

![Valentine App](public/og-image.jpg)

## ✨ Features

-   **Playful Question**: A "No" button that runs away and a "Yes" button that triggers a celebration.
-   **Music Player**: A "Soundtrack for You" with a horizontal scrollable playlist and autoplay.
-   **Quotes Section**: "Why you're special" cards with cycling romantic reasons.
-   **Love Letter**: A hidden, typewriter-style love letter at the bottom of the page.
-   **Magical Effects**: Cursor heart trails, confetti explosions, and floating element animations.
-   **Responsive Design**: Looks great on both desktop and mobile.

## 🚀 Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📝 How to Customize (IMPORTANT!)

You can easily customize all the text, songs, and the love letter **without touching any code**.

1.  Open the file `app/content.json`.
2.  Edit the values inside the quotes.

### 1. Changing Songs
Find the `"songs"` list in `content.json`. Each song has:
-   `id`: The YouTube Video ID (the part after `v=` in a YouTube URL).
-   `title`: The name of the song.
-   `quote`: A short romantic line shown below the video.

**Example:**
```json
{
  "id": "dQw4w9WgXcQ", 
  "title": "Never Gonna Give You Up",
  "quote": "I will never let you down."
}
```

### 2. Changing Reasons
Find the `"reasons"` list. Add or remove sentences to change what appears in the "Why you're special" card.

**Example:**
```json
"reasons": [
  "You make me smile.",
  "Your laugh is contagious.",
  "You make the best coffee."
]
```

### 3. Editing the Love Letter
Find the `"letter"` list. Each string is a new line in the letter. Use `""` for an empty line (paragraph break).

**Example:**
```json
"letter": [
  "My Dearest,",
  "",
  "I just wanted to say...",
  "I love you!"
]
```

### 4. Changing "No" Button Phrases
Find the `"no_phrases"` list. These are the texts that appear on the "No" button as it shrinks.

**Example:**
```json
"no_phrases": [
  "No",
  "Are you sure?",
  "Really?",
  "Please reconsider!"
]
```

### 5. Changing Celebration Text
Find the `"celebration"` object.
-   `header`: The big text (e.g., "Yay! You said YES!").
-   `subheader`: The romantic message below it.

**Example:**
```json
"celebration": {
  "header": "Woohoo!", 
  "subheader": "Best decision ever!"
}
```

## 🛠️ Project Structure

-   `app/page.tsx`: The main entry point.
-   `components/`: Contains all the UI components (MusicPlayer, ReasonCard, LoveLetter, etc.).
-   `app/globals.css`: Global styles and Tailwind configurations.
-   `app/content.json`: **The central file for all text and data.**

## 💖 Credits

Built with [Next.js](https://nextjs.org), [Tailwind CSS](https://tailwindcss.com), and ❤️.
