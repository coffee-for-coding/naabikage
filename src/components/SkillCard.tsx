"use client";

import type { TechCategory } from "@/data/skills";

type Props = { entry: TechCategory };

export default function SkillCard({ entry }: Props) {
  return (
    <div>
      <h3
        style={{
          fontFamily: "var(--display)",
          fontStyle: "italic",
          fontWeight: 300,
          fontSize: 13,
          color: "rgba(26,24,20,0.4)",
          margin: 0,
          marginBottom: 16,
        }}
      >
        {entry.category}
      </h3>
      <p
        style={{
          margin: 0,
          fontSize: 12,
          letterSpacing: "0.08em",
          lineHeight: 2,
          display: "flex",
          flexWrap: "wrap",
          gap: 6,
          alignItems: "center",
        }}
      >
        {entry.items.map((item, i) => (
          <span
            key={item}
            style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
          >
            <button
              type="button"
              tabIndex={0}
              aria-label={item}
              className="text-reveal"
              style={{
                padding: 0,
                border: 0,
                background: "transparent",
                fontSize: 12,
                letterSpacing: "0.08em",
                cursor: "default",
                color: "rgba(26,24,20,0.55)",
              }}
            >
              <span className="text-reveal__ghost">{item}</span>
              <span aria-hidden className="text-reveal__clip">
                {item}
              </span>
            </button>
            {i < entry.items.length - 1 && (
              <span aria-hidden style={{ color: "rgba(26,24,20,0.18)" }}>
                ·
              </span>
            )}
          </span>
        ))}
      </p>
      <style jsx>{`
        .text-reveal {
          transition: color 150ms var(--ease-out);
        }
      `}</style>
    </div>
  );
}
