import Gallery from "@/components/Gallery";
import Navbar from "@/components/Navbar";
import { loadWorks } from "@/lib/loadWorks";

export const dynamic = "force-static";

export default function HomePage() {
  const works = loadWorks();
  return (
    <main style={{ position: "relative" }}>
      <Navbar works={works} />
      <Gallery works={works} />
    </main>
  );
}
