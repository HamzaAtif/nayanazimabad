# Naya Nazimabad — 3D masterplan website

An interactive, SEO-first website for **Naya Nazimabad**, the 1,300-acre gated community on
Manghopir Road, Karachi. The home page is a **3D masterplan you can fly through**: click any tower
to focus the camera and open its details.

> **Disclaimer.** This is an independent front-end build, not the official developer site. Project
> text and contact details are reproduced from [nayanazimabad.com](https://nayanazimabad.com/). The
> 3D masterplan is **schematic** — block names follow the official community, but positions,
> heights and amenity locations are illustrative and are not a survey or legal plot plan.

---

## Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 14 (App Router)** | SSG/SSR per route, metadata API, static export of every project page |
| Language | **TypeScript** (strict) | Content is typed; a typo in project data fails the build, not the browser |
| 3D | **three.js + @react-three/fiber + drei** | Declarative React scene graph; the canvas is code-split and client-only |
| Styling | **Tailwind CSS** | Design tokens in `tailwind.config.ts`, tiny CSS payload |
| Content | **Typed TS modules** in `src/data` | No database, no CMS, no build-time network calls |
| Validation | **zod** | Shared shape for the contact API |
| Tests | **Jest + React Testing Library** | 23 tests: content integrity, components, API validation |
| Hosting | **Vercel** | Git-connected, global CDN, serverless API routes |

### Why there are no images

Every visual is generated in code:

- **Façades, roads and grass** are drawn to a `<canvas>` at runtime and used as three.js textures
  (`src/components/three/textures.ts`).
- **Project cards** show a deterministic SVG elevation derived from each project's massing data
  (`src/components/ProjectElevation.tsx`).
- **Gallery slots** render a hatched placeholder that captions the shot it is waiting for
  (`src/components/PlaceholderTile.tsx`), so dropping in real photography later is a one-line change
  per slot.

That keeps the repo free of binary assets and means the site never ships a stock photo of a
building that isn't Naya Nazimabad's.

---

## Quick start

```bash
npm install
npm run dev          # http://localhost:3000
```

Other scripts:

```bash
npm run build        # production build (prerenders 21 routes)
npm start            # serve the production build
npm run lint         # ESLint (next/core-web-vitals + jsx-a11y)
npm run typecheck    # tsc --noEmit
npm test             # Jest
npm run format       # Prettier
```

---

## Deploying to Vercel (auto-deploy on push)

`vercel.json` is already configured for **Vercel's Git integration** — no GitHub Actions needed.

1. Push this branch to GitHub (done: `arena/01a09147-nayanazimabad`).
2. In [Vercel](https://vercel.com/new) → **Add New → Project** → import `HamzaAtif/nayanazimabad`.
3. Framework preset should auto-detect **Next.js**. Set the project name to `nayanazimabad` to get
   `nayanazimabad.vercel.app`.
4. Environment variables (**Settings → Environment Variables**) — all optional:

   | Variable | Required? | Purpose |
   |---|---|---|
   | `NEXT_PUBLIC_SITE_URL` | Recommended | Canonical URL used for metadata, sitemap and OG tags. Set to your real domain. |
   | `CONTACT_EMAIL_TO` | Optional | Where enquiries are emailed (needs `RESEND_API_KEY` too). |
   | `RESEND_API_KEY` | Optional | Enables email delivery. Without it the API runs in **log-only** mode. |

5. **Deploy.** Every push to the connected branch builds and promotes automatically; pull requests
   get preview URLs.

**Branch note:** this work lives on `arena/01a09147-nayanazimabad`. Point Vercel's Production Branch
at `main`, then merge this branch — or set the production branch to this branch while you review.

### CI

`.github/workflows/ci.yml` runs lint → typecheck → test → build on every push and PR. It does
**not** deploy (Vercel owns that). `.github/workflows/deploy.yml` is a manual, opt-in alternative if
you'd rather deploy through the Vercel CLI — its header explains the switch.

---

## Project structure

```
├── prisma/
│   ├── schema.prisma         # Optional Postgres schema (Building, Amenity, News, Image)
│   └── seed.ts               # Seeds Postgres from the same src/data modules
├── public/                   # Static assets (none required — see "no images" above)
└── src/
    ├── app/
    │   ├── layout.tsx        # Root layout, fonts, JSON-LD, skip link
    │   ├── page.tsx          # Home — the 3D masterplan + server-rendered SEO content
    │   ├── projects/         # List + [slug] detail (7 static pages)
    │   ├── amenities/ about/ media/ contact/ privacy/
    │   ├── not-found.tsx     # 404
    │   ├── sitemap.ts robots.ts opengraph-image.tsx
    │   └── api/
    │       ├── projects/     # Read-only JSON of all content
    │       └── contact/      # Validated, rate-limited enquiry endpoint
    ├── components/
    │   ├── layout/           # SiteHeader, SiteFooter
    │   ├── three/            # The 3D masterplan (see below)
    │   └── *.tsx             # ProjectCard, ProjectElevation, ContactForm, MapEmbed, …
    ├── data/
    │   ├── projects.ts       # The 7 projects — descriptions verbatim from the official site
    │   ├── amenities.ts      # 13 amenities
    │   ├── news.ts           # Media centre + press
    │   ├── site.ts           # Contact details, nav
    │   └── masterplan.ts     # Block layout + seeded procedural generators
    ├── lib/seo.ts            # Metadata + JSON-LD builders
    └── types/content.ts      # Shared content types
```

---

## Editing content

Everything lives in `src/data/*.ts` and is type-checked.

**Add or update a project** — `src/data/projects.ts`:

```ts
{
  slug: 'signature-tower',              // becomes /projects/signature-tower
  name: 'Signature Tower',
  headline: '2 | 3 | 4 Bed Executive Apartments & Duplexes',
  category: 'apartments',
  status: 'under-construction',
  statusNote: 'Listed under Developments › Construction of Signature Tower.',
  block: 'Block A — adjacent to the Gymkhana',
  summary: '…',                          // used on cards and in meta descriptions
  description: ['…'],                    // detail-page paragraphs
  unitTypes: ['2 bed', '3 bed'],
  features: ['4 sides open tower', '…'],
  links: [{ label: 'Download brochure (PDF)', href: 'https://…', kind: 'brochure' }],
  gallery: [{ caption: 'Elevation', src: null }],   // src: null → placeholder tile
  massing: { position: [-75, -55], footprint: [18, 18], towers: 1, floors: 32 },
}
```

`massing` drives the 3D tower (position, footprint, storey count) **and** the SVG elevation on the
card, so one edit updates both. Add `unbuilt: true` to draw an un-built plot.

**Unknown information is marked, not invented.** Where the developer publishes no detail — unit
sizes for Grace Tower, amenity descriptions, the commercial programme — the data says so and the UI
renders a "photo pending" / "unspecified" state. Please keep that habit.

---

## The 3D masterplan

| File | Role |
|---|---|
| `three/MasterplanExperience.tsx` | Client shell: HUD, state, WebGL detection, error boundary |
| `three/MasterplanCanvas.tsx` | `next/dynamic` wrapper — three.js never enters the server bundle |
| `three/MasterplanScene.tsx` | Lights, sky, layers, OrbitControls, camera rig |
| `three/SiteGround.tsx` | Ground, block tints, boulevards, ring road, parks, Manghopir Lake |
| `three/Tower.tsx` | Project towers with procedural façades + focus framing |
| `three/AmenityMarker.tsx` | Low-poly stand-ins for the 13 amenities |
| `three/Vegetation.tsx` | ~300 bungalows and ~250 trees as instanced meshes |
| `three/CameraRig.tsx` | Eased camera flights; respects `prefers-reduced-motion` |
| `three/StaticMasterplan.tsx` | Server-rendered SVG plan — no-JS, no-WebGL and error fallback |

**Changing the layout:** edit `DISTRICTS`, `MASTERPLAN.lake` and `MASTERPLAN.views` in
`src/data/masterplan.ts`. Bungalows and trees are generated with a seeded PRNG, so the city is
identical on every render and never collides with a tower or amenity footprint.

**Performance:** the canvas is code-split and mounted client-side only; instanced meshes keep the
procedural city to a handful of draw calls; `dpr` is capped at 1.75; shadow maps are a single
2048² texture. The home page still ships fully server-rendered prose below the canvas, so crawlers
and no-JS visitors get the same content.

**Accessibility:** the 3D scene is `aria-hidden` and purely an enhancement. The same information is
available as real DOM: a "Jump to project" button list, the selected-project panel, and the SVG plan
— all keyboard reachable. Camera motion is disabled under `prefers-reduced-motion`.

---

## Contact form

`POST /api/contact` validates with zod, rate-limits to 5 requests/minute/IP, and includes a honeypot.

- **Default:** log-only. The submission is logged *without* the email address or message body.
- **With email:** set `RESEND_API_KEY` **and** `CONTACT_EMAIL_TO` to deliver via Resend.

Server-side validation is the real guard — the client-side checks are only for fast feedback.

---

## Optional: Postgres via Prisma

The site needs no database. When you want editorial content in Postgres/Supabase:

```bash
npm i -D prisma @prisma/client
echo 'DATABASE_URL=postgres://…' >> .env
npx prisma migrate dev --name init
npm run prisma:seed
```

Remove `"prisma"` from `tsconfig.json`'s `exclude` array so `prisma/seed.ts` is type-checked. The
seed reads the same `src/data` modules, so static content and the database can't drift.

---

## Known limitations

- **Fonts** use a self-contained system stack so the build makes no external requests. To restore
  Inter + Fraunces, uncomment the `next/font` block documented in `src/app/layout.tsx` (needs access
  to `fonts.googleapis.com` at build time — fine on Vercel).
- **Photography** is entirely absent by design; gallery slots and map pins are placeholders.
- **Amenity descriptions** are largely marked unspecified, mirroring the official site.
- In this sandbox, `node_modules/` is not persisted between sessions, so a preview may need
  `npm install && npm run dev` again after a restart.

---

## Sources

- Project descriptions, features and contact details: [nayanazimabad.com](https://nayanazimabad.com/)
- Area, coordinates and ownership background: the Naya Nazimabad entry on Wikipedia
- SEO/a11y practice: WCAG 2.1 AA, Next.js metadata and `sitemap`/`robots` conventions
