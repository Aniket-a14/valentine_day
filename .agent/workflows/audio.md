---
description: How to add or change custom sound effects
---

# Managing Audio & SFX

The app uses a custom sound engine. Here is how to swap or add sounds.

### 1. Add Your Audio Files
Place your `.mp3` files in the `c:/3rd Year/code/valentine/public/` folder.

### 2. Update the Sound Map
Open `app/content.json` and find the `audio` section. Point the keys to your new file paths.

**Example:**
```json
"audio": {
    "type": "/my-new-pen-sound.mp3"
}
```

### 3. Adjust Volumes & Durations
If the sound is too quiet or gets cut off, modify the settings in `c:/3rd Year/code/valentine/hooks/use-sound.ts`:
*   **Volume**: Adjust `typeRef.current.volume` or the volume parameter in `playSuccess()`.
*   **Duration**: Edit the `setTimeout` value in `playTear` (currently 800ms).

### 4. Test Overlaps
Open the app and trigger the sounds multiple times to ensure the polyphonic engine handles them smoothly.
