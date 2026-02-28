# Deployment

## Backend on Render
1. Push this repo to GitHub.
2. In Render, create a new Blueprint and select this repo.
3. Render will read `render.yaml` and create `smart-study-planner-backend`.
4. Set/verify env vars in Render:
   - `JWT_SECRET`
   - `FRONTEND_ORIGIN` = your Vercel domain (for example `https://your-app.vercel.app`)
   - If multiple origins are needed, use comma-separated values.
   - Do not use malformed URL or duplicate protocol (wrong: `https://https://...`).
   - Prefer no trailing slash to keep matching clean.
   - SMTP/admin vars if you use those features.
5. Deploy and copy backend URL, for example:
   - `https://smart-study-planner-backend.onrender.com`

## Frontend on Vercel
1. Import this repo in Vercel.
2. Set project root to `SmartStudyPlanner/SmartStudyPlanner` (folder containing `index.html`).
3. Deploy as static site.
4. After first deploy, update API URL in [`index.html`](./index.html):
   - `<meta name="api-base-url" content="https://smart-study-planner-backend.onrender.com">`
5. Redeploy Vercel.

## Local Development
- Keep API URL as localhost:
  - `<meta name="api-base-url" content="http://localhost:4000">`
- Run backend from `backend/` with `npm start`.
