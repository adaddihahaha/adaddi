# Adaddi

Next.js reconstruction of the Adaddi electricity and solar calculator site.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Styling

The app uses Tailwind CSS v4 with the PostCSS integration. Use utility classes in JSX for page and component layout; shared color and font utilities are defined in `app/globals.css` under `@theme`. That stylesheet also keeps the solar illustration, SVG chart details, and Portable Text descendant styles that need custom selectors. The root `styles.css` is a legacy reference file and is not imported by the Next.js app.

## Structure

- `app/` contains App Router pages and shared styles.
- `components/` contains reusable navigation, consent, and calculator components.
- `public/` contains browser-served assets such as the logo.
- The original static HTML files remain at the project root as a reference during migration.

The calculators run client-side. The solar tracker currently models the core before/after/no-solar and payback workflow; CSV persistence can be added as a separate browser adapter without changing the page shell.
