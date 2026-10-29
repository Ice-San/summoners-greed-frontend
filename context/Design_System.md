# Summoner's Greed Social — Design System

> **What this project is:** *Summoner's Greed Social* is a fan-made community social network for players of the mobile game
> **Summoner's Greed**: posts, likes, replies, follows, profiles and news, with admin moderation.
> Stack: **React + Vite + TypeScript, TailwindCSS 4 and shadcn/ui** (frontend), Express.js + PostgreSQL (backend).
> Repos: [`summoners-greed-frontend`](https://github.com/Ice-San/summoners-greed-frontend) ·
> [`summoners-greed-backend`](https://github.com/Ice-San/summoners-greed-backend).
>
> Doc suite: [`PRD.md`](./PRD.md) · [`Architecture.md`](./Architecture.md) · `Design_System.md` (this file) · [`Agents.md`](./Agents.md).
> **Where the values come from:**
> - Pages **already built** in the frontend repo (`development` @ `4367782`: landing, sign-in, sign-up) are documented **as implemented**, marked
>   **(built)**. Where they still use hard-coded hex, §2.5 gives the token each value must become.
> - Screens **not built yet** follow the mockup <https://summonersgreed-mockup.vercel.app/>. Values were taken from its compiled CSS and class names.
> - Anything marked ***(new)*** is an addition or fix this project makes on top of both.
> Written 2026-10-08.

---

## 1. Design principles

1. **Dark, gold and purple fantasy.** A near-black violet night (`#120e16`) lit by **treasure gold** (`#ffc107`, the King's chest) and
   **summoner purple** (`#9b5de5`). Gold is for action and identity; purple is for magic and accents.
2. **Social first, familiar patterns.** The signed-in app follows the well-known microblog layout (left nav, single feed column, round "Post" button).
   Users should never have to learn the UI.
3. **Loud marketing, quiet product.** The landing page uses huge black-weight type, gradients, glows and hover scale. The app pages stay calm: flat
   surfaces, thin dividers, small muted metadata.
4. **Playful villain voice.** Copy is cheeky and in-world: "crush the King's pathetic army", "Join the Cult!", "What is happening?!". Keep it short and in
   English. Error messages stay plain and helpful.
5. **Accessible by default.** Visible focus rings, AA contrast, real buttons, reduced motion respected.

**Dark only.** The app ships a single dark theme. `<html lang="en" class="dark">` MUST be hard-coded in `index.html` (known issue F9). No light theme or
theme toggle in the MVP. Tokens are still CSS variables, so a light theme could be added later without touching components.

---

## 2. Color palette

### 2.1 Core palette (mockup + built pages)

| Token | Hex | Usage |
|---|---|---|
| `background` | `#120e16` | Page background, auth page background, input background, text on gold buttons |
| `background-deep` | `#0b080d` | **(built)** Darker band behind the landing's "Latest News" section |
| `foreground` | `#ffffff` | Main text |
| `surface` | `#1d1826` | Cards, the auth card, the navbar, avatars, dividers (`border-surface`), hover fills (`bg-surface/30`, `/50`) |
| `primary` | `#ffc107` | Brand wordmark, primary buttons, avatar initials, focus ring, links, "Lvl" badge |
| `secondary` | `#9b5de5` | Gradient partner of primary, secondary buttons, second avatar tint on the landing |
| `muted-foreground` | `#a0a0b0` | Metadata, placeholders, inactive icons (the mockup calls this `text-muted`) |
| `destructive` | `#ef4444` | Liked heart, delete buttons, error alerts |
| `success` | `#2ecc71` | Success alerts and toasts |
| `footer` | `#111111` | Footer background |
| `cta-from` → `cta-to` | `#7b2cbf` → `#5a189a` | "Join the Cult!" CTA card gradient |
| `glow-primary` | `rgba(255,193,7,.4)` | Hero CTA glow: `0 0 30px` |
| `category-patch` | `#ff6900` | **(built)** "Patch Notes" news icon (`Flame`) |
| `category-event` | `#54a2ff` | **(built)** "Event" news icon (`Calendar`) |
| `category-community` | `#05df72` | **(built)** "Community" news icon (`TrendingUp`) |

Landing-only greys from the Tailwind palette, used as built: `gray-300` (hero subtitle, post text), `gray-400` (section subtitles, post meta, action icons,
footer links), `gray-500` (dates, copyright), `gray-800` (footer divider). These MAY stay as Tailwind greys on marketing pages only. App pages use
semantic tokens (`text-muted-foreground`).

Hover colors on the landing's post actions *(built)*: comment → `hover:text-yellow-500`, like → `hover:text-red-500`, share → `hover:text-blue-500`.
In the app use tokens: comment → `hover:text-primary`, like → `hover:text-destructive`, share → `hover:text-secondary` (§5.4).

### 2.2 Semantic tokens (shadcn/ui mapping; the source of truth)

shadcn components expect the full semantic set. The mockup defined only part of it: it used `text-muted` as a text color and referenced
`text-primary-foreground` and `to-accent` without defining them. This table fixes that. **Use these names in code.**

| Token | Value | Notes |
|---|---|---|
| `--background` | `#120e16` | |
| `--foreground` | `#ffffff` | |
| `--card` / `--card-foreground` | `#1d1826` / `#ffffff` | = surface |
| `--popover` / `--popover-foreground` | `#1d1826` / `#ffffff` | menus, tooltips, dialogs |
| `--primary` / `--primary-foreground` | `#ffc107` / `#120e16` | **Text on gold is always dark** |
| `--secondary` / `--secondary-foreground` | `#9b5de5` / `#ffffff` | |
| `--muted` / `--muted-foreground` | `#1d1826` / `#a0a0b0` | ⚠️ the mockup's `text-muted` becomes **`text-muted-foreground`** |
| `--accent` / `--accent-foreground` | `#2a2235` / `#ffffff` | *(new)* hover/selected fill for menu items, dropdowns and tabs (one step lighter than surface) |
| `--destructive` / `--destructive-foreground` | `#ef4444` / `#ffffff` | |
| `--success` / `--success-foreground` | `#2ecc71` / `#120e16` | custom (not in stock shadcn) |
| `--border` | `#1d1826` | dividers and outlines on `background` |
| `--input` | `#1d1826` | input borders |
| `--ring` | `#ffc107` | focus ring |
| `--surface` | `#1d1826` | custom alias kept for parity with the mockup (`bg-surface/30` etc.) |
| `--background-deep` | `#0b080d` | custom (landing news band) |
| `--footer` | `#111111` | custom |
| `--cta-from` / `--cta-to` | `#7b2cbf` / `#5a189a` | custom |
| `--category-patch` / `--category-event` / `--category-community` | `#ff6900` / `#54a2ff` / `#05df72` | custom (news categories) |
| `--radius` | `0.5rem` | gives `rounded-md` 6px · `rounded-lg` 8px · `rounded-xl` 12px, the mockup's values (§4) |
| `--shadow-glow-primary` | `0 0 30px rgb(255 193 7 / 0.4)` | hero CTA glow |

On surface-colored cards, borders use **`border-white/5`**, with **`border-white/10`** on hover or emphasis. Don't use `border-border` there: it's the same
color as the card and would disappear.

### 2.3 How the tokens are wired (`src/globals.css`)

Tailwind v4 is set up CSS-first through the `@tailwindcss/vite` plugin; there is no `tailwind.config.js`. Today the file only imports Tailwind and has a
Geist font rule (F8). The target structure, in this order:

| Part | Content |
|---|---|
| Imports | `tailwindcss`, then `tw-animate-css` (installed together with shadcn/ui) |
| Dark variant | a custom `dark` variant matching elements inside `.dark` |
| `:root` variables | every token in §2.2 with its value, plus `--font-geist-sans` (`"Geist", ui-sans-serif, system-ui, sans-serif`) and `--font-geist-mono` (`"Geist Mono", ui-monospace, monospace`) |
| `@theme inline` | `--font-sans` / `--font-mono` → the Geist variables; **every color variable mapped to `--color-<name>`** so Tailwind generates `bg-<name>`, `text-<name>`, `border-<name>` utilities; radius scale `--radius-sm` = radius − 4px, `--radius-md` = radius − 2px, `--radius-lg` = radius, `--radius-xl` = radius + 4px; `--shadow-glow-primary` |
| Base layer | every element gets `border-border` and `outline-ring/50`; `body` gets `bg-background text-foreground antialiased` |

### 2.4 Contrast (WCAG 2.1)

| Pair | Ratio | Result |
|---|---|---|
| `#ffffff` on `#120e16` | ≈ 19:1 | AAA |
| `#a0a0b0` (muted-foreground) on `#120e16` | ≈ 7.4:1 | AAA |
| `#a0a0b0` on `#1d1826` | ≈ 6.7:1 | AA (AAA large) |
| `#ffc107` on `#120e16` | ≈ 11.7:1 | AAA |
| `#120e16` on `#ffc107` (primary button) | ≈ 11.7:1 | AAA |
| `#ffffff` on `#9b5de5` | ≈ 4.1:1 | AA **large/bold only**: text on secondary must be ≥ 18.66 px bold or ≥ 24 px |
| `#ffffff` on `#ef4444` | ≈ 3.8:1 | AA large only: destructive buttons use `font-semibold` |

Never put white text on gold, and never gold text on white.

### 2.5 Hard-coded hex → token (migration of the built pages)

The landing, sign-in and sign-up pages use arbitrary hex values today (known issue F6). New code MUST use tokens; existing classes are migrated with this
table in one cleanup ticket.

| Built class | Token class |
|---|---|
| `bg-[#120e16]`, `text-[#120e16]`, `border-[#120e16]` | `bg-background`, `text-primary-foreground` (on gold), `border-background` |
| `bg-[#1d1826]`, `bg-[#1d1826]/50`, `/95`, `/20` · gradient stops `from-[#1d1826]/55`, `to-[#1d1826]` | `bg-surface`, `bg-surface/50`, `/95`, `/20` · `from-surface/55`, `to-surface` |
| `bg-[#0B080D]/90` | `bg-background-deep/90` |
| `bg-[#ffc107]`, `text-[#ffc107]`, `focus:ring-[#ffc107]`, `bg-[#ffc107]/20`, `bg-[#ffc10733]/…`, `from-[#ffc107]` | `bg-primary`, `text-primary`, `focus-visible:ring-ring`, `bg-primary/20`, `from-primary/20`, `from-primary` |
| `bg-[#9b5de5]/20`, `to-[#9b5de5]`, `via-[#9b5de533]/…` | `bg-secondary/20`, `to-secondary`, `via-secondary/20` |
| `text-[#a0a0b0]`, `placeholder:text-[#a0a0b0]` | `text-muted-foreground`, `placeholder:text-muted-foreground` |
| `text-[#FFFFFF]` | `text-foreground` |
| `bg-[#111111]` | `bg-footer` |
| `from-[#7B2CBF] to-[#5A189A]` | `from-cta-from to-cta-to` |
| `shadow-[0_0_30px_rgba(255,193,7,0.4)]` | `shadow-glow-primary` |
| lucide `color="#ffc107"` / `"#9b5de5"` / `"#ff6900"` / `"#54a2ff"` / `"#05df72"` props | `className="text-primary"` / `text-secondary` / `text-category-patch` / `text-category-event` / `text-category-community` |
| `text-background` (undefined today, F7) | `text-primary-foreground` |
| `via-slate-950/90` (hero overlay) | `via-background/90` |
| `hover:text-yellow-500` / `group-hover:text-yellow-400` / `hover:text-yellow-300` | `hover:text-primary` / `group-hover:text-primary` |

---

## 3. Typography

- **Fonts:** **Geist** (UI and display), loaded from **Google Fonts** in `index.html` as built (weights 100–900, normal + italic, with `preconnect` to
  `fonts.googleapis.com` / `fonts.gstatic.com`). **Geist Mono** (code, IDs) is optional and can be added to the same link when needed.
- **Applying the font:** once, through `--font-sans` in `@theme` (§2.3), so every element gets it, including `input`, `textarea`, `label` and `li`.
  The current selector-list rule in `globals.css` misses form fields and MUST be replaced (F8). `antialiased` on `<body>`.
- **Weights in use:** 400 normal · 500 medium · 700 bold · 800 extrabold · 900 black.

| Role | Classes | Example |
|---|---|---|
| Hero display | `text-5xl md:text-8xl font-black tracking-tight leading-tight drop-shadow-lg` | "ENTER THE WORLD OF SUMMONER'S GREED" |
| Hero gradient word | `text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary` | "SUMMONER'S GREED" |
| Hero subtitle | `text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed` **(built)** | |
| Section title | `text-3xl md:text-5xl font-extrabold text-white` **(built)** | "Community Feed" |
| Section subtitle | `text-xl text-gray-400` | "See what other summoners are sharing." |
| Sticky header title (app) | `text-xl font-bold` | username in the profile header |
| News page title | `text-3xl font-extrabold uppercase tracking-tight inline-block border-b-4 border-destructive pb-2` | "LATEST NEWS" (red underline) |
| Dashboard title | `text-3xl font-bold` | "Admin Dashboard" |
| Auth card title | `text-2xl font-bold tracking-tight text-primary` | "Welcome back" |
| Card title | `text-xl font-bold` (`group-hover:text-primary`) | news card |
| Brand wordmark | `text-xl font-bold tracking-tight text-primary` | "Summoner's Greed" |
| Sidebar nav item | `text-xl font-bold` | "Home" |
| Post body | `text-[15px] text-foreground whitespace-pre-wrap` | |
| Display name (username) | `font-bold text-foreground` (`hover:underline` when it's a link) | "The King" |
| Metadata | `text-sm text-muted-foreground` | "@theking · Oct 8" |
| Micro | `text-xs text-muted-foreground` | comment timestamp, pills, character counter |
| Stat number | `text-2xl md:text-4xl font-black` | "+10M" |

UPPERCASE is used only on the hero (and the News page title). Everywhere else, use sentence or title case exactly as in the mockup copy.
The **username** (display name) is always shown in bold; the **userTag** is always shown muted with an `@` prefix, never alone.

---

## 4. Spacing, radius, elevation, layout grid

- **Spacing** uses the Tailwind 4 px scale (`--spacing: .25rem`). Common values: `gap-2/3/4`, `p-3/4/6`, `px-6`, `py-24` (landing sections), `mb-4/8`.
- **Radius scale**

| Radius | Use |
|---|---|
| `rounded-md` | inputs, default buttons, inline badges |
| `rounded-lg` | comment bubbles, dashboard rows |
| `rounded-xl` | white CTA button, auth card, news images, edit-profile box |
| `rounded-2xl` | floating navbar, landing showcase card |
| `rounded-3xl` | CTA card, landing feed preview cards |
| `rounded-full` | avatars, pill CTAs, app "Post" buttons, sidebar items (hover pill), icon hit areas, reply input, category pills |

- **Elevation:** flat by default. `shadow-lg` (navbar, floating Post button), `shadow-md` (nav CTA), `shadow-2xl` (CTA card) and `shadow-glow-primary`
  (hero CTA) only. `backdrop-blur-md` + `bg-background/80` for floating/sticky glass bars; `backdrop-blur-sm` on translucent cards.
- **Containers:** `max-w-7xl` app shell · `max-w-6xl` landing navbar and sections · `max-w-4xl` showcase card, News, Dashboard · `max-w-2xl` feed and
  profile column · `max-w-sm` auth card.
- **Grids (bento-style tiles):** stats use equal tiles in `grid grid-cols-2 md:grid-cols-4 gap-4` (showcase) or `gap-6` (CTA card); landing news uses
  `grid md:grid-cols-3 gap-6`; landing feed preview uses `grid lg:grid-cols-2 gap-8`. Tiles in one grid share radius, padding and border. App pages
  use single columns, not grids.
- **Breakpoints (Tailwind defaults):** `sm 40rem` · `md 48rem` · `lg 64rem` · `xl 80rem` · `2xl 96rem`. The sidebar appears at **`lg`**. The hero type
  scales at **`md`**. Everything MUST work from 360 px to 1920 px.

---

## 5. Component specifications (shadcn/ui + project components)

Install with the shadcn CLI into `src/components/ui/`. Customize through the tokens and the variants below; pass `className` for one-off compositions.

### 5.1 Button

Base: `inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50`

| Variant | Classes | Used for |
|---|---|---|
| `default` | `bg-primary text-primary-foreground hover:bg-primary/90` | Log In, Sign Up, Post, Follow, Save Changes, Publish |
| `secondary` | `bg-secondary text-secondary-foreground hover:bg-secondary/80` | rare purple actions |
| `outline` | `border border-border bg-background hover:bg-surface hover:text-foreground` | Edit Profile, Following, inactive dashboard tab |
| `ghost` | `hover:bg-surface hover:text-foreground` | icon buttons (trash), Cancel |
| `link` | `text-primary underline-offset-4 hover:underline` | "Sign up", "Log in" |
| `destructive` | `bg-destructive text-destructive-foreground font-semibold hover:bg-destructive/90` | Confirm Delete |

| Size | Classes |
|---|---|
| `sm` | `h-9 px-3` |
| `default` | `h-10 px-4 py-2` |
| `lg` | `h-11 px-8` |
| `icon` | `h-10 w-10` |

**States:** hover as in the table · focus-visible ring (base) · disabled at 50% opacity · pending (submitting): disabled plus a `Loader2 animate-spin w-4 h-4`
icon before the label, label unchanged *(new)*.

**Project compositions** (pass as `className`; don't create new variants):
- **Pill CTA (app):** `rounded-full px-6 font-bold`. Composer "Post".
- **Sidebar Post:** `w-full mt-4 rounded-full font-bold text-lg py-6`.
- **Hero CTA:** `size="lg" rounded-full px-12 py-8 text-xl font-black shadow-glow-primary motion-safe:hover:scale-105 transition-transform duration-300`.
- **Nav CTA:** `size="sm" rounded-full px-6 font-bold shadow-md motion-safe:hover:scale-105 transition-transform`. "Let's Start".
- **White CTA (on the purple card):** `bg-white text-black rounded-xl px-8 py-3 font-bold hover:bg-gray-100`. "Join the Cult!"

### 5.2 Input / Textarea
- **Input:** `flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50`
- **Error state:** `aria-invalid="true"` + `border-destructive`, with the message below in `text-sm text-destructive` linked by `aria-describedby`.
- **Textarea:** same as Input, with `min-h-[80px]`.
- **Composer textarea** (borderless): `border-none bg-transparent resize-none p-0 mt-1 min-h-[60px] text-xl placeholder:text-muted-foreground focus-visible:ring-0`.
- **Reply input** (pill): `rounded-full px-4 bg-surface/50 border-none focus-visible:ring-1 focus-visible:ring-primary`.
- **User tag input** *(new)*: a normal Input with a fixed, non-editable `@` adornment on the left (`text-muted-foreground`), so users type the userTag
  without the `@`. Typed `@` characters are stripped and the value is lowercased as the user types.
- Labels use shadcn `Label` styled `text-sm text-muted-foreground mb-1 block`, above the field.

### 5.3 Avatar
The mockup has no images. Each user gets a circle with the **first letter of their username**:
`rounded-full bg-surface flex items-center justify-center font-bold text-primary shrink-0`.

| Size | Classes | Where |
|---|---|---|
| xs | `w-6 h-6 text-xs` | comments |
| md | `w-10 h-10 text-lg` | feed, composer, sidebar chip |
| xl | `w-32 h-32 text-4xl border-4 border-background` | profile header, overlapping the banner (`-mt-16` on its row) |

Use shadcn `Avatar` + `AvatarFallback` so real images (Phase 2) can be added later. Interactive avatars get `hover:opacity-80`.

### 5.4 Post card (`feed/post-card`)
```
<article class="p-4 flex gap-3 hover:bg-surface/30 transition-colors">     (list: divide-y divide-surface)
  Avatar md (link to /profile/:userTag)
  <div class="flex-1 min-w-0">
    header: username (font-bold hover:underline) · @userTag · date   → text-sm text-muted-foreground, truncate
    body:   <p class="mt-1 text-[15px] whitespace-pre-wrap">
    actions: <div class="flex items-center gap-3 mt-3 w-[85%] text-muted-foreground">
```
**Action buttons** each have an `aria-label` and an icon in a `p-2 rounded-full` hit area, with the count next to it (only when > 0):

| Action | Icon (lucide) | Idle | Hover | Active |
|---|---|---|---|---|
| Reply | `MessageSquare` (as built on the landing) | muted | `text-primary`, circle `bg-primary/10` | reply panel open |
| Like | `Heart` | muted | `text-destructive`, circle `bg-destructive/10` | `text-destructive` + `fill-current`, `aria-pressed="true"` |
| Share | `Share2` (as built on the landing) | muted | `text-secondary`, circle `bg-secondary/10` | toast "Link copied" |
| More *(new)* | `MoreHorizontal` | muted | `bg-accent` | menu: Delete (own post / admin) |

**Reply panel** (below the actions): `mt-4 border-t border-surface pt-4`. It holds the pill input "Post your reply" plus a `size="sm" rounded-full px-4`
Reply button, then the comments (oldest first): `flex gap-2` with an xs avatar and a bubble `flex-1 bg-surface/30 p-2 rounded-lg`. Comment header:
`font-bold` username + `text-xs text-muted-foreground` time. Own comments (or any, for admins) show a small ghost `Trash2` button.

### 5.5 Composer (`feed/composer`)
`p-4 border-b border-surface flex gap-4`: avatar md, borderless textarea "What is happening?!", footer `flex justify-end items-center gap-3 border-t border-surface pt-3`
with a pill Post button, disabled while the text is empty or whitespace. *(new)* A character counter (`text-xs text-muted-foreground`, turning
`text-destructive` past 500) sits left of the button; past 500 the button is disabled too.

### 5.6 Sticky page header (app)
- **Feed:** `sticky top-0 z-10 p-4 border-b border-surface bg-background/80 backdrop-blur flex gap-4`, with a single tab "For you"
  (`flex-1 font-bold text-lg text-center`). The active tab is underlined `border-b-2 border-primary`, same as the profile "Posts" tab.
- **Profile:** `sticky top-0 z-10 p-4 bg-background/95 backdrop-blur flex items-center gap-4`, with the username `text-xl font-bold` over
  `text-sm text-muted-foreground` "N posts".
- The mockup uses `top-16` offsets even though the app pages have no top bar. We use `top-0` *(fix)*.

### 5.7 News card (`news/news-card`, the `/news` page)
A horizontal row with no card background: `flex flex-col md:flex-row gap-6 group`. The list uses `space-y-8`.
- Image: `w-full md:w-1/3 aspect-video relative rounded-xl overflow-hidden bg-surface shrink-0`, holding an
  `<img class="absolute inset-0 h-full w-full object-cover transition-transform duration-500 motion-safe:group-hover:scale-105" loading="lazy">`.
  No `imageUrl` → `/imgs/news-fallback.webp`.
- Body `flex flex-col flex-1 justify-center`: title `text-2xl font-bold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors`,
  content `text-muted-foreground leading-relaxed line-clamp-2 mb-4`, then the meta row `flex items-center gap-3 text-sm font-medium`: "Admin" in
  `text-primary`, a `|` separator at `opacity-30`, and the date with a `Clock w-4 h-4` icon in `text-muted-foreground`.
- **Landing variant (built):** `group flex flex-col p-6 rounded-xl bg-surface/50 border border-white/5 cursor-pointer`.
  - Top row `flex items-center justify-between mb-7`. Left: an **icon tile** `p-3 bg-black rounded-xl transition group-hover:scale-110` holding the
    category icon (`Flame` / `text-category-patch`, `Calendar` / `text-category-event`, `TrendingUp` / `text-category-community`). Right: a
    **category pill** `px-3 h-5 rounded-2xl text-xs font-bold bg-white/5 text-gray-400` ("Patch Notes", "Event", "Community").
  - Title `text-xl font-bold text-white pb-5 group-hover:text-primary`, then the date `text-sm text-gray-500` ("July 18, 2026").
  - All three cards MUST share the same hover. Today only the first one also has `hover:bg-surface/20 hover:text-yellow-300`; drop it or apply it to all three.

### 5.8 Profile header (`profile/profile-header`)
- Banner: `h-48 w-full bg-surface`. (The landing showcase uses the gradient `bg-linear-to-r from-primary/20 via-secondary/20 to-surface`; the mockup wrote
  `to-accent/20` with an undefined accent *(fix)*.)
- Below the banner, a `px-4 pb-4` block with a row `flex justify-between items-start -mt-16 mb-4`: the xl avatar on the left; on the right
  `Edit Profile` (outline) on your own profile, otherwise `Follow` (default) / `Following` (outline, `w-32`). All `rounded-full font-bold`.
  *(new)* On hover, "Following" reads "Unfollow" in `text-destructive`. The Follow toggle exposes `aria-pressed`.
- Info: username `text-2xl font-bold text-foreground`, `@userTag` `text-muted-foreground`, bio `mt-4 whitespace-pre-wrap`.
  Meta row `flex items-center gap-4 mt-4 text-sm text-muted-foreground`: "Twitter: @x" (`text-primary hover:underline`, opens in a new tab with
  `rel="noopener noreferrer"`) and `Calendar` + "Joined October 2026". Counts row `flex items-center gap-4 mt-4 text-sm`: the number in
  `text-foreground font-bold`, the label muted.
- **Edit mode** replaces the info with a box `space-y-4 mb-6 p-4 border border-surface rounded-xl`. Fields, each with a `text-sm text-muted-foreground mb-1 block` label:
  **Username** (Input), **User tag** (User tag input, §5.2), **Bio** (Textarea, counter /160) and **Twitter/X Username** (placeholder "@username").
  Field errors in `text-sm text-destructive` (e.g. "This user tag is already taken."). Save Changes is `w-full`; Cancel is ghost.
- Tabs bar: `border-b border-surface flex`. The active tab is `flex-1 py-4 text-center font-bold border-b-2 border-primary text-foreground` ("Posts").
- **Not found:** centered `p-8 text-center`: "User not found" (`text-xl font-bold`) and a link "Back to Home" → `/home`.
- **Landing showcase variant (built):** card `flex flex-col w-full bg-black/50 rounded-2xl border border-white/5` inside `max-w-4xl`.
  - Banner `h-40 rounded-t-2xl relative bg-linear-to-r from-primary/20 via-secondary/20`.
  - Avatar at `absolute -bottom-16 left-8`, in a ring `p-2 bg-background rounded-full` around `w-28 h-28 rounded-full bg-primary/20 border-4 border-background`
    with a `User` icon in `text-primary`.
  - Body `pt-20 px-8 pb-8`: name `text-3xl font-black text-white flex items-center gap-3` with the level badge
    `bg-primary/20 text-primary text-xs p-1 rounded-md border border-primary/20` ("Lvl 120"), subline `text-gray-400 text-lg mt-1` "@grandmaster • Top 1% Summoner".
  - Follow button `rounded-md bg-primary text-primary-foreground hover:bg-primary/80 h-10 w-30`. Bio `text-gray-300 text-lg mb-8 max-w-2xl`.
  - Stats tiles `p-4 rounded-2xl bg-white/5 border border-white/5 text-center` in the bento grid (§4): value `text-white font-black text-xl`, label
    `text-gray-400 text-sm font-medium` (Highest Stage, Mythicals, Followers, Posts).

### 5.9 Admin dashboard
- Page container: `w-full max-w-4xl mx-auto p-4 md:p-8`.
- Title row: `flex items-center gap-3 mb-8 border-b border-surface pb-4`, with `Shield` (`w-8 h-8 text-primary`) and `h1 text-3xl font-bold` "Admin Dashboard".
- Tabs: a button group `flex gap-4 mb-8` (active = `default`, inactive = `outline`), built on shadcn `Tabs` for keyboard support. Labels: "Manage Users",
  "Moderate Posts", "Publish News". Section titles `text-xl font-bold mb-4` ("Users List (N)", "All Posts (N)").
- Manage Users has a search Input above the list (placeholder "Search by username or tag", debounced 300 ms) *(new)*.
- Lists: `grid gap-4`. Each row is `p-4 bg-surface rounded-lg border border-surface flex items-center justify-between` (post rows use `items-start gap-4`).
  User row: `font-bold` username + `text-muted-foreground font-normal` @userTag, then `text-sm text-muted-foreground` "Role: user | Followers: 3".
  Post row: `text-sm text-muted-foreground mb-2` "By {username} on {date}", then the content.
  Delete: a ghost icon button with `Trash2`, `text-destructive hover:bg-destructive/10`, opening an **AlertDialog** ("Are you sure?" / Cancel /
  Confirm Delete) *(fix: the mockup confirms inline)*. On the current admin's own row the button is disabled, with the tooltip "You cannot delete yourself."
- News form: `bg-surface p-6 rounded-xl border border-surface max-w-2xl space-y-4`. Labels `text-sm text-muted-foreground block mb-1`. Fields: Title
  (placeholder "Patch 1.6.0 Notes..."), Content (Textarea `min-h-[150px]`, "Details of the announcement..."), Image URL (optional, `https://` only) *(new)*.
  Submit "Publish to News Feed" is `w-full`.

### 5.10 Feedback
- **Toasts** *(new; replaces the mockup's inline flash)*: shadcn `Sonner`, bottom-right on desktop and top-center on mobile. Success uses the `success`
  accent; error uses `destructive`. Copy: "User deleted successfully.", "Post deleted successfully.", "News published successfully!", "You cannot delete
  yourself.", "This user tag is already taken.", "This email is already registered.", "Invalid email or password", "Link copied",
  "Welcome, @{userTag}! You can change your tag in your profile.", and the generic "Something went wrong. Try again."
- **Inline alert** (form-level): `p-4 rounded-md border bg-destructive/20 border-destructive text-destructive`, or the success equivalent.
- **Empty states:** centered `p-8 text-center text-muted-foreground`: "No news at the moment.", "@{userTag} hasn't posted anything yet.",
  *(new)* "No posts yet. Be the first summoner to speak!" (empty feed), "No users match your search." (dashboard).
- **Loading** *(new)*: shadcn `Skeleton` (`bg-surface animate-pulse`) shaped like the content (post card: circle + 3 lines).
- **Error state** *(new)*: centered muted text "Couldn't load this. " + a `link`-variant "Try again" button that refetches.

---

## 6. Page layouts

### 6.1 Marketing navbar (landing, built)
`<header class="fixed inset-x-0 top-4 z-10 flex justify-center items-center font-bold">` wraps an inner bar
`flex justify-between items-center px-6 mx-2 h-16 w-full md:w-3/5 min-w-50 bg-surface/95 rounded-xl`.
Left: the brand wordmark "Summoner's Greed" (links to `/`). Right: the nav CTA "Let's Start", which MUST link to `/signin` (F4).

### 6.2 Landing page `/` (built: `src/pages/home/index.tsx`, to become `pages/landing`)
The page is `relative min-h-screen overflow-hidden bg-background`. Sections in order:
1. **Hero:** `flex h-dvh w-full flex-col items-center justify-center`, background `bg-[url('/imgs/banner.webp')] bg-cover bg-center` under an overlay
   `bg-linear-to-b from-surface/55 via-background/90 to-surface pt-25`. Content fades and scales in (§9). Centered `space-y-8 max-w-6xl`: H1 "ENTER THE WORLD OF" +
   gradient "SUMMONER'S GREED" (§3), subtitle "Connect with fellow Summoners, share your ultimate monster grids, discover the meta, and crush the King's
   pathetic army together." (`mb-15`), and the hero CTA "Let's Start!" (`rounded-md px-6 py-5 w-50 text-xl bg-primary text-primary-foreground
   shadow-glow-primary motion-safe:hover:scale-105 transition-transform duration-300`), which MUST link to `/signup`.
2. **Community Feed:** `py-14 bg-background`, container `max-w-7xl mx-auto px-4`. Header block `flex flex-col gap-4 h-50 md:w-2/3`. Two sample post cards in
   `grid lg:grid-cols-2 gap-8`, each `p-6 rounded-3xl bg-surface/50 border border-white/5 backdrop-blur-sm space-y-6`:
   - Author row `flex gap-3`: icon avatar `h-12 w-12 rounded-full bg-primary/20` (or `bg-secondary/20`) with a `User` icon, the name `text-white font-bold text-xl`,
     meta `text-gray-400` "@summoner99 • 2h ago".
   - Body `text-gray-300 text-lg md:text-xl leading-relaxed`. The first card adds a grid screenshot `h-130 rounded-3xl bg-[url('/imgs/sg.jpg')] bg-cover bg-center`.
   - Actions `flex gap-5 border-t border-white/5 pt-3`: `MessageSquare` + count, `Heart` + count, `Share2`, in `text-gray-400`; hover to primary / destructive / secondary.
3. **Latest News:** `pb-20 md:p-15 bg-background-deep/90`. Header row: "Latest News", "Patch notes, events, and updates.", and on the right "View All News"
   (`text-primary p-2 rounded-lg hover:bg-gray-500/10`, SHOULD link to `/signin`). Three landing news cards (§5.7) in `grid md:grid-cols-3 gap-6`:
   "Patch 3.2.0: The Mythical Uprising" · "Summer Event: Beach Party Bosses" · "Meta Shift: Why Slime King is Back".
4. **Player Profiles:** `pb-20 md:p-15 bg-background`, `max-w-4xl mx-auto`, centered header ("Player Profiles" / "Showcase your achievements and stats.") and the showcase card (§5.8).
5. **Footer** `w-full bg-footer text-white mt-auto`, in two parts:
   - **Join CTA** in `max-w-6xl mx-auto px-4 pt-16 pb-8`: card `bg-linear-to-br from-cta-from to-cta-to rounded-3xl p-8 md:p-12 flex flex-col items-center text-center shadow-2xl`.
     Title "Join Summoner's Greed Community" (`text-3xl md:text-5xl font-black drop-shadow-md`), copy (`text-white/90 text-lg md:text-xl mb-8 max-w-2xl`),
     the white CTA "Join the Cult!" (MUST link to `/signup`), then the stats bento row `grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 border-t border-white/20 pt-8`
     (value `text-2xl md:text-4xl font-black`, label `text-sm md:text-base text-white/80`): +10M Players Worldwide · +2M Community Posts · +500K Active Summoners · +100 Monsters to Collect.
   - **Links** in `container mx-auto px-4 py-12`, `grid grid-cols-1 md:grid-cols-4 gap-8`: brand column (`md:col-span-2`), **Explore** (Homepage, How It Works?,
     Frequently Asked Questions, Contact) and **Legal** (User Agreement, Privacy Policy, Cookie Policy); headings `font-bold text-lg mb-4`, links
     `text-sm text-gray-400 hover:text-white`. Bottom bar `mt-12 pt-8 border-t border-gray-800 text-xs text-gray-500 flex flex-col md:flex-row justify-between`
     with the © line and `Mail` + info@summonersgreed.com.

### 6.3 Auth pages `/signin`, `/signup` (built: `src/pages/signin`, `src/pages/signup`)
- Page `<main class="bg-background flex items-center justify-center p-4 w-full h-dvh">`, card `<section class="bg-surface rounded-xl space-y-6 p-8 w-full max-w-sm min-w-75">`.
- Header `text-center space-y-2`: title `text-2xl font-bold tracking-tight text-primary` ("Welcome back" / "Create an account") and subtitle `text-sm text-muted-foreground`
  ("Enter your credentials to access your account" / "Join the Summoner's Greed community").
- Form `space-y-4`. Inputs (built, borderless): `bg-background text-foreground h-10 w-full rounded-md px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none`.
  - **Sign-in fields:** Email (`type="email"`, `autocomplete="email"`), Password (`type="password"`, `autocomplete="current-password"`).
  - **Sign-up fields:** Email, **Username** (placeholder "Username (e.g. The King)", `autocomplete="nickname"`), Password (`autocomplete="new-password"`).
    The built page has a Tag field instead of Username; it MUST be replaced (F18). Below the Username field, a micro hint *(new)*:
    "Your @tag is created from this. You can change it later."
  - **Required changes:** password `type="password"`, email `type="email"`, visually-hidden labels, `focus-visible:` instead of `focus:`, field errors
    `text-sm text-destructive` under each input, a form error above the submit (F1, F2).
- Submit: `h-10 w-full rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90` ("Log In" / "Sign Up"), with the pending state (§5.1).
- **Remove** the "Or continue with" text and the "Google" / "X.com" buttons (PRD D10, F17). The card goes straight from the submit button to the footer link.
- Footer `text-center text-sm text-muted-foreground`: "Don't have an account? " + "Sign up" (`text-primary font-medium hover:underline`); on sign-up
  "Already have an account? " + "Log in". These MUST be router `<Link>`s (F3).

### 6.4 App shell (signed-in pages)
```
<div class="min-h-screen bg-background">
  <div class="max-w-7xl mx-auto flex">
    <aside class="w-64 hidden lg:flex flex-col justify-between sticky top-0 h-screen p-4 border-r border-surface"> … </aside>
    <main  class="flex-1 min-w-0 pb-16 lg:pb-0"> <Outlet/> </main>            (each page sets its own column, §6.5)
  </div>
  <nav class="lg:hidden fixed bottom-0 inset-x-0 h-16 bg-background/95 backdrop-blur border-t border-surface flex justify-around"> … </nav>  (new)
</div>
```
The mockup's sidebar is `sticky top-16 h-[calc(100vh-4rem)]` with no top bar; we use `top-0 h-screen` *(fix)*.
- **Sidebar:** brand wordmark at the top *(new)*. Nav items `flex items-center gap-4 p-3 rounded-full text-xl font-bold hover:bg-surface/50 transition`
  with `w-6 h-6` icons: `Home` "Home" · `Search` "Explore News" · `User` "Profile" · `Shield` "Dashboard" (admin only). *(new)* The active item gets
  `text-primary` and `aria-current="page"`. Then the Sidebar Post button. At the bottom (`mt-auto`), the **user chip** `button`:
  `flex items-center gap-3 p-3 rounded-full hover:bg-surface/50` with avatar md, username (`font-bold truncate`), @userTag
  (`text-sm text-muted-foreground truncate`) and a `LogOut` icon. It opens a DropdownMenu with "Log out @{userTag}" (PRD D16).
- **Mobile tab bar (`< lg`)** *(new; PRD D15)*: icon-only links (same icons, with `aria-label`), the active one in `text-primary`, and a floating Post button
  `fixed bottom-20 right-4 h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-lg` (icon `Feather`, `aria-label="New post"`).

### 6.5 Feed, News, Profile, Dashboard
These render inside `main`. Each page sets its own column width, as in the mockup:
- **Feed:** column `flex-1 max-w-2xl border-r border-surface min-h-screen`: sticky header (§5.6), composer (§5.5), a `divide-y divide-surface` post list and an infinite-scroll sentinel.
- **Profile:** column `flex-1 w-full max-w-2xl mx-auto border-x border-surface`: sticky header, profile header (§5.8), the "Posts" tab bar and the post list.
- **News:** container `flex-1 w-full max-w-4xl mx-auto p-4 md:p-8 min-h-screen`: title block `mb-8` (News page title, §3) and the news rows `space-y-8` (§5.7).
- **Dashboard:** container `flex-1 w-full max-w-4xl mx-auto p-4 md:p-8`: title, tabs and panels (§5.9).

---

## 7. Iconography
- **lucide-react** only. Sizes: `w-4 h-4` (post actions), `w-5 h-5` (inline/meta), `w-6 h-6` (navigation), `w-8 h-8` (page title icon). Stroke width 2 (default).
- Icons in use. **(built):** `User`, `MessageSquare`, `Heart`, `Share2`, `Flame`, `Calendar`, `TrendingUp`, `Mail`. Planned: `Home`, `Search`, `Shield`,
  `LogOut`, `Trash2`, `Clock`, `MoreHorizontal`, `Feather`, `Loader2`.
- Color icons with `className` and tokens (`className="text-primary"`), not the `color="#…"` prop the landing uses today (§2.5). Size them with classes
  (`w-6 h-6`) rather than the `size={30}` prop.
- Emoji are allowed inside user content and marketing copy (🔥 😭). Don't use emoji as UI icons.

## 8. Imagery
- Static assets live in the frontend repo's `public/imgs/` **(built)**: `banner.webp` (hero key art, under a dark gradient) and `sg.jpg` (grid screenshot on
  the landing feed card). Prefer `.webp` for new images.
- News images are 16:9 and `object-cover`. The fallback is a local `/imgs/news-fallback.webp` (to add; PRD D8).
- Use plain `<img>` with `loading="lazy"` (except the hero), explicit `width`/`height` or an aspect-ratio box to avoid layout shift, and meaningful `alt` text
  (the news title, "Monster grid setup by @{userTag}", …).

## 9. Motion
- **Library:** **framer-motion** (installed, used on the landing) for entrance and scroll animations. Tailwind transitions for hover/focus.
- **Entrance patterns (built):**

  | Element | Motion |
  |---|---|
  | Hero content | `opacity 0 → 1`, `scale 0.8 → 1`, 0.6 s, `easeOut`, delay 0.2 |
  | Feed preview cards | in view: slide up (`y: 70 → 0` / `20 → 0`), 0.3 s, staggered by 0.4 s, once |
  | News cards | in view: `y: [40, 15, 15, 0]`, 0.6 s `easeOut`, staggered 0 / 0.2 / 0.3 s |
  | Profile showcase | in view: `scale 0.9 → 1`, 0.3 s `easeInOut` |

  In-view animations run **once** (`viewport once`) so sections don't re-animate on scroll back. Durations stay at or under 0.6 s.
- **Hover:** default `transition-colors` 150 ms. Cards `transition-all duration-300`; image zoom `duration-500 group-hover:scale-105`. The landing's link and
  icon hovers use `transition-colors delay-75 ease-in` (built).
- **CTAs:** `hover:scale-105` on the landing only. The app UI doesn't scale on hover.
- **Like** *(new)*: a quick `scale-125 → 100` pop on activation (≤ 200 ms).
- **New post** *(new)*: the post the user just created fades in at the top of the feed (opacity 0 → 1, 200 ms).
- **Dialogs, menus and toasts** use the shadcn defaults (`tw-animate-css`).
- **Reduced motion:** the app root sits inside framer-motion's `MotionConfig` with `reducedMotion="user"`, so transform animations are skipped when the OS
  asks for less motion (F16). CSS scale/zoom effects use `motion-safe:` (e.g. `motion-safe:hover:scale-105`).

## 10. Accessibility checklist (every component)
- Interactive elements are `button` or `a`, never a `div` with `onClick` (PRD D16).
- Icon-only buttons have an `aria-label` ("Like", "Reply", "Share", "More options", "Delete post", "New post", "Log out").
- Like and Follow toggles expose `aria-pressed`. The active nav item has `aria-current="page"`.
- Focus ring `ring-2 ring-ring ring-offset-2 ring-offset-background`, visible on every focusable element.
- Every input has a `<Label>` (MAY be `sr-only` where the design shows only a placeholder, as on the auth pages).
- Errors are announced: `aria-invalid` on the field plus `aria-describedby` pointing to the error text. Toasts use Sonner's live region.
- Minimum touch target 40×40 px (the `p-2` icon hit area plus the icon).
- Color is never the only signal: a liked heart is also filled, an active tab is also underlined.
- Automated axe check with no serious violations on every page (PRD §8).
