import Gallery from "@/components/Gallery";
import Navbar from "@/components/Navbar";
import { loadWorks } from "@/lib/loadWorks";
import { loadSketches } from "@/lib/loadSketches";
import type { RadialThumb } from "@/components/RadialMenu";

export const dynamic = "force-static";

export default function HomePage() {
  const works = loadWorks();
  const sketches = loadSketches();
  const workThumbs: RadialThumb[] = works
    .filter((w) => w.image)
    .slice(0, 4)
    .map((w) => ({ id: `w-${w.id}`, image: w.image, title: w.title, href: "/" }));
  const sketchThumbs: RadialThumb[] = sketches
    .slice(0, 4)
    .map((s) => ({ id: `s-${s.id}`, image: s.image, title: s.title, href: "/sketches" }));
  const thumbs = [...workThumbs, ...sketchThumbs];
  return (
    <main style={{ position: "relative" }}>
      <Navbar works={works} thumbs={thumbs} />
      <Gallery works={works} />
    </main>
  );
}
