# Product Explore App

A web app for discovering and browsing products. It is built with React, TypeScript and Mantine UI.

> **Status:** early development. The app shell is in place: header, mobile menu, footer, light/dark theme and routing. Product browsing pages are not built yet.

## Tech stack

- **React 19** + **TypeScript**
- **Vite 6** (SWC) for dev server and builds
- **Mantine UI 9** for components and theming
- **Tailwind CSS 4** for utility styles
- **Redux Toolkit** + **RTK Query** for state and data fetching
- **redux-persist** (encrypted) for persisted state
- **React Router 7** for routing
- **react-icons**, **dayjs**
- **ESLint** + **Prettier**

## Getting started

Requirements: Node.js 18+ and npm.

```bash
npm install
npm run dev
```

The dev server runs at http://localhost:3000.

## Scripts

| Command           | Description                                   |
| ----------------- | --------------------------------------------- |
| `npm run dev`     | Start the dev server                          |
| `npm run build`   | Type-check and build to `build/`              |
| `npm run preview` | Preview the production build locally          |
| `npm run lint`    | Run ESLint                                    |

## Project structure

```
src/
├── assets/css/     Global styles and Tailwind setup
├── common/         Shared pieces (Logo, ScrollToTop)
├── components/     UI components (header, footer, modal, theme toggle)
├── layouts/        Page layouts (MasterLayout)
├── pages/          Route pages
├── routes/         Router configuration
├── services/       RTK Query API services
├── store/          Redux store and persistence
├── theme/          Mantine theme and color palette
└── App.tsx         App providers
```

## Import aliases

| Alias          | Path              |
| -------------- | ----------------- |
| `@/`           | `src/`            |
| `@components/` | `src/components/` |
| `@assets/`     | `src/assets/`     |
| `@utils/`      | `src/utils/`      |
| `@services/`   | `src/services/`   |

## Theming

The theme lives in [`src/theme`](src/theme):

- `primary`: violet, the main brand color (buttons, links, highlights).
- `accent`: amber, for ratings, deals and badges.

Mantine uses `primary` by default, so use `color="accent"` or `var(--mantine-color-accent-6)` when you need the accent. Users can switch between light and dark mode with the toggle in the header.

## Notes

- The redux-persist encryption key is hardcoded in `src/store/index.ts`. Move it into a `.env` file (for example `VITE_PERSIST_SECRET`) before deploying.
