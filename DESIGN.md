---
name: Virgile Bigaré — Portfolio
description: A cinematic, editorial developer portfolio built on scroll-driven reveals and a single amber signal accent.
colors:
  light-bg-cream: "#FEFAE0"
  light-bg-cream-deep: "#f0ebd1"
  light-bg-cream-tertiary: "#e6e2c3"
  light-ink-forest: "#283618"
  light-ink-olive: "#606c37"
  signal-amber: "#DDA15E"
  signal-amber-deep: "#BC6C25"
  dark-bg-void: "#0a0a0a"
  dark-bg-void-deep: "#09090b"
  dark-bg-void-tertiary: "#18181b"
  dark-ink-paper: "#f4f4f5"
  dark-ink-mist: "#a1a1aa"
  dark-accent-white: "#ffffff"
  dark-accent-mist: "#d4d4d8"
  overlay-hairline: "rgba(255,255,255,0.05)"
typography:
  display:
    fontFamily: "ui-serif, Georgia, Cambria, Times New Roman, serif"
    fontSize: "clamp(7rem, 12vw, 17rem)"
    fontWeight: 700
    lineHeight: 0.9
    letterSpacing: "-0.05em"
  headline:
    fontFamily: "ui-serif, Georgia, Cambria, Times New Roman, serif"
    fontSize: "clamp(2.25rem, 6vw, 4.5rem)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.05em"
  body:
    fontFamily: "ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1rem, 1.5vw, 1.25rem)"
    fontWeight: 300
    lineHeight: 1.625
  label:
    fontFamily: "ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(9px, 1vw, 14px)"
    fontWeight: 700
    letterSpacing: "0.3em"
  hud-label:
    fontFamily: "Lato, system-ui, sans-serif"
    fontSize: "clamp(10px, 1vw, 16px)"
    fontWeight: 700
    letterSpacing: "0.15em"
rounded:
  pill: "9999px"
  sm: "1.5rem"
  media-lg: "2rem"
  media-xl: "3rem"
spacing:
  gap-md: "3rem"
  gap-lg: "6rem"
  section-y: "8rem"
  section-y-lg: "12rem"
components:
  button-primary:
    backgroundColor: "{colors.light-ink-forest}"
    textColor: "{colors.light-bg-cream}"
    rounded: "{rounded.pill}"
    padding: "20px 40px"
  button-primary-hover:
    backgroundColor: "{colors.light-ink-olive}"
  tag-pill:
    backgroundColor: "{colors.overlay-hairline}"
    textColor: "{colors.dark-ink-mist}"
    rounded: "{rounded.pill}"
    padding: "4px 12px"
  cta-arrow:
    backgroundColor: "transparent"
    rounded: "{rounded.pill}"
    size: "48px"
---

# Design System: Virgile Bigaré — Portfolio

## 1. Overview

**Creative North Star: "The Director's Cut"**

Every section plays like a cinematic reveal: parallax hero layers, scroll-triggered titles that rise from below, project images that dolly slightly as you scroll past. The palette stays quiet — a single warm cream-and-forest daytime grade or a near-black nighttime grade — so that when Signal Amber shows up, it reads as intentional, not decorative. Serif italics carry the emotional beats (a name, a title, a CTA); everything functional (labels, nav, tags, dates) drops into tight uppercase tracked-out sans, the way a film's lower-third credits do.

This system explicitly rejects the **generic corporate/agency look**: no glassmorphism-as-default, no interchangeable SaaS card grids, nothing that could be mistaken for a template. Depth comes from motion and hairline borders, not decorative shadows or gradients scattered across the page.

**Key Characteristics:**
- One signal color, used sparingly, never as a fill
- Serif italic for feeling, tracked-out uppercase sans for function
- Flat by default; weight (shadow, blur) appears only under featured media
- No cards as the default container — alternating cinematic rows instead, media always visible, never hidden behind a hover gate
- Motion is choreographed, not incidental: staggered reveals, scroll-scrubbed parallax, hover states that always *do* something
- The hero name is kinetic type, not static: it snaps in letter by letter and leans away from the cursor — typography as the risk-taking centerpiece
- On desktop, the mouse itself is part of the interface: a custom cursor that names what it's over

## 2. Colors

Two full grades, not a single palette with a dark-mode patch: a warm daytime grade and a near-monochrome nighttime grade, both governed by the same roles (bg / text / accent / border).

### Primary
- **Signal Amber** (`#DDA15E` light-mode accent / `#ffffff` dark-mode accent): the one color allowed to call attention to itself — hover glows, the underline-gradient stop, the odd highlighted dot. In dark mode the "signal" role shifts to pure white against near-black, keeping the same rarity-equals-meaning logic.
- **Signal Amber Deep** (`#BC6C25`): the pressed/secondary state of the accent — used where amber needs a hover-darker sibling (e.g. the underline gradient's second stop).

### Neutral
- **Cream** (`#FEFAE0`) / **Cream Deep** (`#f0ebd1`) / **Cream Tertiary** (`#e6e2c3`): light-mode background, background-secondary, and card/tertiary surface, in ascending warmth-and-depth order.
- **Forest Ink** (`#283618`): light-mode primary text — deep, warm near-black, not pure black.
- **Olive Ink** (`#606c37`): light-mode secondary text — the muted-but-legible voice (subtitles, secondary headings).
- **Void** (`#0a0a0a`) / **Void Deep** (`#09090b`) / **Void Tertiary** (`#18181b`): dark-mode background stack, essentially true black with a whisper of zinc.
- **Paper Ink** (`#f4f4f5`) / **Mist Ink** (`#a1a1aa`): dark-mode primary/secondary text.
- **Hairline Overlay** (`rgba(255,255,255,0.05)`): the glass-badge and tag background, applied directly on media regardless of active theme — it sits on the photo, not the page.

### Named Rules
**The Signal Amber Rule.** The accent color fills no more than a sliver of any screen — a glow, a gradient stop, a single dot. The moment it becomes a background or a large fill, it stops signaling and starts decorating.

## 3. Typography

**Display Font:** `ui-serif` stack (Georgia, Cambria, Times New Roman) — Tailwind's default serif, used at bold weight.
**Body/Label Font:** `ui-sans-serif` / system-ui stack — Tailwind's default sans.
**HUD Label Font:** Lato (loaded via Google Fonts, exposed as the `--font-lato` token) — reserved for the Game of Life panel's generation counter and reset button, the one place the interface reads as an instrument readout rather than editorial copy.

**Character:** A magazine-editorial pairing: heavy tracked-tight serif for anything that should feel like a headline or a name, thin tracked-out uppercase sans for anything that should feel like a caption or a system label.

### Hierarchy
- **Display** (700, `clamp(7rem, 12vw, 17rem)`, line-height 0.9, tracking `-0.05em`): hero name, footer statement, and the 404 page's oversized numerals — the biggest gesture on the page, often paired with an italic second line.
- **Headline** (700, `clamp(2.25rem, 6vw, 4.5rem)`, line-height 1, tracking `-0.05em`): section titles (Selected Works, Experience, Education).
- **Title** (400–700, `1.5rem–2.5rem`, tight tracking): project titles and role titles within a section.
- **Body** (300, `1rem–1.25rem`, line-height 1.625): descriptions and subtitles; kept light-weight so it recedes behind the display type.
- **Label** (700, `clamp(9px, 1vw, 14px)`, tracking `0.3em`, uppercase): nav items, tags, project numbers, section eyebrows ("03 // Portfolio"); runs as small as 9px on the tightest badges (project tags, the Game of Life generation counter).

### Named Rules
**The Serif Reveal Rule.** Serif — and especially serif italic — is reserved for the emotional beat: a person's name, a section title, "Let's build / something great". It never appears in body copy, labels, or anything functional.

## 4. Elevation

Flat by default. The page itself carries no ambient shadow anywhere; separation between regions comes from a 1px `border-border-subtle` hairline, not elevation. Shadow exists in exactly one place: `shadow-2xl` under featured project media, lifting the actual work off the page. Meta chrome laid over that media (project number, tags) uses a glass treatment (`backdrop-blur` + 5% white fill + hairline border) instead of a shadow, since it's floating on top of an image rather than the flat page background.

### Shadow Vocabulary
- **Featured-media** (`box-shadow: shadow-2xl` / Tailwind's largest preset): applied only to project images and the empty-state placeholder block — never to buttons, nav, or text containers.

### Named Rules
**The Flat Stage Rule.** The page is the stage, flat and quiet; shadow is reserved for the work itself. If a shadow shows up anywhere that isn't project media, it's a design regression, not a variant.

## 5. Components

Overall feel: **confident and tactile** — every interactive element answers immediately and visibly to hover or tap; nothing fades passively.

### Buttons
- **Shape:** full pill (`rounded-full`).
- **Primary:** inverse fill — background is the theme's primary text color, text is the theme's primary background color (`px-10 py-5`, ~20px/40px padding).
- **Hover / Focus:** a solid color panel sweeps up from below (`translate-y-full → translate-y-0`) to the secondary text color, plus a `scale-105` lift on the whole button — a physical, not just tonal, response.

### Chips / Tags
- **Style:** pill shape, 5%-white fill, hairline white border, tracked-out uppercase label type at 9–10px. Rendered directly over media, theme-independent (see Hairline Overlay).

### Cards / Containers
- **Corner Style:** large radii only on featured media — `1.5rem` on mobile-scale preview panels (e.g. the Game of Life canvas), stepping up to `2rem` on standard project images and `3rem` on the empty-state / placeholder block at desktop widths.
- **Default container is not a card.** Project entries are alternating text+media rows, not boxed cards; a bordered/rounded container is reserved for empty or placeholder states only.
- **Border:** `border-border-subtle` hairline where separation is needed (footer top border, empty-state placeholder).

### Navigation
- Uppercase, tracked-out label type; the wordmark is the one serif-italic exception in the nav.
- Active/hover state is a moving 1px underline that animates its position and width to track the active section (GSAP-driven), not a static per-link underline.
- Mobile menu is a full-screen overlay with large serif links, each getting its own underline on active/hover.

### Signature Component: The Explore-Project CTA
A circular arrow button (hairline border at rest, fills solid with inverted arrow color on hover, arrow nudges right) paired with a two-line text crossfade (default label slides up and out as a duplicate, accent-colored label slides in from below). This is the template for "quiet until touched, then unmistakably alive" — apply the same logic to any new primary in-content CTA.

### Signature Component: Project Row Ghost Index
Each Selected Works entry keeps its original alternating text+media layout (image/video always visible, correctly aspect-ratio'd — portrait media stays `aspect-[9/16]` and is never cropped to landscape) and gains one addition: a huge, near-invisible serif numeral (`opacity: 0.04`, `clamp(6rem, 12vw, 14rem)`) bleeding off the row's outer edge, purely as background typography (`z-0`, `pointer-events: none`) — it never sits over or competes with the image/text content (both at `z-10`). Projects without a live link (`link: '#'`) show no CTA and no cursor affordance at all — no fake promise of somewhere to click.

**The Ghost Rule.** Decoration never costs content. If a numeral, watermark, or background flourish would require hiding the real image, description, or CTA to make room, it's the wrong flourish.

### Signature Component: Custom Cursor (desktop, fine pointer, motion-safe only)
A 6px dot plus a 40px ring replace the system cursor. The ring holds position and border by default; over a real link it fills solid and grows into an 88px pill labelled "View", over any other link it grows to 56px with a faint fill and no label. There is no "Soon" or placeholder state — a data-cursor is only ever attached where a real destination exists. Sizing is done via `scale`/`translate` on nested elements, never `width`/`height`, so it stays compositor-only. Skipped entirely on touch, coarse pointers, or `prefers-reduced-motion` — the native cursor is the fallback, not a degraded custom one.

### Signature Component: Kinetic Hero Type
The hero name splits into individual letters that snap into place (opacity + `rotateX` + scale, `power4.out`, no bounce/elastic) rather than the whole word sliding as one block — the deliberate typographic risk-take of the system. On fine-pointer, motion-safe devices the letters also lean away from the cursor as it passes near (a magnetic-type effect, same "the cursor is part of the interface" idea as the custom cursor). Reduced motion drops straight to a plain fade — same words, no rotation, no magnetism. The visible text is `aria-hidden`; a `sr-only` span carries the real string for assistive tech.

### Signature Component: Cinematic Theme Wipe
The theme toggle uses the View Transitions API to expand a circle from the button's own position, wiping the whole viewport from one grade to the other in ~500ms. Falls back to an instant swap where View Transitions aren't supported.

## 6. Do's and Don'ts

### Do:
- **Do** keep the accent (Signal Amber / white-in-dark) to accents only: glows, gradient stops, single highlighted elements.
- **Do** reserve serif italic for emotional/heading moments; keep labels, nav, and tags in tracked-out uppercase sans.
- **Do** default new sections to the alternating text+media row pattern before reaching for a card grid.
- **Do** give every interactive element a hover state that moves, fills, or slides — never a same-position opacity fade alone.
- **Do** keep shadows exclusive to featured media; use borders and blur for everything else.

### Don't:
- **Don't** ship a "generic corporate/agency" look — no boxed SaaS card grids, no template-shaped hero-plus-three-feature-cards layout.
- **Don't** add `box-shadow` to buttons, nav, or text containers; that weight belongs to project media only.
- **Don't** introduce a second accent color alongside Signal Amber; the whole system depends on there being exactly one.
- **Don't** declare a font, token, or utility class without a real caller — `Bagel Fat One`, the `Lostar` `@font-face`, and `.underline-gradient` were removed for exactly this drift; don't reintroduce assets the UI doesn't use.
- **Don't** hardcode `font-family` inline instead of going through a token (`--font-lato`, etc.); it's how markup and the design system silently drift apart.
- **Don't** ship a desktop-only mechanic (custom cursor, magnetic hero type) without its plain fallback — every one of them must degrade to a fully usable state on touch, coarse pointers, and `prefers-reduced-motion`.
- **Don't** hide a project's image, video, or description behind a hover gate to make room for a decorative flourish — media stays visible by default, always.
- **Don't** give an unlinked project (`link: '#'`) a fake CTA or cursor affordance; if there's nowhere to go, don't imply there is.
