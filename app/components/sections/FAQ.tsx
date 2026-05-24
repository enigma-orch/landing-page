import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { SectionHeading } from "./Features";
import { SCREENS } from "../Phone";

const items = [
  {
    q: "Do I need to upload every piece I own?",
    a: "Nope. Most people start with 30–40 favourites. Gosto gets useful from day one and grows with you. The more it knows, the better it styles.",
  },
  {
    q: "What happens to my photos?",
    a: "They're stored encrypted in your private vault. We never share them, never train shared models on them, and you can wipe everything in one tap.",
  },
  {
    q: "Does Gosto work without Spotify?",
    a: "Yes. Vibe matching is optional. Without it, Gosto uses your calendar, the weather and your favourites. With it, the suggestions get a little spicier.",
  },
  {
    q: "How much does Gosto cost?",
    a: "Core wardrobe and daily outfits are free, forever. Gosto+ ($4.99/mo) unlocks calendar planning, vibe matching, virtual try-on and sustainability stats.",
  },
  {
    q: "Is there an Android version?",
    a: "iOS first. Android is on the roadmap for late 2026 — join the waitlist on the App Store page and we'll let you know the day it ships.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="relative bg-cream-100 py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-[1fr_1.2fr]">
        {/* Left: budget screen as a quiet anchor */}
        <div className="relative">
          <SectionHeading
            eyebrow="Common questions"
            title="The honest answers."
          />

          <div className="relative mt-12 hidden lg:block">
            <div className="absolute -left-4 -top-4 -z-10 h-72 w-72 rounded-full bg-drip-pink/10 blur-3xl" />
            <div className="-rotate-[3deg] rounded-[34px] bg-cream-50 p-2 shadow-card ring-1 ring-ink-300/40">
              <div className="overflow-hidden rounded-[26px]">
                <img
                  src={SCREENS.budget.src}
                  alt={SCREENS.budget.alt}
                  width={SCREENS.budget.width}
                  height={SCREENS.budget.height}
                  draggable={false}
                  className="block w-[280px] max-w-full select-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right: accordion */}
        <div className="divide-y divide-ink-900/10 border-y border-ink-900/10">
          {items.map((item, i) => (
            <FAQRow key={item.q} item={item} defaultOpen={i === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQRow({
  item,
  defaultOpen,
}: {
  item: { q: string; a: string };
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(!!defaultOpen);
  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-6 py-5 text-left"
        aria-expanded={open}
      >
        <span className="font-display text-lg font-semibold text-ink-900 sm:text-xl">
          {item.q}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ink-300/50 bg-cream-50 text-ink-900"
        >
          <Plus className="h-4 w-4" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-6 pr-12 text-pretty text-[15px] leading-relaxed text-ink-600">
              {item.a}
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
