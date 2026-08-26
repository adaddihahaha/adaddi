# Adaddi

Next.js reconstruction of the Adaddi electricity and solar calculator site.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Structure

- `app/` contains App Router pages and shared styles.
- `components/` contains reusable navigation, consent, and calculator components.
- `public/` contains browser-served assets such as the logo.
- The original static HTML files remain at the project root as a reference during migration.

The calculators run client-side. The solar tracker currently models the core before/after/no-solar and payback workflow; CSV persistence can be added as a separate browser adapter without changing the page shell.
