import { motion } from "framer-motion";
import { SCREENS } from "../Phone";

export function Showcase() {
  return (
    <section
      id="stories"
      className="relative isolate overflow-hidden bg-ink-900 text-cream-50"
    >
      <div className="pointer-events-none absolute -left-40 top-1/3 -z-10 h-[480px] w-[480px] rounded-full bg-drip-pink/15 blur-[140px]" />

      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
        <div className="max-w-3xl">
          <div className="eyebrow flex items-center gap-2 text-cream-50/55">
            <span className="h-px w-6 bg-cream-50/30" />
            Who Gosto is for
          </div>
          <h2 className="mt-4 font-display text-display-lg text-balance">
            Built for people who care how they dress.
          </h2>
        </div>

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-[1fr_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6 text-[17px] leading-relaxed text-cream-50/80"
          >
            <p>
              You already own enough. The problem isn't more clothes — it's
              remembering what you have, knowing what fits the day, and
              getting out the door without standing in front of the mirror
              for twenty minutes.
            </p>
            <p>
              Gosto sits quietly between your calendar, your closet and your
              week. It learns slowly. It doesn't push you to buy. It just
              makes the morning shorter and the outfit better.
            </p>

            <div className="grid grid-cols-2 gap-x-8 gap-y-6 pt-4">
              <Bullet label="Private by default" body="Your closet stays in your vault. Nothing is shared, nothing is sold." />
              <Bullet label="No infinite feed" body="You open Gosto, get the outfit, close it. That's the design." />
              <Bullet label="Works with what you own" body="No affiliate links pushing things you don't need." />
              <Bullet label="Made in Algiers" body="Built by a small team that wears the app every day." />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative justify-self-center"
          >
            <div className="absolute -inset-6 -z-10 rounded-[40px] bg-drip-pink/12 blur-3xl" />
            <div className="rotate-[2deg] rounded-[34px] bg-cream-50 p-2 shadow-float">
              <div className="overflow-hidden rounded-[26px] bg-cream-50">
                <img
                  src={SCREENS.profile.src}
                  alt={SCREENS.profile.alt}
                  width={SCREENS.profile.width}
                  height={SCREENS.profile.height}
                  draggable={false}
                  className="block w-[320px] max-w-full select-none"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Bullet({ label, body }: { label: string; body: string }) {
  return (
    <div>
      <div className="text-sm font-semibold text-cream-50">{label}</div>
      <div className="mt-1 text-sm leading-relaxed text-cream-50/55">
        {body}
      </div>
    </div>
  );
}
