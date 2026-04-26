import Image from "next/image";
import Navbar from "@/components/Navbar";
import { loadWorks } from "@/lib/loadWorks";
import { loadSketches } from "@/lib/loadSketches";

export const metadata = {
  title: "Sketches — Naabi Kage",
};

export default function SketchesPage() {
  const works = loadWorks();
  const sketches = loadSketches();

  return (
    <main style={{ position: "relative", minHeight: "100vh" }}>
      <Navbar works={works} />
      <section
        className="sketches-wrap"
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "120px 10% 80px",
        }}
      >
        <h1
          style={{
            fontFamily: "var(--display)",
            fontStyle: "italic",
            fontWeight: 300,
            fontSize: 42,
            letterSpacing: "0.04em",
            margin: 0,
            color: "var(--bone)",
          }}
        >
          Sketches
        </h1>
        <p
          style={{
            fontFamily: "var(--body)",
            fontSize: 16,
            lineHeight: 1.8,
            color: "rgba(26,24,20,0.5)",
            maxWidth: 620,
            marginTop: 16,
          }}
        >
          Studies, drafts, and quiet pages from the working notebook.
        </p>

        <div
          className="sketches-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: 32,
            marginTop: 64,
          }}
        >
          {sketches.map((s) => (
            <figure
              key={s.id}
              style={{
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "4 / 5",
                  background: "rgba(26,24,20,0.05)",
                  overflow: "hidden",
                }}
              >
                <Image
                  src={s.image}
                  alt={s.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <figcaption
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--display)",
                    fontStyle: "italic",
                    fontSize: 16,
                    color: "var(--bone)",
                  }}
                >
                  {s.title}
                </span>
                {s.medium && (
                  <span
                    style={{
                      fontSize: 12,
                      letterSpacing: "0.1em",
                      color: "rgba(26,24,20,0.4)",
                    }}
                  >
                    {s.medium}
                  </span>
                )}
                {s.date && (
                  <span
                    style={{
                      fontSize: 11,
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "rgba(26,24,20,0.35)",
                    }}
                  >
                    {s.date}
                  </span>
                )}
                {s.notes && (
                  <span
                    style={{
                      fontSize: 13,
                      lineHeight: 1.6,
                      color: "rgba(26,24,20,0.5)",
                      marginTop: 4,
                    }}
                  >
                    {s.notes}
                  </span>
                )}
              </figcaption>
            </figure>
          ))}
        </div>

        {sketches.length === 0 && (
          <p
            style={{
              fontFamily: "var(--display)",
              fontStyle: "italic",
              fontSize: 18,
              color: "rgba(26,24,20,0.4)",
              marginTop: 64,
              textAlign: "center",
            }}
          >
            No sketches yet.
          </p>
        )}
      </section>

      <style>{`
        @media (max-width: 768px) {
          .sketches-wrap { padding: 100px 24px 64px !important; }
          .sketches-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}
