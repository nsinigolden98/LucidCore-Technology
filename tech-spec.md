# Lucidcore Technologies — Technical Specification

## Dependencies

### Runtime
- `react` + `react-dom` — UI framework
- `react-router-dom` — Multi-page routing (HashRouter for static deploy)
- `three` — WebGL fluid simulation in Systems section
- `gsap` + `@gsap/flip` + `@gsap/scroll-trigger` — Animations, Flip transitions, scroll triggers
- `imagesloaded` — Preloading for scroll showcase images
- `lucide-react` — Icon system
- `@supabase/supabase-js` — Form data persistence (collaboration forms)
- `clsx` + `tailwind-merge` — Conditional class names

### Dev
- `vite` — Build tool
- `tailwindcss` — Styling
- `typescript` — Type safety
- `@types/three` — Three.js types

---

## Component Inventory

### Layout (shared across all pages)
| Component | Source | Notes |
|-----------|--------|-------|
| Navbar | Custom | Sticky, glassmorphic, collapsible mobile hamburger |
| Footer | Custom | Massive display text + links grid |
| Layout | Custom | Wraps Navbar + Footer + ScrollSmoother initialization |
| ScrollToTop | Custom | Scrolls to top on route change |

### Reusable Components (cross-page)
| Component | Source | Used By |
|-----------|--------|---------|
| GlassCard | Custom | Projects, Services, Proof, FAQ — glassmorphic wrapper with hover |
| StatusBadge | Custom | Project cards — Live/Coming Soon/In Development |
| SectionHeader | Custom | Multiple pages — Caption + H2 pattern |
| AnimatedText | Custom | Word-by-word scroll reveal on headings/body |
| CommandTerminal | Custom | Home page — interactive CLI simulation |
| FluidSimulation | Custom (Three.js) | Home Systems section — WebGL ping-pong fluid |
| ModuleScroll | Custom (GSAP Flip) | Home Modules section — scroll-driven layout transitions |
| GlowButton | Custom | CTAs — pill-shaped with glow hover |
| FilterBar | Custom | Projects page — category/status filter tabs |
| ProjectCard | Custom | Projects hub — card with logo, name, description, status |
| ProjectDetail | Custom | Project detail view — hero, gallery, mini browser, tech stack |
| MiniBrowser | Custom | Project detail — iframe wrapper for live URL preview |
| ImageGallery | Custom | Project detail — zoomable image grid |
| CollaborationForm | Custom | Contact page — form with validation + Supabase submit |
| DocumentCard | Custom | Proof page — interactive document viewer cards |
| AccordionItem | Custom | FAQ page — collapsible Q/A |

### Page Sections
| Page | Sections |
|------|----------|
| Home | Hero, FluidIntelligence, EcosystemModules, FoundersVision, CommandCenter |
| About | CompanyIntro, VisionMission, TeamHighlight |
| Projects | ProjectHub (with filters), ProjectDetail (modal/page) |
| Services | ServicesGrid |
| Contact | FormSelector + CollaborationForms (4 types) |
| Proof | DocumentViewer |
| FAQ | FAQAccordion |
| Founder | FounderProfile |
| NotFound | ErrorFallback |

---

## Animation Implementation

| Animation | Library | Implementation Approach | Complexity |
|-----------|---------|------------------------|------------|
| WebGL Fluid Simulation | Three.js (raw WebGL) | Ping-pong FBOs: advection, curl, vorticity, pressure, splat shaders. Configurable color palette. Mouse-driven velocity injection. | **High** |
| Word-by-word text reveal | GSAP + ScrollTrigger | Split text into words, stagger `opacity:0→1` + `y:20→0` on scroll enter | Low |
| Glass card hover glow | CSS transitions | `background-opacity` + `border-color` + `box-shadow` on hover with cubic-bezier | Low |
| Terminal typewriter | Vanilla JS | Char-by-char append with `setInterval`, blinking cursor CSS keyframes, promise-based sequence | **Medium** |
| Terminal glitch scan | Vanilla JS | Random char generation loop, clear/retype pattern | Low |
| Terminal glow states | CSS transitions | `is-active`/`is-success` class toggles border/shadow/background | Low |
| Terminal shine sweep | CSS keyframes | `::before` pseudo-element, `skewX`, `left` animation over 8s | Low |
| Module scroll (Flip) | GSAP Flip + ScrollTrigger | Capture "home" state, force "scrolled" state, `Flip.fit()` with scrub ScrollTrigger | **High** |
| Card scale/blur on scroll | GSAP + ScrollTrigger | Non-active cards: `scale(0.9)`, `filter: blur(4px)`. Active card: `scale(1)`, `blur(0)` | Medium |
| Hero video gradient | CSS | `linear-gradient` overlay div on top of video | Low |
| Navbar scroll behavior | GSAP + ScrollTrigger | Hide on scroll down, show on scroll up. Background opacity increases after hero | Low |
| Page transitions | GSAP | Fade out current page, fade in new page on route change | Medium |
| Mobile menu | CSS + GSAP | Hamburger → X transform, slide-down panel | Low |
| Image gallery zoom | CSS transform | `scale(1.5)` on click, click-outside to close | Low |
| Filter tab switch | CSS transition | Background pill slides to active tab | Low |
| Form success animation | GSAP | Checkmark draw, confetti burst, green glow pulse | Medium |
| Project card hover | CSS + GSAP | Lift (`translateY`), glow intensify, border brighten | Low |
| Mini browser loading | CSS | Skeleton pulse animation while iframe loads | Low |
| Footer text parallax | GSAP + ScrollTrigger | Large "LUCIDCORE" text slight Y shift on scroll | Low |

---

## State & Logic Plan

### 1. Routing Architecture
- Use `HashRouter` (static deployment compatible)
- Routes: `/` (Home), `/about`, `/projects`, `/projects/:slug` (detail), `/services`, `/contact`, `/proof`, `/faq`, `/founder`
- Project detail uses `/projects/:slug` — renders as full page (not modal) for shareable URLs
- Scroll restoration on every route change

### 2. Fluid Simulation Lifecycle
- FluidSimulation component manages its own WebGL context
- Canvas is section-scoped (absolute positioned within `#systems`)
- Render loop pauses via IntersectionObserver when section is off-screen
- Cleanup: dispose all WebGL resources on unmount

### 3. Project Data Architecture
- All project data lives in `src/data/projects.ts` as a typed array
- Each project: `id`, `name`, `slug`, `category` (internal/client), `status`, `url`, `repo`, `description`, `slogan`, `themeColor`, `techStack[]`, `problem`, `solution`, `outcome`, `galleryImages[]`, `socialLinks[]`
- Client projects array is empty but typed and ready for injection
- Filtering: derive filtered arrays from category + status filters

### 4. Form Submission Flow (Supabase)
- Supabase client initialized in `src/lib/supabase.ts`
- Four tables: `project_requests`, `partnership_requests`, `sponsorship_requests`, `general_inquiries`
- Each form: client-side validation → Supabase insert → success/error feedback
- No auth required — uses anon key with RLS policies allowing inserts
- Graceful degradation: show error UI if Supabase is unreachable

### 5. ModuleScroll Coordination
- Requires `imagesloaded` to wait for all background images before measuring Flip states
- `createFlipTimeline()` runs once after images load, and re-runs on resize
- ScrollSmoother must be initialized before Flip calculations

### 6. Error Boundary
- React ErrorBoundary wrapping the entire app
- Fallback: branded error page with "Reload page" button
- Catches render errors, prevents blank screens

---

## Other Key Decisions

### Raw WebGL over React Three Fiber
The fluid simulation uses highly specialized ping-pong FBO shader chains that are not easily expressed through R declarative patterns. Use raw `HTMLCanvasElement.getContext('webgl2')` managed inside a `useEffect` for full control over the render loop and resource lifecycle.

### HashRouter over BrowserRouter
Static deployment (no server-side routing) requires `HashRouter` so all routes work on refresh.

### Project Detail as Route, Not Modal
Despite the design.md using modal language, the user's explicit requirement for `/projects/:projectName` routing + shareable URLs means project detail renders as a full page route. Transition animations (fade/slide) are handled by GSAP on route change.

### Image Generation Budget
- 5 images from design.md prompts (hero video, 2 UI screenshots, founder portrait, abstract texture)
- 7 additional project logos (9 internal projects + reuse for consistency = 9 logos as generated images)
- Total: 12 images, within the 12-image budget

### Supabase Schema
```
project_requests: id, full_name, email, project_name, description, budget_range, timeline, created_at
partnership_requests: id, company_name, contact_person, email, proposal, goals, created_at
sponsorship_requests: id, org_name, contact_info, purpose, budget_range, description, created_at
general_inquiries: id, name, email, message, created_at
```

### Font Loading
Load `Space Grotesk`, `Inter`, and `JetBrains Mono` via Google Fonts `<link>` in `index.html` for optimal performance. No npm font packages needed.
