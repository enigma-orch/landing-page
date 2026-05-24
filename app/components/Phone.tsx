import type { CSSProperties, ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "~/lib/utils";

type PhoneProps = {
  src: string;
  alt: string;
  /** Phone frame width in px. Height derives from a 2.16 aspect ratio. */
  width?: number;
  imageWidth: number;
  imageHeight: number;
  /** Optional rotation, e.g. "-4deg". */
  rotate?: string;
  className?: string;
  style?: CSSProperties;
  /**
   * Optional second image layer for cross-fading (e.g. onboarding flow).
   * When provided, both layers stack; control visibility via `fadeOpacity`.
   */
  overlay?: ReactNode;
};

export function Phone({
  src,
  alt,
  width = 300,
  imageWidth,
  imageHeight,
  rotate,
  className,
  style,
  overlay,
}: PhoneProps) {
  const frameHeight = width * 2.16;

  return (
    <div
      className={cn("relative", className)}
      style={{
        width,
        height: frameHeight,
        transform: rotate ? `rotate(${rotate})` : undefined,
        ...style,
      }}
    >
      <div
        className="absolute inset-0 rounded-[44px] bg-ink-900 p-[10px] shadow-float"
        style={{ borderRadius: 44 }}
      >
        <div
          className="relative h-full w-full overflow-hidden bg-cream-50"
          style={{ borderRadius: 34 }}
        >
          <div className="pointer-events-none absolute left-1/2 top-2.5 z-20 h-[26px] w-[88px] -translate-x-1/2 rounded-full bg-ink-900" />
          <img
            src={src}
            alt={alt}
            width={imageWidth}
            height={imageHeight}
            draggable={false}
            className="block h-full w-full select-none object-cover object-top"
          />
          {overlay}
        </div>
      </div>

      <div className="absolute -left-[2px] top-[88px] h-[28px] w-[3px] rounded-l bg-ink-700" />
      <div className="absolute -left-[2px] top-[136px] h-[44px] w-[3px] rounded-l bg-ink-700" />
      <div className="absolute -left-[2px] top-[196px] h-[44px] w-[3px] rounded-l bg-ink-700" />
      <div className="absolute -right-[2px] top-[120px] h-[64px] w-[3px] rounded-r bg-ink-700" />
    </div>
  );
}

/**
 * A bare screen layer that can be stacked inside `<Phone overlay={…} />` for
 * onboarding cross-fades. Positioned absolutely; opacity is the only
 * animatable concern from the caller.
 */
export function PhoneScreenLayer({
  src,
  alt,
  imageWidth,
  imageHeight,
  opacity,
}: {
  src: string;
  alt: string;
  imageWidth: number;
  imageHeight: number;
  opacity: number | import("framer-motion").MotionValue<number>;
}) {
  return (
    <motion.img
      src={src}
      alt={alt}
      width={imageWidth}
      height={imageHeight}
      draggable={false}
      style={{ opacity }}
      className="pointer-events-none absolute inset-0 z-10 block h-full w-full select-none object-cover object-top"
    />
  );
}

// Natural pixel size of each Figma export shipped in /public/screens.
export const SCREENS = {
  home: {
    src: "/screens/01-home.png",
    width: 440,
    height: 2548,
    alt: "Gosto home — today's outfit",
  },
  discover: {
    src: "/screens/02-discover.png",
    width: 440,
    height: 913,
    alt: "Gosto discover — swipeable outfit card",
  },
  wardrobe: {
    src: "/screens/03-wardrobe.png",
    width: 440,
    height: 1256,
    alt: "Gosto wardrobe — digital closet grid",
  },
  profile: {
    src: "/screens/04-profile.png",
    width: 440,
    height: 1256,
    alt: "Gosto profile — Yacine, Algiers",
  },
  vibe: {
    src: "/screens/05-vibe.png",
    width: 440,
    height: 1365,
    alt: "Gosto onboarding — what's your vibe",
  },
  shops: {
    src: "/screens/06-shops.png",
    width: 440,
    height: 1127,
    alt: "Gosto shops — Shein, Zara, Amazon, ASOS",
  },
  budget: {
    src: "/screens/07-budget.png",
    width: 440,
    height: 1860,
    alt: "Gosto budget — perfect fit, perfect price",
  },
  spotify: {
    src: "/screens/08-spotify.png",
    width: 440,
    height: 956,
    alt: "Gosto Spotify — step into your style",
  },
  // Onboarding flow (used by OnboardingFlow.tsx)
  oWelcome: {
    src: "/screens/o1-welcome.png",
    width: 440,
    height: 956,
    alt: "Get outfits that match your day",
  },
  oMood: {
    src: "/screens/o2-mood.png",
    width: 440,
    height: 956,
    alt: "Pick the moods you live in",
  },
  oCalendar: {
    src: "/screens/o3-calendar.png",
    width: 440,
    height: 956,
    alt: "Sync your week",
  },
  oSpotify: {
    src: "/screens/o4-spotify.png",
    width: 442,
    height: 956,
    alt: "Step into your style — link Spotify",
  },
} as const;
