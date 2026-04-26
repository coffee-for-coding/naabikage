"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Slide from "./Slide";
import NavButton from "./NavButton";
import type { Work } from "@/data/works";

const AUTOPLAY_MS = 10000;

type Props = {
  works: Work[];
};

export default function Gallery({ works }: Props) {
  const [index, setIndex] = useState(0);
  const [progressKey, setProgressKey] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const total = works.length;

  const advance = useCallback(
    (delta: number) => {
      if (total === 0) return;
      setIndex((i) => (i + delta + total) % total);
      setProgressKey((k) => k + 1);
    },
    [total],
  );

  const goTo = useCallback(
    (i: number) => {
      if (total === 0) return;
      setIndex(((i % total) + total) % total);
      setProgressKey((k) => k + 1);
    },
    [total],
  );

  useEffect(() => {
    if (total === 0) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setIndex((i) => (i + 1) % total);
      setProgressKey((k) => k + 1);
    }, AUTOPLAY_MS);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [index, total, progressKey]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") advance(-1);
      else if (e.key === "ArrowRight") advance(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [advance]);

  if (total === 0) {
    return (
      <section
        aria-label="Gallery"
        style={{
          position: "relative",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p
          style={{
            fontFamily: "var(--display)",
            fontStyle: "italic",
            fontSize: 22,
            color: "rgba(26,24,20,0.35)",
          }}
        >
          No works yet.
        </p>
      </section>
    );
  }

  return (
    <section
      aria-label="Gallery"
      style={{
        position: "relative",
        height: "100vh",
        width: "100%",
        overflow: "hidden",
      }}
    >
      {works.map((w, i) => (
        <Slide key={w.id} work={w} active={i === index} />
      ))}

      <NavButton direction="left" onClick={() => advance(-1)} />
      <NavButton direction="right" onClick={() => advance(1)} />

      <PreviewCard
        side="left"
        work={works[(index - 1 + total) % total]}
        label="Prev"
        onClick={() => advance(-1)}
      />
      <PreviewCard
        side="right"
        work={works[(index + 1) % total]}
        label="Next"
        onClick={() => advance(1)}
      />

      <div
        aria-hidden
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: 1,
          background: "rgba(26,24,20,0.08)",
          zIndex: 20,
        }}
      >
        <div
          key={progressKey}
          style={{
            height: "100%",
            background: "rgba(26,24,20,0.5)",
            width: "100%",
            transform: "scaleX(0)",
            transformOrigin: "left",
            animation: `gallery-progress ${AUTOPLAY_MS}ms linear forwards`,
          }}
        />
      </div>

      <div
        role="tablist"
        aria-label="Gallery slides"
        style={{
          position: "absolute",
          bottom: 16,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 12,
          zIndex: 25,
        }}
      >
        {works.map((w, i) => (
          <button
            key={w.id}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Go to ${w.title}`}
            onClick={() => goTo(i)}
            style={{
              width: 4,
              height: 4,
              borderRadius: "50%",
              background:
                i === index ? "var(--bone)" : "rgba(26,24,20,0.3)",
              transition: "background 400ms var(--ease-out)",
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes gallery-progress {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }
      `}</style>
    </section>
  );
}

function PreviewCard({
  side,
  work,
  label,
  onClick,
}: {
  side: "left" | "right";
  work: Work;
  label: string;
  onClick: () => void;
}) {
  if (!work) return null;
  const isLeft = side === "left";
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`${label}: ${work.title}`}
      className="preview-card"
      style={{
        position: "absolute",
        bottom: 32,
        [isLeft ? "left" : "right"]: 28,
        zIndex: 28,
        display: "flex",
        flexDirection: "column",
        alignItems: isLeft ? "flex-start" : "flex-end",
        gap: 8,
        padding: 0,
        cursor: "pointer",
      }}
    >
      <span
        style={{
          fontSize: 9,
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: "rgba(26,24,20,0.45)",
        }}
      >
        {label}
      </span>
      <div
        style={{
          width: 132,
          height: 88,
          overflow: "hidden",
          background: "rgba(26,24,20,0.04)",
          border: "0.5px solid rgba(26,24,20,0.18)",
        }}
      >
        {work.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={work.image}
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.75,
              transition: "opacity 400ms var(--ease-out)",
            }}
          />
        ) : null}
      </div>
      <span
        style={{
          fontFamily: "var(--display)",
          fontStyle: "italic",
          fontSize: 13,
          color: "rgba(26,24,20,0.55)",
          maxWidth: 132,
          textAlign: isLeft ? "left" : "right",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {work.title}
      </span>
      <style jsx>{`
        .preview-card:hover img {
          opacity: 1 !important;
        }
        @media (max-width: 768px) {
          .preview-card {
            display: none !important;
          }
        }
      `}</style>
    </button>
  );
}
