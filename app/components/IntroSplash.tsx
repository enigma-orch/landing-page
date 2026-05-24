import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

/**
 * Brand intro splash. Plays once per session.
 *
 * Sequence (≈ 2.0s):
 *   in    — overlay visible, blocks hidden
 *   split — blocks fade in offset outward (the DRIPLogo "split" state)
 *   unified — blocks spring inward to the unified mark shape
 *   word — "Gosto" wordmark fades in beside the mark
 *   exit — overlay fades out, calls `onComplete`
 */
const palette = {
  cyan: "#3FDAE6",
  purple: "#A281E9",
  pink: "#DD4982",
  yellow: "#FFC400",
} as const;

const kinds = ["cyan", "purple", "pink", "yellow"] as const;
type Kind = (typeof kinds)[number];

const BLOCK = 110;
const GAP = 12;
const OFFSET = 50; // split-state outward offset

const splitOffsets: Record<Kind, { x: number; y: number }> = {
  cyan: { x: -OFFSET, y: -OFFSET },
  purple: { x: OFFSET, y: -OFFSET },
  pink: { x: -OFFSET, y: OFFSET },
  yellow: { x: OFFSET, y: OFFSET },
};

const gridPos: Record<Kind, { left: number; top: number }> = {
  cyan: { left: 0, top: 0 },
  purple: { left: BLOCK + GAP, top: 0 },
  pink: { left: 0, top: BLOCK + GAP },
  yellow: { left: BLOCK + GAP, top: BLOCK + GAP },
};

function radiiFor(kind: Kind, unified: boolean) {
  const big = BLOCK * 0.64;
  const small = BLOCK * 0.22;
  switch (kind) {
    case "cyan":
      return { tl: small, tr: big, bl: 0, br: 0 };
    case "purple":
      return { tl: unified ? 0 : big, tr: small, bl: unified ? big : 0, br: 0 };
    case "pink":
      return { tl: 0, tr: 0, bl: small, br: big };
    case "yellow":
      return { tl: unified ? big : 0, tr: 0, bl: unified ? 0 : big, br: small };
  }
}

type Phase = "in" | "split" | "unified" | "word";

export function IntroSplash({ onComplete }: { onComplete: () => void }) {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(true);
  const [phase, setPhase] = useState<Phase>("in");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const skip =
      sessionStorage.getItem("gosto:intro-played") === "1" || reduce;
    if (skip) {
      sessionStorage.setItem("gosto:intro-played", "1");
      setShow(false);
      onComplete();
      return;
    }

    document.body.style.overflow = "hidden";

    const timers = [
      window.setTimeout(() => setPhase("split"), 150),
      window.setTimeout(() => setPhase("unified"), 750),
      window.setTimeout(() => setPhase("word"), 1300),
      window.setTimeout(() => {
        sessionStorage.setItem("gosto:intro-played", "1");
        document.body.style.overflow = "";
        setShow(false);
      }, 2200),
    ];

    return () => {
      timers.forEach((t) => window.clearTimeout(t));
      document.body.style.overflow = "";
    };
  }, [reduce, onComplete]);

  const isVisible = phase !== "in";
  const isUnified = phase === "unified" || phase === "word";

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {show ? (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-cream-50"
          aria-hidden
        >
          {/* Subtle background flicker — single very soft pink wash */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ duration: 0.8 }}
            className="pointer-events-none absolute h-[640px] w-[640px] rounded-full bg-drip-pink/10 blur-[140px]"
          />

          <div className="relative flex items-center gap-7">
            <div
              className="relative"
              style={{
                width: BLOCK * 2 + GAP,
                height: BLOCK * 2 + GAP,
              }}
            >
              {kinds.map((kind) => {
                const r = radiiFor(kind, isUnified);
                const off = isUnified ? { x: 0, y: 0 } : splitOffsets[kind];
                return (
                  <motion.div
                    key={kind}
                    initial={{
                      opacity: 0,
                      x: splitOffsets[kind].x,
                      y: splitOffsets[kind].y,
                    }}
                    animate={{
                      opacity: isVisible ? 1 : 0,
                      x: off.x,
                      y: off.y,
                      borderTopLeftRadius: r.tl,
                      borderTopRightRadius: r.tr,
                      borderBottomLeftRadius: r.bl,
                      borderBottomRightRadius: r.br,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 230,
                      damping: 26,
                      opacity: { duration: 0.45 },
                      borderTopLeftRadius: {
                        type: "spring",
                        stiffness: 240,
                        damping: 28,
                      },
                      borderTopRightRadius: {
                        type: "spring",
                        stiffness: 240,
                        damping: 28,
                      },
                      borderBottomLeftRadius: {
                        type: "spring",
                        stiffness: 240,
                        damping: 28,
                      },
                      borderBottomRightRadius: {
                        type: "spring",
                        stiffness: 240,
                        damping: 28,
                      },
                    }}
                    style={{
                      position: "absolute",
                      left: gridPos[kind].left,
                      top: gridPos[kind].top,
                      width: BLOCK,
                      height: BLOCK,
                      background: palette[kind],
                    }}
                  />
                );
              })}
            </div>

            <motion.span
              initial={{ opacity: 0, x: -22, filter: "blur(8px)" }}
              animate={{
                opacity: phase === "word" ? 1 : 0,
                x: phase === "word" ? 0 : -22,
                filter: phase === "word" ? "blur(0px)" : "blur(8px)",
              }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-black tracking-tight text-ink-900"
              style={{ fontSize: 96, lineHeight: 1 }}
            >
              Gosto
            </motion.span>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
