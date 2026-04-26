import Navbar from "@/components/Navbar";
import { loadWorks } from "@/lib/loadWorks";

export default function AboutPage() {
  const works = loadWorks();
  return (
    <main style={{ position: "relative", minHeight: "100vh" }}>
      <Navbar works={works} />
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "120px 24px 80px",
        }}
      >
        <div style={{ maxWidth: 520, width: "100%", textAlign: "left" }}>
          <h1
            style={{
              fontFamily: "var(--display)",
              fontWeight: 300,
              fontStyle: "italic",
              fontSize: 48,
              letterSpacing: "0.08em",
              margin: 0,
              marginBottom: 32,
              color: "var(--bone)",
            }}
          >
            Nabi Kage
          </h1>
          <p
            style={{
              fontFamily: "var(--body)",
              fontSize: 17,
              lineHeight: 1.8,
              color: "rgba(26,24,20,0.6)",
              margin: 0,
              marginBottom: 24,
            }}
          >
            nabi kage is an artist working in oil, ink, and gold leaf. He practice circles the
            edges of a single quiet room — a candle, a hand, a window — searching for what light
            does when no one is watching.
          </p>
          <p
            style={{
              fontFamily: "var(--body)",
              fontSize: 17,
              lineHeight: 1.8,
              color: "rgba(26,24,20,0.6)",
              margin: 0,
              marginBottom: 48,
            }}
          >
            His work has been shown in small galleries across Tokyo, Kyoto, and Edinburgh. She
            lives and paints in a converted printing house by the sea.
          </p>
          <a
            href="mailto:hello@nabikage.com"
            className="text-reveal"
            aria-label="Email hello@nabikage.com"
            style={{
              fontSize: 11,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
            }}
          >
            <span className="text-reveal__ghost" style={{ color: "rgba(26,24,20,0.35)" }}>
              hello@nabikage.com
            </span>
            <span aria-hidden className="text-reveal__clip">
              hello@nabikage.com
            </span>
          </a>
        </div>
      </section>
    </main>
  );
}
