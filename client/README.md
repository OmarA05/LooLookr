# loolookr frontend

Vite + React 18 + TypeScript UI for the loolookr bathroom leaderboard. Tailwind delivers the UW black/gold theme, React Query handles data fetching/caching, and the Google Maps JavaScript API renders campus markers.

## Setup

```bash
cd client
npm install
cp .env.example .env # add VITE_API_BASE_URL and VITE_GOOGLE_MAPS_API_KEY
npm run dev
```

## Scripts

- `npm run dev` – start Vite dev server
- `npm run build` – type-check and build
- `npm run preview` – preview production build

## Behavior

- JWT is stored in `localStorage` under `loolookr_token`.
- React Query caches `/api/toilets` and invalidates after ratings.
- Sidebar selection syncs with map markers and info window highlight.
