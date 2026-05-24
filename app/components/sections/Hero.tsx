import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Star, CalendarDays, Music } from "lucide-react";
import { Button } from "../Button";
import { Phone, SCREENS } from "../Phone";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Quiet parallax — just the phone + the ground wash, nothing else.
  const phoneY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const washY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const chipLY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const chipRY = useTransform(scrollYProgress, [0, 1], [0, 180]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative isolate overflow-hidden pt-32 pb-12 sm:pt-40 sm:pb-20"
    >
      {/* Single soft cream wash + one pink ground glow — no aurora */}
      <motion.div
        style={{ y: washY }}
        className="pointer-events-none absolute inset-x-0 top-[55%] -z-10 mx-auto h-[600px] w-[800px] max-w-full rounded-full bg-drip-pink/[0.18] blur-[120px]"
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-b from-transparent to-cream-100" />

      <div className="mx-auto max-w-5xl px-6 text-center">
        <Eyebrow />

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          className="mt-7 font-display text-display-2xl text-balance text-ink-900"
        >
          Your wardrobe,{" "}
          <span className="editorial-italic text-drip-pink">styled</span>{" "}
          by&nbsp;AI.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-6 max-w-xl text-pretty text-[1.05rem] leading-relaxed text-ink-600 sm:text-lg"
        >
          Snap your clothes. Gosto reads your calendar, the weather and the
          song stuck in your head — then picks the outfit.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Button
            variant="ink"
            size="lg"
            iconTrailing={<ArrowRight className="h-4 w-4" />}
          >
            Download for iOS
          </Button>
          <Button variant="ghost" size="lg">
            See how it works →
          </Button>
        </motion.div>

        <SocialProof />
      </div>

      {/* Phone showcase — one big phone, off-center floating chips */}
      <div className="relative mx-auto mt-16 flex max-w-5xl justify-center px-6">
        <motion.div style={{ y: phoneY }} className="relative">
          {/* Pink ground shadow */}
          <div className="absolute inset-x-6 -bottom-8 -z-10 h-24 rounded-full bg-drip-pink/30 blur-3xl" />

          {/* Left floating chip — calendar */}
          <motion.div
            style={{ y: chipLY }}
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="absolute -left-8 top-32 hidden md:block lg:-left-24"
          >
            <ChipCalendar />
          </motion.div>

          {/* Right floating chip — music vibe */}
          <motion.div
            style={{ y: chipRY }}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="absolute -right-8 top-72 hidden md:block lg:-right-20"
          >
            <ChipVibe />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <Phone
              src={SCREENS.home.src}
              alt={SCREENS.home.alt}
              imageWidth={SCREENS.home.width}
              imageHeight={SCREENS.home.height}
              width={320}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function Eyebrow() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="inline-flex items-center gap-2 rounded-full border border-ink-300/50 bg-white/70 px-3 py-1.5 backdrop-blur-md"
    >
      <span className="h-1.5 w-1.5 rounded-full bg-ink-900" />
      <span className="text-[11px] font-semibold tracking-wide text-ink-700">
        iOS · TestFlight beta
      </span>
    </motion.div>
  );
}

function SocialProof() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="mt-10 flex items-center justify-center gap-4 text-xs text-ink-500"
    >
      <div className="flex -space-x-2">
        {[
          "linear-gradient(135deg, #E9D5C6, #8A6F58)",
          "linear-gradient(135deg, #D9CBB7, #5C4A3A)",
          "linear-gradient(135deg, #F2D9D3, #B98570)",
          "linear-gradient(135deg, #DDD0BC, #3A2A21)",
        ].map((bg, i) => (
          <div
            key={i}
            className="h-7 w-7 rounded-full border-2 border-cream-100 shadow-soft"
            style={{ background: bg }}
            aria-hidden
          />
        ))}
      </div>
      <div className="flex items-center gap-1.5">
        <div className="flex">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-3.5 w-3.5 fill-ink-900 text-ink-900" />
          ))}
        </div>
        <span className="font-medium text-ink-700">Loved by the early testers</span>
      </div>
    </motion.div>
  );
}

function ChipCalendar() {
  return (
    <div className="w-56 rounded-2xl bg-white p-3.5 shadow-card ring-1 ring-ink-300/30">
      <div className="flex items-center gap-2.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-ink-900/[0.06] text-ink-900">
          <CalendarDays className="h-4 w-4" />
        </div>
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-wider text-ink-500">
            Saturday
          </div>
          <div className="text-[13px] font-semibold text-ink-900">
            Wedding · 18:00
          </div>
        </div>
      </div>
      <div className="mt-2.5 rounded-lg bg-cream-100 px-2.5 py-2 text-[11px] leading-snug text-ink-700">
        Smart casual, outdoor. Three looks ready.
      </div>
    </div>
  );
}

function ChipVibe() {
  return (
    <div className="w-60 rounded-2xl bg-ink-900 p-3.5 text-cream-50 shadow-float">
      <div className="flex items-center gap-2.5">
        <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-[#1DB954]/15 text-[#1DB954]">
          <Music className="h-4 w-4" />
        </div>
        <div className="min-w-0">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-cream-50/60">
            Spotify
          </div>
          <div className="truncate text-[13px] font-semibold">
            Your daily mix
          </div>
        </div>
      </div>
      <div className="mt-3 flex items-end gap-[3px] h-7">
        {[60, 35, 80, 50, 70, 45, 90, 60, 30, 55, 80, 40, 65].map((h, i) => (
          <div
            key={i}
            className="w-[3px] rounded-full bg-cream-50/80"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
    </div>
  );
}
