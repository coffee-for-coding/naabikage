"use client";

import Link from "next/link";
import { useEffect } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
};

type RadialItem = { label: string; href: string };

const INNER: RadialItem[] = [
  { label: "Work", href: "/" },
  { label: "About", href: "/about" },
  { label: "Skills", href: "/skills" },
  { label: "Store", href: "#store" },
  { label: "Contact", href: "mailto:hello@nabikage.com" },
  { label: "Journal", href: "#journal" },
];

const OUTER: RadialItem[] = [
  { label: "2024", href: "/?year=2024" },
  { label: "2023", href: "/?year=2023" },
  { label: "2022", href: "/?year=2022" },
  { label: "2021", href: "/?year=2021" },
  { label: "Archive", href: "#archive" },
  { label: "Instagram", href: "https://instagram.com" },
];

export default function RadialMenu({ open, onClose }: Props) {
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "rgba(255,255,255,0.95)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        animation: "rm-fade 400ms var(--ease-out)",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          width: 360,
          height: 360,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {[110, 220, 340].map((size, i) => (
          <span
            key={size}
            aria-hidden
            style={{
              position: "absolute",
              width: size,
              height: size,
              borderRadius: "50%",
              border: "0.5px solid rgba(26,24,20,0.12)",
              animation: `rm-ring 700ms var(--ease-out) ${i * 0.07}s both`,
            }}
          />
        ))}

        <div
          style={{
            position: "absolute",
            fontFamily: "var(--display)",
            fontStyle: "italic",
            fontWeight: 300,
            fontSize: 22,
            letterSpacing: "0.08em",
            color: "var(--bone)",
            opacity: 0,
            animation: "rm-fade-in 600ms var(--ease-out) 0.35s forwards",
          }}
        >
          nabi kage
        </div>

        {INNER.map((item, i) => (
          <RadialNode
            key={`in-${item.label}`}
            item={item}
            radius={78}
            angle={i * 60}
            delay={0.45 + i * 0.05}
            onClose={onClose}
          />
        ))}
        {OUTER.map((item, i) => (
          <RadialNode
            key={`out-${item.label}`}
            item={item}
            radius={148}
            angle={i * 60 + 30}
            delay={0.6 + i * 0.05}
            onClose={onClose}
          />
        ))}
      </div>

      <style>{`
        @keyframes rm-fade { from { opacity: 0 } to { opacity: 1 } }
        @keyframes rm-fade-in { to { opacity: 1 } }
        @keyframes rm-ring {
          from { transform: scale(0.4); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

function RadialNode({
  item,
  radius,
  angle,
  delay,
  onClose,
}: {
  item: RadialItem;
  radius: number;
  angle: number;
  delay: number;
  onClose: () => void;
}) {
  const rad = (angle * Math.PI) / 180;
  const x = Math.cos(rad) * radius;
  const y = Math.sin(rad) * radius;
  const isExternal = item.href.startsWith("http") || item.href.startsWith("mailto");

  const inner = (
    <span
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 6,
      }}
    >
      <span
        aria-hidden
        style={{
          width: 5,
          height: 5,
          borderRadius: "50%",
          background: "rgba(26,24,20,0.6)",
        }}
      />
      <span
        style={{
          fontFamily: "var(--display)",
          fontStyle: "italic",
          fontWeight: 300,
          fontSize: 14,
          color: "rgba(26,24,20,0.75)",
          letterSpacing: "0.04em",
        }}
      >
        {item.label}
      </span>
    </span>
  );

  const wrapStyle: React.CSSProperties = {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
    opacity: 0,
    animation: `rm-fade-in 500ms var(--ease-out) ${delay}s forwards`,
  };

  if (isExternal) {
    return (
      <a
        href={item.href}
        style={wrapStyle}
        onClick={onClose}
        target={item.href.startsWith("http") ? "_blank" : undefined}
        rel={item.href.startsWith("http") ? "noreferrer" : undefined}
      >
        {inner}
      </a>
    );
  }
  return (
    <Link href={item.href} style={wrapStyle} onClick={onClose}>
      {inner}
    </Link>
  );
}
