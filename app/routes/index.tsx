import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "~/components/Navbar";
import { Footer } from "~/components/Footer";
import { IntroSplash } from "~/components/IntroSplash";
import { Hero } from "~/components/sections/Hero";
import { OnboardingFlow } from "~/components/sections/OnboardingFlow";
import { Features } from "~/components/sections/Features";
import { HowItWorks } from "~/components/sections/HowItWorks";
import { Showcase } from "~/components/sections/Showcase";
import { FAQ } from "~/components/sections/FAQ";
import { CTA } from "~/components/sections/CTA";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

function LandingPage() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <main className="relative overflow-x-clip bg-cream-100 text-ink-900">
      <IntroSplash onComplete={() => setIntroDone(true)} />
      <Navbar revealed={introDone} />
      <Hero />
      <OnboardingFlow />
      <Features />
      <HowItWorks />
      <Showcase />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
