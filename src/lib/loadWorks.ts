import fs from "node:fs";
import path from "node:path";
import { seedWorks, type Work } from "@/data/works";

const IMAGE_EXTS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif"]);

const DEFAULT_BG_POOL = [
  "#1a1814",
  "#15120e",
  "#1c1a16",
  "#1f1a14",
  "#181612",
  "#13110d",
  "#1b1813",
  "#16130f",
];

const DEFAULT_MEDIUM_POOL = [
  "Oil on linen",
  "Ink on paper",
  "Mixed media on panel",
  "Watercolor on cotton",
  "Charcoal on paper",
];

function titleFromSlug(slug: string): string {
  return slug
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
}

function pickFromPool<T>(pool: T[], key: string): T {
  let hash = 0;
  for (let i = 0; i < key.length; i += 1) {
    hash = (hash * 31 + key.charCodeAt(i)) | 0;
  }
  const idx = Math.abs(hash) % pool.length;
  return pool[idx];
}

function safeReaddir(dir: string): string[] {
  try {
    return fs.readdirSync(dir, { withFileTypes: true }).map((d) => d.name);
  } catch {
    return [];
  }
}

function findFirstImage(dir: string): string | null {
  let entries: fs.Dirent[];
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return null;
  }
  for (const entry of entries) {
    if (!entry.isFile()) continue;
    const ext = path.extname(entry.name).toLowerCase();
    if (IMAGE_EXTS.has(ext)) return entry.name;
  }
  return null;
}

/**
 * Scans /public/images for a {year}/{slug}/ folder structure and returns
 * generated Work entries. Falls back to seedWorks when no folders exist.
 *
 * Convention:
 *   public/images/2024/moonlit-figure/cover.jpg
 *   public/images/2024/moonlit-figure/meta.json (optional)
 *
 * Optional meta.json fields: title, series, medium, bg.
 */
export function loadWorks(): Work[] {
  const root = path.join(process.cwd(), "public", "images");
  if (!fs.existsSync(root)) return seedWorks;

  const works: Work[] = [];
  const yearDirs = safeReaddir(root).filter((name) => /^\d{4}$/.test(name));

  for (const yearName of yearDirs) {
    const year = Number(yearName);
    const yearPath = path.join(root, yearName);
    const slugDirs = fs
      .readdirSync(yearPath, { withFileTypes: true })
      .filter((d) => d.isDirectory());

    for (const slugDir of slugDirs) {
      const slug = slugDir.name;
      const slugPath = path.join(yearPath, slug);
      const cover = findFirstImage(slugPath);
      if (!cover) continue;

      const id = `${year}-${slug}`;
      let meta: Partial<Work> = {};
      const metaPath = path.join(slugPath, "meta.json");
      if (fs.existsSync(metaPath)) {
        try {
          meta = JSON.parse(fs.readFileSync(metaPath, "utf-8")) as Partial<Work>;
        } catch {
          meta = {};
        }
      }

      works.push({
        id,
        title: meta.title ?? titleFromSlug(slug),
        year,
        series: meta.series ?? `Works ${year}`,
        medium: meta.medium ?? pickFromPool(DEFAULT_MEDIUM_POOL, id),
        image: `/images/${year}/${slug}/${cover}`,
        bg: meta.bg ?? pickFromPool(DEFAULT_BG_POOL, id),
      });
    }
  }

  if (works.length === 0) return seedWorks;

  works.sort((a, b) => (b.year - a.year) || a.title.localeCompare(b.title));
  return works;
}
