# Nabi Kage — Art Portfolio

A dark-then-light, minimalist gallery site for the artist **Nabi Kage**, built with **Next.js 14 (App Router)**, **TypeScript**, and **Tailwind**. The gallery auto-advances, the background animates with **Vanta.BIRDS** (Three.js), and every page transitions with a smooth ease-in fade.

This README is the operating manual: how to run the site, how to add new artwork, how to update the words on every page, and how to deploy.

---

## 1. Quick start

```bash
git clone https://github.com/coffee-for-coding/Art-Page.git
cd Art-Page
npm install
npm run dev
```

Open <http://localhost:3000>.

Production build:

```bash
npm run build
npm run start
```

Lint / format:

```bash
npm run lint
npm run format
```

Requirements: **Node 18.17+**.

---

## 2. Project map

```
Art-Page/
├─ public/
│  ├─ dp.png                 ← profile picture (used on About if you wire it)
│  └─ images/
│     └─ {YEAR}/{slug}/      ← every artwork lives here
│        ├─ cover.jpg        ← any image file: jpg/jpeg/png/webp/avif/gif
│        └─ meta.json        ← optional: title / series / medium / bg
├─ src/
│  ├─ app/
│  │  ├─ layout.tsx          ← <html>, fonts, Vanta background, page-transition wrapper
│  │  ├─ globals.css         ← theme variables + page-transition keyframes
│  │  ├─ page.tsx            ← Home (Gallery)
│  │  ├─ about/page.tsx      ← About page (bio + email)
│  │  └─ skills/page.tsx     ← Skills page (tech stack, experience, education)
│  ├─ components/
│  │  ├─ Navbar.tsx          ← logo + WORK/SKILLS/ABOUT + WORK year dropdown
│  │  ├─ Gallery.tsx         ← slide carousel, autoplay, prev/next previews, dots
│  │  ├─ Slide.tsx           ← single artwork slide (image + caption)
│  │  ├─ NavButton.tsx       ← left/right arrow buttons
│  │  ├─ RadialMenu.tsx      ← logo-click radial overlay menu
│  │  ├─ SkillCard.tsx       ← tech-stack category card
│  │  ├─ TimelineItem.tsx    ← shared timeline row (experience + education)
│  │  ├─ VantaBackground.tsx ← loads Three.js + Vanta.BIRDS into a fixed bg
│  │  └─ PageTransition.tsx  ← rerouting fade-in keyed off pathname
│  ├─ data/
│  │  ├─ works.ts            ← seed artworks (used only if /public/images/ is empty)
│  │  └─ skills.ts           ← tech stack, experience, education
│  └─ lib/
│     └─ loadWorks.ts        ← scans /public/images/ at build time
├─ next.config.js
├─ tailwind.config.ts
├─ tsconfig.json
├─ package.json
└─ README.md
```

---

## 3. Add or update artwork

This is the part you'll touch most often. The loader scans `public/images/` at build time; **no code changes are required to add new pieces**.

### 3.1 Folder convention

```
public/images/
  2024/
    moonlit-figure/
      cover.jpg          ← the image file (any name; first image found is used)
      meta.json          ← optional, for nicer titles / series / medium / bg
    veil/
      veil.png
  2023/
    the-quiet-hour/
      photo.webp
```

Rules the loader (`src/lib/loadWorks.ts`) enforces:

| Layer            | Rule                                                             |
|------------------|------------------------------------------------------------------|
| 1st level        | Folder name **must be a 4-digit year** (e.g. `2024`).            |
| 2nd level        | Folder name **is the slug** for one artwork.                     |
| Image            | First file with extension jpg/jpeg/png/webp/avif/gif is the cover. |
| Title            | Auto-derived from slug (`moonlit-figure` → `Moonlit Figure`).    |
| Series / medium  | Auto-defaulted unless overridden in `meta.json`.                 |
| Background       | Picked from a soft palette unless overridden.                    |

### 3.2 Optional `meta.json` per artwork

Place inside the artwork folder. Every key is optional.

```json
{
  "title": "Moonlit Figure",
  "series": "Nocturnes",
  "medium": "Oil on linen",
  "bg": "#1a1814"
}
```

### 3.3 Step-by-step: add a new artwork

1. Create the folder: `public/images/2024/<slug-with-hyphens>/`.
2. Drop the image inside (any filename).
3. (Optional) Add `meta.json` for a custom title / series / medium.
4. Restart dev (`npm run dev`) — in production, the next `npm run build` picks it up.

### 3.4 Step-by-step: rename / retitle an artwork

- **Rename** → rename the folder; URL slug + auto-title both update.
- **Retitle without renaming** → set `"title"` in `meta.json`.

### 3.5 Step-by-step: remove an artwork

Delete its folder. Done. Year folder can stay empty or be deleted.

### 3.6 No images? Fall back to seed data

If `public/images/` has zero year folders, the site uses `src/data/works.ts` as the seed. Edit that array to add objects with shape:

```ts
{
  id: "unique-id",
  title: "Title",
  year: 2024,
  series: "Series Name",
  medium: "Oil on linen",
  image: "/images/your-image.jpg",
  bg: "#1a1814"
}
```

---

## 4. Edit page text

### 4.1 Skills page (`/skills`)

All content comes from [`src/data/skills.ts`](src/data/skills.ts). Three exports:

- `techStack` — array of `{ category, items[] }` (renders the 2×2 tech grid).
- `experience` — array of jobs `{ role, company, period, type, description, highlights[] }`. `type` is `"fulltime" | "freelance" | "contract"` and renders as a small badge.
- `education` — array of `{ degree, school, year, note }`.

To add a job: append a new object to `experience`. Fields are typed; TypeScript will warn if you miss one. Order top-to-bottom in the file = order top-to-bottom on the page.

To add a skill tag: push a string into the matching category's `items` array.

### 4.2 About page (`/about`)

Open [`src/app/about/page.tsx`](src/app/about/page.tsx). The bio is plain JSX in two `<p>` blocks. Edit the text directly. The contact link's `href` and label can also be updated in place.

### 4.3 Navbar links

Open [`src/components/Navbar.tsx`](src/components/Navbar.tsx). The `NAV_LINKS` array drives the centre nav. To add a link:

```ts
const NAV_LINKS = [
  { label: "WORK", href: "/" },
  { label: "SKILLS", href: "/skills" },
  { label: "ABOUT", href: "/about" },
  { label: "JOURNAL", href: "/journal" }, // ← new
];
```

(You'd then create `src/app/journal/page.tsx` to back it.)

The **WORK** link gets a special hover dropdown listing every year (and how many works are in it). That data is computed automatically from whatever `loadWorks()` returned, so you never edit it by hand.

### 4.4 Radial menu (logo click)

Open [`src/components/RadialMenu.tsx`](src/components/RadialMenu.tsx). Two arrays:

- `INNER` — six items closer to the centre.
- `OUTER` — six items further out (year shortcuts, social, archive).

Each item is `{ label, href }`. Replace `href` to point at real Instagram / store / journal URLs.

### 4.5 Background animation (Vanta)

Open [`src/components/VantaBackground.tsx`](src/components/VantaBackground.tsx). The current effect is **Vanta.BIRDS**. To swap effects:

1. Change the script URL (e.g. `vanta.birds.min.js` → `vanta.waves.min.js`).
2. Update the call from `window.VANTA.BIRDS({...})` to `window.VANTA.WAVES({...})` (or NET, FOG, CELLS, RINGS, etc.).
3. Adjust the option object — Vanta's [docs](https://www.vantajs.com/) list every effect's options.

### 4.6 Theme colors / fonts

Open [`src/app/globals.css`](src/app/globals.css). The two theme variables:

```css
--ink:  #ffffff;   /* page background */
--bone: #1a1814;   /* primary text */
```

Fonts are loaded from Google Fonts in [`src/app/layout.tsx`](src/app/layout.tsx) (`Cormorant Garamond` + `EB Garamond`). Swap the `<link>` URL to change them.

### 4.7 Browser tab title / share metadata

Open [`src/app/layout.tsx`](src/app/layout.tsx). Edit the `metadata` export:

```ts
export const metadata: Metadata = {
  title: "Nabi Kage",
  description: "Selected works by Nabi Kage.",
  openGraph: { title: "Nabi Kage", description: "…", type: "website" },
};
```

---

## 5. Animations & timing

| What                          | Where                              | Default     |
|-------------------------------|------------------------------------|-------------|
| Gallery autoplay interval     | `src/components/Gallery.tsx`       | `10000` ms  |
| Slide cross-fade              | `src/components/Slide.tsx`         | `1600` ms   |
| Title / caption text reveal   | `src/components/Slide.tsx`         | `1200` ms   |
| Page-route fade-in            | `src/app/globals.css`              | `700` ms    |
| Easing curve (most things)    | global                             | `cubic-bezier(0.42, 0, 0.58, 1)` ease-in-out |

Tweak any number in the file shown — no rebuild gymnastics required.

---

## 6. Deploy to Vercel

1. Push to GitHub (see § 7).
2. Go to <https://vercel.com/new>, import the repo, accept defaults.
3. After every push to `main`, Vercel rebuilds. **`loadWorks()` runs at build time**, so newly added images appear after the next deploy.

No environment variables are required.

---

## 7. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/coffee-for-coding/Art-Page.git
git push -u origin main
```

If the remote already has commits and `git push` is rejected, either pull and merge:

```bash
git pull --rebase origin main
git push -u origin main
```

…or reset the remote (only if you intend to overwrite it):

```bash
git push -u origin main --force
```

---

## 8. Common questions

**Q — I added an image but it isn't showing.**
A — Make sure the path is `public/images/{4-digit-year}/{slug-folder}/{file}`. The slug must be a folder, not a file. Restart `npm run dev` (or rebuild on Vercel).

**Q — Can I have multiple images per artwork?**
A — Yes. Drop them all into the same artwork folder; the **first** image (alphabetical) is used as the cover. Future-proofing for a "details" page is easy — `loadWorks()` could be extended to return an array of images instead of one.

**Q — How do I change the artist name shown in the navbar?**
A — Edit the button text in [`src/components/Navbar.tsx`](src/components/Navbar.tsx) (search for `NABI KAGE`). Also update the page title in [`src/app/layout.tsx`](src/app/layout.tsx).

**Q — How do I disable the background animation?**
A — Remove `<VantaBackground />` from [`src/app/layout.tsx`](src/app/layout.tsx) and set `background: var(--ink);` back on `body` in `globals.css`.

**Q — How do I disable autoplay on the gallery?**
A — In [`src/components/Gallery.tsx`](src/components/Gallery.tsx), comment out the `setTimeout` call inside the autoplay `useEffect`.

---

## 9. Credits

- Typography: Cormorant Garamond + EB Garamond via Google Fonts.
- Background: [Vanta.js](https://www.vantajs.com/) BIRDS effect, Three.js r134.
- Layout / engineering: built on Next.js 14 App Router with TypeScript strict mode, no external animation libraries beyond Vanta.
