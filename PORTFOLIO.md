# Portfolio — Uzair Younis

A single-page personal portfolio built with **TanStack Start (React 19 + Vite 7)** and **Tailwind CSS v4**. The site showcases work as a Fullstack & AI Automation engineer, with an animated hero, project rail, tech stack marquee, stats, contact section, and a floating "Happy" music player.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | TanStack Start v1 (file-based routing, SSR-ready) |
| Build | Vite 7 |
| UI | React 19 + Tailwind v4 (`src/styles.css` tokens) |
| Animation | `framer-motion`, `gsap`, `lenis` (smooth scroll) |
| Icons | `lucide-react`, `react-icons` |
| Fonts | Sora (display), Inter (body), Roboto Condensed (social buttons) |

Design tokens (violet `#a63d40`, cyan `#ede6de`, ink `#0f0f12`, dark surfaces) live in `src/styles.css` under `@theme`. Never hardcode colors in components — use tokens.

---

## Routes

```
src/routes/
├── __root.tsx         Shared shell: fonts, <Toaster />, <MusicPlayer />, <Outlet />
└── index.tsx          Landing page composition
```

`index.tsx` is the only content route. Its `head()` sets SEO title/description and OG tags.

---

## Section-by-section

Rendered top-to-bottom on `/`:

1. **Preloader** — first-paint loader that fades out on hydration.
2. **CardNav / StaggeredMenu** — top navigation with animated card menu and mobile staggered drawer.
3. **Hero** (`Hero.tsx`) — headline, tagline, dual CTAs, 3D-tilt portrait with glow badges ("AI Automation", "Fullstack Developer").
4. **TechMarquee** — infinite horizontal marquee of stack logos.
5. **Stats** (`Stats.tsx` + `CountUp.tsx`) — animated numeric counters (projects shipped, years, etc.).
6. **Projects** (`Projects.tsx`) — 6 featured projects. **Grid on mobile/tablet**, **horizontal snap-scroll rail on desktop (`lg+`)**. Cards have framer-motion entrance + hover lift.
7. **FunFacts** — light personality section.
8. **Contact** (`Contact.tsx`) — contact copy + `SocialFooter` with 3D social buttons.
9. **BackgroundFX** — ambient blurred gradient blobs behind the whole page.
10. **MusicPlayer** — floating bottom-left toggle that plays Pharrell — *Happy*.

---

## Projects data

Defined inline in `src/components/portfolio/Projects.tsx`:

| Project | Stack | Status |
|---|---|---|
| Dex360 | React, Node, PostgreSQL, EC2, Claude MCP | Live — dex360.ai |
| Contello | Next.js, Node, DynamoDB, S3, Amplify, Gemini VEO, SORA | Live — contello.ai |
| BaseHR | React, Express, LangChain, LangGraph, Gemini, Supabase | Live — basehr.co.uk |
| VOCS AI | MERN, EC2, S3, Generative AI | Live — vocs.ai |
| Crypto Mining App | MERN | Live |
| Federated AI Recruitment | AI Automation | In Progress |

Each project has an `accent` (`violet` | `cyan`) that drives its glow + tag color.

---

## Assets

Public images live in `public/uploads/` and are referenced through a single manifest so paths aren't duplicated across components:

```ts
// src/lib/assets.ts
import { assets } from "@/lib/assets";
<img src={assets.portrait} />
<img src={assets.dex360} />
```

Available keys: `portrait`, `jerry`, `dex360`, `contello`, `basehr`, `vocs`, `crypto`, `federated`.

To add a new image:
1. Drop the file into `public/uploads/`.
2. Add one line to `src/lib/assets.ts`.
3. Reference it as `assets.<key>` anywhere.

The `Happy` MP3 is served via a Lovable CDN asset pointer (`src/assets/happy.mp3.asset.json`) and consumed by `MusicPlayer.tsx`.

---

## Animation guidelines

- **Entrance**: `framer-motion` `whileInView` with `once: true`, `margin: "-80px"`, easing `[0.22, 1, 0.36, 1]`, staggered by index (capped at 400ms).
- **Hover**: transform-only (`y`, `scale`) with `will-change-transform` to stay on the compositor.
- **Scroll rail**: native CSS `snap-x snap-mandatory` + `scroll-smooth` (no JS scroll hijacking).
- **Page smoothing**: `lenis` initialized once in `__root.tsx`.

Don't add scroll-jacking to Projects — the desktop rail is horizontal, but the page scroll stays vertical.

---

## Local development

```bash
bun install
bun run dev      # http://localhost:8080
bun run build    # production build
```

Dev server is supervised — HMR flushes automatically.

---

## Conventions

- Semantic tokens only — no `text-white` / `bg-black` literals; use `text-foreground`, `bg-background`, or the custom `violet` / `cyan` tokens.
- Every route gets its own `head()` — never reuse "Lovable App".
- Components stay small and single-purpose under `src/components/portfolio/`.
- Server logic (if added) uses `createServerFn` in `*.functions.ts`; never call protected fns from public route loaders.

---

## Roadmap ideas

- Case-study detail routes per project (`/work/dex360`, etc.).
- Blog / writing section fed by MDX.
- Contact form wired to Lovable Cloud with rate limiting.
- Dark/light theme toggle (currently dark-only).
