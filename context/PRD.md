# Summoner's Greed Social — Product Requirements (PRD)

> **What this project is:** *Summoner's Greed Social* is a fan-made community social network for players of the mobile game
> **Summoner's Greed**. Players sign up, post short updates (strategies, monster grids, event questions), like and reply to posts,
> follow other summoners, browse profiles and read official-style news (patch notes, events, maintenance). Admins moderate users
> and posts and publish news.
> Stack: **React + Vite + TypeScript, TailwindCSS and shadcn/ui** (frontend), **Express.js** REST API (backend),
> **PostgreSQL** through the `pg` package (database). Two GitHub repositories:
> [`summoners-greed-frontend`](https://github.com/Ice-San/summoners-greed-frontend) ·
> [`summoners-greed-backend`](https://github.com/Ice-San/summoners-greed-backend).
>
> **The doc suite** (read in this order): `PRD.md` (this file: what and why) · [`Architecture.md`](./Architecture.md) (how it is built, plus the
> engineering rules) · [`Design_System.md`](./Design_System.md) (how it looks) · [`Agents.md`](./Agents.md) (how AI coding agents work on the repos).
> UI/UX reference: the mockup at <https://summonersgreed-mockup.vercel.app/>.
> Docs last synced with: frontend `development` @ `4367782` · backend `development` @ `566fb7b` · written 2026-10-08.

The keywords **MUST**, **MUST NOT**, **SHOULD** and **MAY** are used as in RFC 2119. A pull request that breaks a MUST is not mergeable.

---

## 1. Problem statement and target audience

### 1.1 Problem
Summoner's Greed players share their monster grids, stage strategies and event questions in places that weren't built for it:
general-purpose Discord servers, Reddit threads and screenshots in group chats. Posts scroll away, there is no profile that shows
who a player is, and official announcements (patch notes, events, maintenance windows) are spread across several channels.
There is no single place that is *about this game* where a player can post, follow the players they learn from and read the news.

This is an **unofficial fan project**. It has no link to the game's studio, no access to game accounts and no official game API (§5.3).

### 1.2 Who it is for

| Persona | Who they are | What they need |
|---|---|---|
| **Visitor** | Someone who found the site through a link, curious about the game or the community. Not signed in. | See what the community is about in under a minute and create an account quickly. |
| **Summoner** (signed-in user) | An active player. Checks the app a few times a week, often on a phone. Example: *The King* (`@theking`), who wants his chest back. | Post a strategy or question in seconds, react to others, follow strong players, keep a profile with a bio and a Twitter/X handle, read the latest news. |
| **Admin** (moderator) | A trusted community member who runs the site. Example: *The Evil Summoner* (`@summoner`). | Remove abusive users and posts, publish news, and do it without touching the database. |

### 1.3 Success measures
It's a side project, so success is about the product working end to end, not about growth targets:

1. Every MVP flow in §6.2 works on a 360 px phone and a 1920 px desktop, backed by the real API and database (no `localStorage` data).
2. A new visitor can go from the landing page to their first post in **under 60 seconds**.
3. The feed's first page loads in **under 1 s** on a local/dev-class server with a small test data set, and in under 2 s in production.
4. The security baseline holds: hashed passwords, httpOnly cookie sessions, server-side permission checks, all covered by tests (§8).
5. The Playwright critical-path suite (Architecture.md §12) passes in CI.

## 2. Core value proposition

- **One home for the game's community.** Posts, profiles, follows and news in one place, all about Summoner's Greed.
- **Familiar and fast.** The well-known microblog layout (left nav, single feed column, a round Post button) means nobody has to learn the UI.
  Posting is one text box and one button.
- **In-world personality.** The dark gold-and-purple fantasy look and the villain voice ("Join the Cult!", "What is happening?!") make it feel like
  part of the game, not a generic forum.
- **Safe by default.** Unlike the mockup it is based on, accounts are real: hashed passwords, server-enforced permissions and moderation tools for admins.

## 3. Sources of truth and precedence

There are three sources: the **mockup**, the **code** in the two repositories, and **this doc suite**. When they disagree:

1. **The docs win over bugs.** Where the code breaks a rule in these docs (for example, a password field with `type="text"`), it is a known issue to fix,
   not a new convention. Known issues are listed in Architecture.md §14.
2. **The code on `development` wins over the mockup for anything already built**, and for conventions: folder layout, naming, tooling, routes, and the
   landing / sign-in / sign-up pages as implemented (except where a decision in §4 changes them, e.g. D1's sign-up fields).
3. **The mockup is the reference for screens not built yet**: feed, news, profile and admin dashboard.

The mockup is a front-end-only prototype. Every piece of its data lives in the browser's `localStorage` (`sg_users`, `sg_posts`, `sg_news`,
`sg_current_user`), passwords are stored in plain text and social login is a stub. We take its **screens, flows, copy and visual design** and rebuild the
**data and security layers properly**.

- Business data MUST live in PostgreSQL and be reached only through the Express API. The frontend MUST NOT use `localStorage`/`sessionStorage` for users,
  posts, likes, comments, follows, news or the session.
- Where the mockup is broken or contradicts itself, the **decisions in §4 win**.

## 4. Product decisions (where we deviate from the mockup)

All of these are **confirmed** (2026-10-08).

| # | Mockup behaviour | What we build instead |
|---|---|---|
| D1 | Login field says "Email" but is compared to `username`; sign-up stores the "Email" field as `username`. | Users have three separate fields: **email** (private, used to sign in), **username** (public display name, not unique, e.g. "The King") and **userTag** (public **unique** handle, e.g. `@theking`). Sign-in = email + password. **Sign-up asks for Email, Username and Password.** The API generates the userTag from the username, made unique automatically (§7.1). Users can change both username and userTag later in Edit Profile. |
| D2 | Passwords stored and compared in plain text. | Passwords MUST be hashed with **bcrypt** (the `bcrypt` package, cost factor **12**). The hash MUST never leave the backend. |
| D3 | Session = user object copied into `localStorage`. | Stateless session: a **signed JWT** (HS256, claims `sub`/`iat`/`exp`, 7 days, rolling) set by the API in an **httpOnly, Secure, SameSite=Lax cookie** (`sg_session`). There is **no `sessions` table**. Frontend JS never reads the token; it learns who is signed in from `GET /auth/me`. Sign-out clears the cookie, and a token can't be revoked before it expires (accepted trade-off). See Architecture.md §5. |
| D4 | Auth guards are client-side only (`/dashboard` hides itself for non-admins). | Every permission check MUST be enforced by the API. Frontend guards (route guards, redirects, hidden buttons) are UX only. |
| D5 | Logged-in feed lives at `/Home` (capital H). | The feed route is lowercase **`/home`**. No redirect from `/Home` is needed, since no real users arrive from mockup URLs. |
| D6 | Profile URL is `/profile/{username}`, and usernames contain spaces ("The Evil Summoner"). | Profile URL is **`/profile/:userTag`** without the `@` (e.g. `/profile/theking`). userTags are URL-safe and unique; usernames are not unique. |
| D7 | "Profile" link on the profile page points to `/`; sidebar differs per page. | One shared `AppShell` (sidebar + mobile nav) used by every signed-in page; "Profile" always goes to the current user's profile. |
| D8 | News form has no image field, but news cards show an image (Unsplash fallback). | News has an optional `imageUrl` field in the admin form. When it's empty, cards show a local fallback image from `public/imgs/` instead of a hot-linked Unsplash URL. |
| D9 | Posts use en-US dates, news uses en-GB dates. | One date helper for the whole app: relative time under 24 h ("2h ago"), otherwise `MMM d` (`MMM d, yyyy` if not the current year), **en-US**. |
| D10 | "Google" / "X.com" buttons show "authentication is a mockup for now". | **OAuth / social login is out of scope** (not MVP, not Phase 2). Email + password is the only sign-in method. The "Or continue with" divider and the Google / X.com buttons MUST be removed from `/signin` and `/signup` (known issue F17). No OAuth endpoints, tables or provider SDKs are added. |
| D11 | Share button does nothing. | Share copies the post link to the clipboard (`/home?post={id}` until a post page exists) and shows a toast. |
| D12 | Inline admin flash message that clears after 3 s. | shadcn **Sonner** toasts for success/error feedback across the app. |
| D13 | Admin "Are you sure? / Confirm Delete" inline swap. | shadcn **AlertDialog** for every destructive action. |
| D14 | Landing page (`/`) feed, news, profile and stats are hard-coded marketing content (e.g. "Patch 3.2.0", "+10M players"). | The landing page is **static marketing content** in the MVP (it's built that way). Phase 2 MAY wire "Latest News" to `GET /news?limit=3`, which would first have to become public. |
| D15 | No mobile navigation: the sidebar is hidden under `lg` and nothing replaces it. | Below `lg`, signed-in pages MUST show a bottom tab bar (Home, News, Profile, Dashboard for admins, plus a Post button). |
| D16 | Logout fires when you click anywhere on a `div` (the user chip). | The user chip MUST be a `button` that opens a dropdown menu containing "Log out". No clickable `div`s. |
| D17 | Tag saved with an `@` prefix inside the data. | userTags are stored **lowercase without `@`**. The UI always renders `@` + userTag. If a user types `@`, it is stripped. |
| D18 | The mockup's sign-in page is `/login`. | The route is **`/signin`**, as already implemented. Sign-up stays at `/signup`. API names follow it: `/auth/signin`, `/auth/signup`, `/auth/signout`. |
| D19 | No API. | The API **extends the backend's existing response shape** `{ status, message }` with `data` (and `nextCursor` for lists). Errors add `code` and optional `details`. See Architecture.md §6. |
| D20 | No API. | API routes are mounted **without an `/api` prefix**, matching the existing `app.use('/users', …)`. The frontend calls the backend's own origin (`VITE_API_URL`). |

Also confirmed: all primary keys are **UUIDs**, and the landing page component is renamed from `Home` (`pages/home`) to **`LandingPage`** (`pages/landing`)
when the feed is built (known issue F14).

## 5. Feature scope

Status markers: ✅ built (UI) · 🟡 partly built · ⬜ not started. Details in Architecture.md §14.

### 5.1 MVP: features we MUST ship

**Public**
- ✅ **Landing page `/`.** Floating navbar, hero ("ENTER THE WORLD OF SUMMONER'S GREED", CTA "Let's Start!" → `/signup`), Community Feed preview,
  Latest News preview, Player Profile showcase, and a footer with the "Join the Cult!" CTA and stats. All content is static (D14).
  *Still to do:* "Let's Start" → `/signin`; "Let's Start!" and "Join the Cult!" → `/signup` (F4).
- 🟡 **Sign up `/signup`.** Email, Username, Password (D1). The API generates the userTag (§7.1). On success the user is signed in and sent to `/home`,
  where a toast says "Welcome, @{userTag}! You can change your tag in your profile." *UI built with the old Email/Tag/Password fields; no logic yet (F18).*
- 🟡 **Sign in `/signin`.** Email + password. On success, redirect to `/home`, or to the `?next=` path if it is a safe relative path. *UI built, no logic yet.*
- ⬜ Signed-in users who visit `/`, `/signin` or `/signup` SHOULD be redirected to `/home`.

**Summoner (signed in).** Visiting any of these pages without a session redirects to `/signin?next=…`.
- ⬜ **Feed `/home`.** A "For you" tab: every post, newest first, with infinite scroll.
  - Composer "What is happening?!". The Post button is disabled while the content is empty or whitespace; a counter turns red past 500 characters.
  - On each post: like toggle (heart turns red and filled, count shown when > 0), reply toggle (input "Post your reply", Reply button, flat comment list,
    oldest first), comment count, Share (D11).
  - Delete your own post or comment (overflow menu + AlertDialog). Admins can delete any post or comment.
- ⬜ **News `/news`** ("Explore News"). Cards with image, title, content, "Admin | date", newest first. Empty state: "No news at the moment."
- ⬜ **Profile `/profile/:userTag`.** Sticky header with the username and "N posts"; flat banner; initial-letter avatar; username; @userTag; bio;
  Twitter/X handle; "Joined Month YYYY"; Following/Followers counts; the user's posts. Empty state: "@{userTag} hasn't posted anything yet."
  - Own profile: **Edit Profile** inline form with Username, User tag, Bio and Twitter/X Username, plus Save Changes / Cancel.
    Changing the userTag changes the URL (the page navigates to the new `/profile/:userTag`).
  - Another user's profile: **Follow / Following** toggle. You can't follow yourself.
  - Unknown userTag: "User not found" with a link back to `/home`.
- ⬜ **Sign out** from the user menu. The API clears the `sg_session` cookie; the frontend clears its cache and goes to `/signin`.

**Admin** (`role = 'admin'`). Non-admins who open `/dashboard` are redirected to `/home`; the API answers 403.
- ⬜ **Dashboard `/dashboard`** ("Admin Dashboard") with three tabs:
  - **Manage Users.** "Users List (N)", a search box, and rows showing username, @userTag, role and follower count, each with a delete button behind an
    AlertDialog. An admin MUST NOT be able to delete themselves: the button is disabled and the API returns 422.
  - **Moderate Posts.** "All Posts (N)" with "By {username} on {date}", the content and a delete button.
  - **Publish News.** Title ("Patch 1.6.0 Notes..."), Content ("Details of the announcement..."), optional Image URL, and the button "Publish to News Feed".

### 5.2 Phase 2: planned, not MVP
Post detail page `/post/:id` · "Following" feed tab · image attachments on posts (the landing shows "grid setup" screenshots) · avatar upload ·
game stats on profiles (level, highest stage, mythicals, "Top 1%" badge, as on the landing showcase) · followers/following lists · notifications ·
search · news categories (Patch Notes / Event / Community, as on the landing) and a news detail page · edit/delete news in the UI ·
promoting users to admin from the dashboard · footer pages (How It Works, FAQ, Contact, User Agreement, Privacy, Cookies) · public landing news (D14) · i18n.

### 5.3 Out of scope
**OAuth / social login** (Google, X or any other provider; D10), direct messages, real-time chat, payments, linking in-game accounts or any official
game API, and native mobile apps.

## 6. User stories and core flows

### 6.1 User stories

| ID | As a… | I want to… | So that… |
|---|---|---|---|
| US-1 | Visitor | understand what the site is from the landing page | I decide quickly whether to join |
| US-2 | Visitor | sign up with only email, username and password | I can start posting right away |
| US-3 | Summoner | sign in with my email and come back to the page I was trying to open | I don't lose my place |
| US-4 | Summoner | post a short update | I can share a grid, a strategy or a question |
| US-5 | Summoner | like and reply to posts | I can react and discuss |
| US-6 | Summoner | share a post link | I can bring friends into a discussion |
| US-7 | Summoner | delete my own posts and replies | I control what I've published |
| US-8 | Summoner | follow other summoners | I can keep track of the players I learn from |
| US-9 | Summoner | edit my username, userTag, bio and Twitter/X handle | my profile looks the way I want |
| US-10 | Summoner | read the latest news | I know about patches, events and maintenance |
| US-11 | Summoner | use the app on my phone | I can check it between game sessions |
| US-12 | Admin | delete users and posts | I can keep the community safe |
| US-13 | Admin | publish news with an optional image | players get announcements in one place |

### 6.2 Core flows

**Flow 1: Sign up (US-2)**
1. The visitor clicks "Let's Start!" or "Join the Cult!" on the landing page → `/signup`.
2. They enter Email, Username ("The King") and Password. The form validates as they go (§7) and shows errors under each field.
3. `POST /auth/signup`. The API checks the email is free, hashes the password, generates a unique userTag from the username (§7.1), creates the
   user with `role = user` and sets the session cookie.
4. The app goes to `/home` and shows the toast "Welcome, @the_king! You can change your tag in your profile."
5. If the email is already registered: 409, shown under the Email field. Other fields keep their values.

**Flow 2: Sign in and return (US-3)**
1. A signed-out user opens `/profile/theking` → redirected to `/signin?next=/profile/theking`.
2. They enter email and password → `POST /auth/signin`.
3. On success → back to `/profile/theking`. A `next` that isn't a relative path starting with a single `/` is ignored, and the user goes to `/home`.
4. On failure → the generic message "Invalid email or password". After 10 attempts in a minute → 429 "Too many attempts. Try again in a minute."

**Flow 3: Post and interact (US-4 to US-7)**
1. On `/home`, the summoner types in the composer and clicks Post → the post appears at the top of the feed.
2. They click the heart on another post → it fills red at once (optimistic) and the count goes up. On an API error it rolls back with an error toast.
3. They click Reply → the reply panel opens with the existing comments (oldest first) and an input. Sending adds the comment at the bottom.
4. They click Share → the link is copied and a "Link copied" toast appears.
5. On their own post they open the "…" menu → Delete → AlertDialog → Confirm → the post disappears and a "Post deleted successfully." toast appears.

**Flow 4: Follow and edit profile (US-8, US-9)**
1. From a post, the summoner clicks a username → `/profile/:userTag`. They click Follow → the button changes to "Following" and the Followers count goes up.
2. On their own profile they click Edit Profile, change the User tag to `kingarthur` and save → the URL changes to `/profile/kingarthur`.
   If the userTag is taken → 409 "This user tag is already taken." under the field.

**Flow 5: Read news (US-10)**
1. The summoner opens "Explore News" → `/news` shows cards newest first, with the local fallback image when a news item has none.

**Flow 6: Moderate and publish (US-12, US-13)**
1. The admin opens Dashboard → Manage Users, searches "king", deletes a user through the AlertDialog → "User deleted successfully."
   That user's posts, comments, likes and follows disappear, and their session stops working on their next request.
2. Moderate Posts → deletes a post → "Post deleted successfully."
3. Publish News → fills Title, Content and (optionally) an `https://` Image URL → "News published successfully!" → it appears at the top of `/news`.

**Flow 7: Sign out and expired session**
1. The summoner opens the user chip menu → "Log out @{userTag}" → `/signin`.
2. If the session expires (or the user was deleted) while the app is open, the next API call returns 401 and the app goes to `/signin?next=…`.

## 7. Business rules (enforced by the API)

| Field / action | Rule |
|---|---|
| `email` | Valid email, max 254 chars, unique (case-insensitive), never shown publicly. Taken at sign-up → 409 "This email is already registered." |
| `username` | 2–30 chars after trimming. **Not unique.** Letters (any language), numbers, spaces and `-_.'` are allowed. Entered at sign-up; editable. |
| `userTag` | 3–20 chars, `^[a-z0-9_]+$`, stored lowercase without `@`, **unique**. Generated at sign-up (§7.1); editable in Edit Profile. Reserved: `admin`, `api`, `home`, `news`, `signin`, `signup`, `dashboard`, `profile`, `settings`. Reserved or taken on edit → 409 "This user tag is already taken." |
| `password` | 8–72 **bytes** (UTF-8). bcrypt ignores everything after 72 bytes, so longer passwords are rejected with 400 instead of silently truncated. Hashed with bcrypt (cost 12). Never logged or returned. |
| `bio` | 0–160 chars. Default for new users: "A new summoner has arrived!" |
| `twitterHandle` | Optional, 1–15 chars, `^[A-Za-z0-9_]+$`, stored without `@`. |
| `role` | `user` (default) or `admin`. Sign-up always creates `user`. There is no UI to make someone an admin (Phase 2); how the first admin is created is ⏳ pending (Architecture.md §7, DB-5). |
| Post `content` | 1–500 chars after trimming. Only the author or an admin can delete. Posts can't be edited (MVP). |
| Comment `content` | 1–280 chars after trimming. Flat (no nested replies). The author or an admin can delete. |
| Like | One per user per post. Like and unlike are idempotent. |
| Follow | One per pair. Following yourself is not allowed (422). Follow and unfollow are idempotent. |
| News | Admin only. `title` 1–120 chars, `content` 1–5000 chars, `imageUrl` optional and MUST start with `https://`. |
| Delete user (admin) | Not allowed on yourself (422). Also removes the user's posts, comments, likes and follows (how: Architecture.md §7, DB-3). Their session stops working on the next request. News they wrote is kept, with no author. |
| Sign-in failure | Always the generic message "Invalid email or password" (no user enumeration). |
| Rate limits | Auth endpoints: 10 requests/min per IP. Write endpoints: 60/min per user. |
| IDs | All primary keys are UUIDs. ID route params are validated as UUIDs, never parsed with `Number()`. |

### 7.1 userTag generation at sign-up

The API turns the username into a candidate userTag with these steps, in order:

1. **Normalize:** Unicode NFKD, then remove combining marks (so `Ã` → `a`).
2. **Lowercase.**
3. **Replace** every run of characters outside `a–z` / `0–9` with a single `_`.
4. **Trim** leading and trailing `_`.
5. **Empty fallback:** if nothing is left (e.g. `--` or a name in a non-Latin script), the base is `summoner`.
6. **Cap** the base at 20 chars, then trim a trailing `_` again.
7. **First candidate:** the base itself, unless it is shorter than 3 chars or is reserved.
8. **Suffix candidates:** the base cut to 15 chars (trailing `_` trimmed) + `_` + 4 random digits (`1000–9999`). Random digits are used instead of a
   counter so the number doesn't reveal how many users share a name.
9. The API tries each candidate in turn, **up to 10 attempts**, until one is free. A candidate taken in the meantime by a parallel sign-up also
   moves on to the next one (how uniqueness is enforced: Architecture.md §7, DB-2). An email that is already registered → 409. Running out of attempts → 500 `INTERNAL`, logged (practically unreachable).

| Username | Generated userTag |
|---|---|
| `The King` | `the_king` (or `the_king_4821` if taken) |
| `Ãngelo` | `angelo` |
| `Jo` | `jo_4821` (base too short) |
| `--` | `summoner` (empty → fallback), or `summoner_4821` if taken |
| `Admin` | `admin_4821` (reserved) |
| `Lord Of The Ancient Dragon Pit` | `lord_of_the_ancient` |

These six cases are required unit tests for the generator.

## 8. Definition of Done

A feature is done when:
1. It matches the mockup (or the decision in §4, or the already-built page) on desktop **and** mobile widths (360–1920 px).
2. API permissions and validation are enforced server-side, with tests (Architecture.md §10.5).
3. Loading, empty and error states are implemented.
4. It passes lint, typecheck, tests, build and audit in CI.
5. It's keyboard accessible and passes an automated axe check with no serious violations.
6. The docs are updated if the contract, schema, tokens or conventions changed.
