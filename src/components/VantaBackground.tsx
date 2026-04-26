"use client";

import { useEffect, useRef } from "react";

type VantaInstance = { destroy: () => void; resize?: () => void };

declare global {
  interface Window {
    VANTA?: { BIRDS: (opts: Record<string, unknown>) => VantaInstance };
    THREE?: unknown;
  }
}

const THREE_SRC = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js";
const VANTA_SRC = "https://cdn.jsdelivr.net/npm/vanta@0.5.24/dist/vanta.birds.min.js";

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[data-src="${src}"]`);
    if (existing) {
      if (existing.dataset.loaded === "true") return resolve();
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error(`Failed to load ${src}`)));
      return;
    }
    const s = document.createElement("script");
    s.src = src;
    s.async = true;
    s.dataset.src = src;
    s.addEventListener("load", () => {
      s.dataset.loaded = "true";
      resolve();
    });
    s.addEventListener("error", () => reject(new Error(`Failed to load ${src}`)));
    document.head.appendChild(s);
  });
}

export default function VantaBackground() {
  const ref = useRef<HTMLDivElement>(null);
  const effectRef = useRef<VantaInstance | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        await loadScript(THREE_SRC);
        await loadScript(VANTA_SRC);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.warn("Vanta failed to load", err);
        return;
      }
      if (cancelled || !ref.current || !window.VANTA) return;

      effectRef.current = window.VANTA.BIRDS({
        el: ref.current,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200,
        minWidth: 200,
        scale: 1,
        scaleMobile: 1,
        backgroundColor: 0xffffff,
        quantity: 2,
      });
    })();

    return () => {
      cancelled = true;
      if (effectRef.current?.destroy) {
        try {
          effectRef.current.destroy();
        } catch {
          // ignore
        }
      }
      effectRef.current = null;
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        pointerEvents: "none",
        background: "#ffffff",
      }}
    />
  );
}
