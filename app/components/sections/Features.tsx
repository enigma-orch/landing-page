import { motion } from "framer-motion";
import {
  Shirt,
  Heart,
  CalendarDays,
  Music4,
  X,
  Bookmark,
  Watch,
  ShoppingBag,
  Footprints,
} from "lucide-react";
import { SCREENS } from "../Phone";

export function Features() {
  return (
    <section id="features" className="relative bg-cream-100 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="What it does"
          title={
            <>
              Four small things that change your mornings.
            </>
          }
        />

        <div className="mt-16 grid grid-cols-1 gap-4 lg:grid-cols-3 lg:grid-rows-2 lg:[&>*]:min-h-[320px]">
          <CardWardrobe />
          <CardCalendar />
          <CardDiscover />
          <CardVibe />
        </div>
      </div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
}: {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.5 }}
        className="eyebrow flex items-center gap-2"
      >
        <span className="h-px w-6 bg-ink-500/40" />
        {eyebrow}
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        className="mt-4 font-display text-display-lg text-balance text-ink-900"
      >
        {title}
      </motion.h2>
      {subtitle ? (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 text-pretty text-base leading-relaxed text-ink-600 sm:text-lg"
        >
          {subtitle}
        </motion.p>
      ) : null}
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// Bento cards — each one owns ONE brand colour
// ────────────────────────────────────────────────────────────

function CardWardrobe() {
  // Cream surface · cyan accent · wardrobe screen peeking from bottom-right
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="group relative col-span-1 overflow-hidden rounded-drip-2xl border border-ink-300/40 bg-white p-7 shadow-soft lg:col-span-2"
    >
      <div className="relative z-10 max-w-md">
        <CardIcon tone="cyan">
          <Shirt className="h-4 w-4" />
        </CardIcon>
        <h3 className="mt-5 font-display text-2xl font-bold leading-tight text-ink-900">
          Your closet, catalogued in a tap.
        </h3>
        <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-ink-600">
          Snap each piece once. Backgrounds removed, categories tagged,
          everything searchable.
        </p>
      </div>

      {/* Wardrobe screen peeking from bottom-right */}
      <div className="pointer-events-none absolute -right-12 -bottom-10 w-[280px] rotate-[6deg] sm:-right-4 sm:bottom-[-30px] sm:w-[320px]">
        <div className="rounded-[28px] bg-ink-900 p-1.5 shadow-float">
          <div className="overflow-hidden rounded-[24px] bg-white">
            <img
              src={SCREENS.wardrobe.src}
              alt={SCREENS.wardrobe.alt}
              width={SCREENS.wardrobe.width}
              height={SCREENS.wardrobe.height}
              draggable={false}
              className="block w-full select-none"
            />
          </div>
        </div>
      </div>

      {/* Soft cyan ground glow, isolated to this card */}
      <div className="pointer-events-none absolute -right-20 -bottom-20 h-72 w-72 rounded-full bg-drip-cyan/20 blur-3xl" />
    </motion.article>
  );
}

function CardCalendar() {
  // Solid ink card · single pink dot · text-only, no rainbow
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="relative col-span-1 overflow-hidden rounded-drip-2xl bg-ink-900 p-7 text-cream-50 shadow-card lg:col-span-2"
    >
      <CardIcon tone="dark">
        <CalendarDays className="h-4 w-4" />
      </CardIcon>
      <h3 className="mt-5 font-display text-2xl font-bold leading-tight">
        Dressed for the day, before it starts.
      </h3>
      <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-cream-50/65">
        Calendar-aware. Wedding Saturday, standup Tuesday. Gosto plans the
        week ahead of time.
      </p>

      <div className="mt-6 flex flex-wrap gap-2 max-w-md">
        {[
          { day: "Mon", label: "Standup · 09:00", tone: "cream" },
          { day: "Tue", label: "Pitch · 14:00", tone: "cream" },
          { day: "Sat", label: "Wedding · 18:00", tone: "pink" },
        ].map((e) => (
          <span
            key={e.day}
            className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11.5px] font-medium ${
              e.tone === "pink"
                ? "border-drip-pink/40 bg-drip-pink/15 text-drip-pink"
                : "border-cream-50/15 bg-white/5 text-cream-50/80"
            }`}
          >
            <span className="text-[10px] font-bold uppercase tracking-wider opacity-70">
              {e.day}
            </span>
            {e.label}
          </span>
        ))}
      </div>
    </motion.article>
  );
}

function CardDiscover() {
  // Dark surface · purple accent · custom flat-lay outfit card stack
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="relative col-span-1 overflow-hidden rounded-drip-2xl bg-ink-900 p-7 text-cream-50 shadow-card lg:row-span-2"
    >
      <CardIcon tone="purple">
        <Heart className="h-4 w-4" />
      </CardIcon>
      <h3 className="mt-5 font-display text-2xl font-bold leading-tight">
        Swipe through outfits built from your closet.
      </h3>
      <p className="mt-3 text-[15px] leading-relaxed text-cream-50/65">
        Save, skip, swap. Gosto gets sharper with every choice.
      </p>

      {/* Fanned outfit card stack — purely composed, no screenshot */}
      <div className="relative mt-8">
        <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[40px] bg-drip-purple/25 blur-3xl" />

        {/* Background card 2 (deeper, more rotated) */}
        <div className="absolute inset-x-6 top-4 h-full origin-bottom -rotate-[6deg] rounded-[26px] bg-ink-800 shadow-card" />
        {/* Background card 1 */}
        <div className="absolute inset-x-3 top-2 h-full origin-bottom rotate-[3deg] rounded-[26px] bg-ink-700/80 shadow-card" />

        {/* Foreground outfit card */}
        <div className="relative rounded-[26px] bg-cream-50 p-4 text-ink-900 shadow-float">
          <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-500">
            Today
          </div>

          <div className="mt-2 font-display text-[1.05rem] font-bold leading-tight text-ink-900">
            Office, smart casual
          </div>

          {/* Flat-lay grid of outfit pieces */}
          <div className="mt-3 grid grid-cols-3 grid-rows-2 gap-1.5">
            <OutfitTile tone="ink" icon={<Shirt className="h-4 w-4" />} />
            <OutfitTile
              tone="cream"
              icon={<Shirt className="h-4 w-4 -rotate-12" />}
              span="col"
            />
            <OutfitTile tone="ink-soft" icon={<Watch className="h-4 w-4" />} />
            <OutfitTile
              tone="ink"
              icon={<Footprints className="h-4 w-4" />}
              span="col"
            />
            <OutfitTile
              tone="purple"
              icon={<ShoppingBag className="h-4 w-4" />}
            />
          </div>
        </div>

        {/* Swipe action row */}
        <div className="mt-5 flex items-center justify-center gap-3">
          <SwipeButton tone="cream"><X className="h-4 w-4" /></SwipeButton>
          <SwipeButton tone="purple" lg>
            <Heart className="h-5 w-5 fill-current" />
          </SwipeButton>
          <SwipeButton tone="cream"><Bookmark className="h-4 w-4" /></SwipeButton>
        </div>
      </div>
    </motion.article>
  );
}

function OutfitTile({
  tone,
  icon,
  span,
}: {
  tone: "ink" | "ink-soft" | "cream" | "purple";
  icon: React.ReactNode;
  span?: "col";
}) {
  const tones: Record<typeof tone, string> = {
    ink: "bg-ink-900 text-cream-50",
    "ink-soft": "bg-ink-800/90 text-cream-50/80",
    cream: "bg-cream-200 text-ink-700",
    purple: "bg-drip-purple/85 text-white",
  };
  return (
    <div
      className={`flex aspect-square items-center justify-center rounded-xl ${
        tones[tone]
      } ${span === "col" ? "row-span-2 aspect-auto" : ""}`}
    >
      {icon}
    </div>
  );
}

function SwipeButton({
  children,
  tone,
  lg = false,
}: {
  children: React.ReactNode;
  tone: "cream" | "purple";
  lg?: boolean;
}) {
  const tones = {
    cream: "bg-white/8 text-cream-50 border-cream-50/15",
    purple: "bg-drip-purple text-white border-drip-purple shadow-lg shadow-drip-purple/40",
  } as const;
  return (
    <div
      className={`inline-flex items-center justify-center rounded-full border ${
        tones[tone]
      } ${lg ? "h-12 w-12" : "h-10 w-10"}`}
    >
      {children}
    </div>
  );
}

function CardVibe() {
  // Cream surface · yellow accent · spotify screen as photographic visual
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="relative col-span-1 overflow-hidden rounded-drip-2xl border border-ink-300/40 bg-cream-50 p-7 shadow-soft lg:row-span-2"
    >
      <CardIcon tone="yellow">
        <Music4 className="h-4 w-4" />
      </CardIcon>
      <h3 className="mt-5 font-display text-2xl font-bold leading-tight text-ink-900">
        A stylist that listens.
      </h3>
      <p className="mt-3 text-[15px] leading-relaxed text-ink-600">
        Link Spotify. The music you're playing shapes what Gosto suggests —
        quietly, in the background.
      </p>

      <div className="relative mt-6">
        <div className="absolute -inset-3 -z-10 rounded-[36px] bg-drip-yellow/25 blur-3xl" />
        <div className="overflow-hidden rounded-[24px] bg-white ring-1 ring-ink-300/40 shadow-soft">
          <img
            src={SCREENS.spotify.src}
            alt={SCREENS.spotify.alt}
            width={SCREENS.spotify.width}
            height={SCREENS.spotify.height}
            draggable={false}
            className="block w-full select-none"
          />
        </div>
      </div>
    </motion.article>
  );
}

function CardIcon({
  tone,
  children,
}: {
  tone: "cyan" | "purple" | "yellow" | "pink" | "dark";
  children: React.ReactNode;
}) {
  const styles: Record<typeof tone, string> = {
    cyan: "bg-drip-cyan/15 text-drip-cyan",
    purple: "bg-drip-purple/20 text-drip-purple",
    yellow: "bg-drip-yellow/25 text-[#8C6B00]",
    pink: "bg-drip-pink/15 text-drip-pink",
    dark: "bg-cream-50/10 text-cream-50",
  };
  return (
    <div
      className={`inline-flex h-9 w-9 items-center justify-center rounded-full ${styles[tone]}`}
    >
      {children}
    </div>
  );
}
