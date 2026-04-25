# IB MYP Master Arena

Adaptive AI-powered learning platform for IB MYP students.

## Deployment Instructions

### 1. Netlify (Recommended)
This project is ready for Netlify out of the box.
1. Connect your GitHub repository to Netlify.
2. In the Netlify dashboard, go to **Site settings > Build & deploy > Environment variables**.
3. Add the following variables:
   - `VITE_SUPABASE_URL`: (Copy from `.env.example`)
   - `VITE_SUPABASE_ANON_KEY`: (Copy from `.env.example`)
   - `VITE_GEMINI_API_KEY`: Your Google Gemini API Key.
4. Set the **Build command** to `npm run build`.
5. Set the **Publish directory** to `dist`.

### 2. GitHub Pages
1. Install the `gh-pages` package: `npm install gh-pages --save-dev`.
2. Add `"homepage": "https://username.github.io/repo-name"` to `package.json`.
3. Add deploy scripts to `package.json`:
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d dist"
   ```
4. If your site is not at the root domain, you may need to adjust `base` in `vite.config.ts`.

## Environment Variables
See `.env.example` for the required variables to connect to Supabase and Gemini AI.
