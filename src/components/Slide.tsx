"use client";

import type { Work } from "@/data/works";

type Props = {
  work: Work;
  active: boolean;
};

export default function Slide({ work, active }: Props) {
  return (
    <article
      aria-hidden={!active}
      className={active ? "slide active" : "slide"}
      style={{
        position: "absolute",
        inset: 0,
        background: "transparent",
        opacity: active ? 1 : 0,
        transition: "opacity 1600ms cubic-bezier(0.42, 0, 0.58, 1)",
        pointerEvents: active ? "auto" : "none",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
        padding: "96px 24px 80px",
      }}
    >
      {work.image ? (
        // Plain <img> so the image renders at its natural aspect ratio,
        // bounded only by viewport. No cropping, no forced container.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={work.image}
          alt={work.title}
          style={{
            display: "block",
            maxWidth: "min(100%, 1600px)",
            maxHeight: "calc(100vh - 280px)",
            width: "auto",
            height: "auto",
            objectFit: "contain",
          }}
        />
      ) : (
        <div
          aria-label={`${work.title} placeholder`}
          style={{
            width: "60%",
            height: "60vh",
            border: "0.5px solid rgba(26,24,20,0.15)",
          }}
        />
      )}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: 4,
          maxWidth: "min(100%, 1600px)",
        }}
      >
        <span className="reveal-y" style={{ animationDelay: "0.3s" }}>
          <span
            style={{
              fontSize: 10,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "rgba(26,24,20,0.55)",
            }}
          >
            {work.year}
          </span>
        </span>

        <span className="reveal-clip" style={{ animationDelay: "0.4s" }}>
          <span
            style={{
              fontFamily: "var(--display)",
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: 30,
              color: "var(--bone)",
            }}
          >
            {work.title}
          </span>
        </span>

        <span className="reveal-clip" style={{ animationDelay: "0.55s" }}>
          <span
            style={{
              fontSize: 11,
              color: "rgba(26,24,20,0.5)",
              letterSpacing: "0.08em",
            }}
          >
            {work.medium}
          </span>
        </span>
      </div>

      <style jsx>{`
        .reveal-y,
        .reveal-clip {
          display: inline-block;
          opacity: 0;
        }
        .slide.active .reveal-y {
          animation: rev-y 1200ms cubic-bezier(0.42, 0, 0.58, 1) forwards;
        }
        .slide.active .reveal-clip {
          animation: rev-clip 1200ms cubic-bezier(0.42, 0, 0.58, 1) forwards;
        }
        @keyframes rev-y {
          from {
            opacity: 0;
            transform: translateY(14px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes rev-clip {
          from {
            opacity: 0;
            clip-path: inset(0 100% 0 0);
          }
          to {
            opacity: 1;
            clip-path: inset(0 0 0 0);
          }
        }
      `}</style>
    </article>
  );
}
