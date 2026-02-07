---
description: How to customize text, music, and quotes in the app
---

# Customizing Your Valentine App

You can change EVERYTHING about the app's content by editing a single file. No coding required.

### 1. Open the Content File
Open `c:/3rd Year/code/valentine/app/content.json`.

### 2. Update the Basics
*   **Songs**: Change YouTube IDs in the `songs` list.
*   **Quotes**: Edit the `reasons` list for the cycle-card.
*   **Letter**: Update the `letter` array for the handwritten message.
*   **Coupons**: Add/remove items from the `coupons` list.

### 3. Verify Changes
Run the development server to see your updates in real-time.
```bash
npm run dev
```

### 4. Build for Production
Once satisfied, run a final build check:
// turbo
```bash
npm run build
```
