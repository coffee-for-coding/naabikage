import fs from "node:fs";
import path from "node:path";

const IMAGE_EXTS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif"]);

export type Sketch = {
  id: string;
  image: string;
  title: string;
  date?: string;
  medium?: string;
  notes?: string;
};

export function loadSketches(): Sketch[] {
  const root = path.join(process.cwd(), "public", "sketches");
  if (!fs.existsSync(root)) return [];

  const entries = fs.readdirSync(root, { withFileTypes: true });
  const images = entries.filter(
    (e) => e.isFile() && IMAGE_EXTS.has(path.extname(e.name).toLowerCase())
  );

  const sketches: Sketch[] = images.map((img) => {
    const base = path.basename(img.name, path.extname(img.name));
    const jsonPath = path.join(root, `${base}.json`);
    let meta: Partial<Sketch> = {};
    if (fs.existsSync(jsonPath)) {
      try {
        meta = JSON.parse(fs.readFileSync(jsonPath, "utf-8")) as Partial<Sketch>;
      } catch {
        meta = {};
      }
    }
    return {
      id: base,
      image: `/sketches/${img.name}`,
      title: meta.title ?? base,
      date: meta.date,
      medium: meta.medium,
      notes: meta.notes,
    };
  });

  sketches.sort((a, b) => a.id.localeCompare(b.id));
  return sketches;
}
