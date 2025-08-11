# Typetwitter

This is a demo front-end that matches the Figma design for a clean Twitter writing app.

**Features**
- React + Vite + Tailwind + Framer Motion
- Ctrl/Cmd + Enter toggles the footer (works while focus is in the editor)
- Mock posting flow (`src/services/postService.js`) — replace with real X API later
- Pixel-faithful animations (Framer Motion) — timings/easing in `App.jsx`

## Quick start (local)

1. Install
```bash
npm install
```

2. Run
```bash
npm run dev
```

3. Build
```bash
npm run build
npm run preview
```

## Deploy to Netlify

You can deploy quickly:

1. Create a **new public GitHub repo** and push this project.
2. Go to Netlify → New site → Import from Git → connect your GitHub repo.
3. Build command: `npm run build`, Publish directory: `dist`.

Or use Netlify's Drag & Drop:
- Build locally: `npm run build`
- Upload the `dist` folder to Netlify's deploy area.

## Swap mock posting for real X API

Replace `src/services/postService.js` with your implementation that calls the X API or your serverless function. The UI expects `postTweet(payload)` to return an object like {{ ok: true, id, content }}.

