import { forwardRef } from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "~/lib/utils";

type Variant = "ink" | "cream" | "ghost" | "accent";
type Size = "md" | "lg";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  iconLeading?: ReactNode;
  iconTrailing?: ReactNode;
};

const base =
  "inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-colors duration-200 focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap";

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-[0.92rem]",
  lg: "h-14 px-7 text-base",
};

const variants: Record<Variant, string> = {
  ink: "bg-ink-900 text-cream-50 hover:bg-ink-800",
  cream:
    "bg-white text-ink-900 border border-ink-300/50 hover:border-ink-400 shadow-soft",
  ghost: "bg-transparent text-ink-900 hover:bg-ink-900/[0.04]",
  accent: "bg-drip-pink text-white hover:bg-drip-pink/90 shadow-pink-glow",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "ink", size = "md", iconLeading, iconTrailing, children, ...props },
    ref,
  ) => (
    <motion.button
      ref={ref}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 380, damping: 24 }}
      className={cn(base, sizes[size], variants[variant], className)}
      {...(props as React.ComponentProps<typeof motion.button>)}
    >
      {iconLeading ? <span className="shrink-0">{iconLeading}</span> : null}
      <span>{children}</span>
      {iconTrailing ? <span className="shrink-0">{iconTrailing}</span> : null}
    </motion.button>
  ),
);
Button.displayName = "Button";
