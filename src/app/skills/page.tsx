import Navbar from "@/components/Navbar";
import SkillCard from "@/components/SkillCard";
import TimelineItem from "@/components/TimelineItem";
import { education, experience, techStack } from "@/data/skills";
import { loadWorks } from "@/lib/loadWorks";

export const metadata = {
  title: "Skills — nabi kage",
};

const SECTION_RULE = (
  <span
    aria-hidden
    style={{
      flex: 1,
      height: 1,
      background: "rgba(26,24,20,0.08)",
      marginLeft: 16,
    }}
  />
);

function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        marginBottom: 40,
        marginTop: 64,
      }}
    >
      <span
        style={{
          fontSize: 10,
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          color: "rgba(26,24,20,0.3)",
        }}
      >
        {children}
      </span>
      {SECTION_RULE}
    </div>
  );
}

export default function SkillsPage() {
  const works = loadWorks();

  return (
    <main style={{ position: "relative", minHeight: "100vh" }}>
      <Navbar works={works} />
      <section
        className="skills-wrap"
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
          Skills &amp; Practice
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
          A working record of what I make with — the tools, the studios, and the people I&apos;ve
          made things alongside.
        </p>

        <SectionHeader>Tech Stack</SectionHeader>
        <div
          className="skills-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 48,
          }}
        >
          {techStack.map((entry) => (
            <SkillCard key={entry.category} entry={entry} />
          ))}
        </div>

        <SectionHeader>Experience</SectionHeader>
        <div
          style={{
            position: "relative",
            paddingLeft: 0,
          }}
        >
          <span
            aria-hidden
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              width: 0.5,
              background: "rgba(26,24,20,0.08)",
            }}
          />
          {experience.map((e, i) => (
            <TimelineItem key={`${e.role}-${e.company}`} period={e.period} index={i}>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <h3
                  style={{
                    fontFamily: "var(--body)",
                    fontWeight: 500,
                    fontSize: 18,
                    color: "var(--bone)",
                    margin: 0,
                  }}
                >
                  {e.role}
                </h3>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: 14, color: "rgba(26,24,20,0.5)" }}>
                    {e.company}
                  </span>
                  <span
                    style={{
                      fontSize: 9,
                      letterSpacing: "0.25em",
                      textTransform: "uppercase",
                      color: "rgba(26,24,20,0.4)",
                      border: "0.5px solid rgba(26,24,20,0.25)",
                      padding: "3px 8px",
                    }}
                  >
                    {e.type}
                  </span>
                </div>
                <p
                  style={{
                    fontSize: 15,
                    lineHeight: 1.8,
                    color: "rgba(26,24,20,0.45)",
                    marginTop: 8,
                    marginBottom: 8,
                  }}
                >
                  {e.description}
                </p>
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                  }}
                >
                  {e.highlights.map((h) => (
                    <li
                      key={h}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 12,
                        fontSize: 13,
                        letterSpacing: "0.03em",
                        color: "rgba(26,24,20,0.4)",
                        lineHeight: 1.6,
                      }}
                    >
                      <span
                        aria-hidden
                        style={{
                          flex: "0 0 auto",
                          width: 1,
                          height: 12,
                          background: "rgba(26,24,20,0.2)",
                          marginTop: 6,
                        }}
                      />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </TimelineItem>
          ))}
        </div>

        <SectionHeader>Education</SectionHeader>
        <div style={{ position: "relative" }}>
          <span
            aria-hidden
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              width: 0.5,
              background: "rgba(26,24,20,0.08)",
            }}
          />
          {education.map((edu, i) => (
            <TimelineItem key={edu.degree} period={edu.year} index={i}>
              <div>
                <h3
                  style={{
                    fontFamily: "var(--body)",
                    fontSize: 16,
                    color: "var(--bone)",
                    margin: 0,
                    marginBottom: 4,
                  }}
                >
                  {edu.degree}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--display)",
                    fontStyle: "italic",
                    fontSize: 14,
                    color: "rgba(26,24,20,0.4)",
                    margin: 0,
                    marginBottom: 8,
                  }}
                >
                  {edu.school}
                </p>
                <p
                  style={{
                    fontSize: 14,
                    lineHeight: 1.7,
                    color: "rgba(26,24,20,0.4)",
                    margin: 0,
                  }}
                >
                  {edu.note}
                </p>
              </div>
            </TimelineItem>
          ))}
        </div>

        <p
          style={{
            fontFamily: "var(--display)",
            fontStyle: "italic",
            fontWeight: 300,
            fontSize: 22,
            color: "rgba(26,24,20,0.35)",
            textAlign: "center",
            marginTop: 96,
          }}
        >
          Available for selected commissions and collaborations —{" "}
          <a
            href="mailto:hello@nabikage.com"
            className="currently-link"
            style={{ color: "var(--bone)" }}
          >
            hello@nabikage.com
          </a>
        </p>
      </section>

      <style>{`
        .currently-link:hover { text-decoration: underline; }
        @media (max-width: 768px) {
          .skills-grid { grid-template-columns: 1fr !important; }
          .skills-wrap { padding: 100px 24px 64px !important; }
        }
      `}</style>
    </main>
  );
}
