"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  period: string;
  index: number;
  children: React.ReactNode;
};

export default function TimelineItem({ period, index, children }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setVisible(true);
            obs.disconnect();
            break;
          }
        }
      },
      { threshold: 0.15 },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="tl-item"
      style={{
        position: "relative",
        display: "grid",
        gridTemplateColumns: "120px 1fr",
        gap: 24,
        paddingLeft: 0,
        paddingBottom: 56,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 600ms var(--ease-out) ${index * 80}ms, transform 600ms var(--ease-out) ${index * 80}ms`,
      }}
    >
      <div style={{ position: "relative" }}>
        <span
          aria-hidden
          style={{
            position: "absolute",
            left: -1,
            top: 6,
            width: 4,
            height: 4,
            borderRadius: "50%",
            background: "rgba(26,24,20,0.45)",
          }}
        />
        <span
          style={{
            fontFamily: "var(--display)",
            fontStyle: "italic",
            fontWeight: 300,
            fontSize: 15,
            color: "rgba(26,24,20,0.3)",
            paddingLeft: 16,
          }}
        >
          {period}
        </span>
      </div>
      <div>{children}</div>

      <style jsx>{`
        .tl-item {
          /* timeline connector handled by parent's ::before */
        }
      `}</style>
    </div>
  );
}
