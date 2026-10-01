<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Styling Guidelines

- Use Tailwind CSS v4 utility classes in JSX/TSX for page layout, spacing, responsive behavior, and component styling.
- Avoid adding new semantic CSS selectors for ordinary UI. Keep custom CSS for specialized visuals such as SVG charts, decorative animations, and rich-text descendants.
- Add or update shared design tokens in the `@theme` block in `app/globals.css`.
