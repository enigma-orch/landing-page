import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { SCREENS } from "../Phone";

/**
 * Scroll-pinned onboarding "video".
 *
 * Outer container: 300vh tall (gives ~3 viewport heights of scroll budget).
 * Inner pin:        position: sticky; top: 0; height: 100vh.
 * scrollYProgress drives opacity of 4 stacked screen layers + 4 caption blocks
 * + a progress bar fill.
 *
 * Reduced-motion: renders as a quiet 4-up grid with captions below.
 */

const frames = [
  {
    eyebrow: "01 / 04",
    screen: SCREENS.oWelcome,
    title: "Outfits that match your day.",
    body: "Calendar, weather, mood — Gosto reads all three before you do.",
    accent: "#DD4982",
  },
  {
    eyebrow: "02 / 04",
    screen: SCREENS.oMood,
    title: "Pick your style.",
    body: "Streetwear, minimalist, vintage, techwear. Switch any day.",
    accent: "#A281E9",
  },
  {
    eyebrow: "03 / 04",
    screen: SCREENS.oCalendar,
    title: "Sync your week.",
    body: "Wedding Saturday, standup Tuesday — looks are ready before you check.",
    accent: "#3FDAE6",
  },
  {
    eyebrow: "04 / 04",
    screen: SCREENS.oSpotify,
    title: "Music in the loop.",
    body: "Optional Spotify link. What you're playing nudges what you wear.",
    accent: "#FFC400",
  },
] as const;

// Each frame is visible for a window of progress. Slight overlap gives a soft cross-blend.
const visibleWindows = [
  [0.0, 0.06, 0.22, 0.28],
  [0.22, 0.30, 0.46, 0.53],
  [0.46, 0.54, 0.70, 0.77],
  [0.70, 0.78, 1.0, 1.0],
] as const;

export function OnboardingFlow() {
  const reduce = useReducedMotion();

  if (reduce) return <ReducedMotionFallback />;

  return <ScrollOnboarding />;
}

function ScrollOnboarding() {
  const outerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ["start start", "end end"],
  });

  // Progress bar fill — 0..100%
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Subtle background tint per frame (cream → cream → ink-tint → cream)
  const bgColor = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    ["#FAF6EE", "#F5F0E6", "#EDE5D4", "#F5F0E6", "#FAF6EE"],
  );

  return (
    <section
      id="onboarding"
      ref={outerRef}
      className="relative"
      style={{ height: "320vh" }}
    >
      <motion.div
        style={{ backgroundColor: bgColor }}
        className="sticky top-0 flex h-screen w-full items-center overflow-hidden"
      >
        {/* Progress bar */}
        <div className="absolute inset-x-0 top-0 z-30 h-[3px] bg-ink-300/40">
          <motion.div
            style={{ width: progressWidth }}
            className="h-full bg-drip-pink"
          />
        </div>

        {/* Section label */}
        <div className="absolute left-1/2 top-10 z-20 -translate-x-1/2">
          <div className="eyebrow flex items-center gap-2 text-ink-500">
            <span className="h-px w-6 bg-ink-500/40" />
            How it feels to use Gosto
            <span className="h-px w-6 bg-ink-500/40" />
          </div>
        </div>

        <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-6 lg:grid-cols-[1.05fr_1fr]">
          {/* Caption stack — overlaid, fades per frame */}
          <div className="relative h-[460px]">
            {frames.map((f, i) => (
              <FrameCaption
                key={f.eyebrow}
                frame={f}
                window={visibleWindows[i]}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </div>

          {/* Phone with cross-fading screen layers */}
          <div className="relative flex justify-center lg:justify-end">
            <PhoneStack scrollYProgress={scrollYProgress} />
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function FrameCaption({
  frame,
  window: w,
  scrollYProgress,
}: {
  frame: (typeof frames)[number];
  window: (typeof visibleWindows)[number];
  scrollYProgress: MotionValue<number>;
}) {
  const opacity = useTransform(scrollYProgress, w as unknown as number[], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, w as unknown as number[], [24, 0, 0, -24]);
  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 flex flex-col justify-center"
    >
      <div className="flex items-center gap-3">
        <span
          className="inline-flex h-2 w-2 rounded-full"
          style={{ background: frame.accent }}
        />
        <span className="eyebrow text-ink-500">{frame.eyebrow}</span>
      </div>
      <h2 className="mt-5 font-display text-display-lg text-balance text-ink-900">
        {frame.title}
      </h2>
      <p className="mt-5 max-w-md text-pretty text-lg leading-relaxed text-ink-600">
        {frame.body}
      </p>
    </motion.div>
  );
}

function FrameScreen({
  frame,
  window: w,
  scrollYProgress,
}: {
  frame: (typeof frames)[number];
  window: (typeof visibleWindows)[number];
  scrollYProgress: MotionValue<number>;
}) {
  const opacity = useTransform(scrollYProgress, w as unknown as number[], [0, 1, 1, 0]);
  return (
    <motion.img
      src={frame.screen.src}
      alt={frame.screen.alt}
      width={frame.screen.width}
      height={frame.screen.height}
      draggable={false}
      style={{ opacity }}
      className="pointer-events-none absolute inset-0 block h-full w-full select-none object-cover object-top"
    />
  );
}

function PhoneStack({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>;
}) {
  const WIDTH = 300;
  const frameHeight = WIDTH * 2.16;

  // Soft accent halo behind the phone — color shifts with the active frame
  const haloColor = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [
      "rgba(221, 73, 130, 0.22)", // pink
      "rgba(162, 129, 233, 0.22)", // purple
      "rgba(63, 218, 230, 0.22)", // cyan
      "rgba(255, 196, 0, 0.22)", // yellow
      "rgba(255, 196, 0, 0.22)",
    ],
  );

  return (
    <div className="relative" style={{ width: WIDTH, height: frameHeight }}>
      <motion.div
        style={{ background: haloColor }}
        className="pointer-events-none absolute -inset-12 -z-10 rounded-full blur-[80px]"
      />

      <div
        className="absolute inset-0 rounded-[44px] bg-ink-900 p-[10px] shadow-float"
        style={{ borderRadius: 44 }}
      >
        <div
          className="relative h-full w-full overflow-hidden bg-cream-50"
          style={{ borderRadius: 34 }}
        >
          <div className="pointer-events-none absolute left-1/2 top-2.5 z-20 h-[26px] w-[88px] -translate-x-1/2 rounded-full bg-ink-900" />

          {frames.map((f, i) => (
            <FrameScreen
              key={f.screen.src}
              frame={f}
              window={visibleWindows[i]}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>

      <div className="absolute -left-[2px] top-[88px] h-[28px] w-[3px] rounded-l bg-ink-700" />
      <div className="absolute -left-[2px] top-[136px] h-[44px] w-[3px] rounded-l bg-ink-700" />
      <div className="absolute -left-[2px] top-[196px] h-[44px] w-[3px] rounded-l bg-ink-700" />
      <div className="absolute -right-[2px] top-[120px] h-[64px] w-[3px] rounded-r bg-ink-700" />
    </div>
  );
}

function ReducedMotionFallback() {
  return (
    <section id="onboarding" className="relative bg-cream-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="eyebrow flex items-center gap-2 text-ink-500">
          <span className="h-px w-6 bg-ink-500/40" />
          How it feels to use Gosto
        </div>
        <h2 className="mt-4 font-display text-display-lg text-balance text-ink-900">
          Four screens, one stylist.
        </h2>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {frames.map((f) => (
            <div key={f.eyebrow} className="flex flex-col">
              <div className="rounded-[28px] bg-ink-900 p-1.5 shadow-card">
                <div className="overflow-hidden rounded-[22px]">
                  <img
                    src={f.screen.src}
                    alt={f.screen.alt}
                    width={f.screen.width}
                    height={f.screen.height}
                    draggable={false}
                    className="block w-full select-none"
                  />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <span
                  className="inline-flex h-2 w-2 rounded-full"
                  style={{ background: f.accent }}
                />
                <span className="eyebrow text-ink-500">{f.eyebrow}</span>
              </div>
              <h3 className="mt-2 font-display text-lg font-bold text-ink-900">
                {f.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-600">
                {f.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
