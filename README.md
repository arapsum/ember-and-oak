# Ember & Oak

Ember & Oak is a warm, dark single-page storefront for a small-batch coffee roastery. It helps customers browse rotating coffees, compare tasting information, inspect brew guidance, add bags to a cart, and walk through a simulated checkout.

This repository currently contains a frontend prototype. Product data and cart state are local to the browser; no real orders, payments, inventory, shipping, or email messages are processed.

## Features

- Responsive roastery storefront with hero, roast promise, product shelf, and newsletter signup sections.
- Search across product names, origins, categories, tasting notes, varietals, and processes.
- Filter by coffee category: single origin, blend, espresso, or decaf.
- Sort by featured order, price, or rating.
- Product detail modal with origin, process, altitude, varietal, roast level, tasting notes, stock, and brew tips.
- Cart drawer with quantity controls, stock limits, remove actions, shipping progress, and order totals.
- Free shipping over `$35`; otherwise a flat `$4.50` shipping charge is shown.
- Cart persistence through `localStorage`.
- Client-side checkout validation with a simulated processing and confirmation flow.
- Keyboard-friendly interactions, including `/` to focus search and `Escape` to close overlays.
- Reduced-motion styles for users who prefer less animation.

## Tech stack

- React 18
- TypeScript
- Vite 6
- Tailwind CSS 4 with the Vite plugin
- pnpm

## Getting started

### Prerequisites

- Node.js 18 or newer
- pnpm

### Install dependencies

```bash
pnpm install
```

### Start the development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in a browser. Vite is configured to listen on all interfaces and uses port `3000`.

## Available scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Start the Vite development server. |
| `pnpm build` | Create a production bundle in `dist/`. |
| `pnpm typecheck` | Run TypeScript without emitting files. |

There is no automated test suite or lint script configured yet.

## Project structure

```text
.
├── src/
│   ├── App.tsx                 # Storefront state and page composition
│   ├── data/products.ts        # Product catalog, pricing, shipping, and formatting helpers
│   ├── index.css               # Tailwind theme, colors, animation, and accessibility styles
│   ├── main.tsx                # React entry point
│   └── components/
│       ├── CartDrawer.tsx      # Persistent cart UI and totals
│       ├── CheckoutModal.tsx   # Validated simulated checkout flow
│       ├── Footer.tsx          # Category links and client-only newsletter form
│       ├── Header.tsx          # Sticky navigation, search, and cart trigger
│       ├── Hero.tsx            # Hero and roast promise sections
│       ├── ProductCard.tsx     # Product shelf cards
│       ├── ProductModal.tsx    # Product detail view
│       ├── Reveal.tsx           # IntersectionObserver scroll reveal
│       └── icons.tsx            # Inline SVG icons
├── DESIGN.md                   # Visual design system and brand direction
├── PRODUCT.md                  # Product intent, workflows, and launch constraints
├── index.html                  # Document shell, title, metadata, and font loading
└── vite.config.js              # Vite, React, Tailwind, and dev-server configuration
```

## Content and configuration

The catalog is defined in [`src/data/products.ts`](src/data/products.ts). To add or edit a coffee, update the `Product` object fields there, including pricing, stock, tasting notes, image URL, and brew tip.

The cart uses the `ember-oak-cart` browser storage key. Clear that key in browser storage to reset a local cart while developing.

The current imagery is loaded from remote URLs and the typography is loaded from Google Fonts. A production deployment should move important assets to a controlled asset host or the repository and self-host fonts where appropriate.

## Production work remaining

Before this becomes a live commerce experience, the simulated flows should be replaced with real services for:

- Payment processing and secure payment-token handling.
- Order creation, persistence, confirmation email, and customer history.
- Inventory and stock synchronization.
- Shipping rates, delivery zones, and fulfillment status.
- Newsletter subscription storage and email delivery.
- Authentication or customer accounts, if required.
- Verified brand, location, shipping, and fulfillment copy.

The checkout UI intentionally displays a demo notice and does not send card details anywhere.
