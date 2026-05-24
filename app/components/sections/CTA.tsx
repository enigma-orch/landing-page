import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "../Button";
import { Phone, SCREENS } from "../Phone";

export function CTA() {
  return (
    <section className="relative bg-cream-100 pb-24 sm:pb-32">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative isolate overflow-hidden rounded-drip-3xl bg-ink-900 text-cream-50 shadow-float"
        >
          {/* Single warm wash — one accent, not two */}
          <div className="pointer-events-none absolute -left-32 top-0 h-[420px] w-[420px] rounded-full bg-drip-pink/30 blur-[120px]" />

          <div className="relative grid items-center gap-12 px-8 py-14 sm:px-14 sm:py-20 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
            <div>
              <div className="eyebrow inline-flex items-center gap-2 text-cream-50/55">
                <span className="h-px w-6 bg-cream-50/30" />
                Free to start · iOS
              </div>
              <h2 className="mt-5 font-display text-display-xl text-balance text-cream-50">
                Open your closet.{" "}
                <span className="editorial-italic text-drip-pink">
                  Find&nbsp;your&nbsp;outfit.
                </span>
              </h2>
              <p className="mt-5 max-w-lg text-pretty text-lg leading-relaxed text-cream-50/65">
                The wardrobe and daily outfit are free. Gosto+ is $4.99 a
                month and you can cancel any time.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button
                  variant="accent"
                  size="lg"
                  iconTrailing={<ArrowRight className="h-4 w-4" />}
                >
                  Download for iOS
                </Button>
                <Button
                  variant="ghost"
                  size="lg"
                  className="border border-cream-50/15 bg-white/5 text-cream-50 hover:bg-white/10"
                >
                  Join Android waitlist
                </Button>
              </div>

              <div className="mt-8 flex items-center gap-3 text-xs text-cream-50/45">
                <span className="inline-flex h-1.5 w-1.5 rounded-full bg-drip-pink" />
                No card required to start · iOS 17+
              </div>
            </div>

            <div className="relative flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute -inset-10 -z-10 rounded-full bg-drip-pink/30 blur-3xl" />
                <Phone
                  src={SCREENS.home.src}
                  alt={SCREENS.home.alt}
                  imageWidth={SCREENS.home.width}
                  imageHeight={SCREENS.home.height}
                  width={260}
                  rotate="-4deg"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
