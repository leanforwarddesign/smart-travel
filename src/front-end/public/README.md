# Public Assets Directory

This directory contains static assets that are served at the root of the application when built.

## JSON Data Files

### currency-data.json
Contains currency definitions and exchange rates used by the currency conversion system.
- Loaded by Redux store via `loadCurrencyData()` thunk
- Accessed at: `/currency-data.json` in production

### cost-of-living-data.json
Contains cost of living data for different countries used in PPP calculations.
- Loaded by Redux store via `loadCostData()` thunk
- Accessed at: `/cost-of-living-data.json` in production

### city-stats-data.json
Contains city statistics and descriptions for each country displayed in the City Stats section.
- Loaded directly in `frame.tsx` component
- Accessed at: `/city-stats-data.json` in production

## How It Works

Vite's `publicDir` configuration (set in `vite.config.ts`) specifies that files in this directory:
1. Are copied to the build output root directory (not inside assets)
2. Are accessible via absolute paths starting from `/`
3. Are NOT processed by Vite (no hashing, no bundling)
4. Are perfect for dynamic data loaded at runtime via `fetch()`

## Development vs Production

- **Development**: Files are served directly from `/public/` by Vite dev server
- **Production**: Files are copied to build output (`dist/`) and served from root
- **Paths**: Always use absolute paths from root: `/filename.json` (not `/public/filename.json`)

## Updating Data

To update the JSON data:
1. Edit the files in this directory directly
2. Rebuild your app with `npm run build`
3. Redeploy to Firebase with `firebase deploy`

The app will fetch the updated data at runtime - no code changes needed!
