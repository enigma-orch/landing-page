import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Smooth scroll wrapper. Mounted once in the root route.
 * Disables itself under `prefers-reduced-motion: reduce`.
 *
 * Exposes the live Lenis instance on `window.__lenis` so the navbar
 * anchor handler can call `scrollTo` with the same easing curve.
 */
export function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduce =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    if (reduce) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    (window as Window & { __lenis?: Lenis }).__lenis = lenis;

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      delete (window as Window & { __lenis?: Lenis }).__lenis;
    };
  }, []);

  return <>{children}</>;
}

/** Imperative anchor scroll that uses Lenis when available, falls back to native. */
export function smoothScrollTo(target: string | HTMLElement) {
  if (typeof window === "undefined") return;
  const lenis = (window as Window & { __lenis?: Lenis }).__lenis;
  if (lenis) {
    lenis.scrollTo(target, { offset: -16 });
    return;
  }
  const el =
    typeof target === "string"
      ? (document.querySelector(target) as HTMLElement | null)
      : target;
  el?.scrollIntoView({ behavior: "smooth", block: "start" });
}
