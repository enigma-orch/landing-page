import { motion, useReducedMotion } from "framer-motion";
import { cn } from "~/lib/utils";

/**
 * 4-block brand mark, ported from
 *   Packages/Foundation/DesignSystem/.../DRIPLogo.swift (DRIPAnimatedLogo).
 * `animated` toggles a gentle split↔unified breathe.
 */
type BlockKind = "cyan" | "purple" | "pink" | "yellow";

const palette: Record<BlockKind, string> = {
  cyan: "#3FDAE6",
  purple: "#A281E9",
  pink: "#DD4982",
  yellow: "#FFC400",
};

function radiiFor(kind: BlockKind, unified: boolean, size: number) {
  const big = size * 0.64;
  const small = size * 0.22;
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

function BreathingBlock({ kind, block }: { kind: BlockKind; block: number }) {
  const split = radiiFor(kind, false, block);
  const unified = radiiFor(kind, true, block);
  return (
    <motion.div
      animate={{
        borderTopLeftRadius: [split.tl, unified.tl, split.tl],
        borderTopRightRadius: [split.tr, unified.tr, split.tr],
        borderBottomLeftRadius: [split.bl, unified.bl, split.bl],
        borderBottomRightRadius: [split.br, unified.br, split.br],
      }}
      transition={{
        duration: 3.6,
        repeat: Infinity,
        ease: "easeInOut",
        times: [0, 0.5, 1],
      }}
      style={{ width: block, height: block, background: palette[kind] }}
    />
  );
}

function StaticBlock({ kind, block }: { kind: BlockKind; block: number }) {
  const r = radiiFor(kind, true, block);
  return (
    <div
      style={{
        width: block,
        height: block,
        background: palette[kind],
        borderTopLeftRadius: r.tl,
        borderTopRightRadius: r.tr,
        borderBottomLeftRadius: r.bl,
        borderBottomRightRadius: r.br,
      }}
    />
  );
}

export function Logo({
  size = 56,
  animated = true,
  className,
  layoutId,
}: {
  size?: number;
  animated?: boolean;
  className?: string;
  layoutId?: string;
}) {
  const reduce = useReducedMotion();
  const block = (size - 6) / 2;
  const gridStyle = {
    gridTemplateColumns: `${block}px ${block}px`,
    gridTemplateRows: `${block}px ${block}px`,
    gap: 6,
  } as const;
  const kinds: BlockKind[] = ["cyan", "purple", "pink", "yellow"];

  if (reduce || !animated) {
    return (
      <motion.div
        layoutId={layoutId}
        className={cn("inline-grid", className)}
        style={gridStyle}
      >
        {kinds.map((k) => (
          <StaticBlock key={k} kind={k} block={block} />
        ))}
      </motion.div>
    );
  }

  return (
    <motion.div
      layoutId={layoutId}
      className={cn("inline-grid", className)}
      style={gridStyle}
      initial={{ scale: 0.92, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {kinds.map((k) => (
        <BreathingBlock key={k} kind={k} block={block} />
      ))}
    </motion.div>
  );
}

export function Wordmark({
  size = 36,
  className,
  animated = true,
  layoutId,
}: {
  size?: number;
  className?: string;
  animated?: boolean;
  layoutId?: string;
}) {
  return (
    <motion.div
      layoutId={layoutId}
      className={cn("flex items-center gap-3", className)}
    >
      <Logo size={size} animated={animated} />
      <span
        className="font-display font-black tracking-tight text-ink-900"
        style={{ fontSize: size * 0.78, lineHeight: 1 }}
      >
        Gosto
      </span>
    </motion.div>
  );
}
