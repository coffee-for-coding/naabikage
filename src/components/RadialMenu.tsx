"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

export type RadialThumb = {
  id: string;
  image: string;
  title: string;
  href?: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  thumbs?: RadialThumb[];
};

const SOCIALS = [
  { label: "About", href: "/about", angle: 200 },
  { label: "Instagram", href: "https://instagram.com", angle: 340 },
];

export default function RadialMenu({ open, onClose, thumbs = [] }: Props) {
  const [tilt, setTilt] = useState(0);
  const [hovering, setHovering] = useState(false);
  const dpRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const orbitItems = useMemo(() => {
    if (thumbs.length === 0) return [];
    const count = Math.min(thumbs.length, 8);
    const picked = thumbs.slice(0, count);
    return picked.map((t, i) => ({
      ...t,
      angle: (360 / count) * i - 90,
      delay: 0.2 + i * 0.06,
    }));
  }, [thumbs]);

  if (!open) return null;

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = dpRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const dx = e.clientX - cx;
    const norm = Math.max(-1, Math.min(1, dx / (rect.width / 2)));
    setTilt(norm * 12);
  };

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
        className="rm-stage"
      >
        {orbitItems.map((t) => (
          <OrbitThumb key={t.id} item={t} onClose={onClose} />
        ))}

        {SOCIALS.map((s) => (
          <SocialNode key={s.label} {...s} onClose={onClose} />
        ))}

        <div className="rm-center">
          <div
            className="rm-dp-wrap"
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => {
              setHovering(false);
              setTilt(0);
            }}
            onMouseMove={handleMove}
          >
            <div
              ref={dpRef}
              className="rm-dp"
              style={{
                transform: `rotate(${tilt}deg) scale(${hovering ? 1.06 : 1})`,
              }}
            >
              <Image
                src="/dp.png"
                alt="Naabi Kage"
                width={240}
                height={240}
                priority
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "50%",
                  display: "block",
                }}
              />
            </div>
          </div>
          <div className="rm-name">NAABI KAGE</div>
        </div>
      </div>

      <style>{`
        @keyframes rm-fade { from { opacity: 0 } to { opacity: 1 } }
        @keyframes rm-fade-in { to { opacity: 1 } }
        @keyframes rm-float-y {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-14px); }
        }
        @keyframes rm-bob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .rm-stage {
          position: relative;
          width: min(640px, 92vw);
          height: min(640px, 92vw);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .rm-center {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: clamp(14px, 2.5vw, 24px);
          z-index: 5;
        }
        .rm-dp-wrap {
          animation: rm-float-y 4.8s ease-in-out infinite;
          cursor: pointer;
        }
        .rm-dp {
          width: clamp(140px, 26vw, 240px);
          height: clamp(140px, 26vw, 240px);
          border-radius: 50%;
          overflow: hidden;
          box-shadow: 0 30px 60px rgba(26,24,20,0.18), 0 8px 20px rgba(26,24,20,0.1);
          transition: transform 600ms cubic-bezier(0.42, 0, 0.58, 1);
          will-change: transform;
        }
        .rm-name {
          font-family: var(--display);
          font-weight: 300;
          font-size: clamp(18px, 3vw, 28px);
          letter-spacing: 0.22em;
          color: var(--bone);
        }
      `}</style>
    </div>
  );
}

function OrbitThumb({
  item,
  onClose,
}: {
  item: RadialThumb & { angle: number; delay: number };
  onClose: () => void;
}) {
  const rad = (item.angle * Math.PI) / 180;
  const radiusVar = `var(--orbit-r)`;
  const x = `calc(cos(${item.angle}deg) * ${radiusVar})`;
  const y = `calc(sin(${item.angle}deg) * ${radiusVar})`;
  void rad;
  const inner = (
    <span className="rm-thumb-inner" style={{ animation: `rm-bob 5s ease-in-out ${item.delay}s infinite` }}>
      <span className="rm-thumb-img">
        {item.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={item.image} alt={item.title} />
        ) : null}
      </span>
      <span className="rm-thumb-label">{item.title}</span>
      <style jsx>{`
        .rm-thumb-inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
        }
        .rm-thumb-img {
          width: clamp(48px, 8vw, 72px);
          height: clamp(48px, 8vw, 72px);
          border-radius: 50%;
          overflow: hidden;
          background: rgba(26,24,20,0.05);
          border: 0.5px solid rgba(26,24,20,0.2);
          box-shadow: 0 8px 20px rgba(26,24,20,0.1);
          display: block;
          transition: transform 400ms var(--ease-out, ease-out);
        }
        .rm-thumb-img :global(img) {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .rm-thumb-inner:hover .rm-thumb-img {
          transform: scale(1.12);
        }
        .rm-thumb-label {
          font-family: var(--display);
          font-style: italic;
          font-weight: 300;
          font-size: clamp(10px, 1.4vw, 12px);
          color: rgba(26,24,20,0.65);
          max-width: 110px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          letter-spacing: 0.04em;
        }
      `}</style>
    </span>
  );

  const wrapStyle: React.CSSProperties = {
    position: "absolute",
    left: "50%",
    top: "50%",
    ["--orbit-r" as string]: "min(260px, 40vw)",
    transform: `translate(calc(-50% + ${x}), calc(-50% + ${y}))`,
    opacity: 0,
    animation: `rm-fade-in 700ms var(--ease-out) ${item.delay}s forwards`,
    zIndex: 3,
  };

  if (item.href) {
    return (
      <Link href={item.href} style={wrapStyle} onClick={onClose}>
        {inner}
      </Link>
    );
  }
  return <div style={wrapStyle}>{inner}</div>;
}

function SocialNode({
  label,
  href,
  angle,
  onClose,
}: {
  label: string;
  href: string;
  angle: number;
  onClose: () => void;
}) {
  const x = `calc(cos(${angle}deg) * var(--social-r))`;
  const y = `calc(sin(${angle}deg) * var(--social-r))`;
  const external = href.startsWith("http");
  const wrap: React.CSSProperties = {
    position: "absolute",
    left: "50%",
    top: "50%",
    ["--social-r" as string]: "min(180px, 28vw)",
    transform: `translate(calc(-50% + ${x}), calc(-50% + ${y}))`,
    opacity: 0,
    animation: `rm-fade-in 600ms var(--ease-out) 0.35s forwards`,
    zIndex: 4,
  };
  const inner = (
    <span className="rm-social">
      <span className="rm-social-dot" />
      <span className="rm-social-label">{label}</span>
      <style jsx>{`
        .rm-social {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          animation: rm-bob 4.5s ease-in-out infinite;
          transition: transform 350ms ease-in-out;
        }
        .rm-social:hover {
          transform: scale(1.15);
        }
        .rm-social-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(26,24,20,0.55);
        }
        .rm-social-label {
          font-family: var(--display);
          font-style: italic;
          font-weight: 300;
          font-size: clamp(12px, 1.6vw, 14px);
          color: rgba(26,24,20,0.8);
          letter-spacing: 0.06em;
        }
      `}</style>
    </span>
  );
  return external ? (
    <a href={href} style={wrap} target="_blank" rel="noreferrer" onClick={onClose}>
      {inner}
    </a>
  ) : (
    <Link href={href} style={wrap} onClick={onClose}>
      {inner}
    </Link>
  );
}
