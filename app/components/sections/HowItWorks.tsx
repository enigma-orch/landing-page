import { motion } from "framer-motion";
import { SectionHeading } from "./Features";
import { SCREENS } from "../Phone";

const steps = [
  {
    n: "01",
    label: "Profile",
    title: "Tell us your taste.",
    body: "Pick the moods you live in, the silhouettes you reach for, the budget you actually spend.",
    image: SCREENS.vibe,
  },
  {
    n: "02",
    label: "Closet",
    title: "Add what you own.",
    body: "Snap each piece. Gosto removes the background and tags it. Start with 30 favourites — it'll grow.",
    image: SCREENS.wardrobe,
  },
  {
    n: "03",
    label: "Brands",
    title: "Tell us where you shop.",
    body: "Shein, Zara, ASOS, your tailor on the corner. Gosto stays inside the closet — and inside your budget.",
    image: SCREENS.shops,
  },
  {
    n: "04",
    label: "Wear",
    title: "Open the app, get dressed.",
    body: "Today's outfit is already on screen. Three plan-Bs waiting if you want to swipe.",
    image: SCREENS.home,
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="relative bg-cream-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="How it works"
          title="Four steps to a closet that runs itself."
        />

        <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <StepCard key={step.n} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StepCard({
  step,
  index,
}: {
  step: (typeof steps)[number];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.7,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative flex flex-col overflow-hidden rounded-drip-2xl border border-ink-300/40 bg-white shadow-soft"
    >
      <div className="flex items-baseline justify-between gap-3 px-6 pt-6">
        <span className="font-display text-3xl font-black tracking-tight text-ink-900">
          {step.n}
        </span>
        <span className="eyebrow text-ink-500">{step.label}</span>
      </div>

      <div className="px-6 pt-3 pb-5">
        <h3 className="font-display text-[1.1rem] font-bold leading-snug text-ink-900">
          {step.title}
        </h3>
        <p className="mt-2 text-[13.5px] leading-relaxed text-ink-600">
          {step.body}
        </p>
      </div>

      <div className="mt-auto px-4 pb-4">
        <div className="relative overflow-hidden rounded-[18px] bg-cream-100 ring-1 ring-ink-300/40">
          <div className="relative aspect-[5/4] overflow-hidden">
            <img
              src={step.image.src}
              alt={step.image.alt}
              width={step.image.width}
              height={step.image.height}
              draggable={false}
              className="absolute inset-x-0 top-0 w-full select-none transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-cream-100/90" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
