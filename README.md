# EXPLORA

A product discovery app: browse, search, filter and sort a product catalogue, view product details, and manage a persistent cart. Built with React, TypeScript and Mantine UI, using the [DummyJSON](https://dummyjson.com) products API.

## Features

- **Home page:** a hero banner, a "Shop by category" grid loaded from the API, and a "Latest products" section with **Load more**.
- **Products page** (`/products`)
  - Search: waits 400 ms after you stop typing.
  - Category filter, sort by price / rating / name with ascending or descending order, and a "Latest products only" toggle.
  - Pagination with a configurable page size (8 / 12 / 24 / 48) and a "Showing X–Y of Z" count.
  - All filters are kept in the URL, so a filtered view can be shared or bookmarked.
- **Product detail** (`/product/:id`): image gallery, discounted and original price, rating, stock, quantity selector, specifications and customer reviews. Unknown ids show a "not found" state.
- **Cart** (`/cart`)
  - Change quantities with − / + buttons, or remove items.
  - Subtotal, a flat $5 shipping charge, and the total.
  - Checkout shows a confirmation dialog.
- **Cart persistence:** the cart is saved (encrypted) in localStorage and survives page reloads. The badge in the header updates from anywhere in the app.
- **Toasts:** a message appears whenever an item is added to the cart.
- **UX:**
  - Skeleton loaders matched to each section's layout.
  - Error states with a retry button, and empty states.
  - A 404 page.
  - Light/dark theme toggle.
  - Responsive layout with a mobile menu.
- **Performance:** pages and their sub-components are lazy-loaded (`React.lazy` + `Suspense`).

## Tech stack

- **React 19** + **TypeScript**
- **Vite 6** (SWC) for the dev server and builds
- **Mantine UI 9** for components and theming
- **Tailwind CSS 4** for global styles
- **Redux Toolkit** + **RTK Query** for state and data fetching
- **redux-persist** + **redux-persist-transform-encrypt** for the persisted cart
- **React Router 7** for routing
- **sonner** for toasts
- **react-icons** and **dayjs**
- **ESLint** + **Prettier**

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org) 18 or newer (npm comes with it)
- [Git](https://git-scm.com)

Check the installed versions:

```bash
node -v
npm -v
git --version
```

### Run the project locally

1. **Clone the repository**

   ```bash
   git clone https://github.com/SujalShah2003/EXPLORA.git
   ```

2. **Move into the project folder**

   ```bash
   cd EXPLORA
   ```

3. **Install the dependencies**

   ```bash
   npm install
   ```

4. **Create your `.env` file** from the example:

   ```bash
   # macOS / Linux / Git Bash
   cp .env.example .env

   # Windows (PowerShell)
   Copy-Item .env.example .env
   ```

   Then open `.env` and set the values (see [Environment variables](#environment-variables) below):

   ```env
   VITE_API_BASE_URL=https://dummyjson.com
   VITE_PERSIST_SECRET=replace-with-a-long-random-string
   ```

5. **Start the dev server**

   ```bash
   npm run dev
   ```

6. **Open the app** at [http://localhost:3000](http://localhost:3000).

   The dev server reloads when you save a file. Stop it with `Ctrl + C`.

### Build for production (optional)

```bash
npm run build     # type-checks and outputs to build/
npm run preview   # serves the build locally to test it
```

> If you change `.env`, restart `npm run dev` (or rebuild) for the new values to apply.

### Environment variables

| Variable              | Description                                    | Example                 |
| --------------------- | ---------------------------------------------- | ----------------------- |
| `VITE_API_BASE_URL`   | Base URL of the products API                   | `https://dummyjson.com` |
| `VITE_PERSIST_SECRET` | Key used to encrypt the persisted cart         | any long random string  |

Vite embeds these in the client bundle when it builds, so they must be set **before** building. They are not truly secret: anyone can read them in the browser.

## Scripts

| Command           | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start the dev server                 |
| `npm run build`   | Type-check and build to `build/`     |
| `npm run preview` | Preview the production build locally |
| `npm run lint`    | Run ESLint                           |

## Deployment (static hosting, e.g. Render)

| Setting           | Value                             |
| ----------------- | --------------------------------- |
| Build command     | `npm install && npm run build`    |
| Publish directory | `build`                           |
| Environment       | `VITE_API_BASE_URL`, `VITE_PERSIST_SECRET` |
| Rewrite rule      | `/*` → `/index.html` (Rewrite)    |

The rewrite rule is needed because routing happens in the browser. Without it, refreshing `/products`, `/cart` or `/product/:id` returns a 404.

## Project structure

```
src/
├── assets/css/        Global styles and Tailwind setup
├── common/            Shared UI (Logo, SectionHeader, SectionError, QuantityInput,
│                      NotFound, AppToaster, ScrollToTop)
├── components/
│   ├── header/        Desktop nav, mobile menu, cart badge
│   ├── footer/
│   ├── home/          banner/, categories/, latest-products/
│   ├── products/      Products list, filters, pagination, useProductFilters (URL state)
│   ├── product/       ProductCard + skeleton
│   ├── product-detail/  Gallery, info, specs, reviews
│   ├── cart/          Cart page, item row, order summary
│   ├── modal/         AppModal
│   └── toggle-theme/
├── constants/         All static text as JSON, grouped by area, exported as CONTENT
│   ├── common/  layout/  home/  products/  product/  cart/
│   └── index.ts
├── hooks/             useAddToCart (cart + toast)
├── layouts/           MasterLayout (header, footer, page Suspense)
├── pages/             Route pages, each with a skeleton/ folder
├── routes/            Router config (lazy-loaded pages)
├── services/          RTK Query API (categories, products, product by id)
├── store/             Redux store, persistence, cart slice
├── theme/             Mantine theme and color palette
├── types/             Shared TypeScript types
└── utils/             Formatting helpers (price, date, slug, discount)
```

## Conventions

- **Static text** lives in `src/constants/<area>/*.json`, never inline in components. Import it with `import { CONTENT } from '@/constants'`.
- **Styling** uses Mantine components and style props only. The one CSS module left is the header's hover animations.
- **Components** stay small and single-purpose. A section renders its header once, then its loading, error, empty and data states inline.
- **Lazy loading:** child components are lazy-loaded with a skeleton fallback shaped like the content. The layout, the skeletons themselves and tiny shared pieces use normal imports.

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
- `accent`: amber, used for badges.

Mantine uses `primary` by default. For the accent, use `color="accent"` or `var(--mantine-color-accent-6)`.

## API endpoints used

| Purpose                 | Endpoint                                          |
| ----------------------- | ------------------------------------------------- |
| Category list           | `GET /products/category-list`                     |
| All products (paged)    | `GET /products?limit&skip&sortBy&order&select`    |
| Search                  | `GET /products/search?q=`                         |
| By category             | `GET /products/category/{slug}`                   |
| Latest products         | `…&modifiedAfter=2026-06-01T00:00:00Z`            |
| Product detail          | `GET /products/{id}`                              |

DummyJSON can't search within a category. When both a search and a category are set, the app fetches that category and filters it by the search text in the browser.
