"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import RadialMenu from "./RadialMenu";
import type { Work } from "@/data/works";

type Props = {
  works?: Work[];
};

const NAV_LINKS: { label: string; href: string }[] = [
  { label: "WORK", href: "/" },
  { label: "SKILLS", href: "/skills" },
  { label: "ABOUT", href: "/about" },
];

export default function Navbar({ works = [] }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [workOpen, setWorkOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const yearCounts = useMemo(() => {
    const map = new Map<number, number>();
    for (const w of works) map.set(w.year, (map.get(w.year) ?? 0) + 1);
    return Array.from(map.entries()).sort((a, b) => b[0] - a[0]);
  }, [works]);

  return (
    <>
      <header
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          padding: "36px 56px",
          minHeight: 96,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          aria-label="Open navigation menu"
          style={{
            fontFamily: "var(--display)",
            fontWeight: 300,
            fontSize: 40,
            letterSpacing: "0.1em",
            color: "var(--bone)",
            border: 0,
            outline: "none",
            boxShadow: "none",
            background: "transparent",
          }}
        >
          NABI KAGE
        </button>

        <nav
          aria-label="Primary"
          className="nav-center"
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            gap: 36,
            alignItems: "center",
          }}
        >
          {NAV_LINKS.map((link) => {
            if (link.label === "WORK") {
              return (
                <div
                  key={link.label}
                  style={{ position: "relative" }}
                  onMouseEnter={() => setWorkOpen(true)}
                  onMouseLeave={() => setWorkOpen(false)}
                >
                  <NavLink href={link.href} label={link.label} />
                  <div
                    style={{
                      position: "absolute",
                      top: "100%",
                      left: "50%",
                      transform: "translateX(-50%)",
                      paddingTop: 16,
                      opacity: workOpen ? 1 : 0,
                      pointerEvents: workOpen ? "auto" : "none",
                      transition: "opacity 400ms var(--ease-out)",
                      minWidth: 140,
                    }}
                  >
                    <ul
                      style={{
                        listStyle: "none",
                        margin: 0,
                        padding: "12px 16px",
                        background: "rgba(255,255,255,0.95)",
                        display: "flex",
                        flexDirection: "column",
                        gap: 8,
                        textAlign: "center",
                      }}
                    >
                      {yearCounts.length === 0 ? (
                        <li
                          style={{
                            fontSize: 11,
                            letterSpacing: "0.2em",
                            color: "rgba(26,24,20,0.4)",
                          }}
                        >
                          —
                        </li>
                      ) : (
                        yearCounts.map(([year, count]) => (
                          <li key={year}>
                            <span
                              style={{
                                display: "inline-flex",
                                gap: 8,
                                fontSize: 11,
                                letterSpacing: "0.2em",
                                color: "rgba(26,24,20,0.5)",
                                textTransform: "uppercase",
                              }}
                            >
                              <span>{year}</span>
                              <span style={{ color: "rgba(26,24,20,0.25)" }}>
                                {String(count).padStart(2, "0")}
                              </span>
                            </span>
                          </li>
                        ))
                      )}
                    </ul>
                  </div>
                </div>
              );
            }
            return <NavLink key={link.label} href={link.href} label={link.label} />;
          })}
        </nav>

        <button
          type="button"
          className="nav-burger"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
          style={{
            display: "none",
            color: "var(--bone)",
            fontSize: 11,
            letterSpacing: "0.2em",
          }}
        >
          {mobileOpen ? "CLOSE" : "MENU"}
        </button>
      </header>

      {mobileOpen && (
        <div
          className="nav-mobile-panel"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 49,
            background: "rgba(255,255,255,0.97)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 32,
          }}
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              style={{
                fontSize: 13,
                letterSpacing: "0.25em",
                color: "var(--bone)",
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}

      <RadialMenu open={menuOpen} onClose={() => setMenuOpen(false)} />

      <style jsx>{`
        @media (max-width: 768px) {
          :global(.nav-center) {
            display: none !important;
          }
          :global(.nav-burger) {
            display: inline-flex !important;
          }
        }
      `}</style>
    </>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      style={{
        fontFamily: "var(--body)",
        fontSize: 14,
        letterSpacing: "0.22em",
        textTransform: "uppercase",
      }}
    >
      <span className="text-reveal" aria-label={label}>
        <span className="text-reveal__ghost">{label}</span>
        <span aria-hidden className="text-reveal__clip">
          {label}
        </span>
      </span>
    </Link>
  );
}
