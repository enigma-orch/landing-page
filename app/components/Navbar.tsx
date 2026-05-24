import { motion, useScroll, useTransform } from "framer-motion";
import { Wordmark } from "./Logo";
import { Button } from "./Button";
import { smoothScrollTo } from "./LenisProvider";

const nav = [
  { label: "How", href: "#onboarding" },
  { label: "Features", href: "#features" },
  { label: "Steps", href: "#how" },
  { label: "Stories", href: "#stories" },
  { label: "FAQ", href: "#faq" },
];

export function Navbar({ revealed = true }: { revealed?: boolean }) {
  const { scrollY } = useScroll();
  const bg = useTransform(
    scrollY,
    [0, 80],
    ["rgba(245, 240, 230, 0)", "rgba(245, 240, 230, 0.85)"],
  );
  const border = useTransform(
    scrollY,
    [0, 80],
    ["rgba(38,35,32,0)", "rgba(38,35,32,0.08)"],
  );

  const onAnchor =
    (href: string) =>
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      smoothScrollTo(href);
    };

  return (
    <motion.header
      initial={false}
      animate={{ opacity: revealed ? 1 : 0, y: revealed ? 0 : -8 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{
        backgroundColor: bg,
        borderColor: border,
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        pointerEvents: revealed ? "auto" : "none",
      }}
      className="fixed inset-x-0 top-0 z-50 border-b"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5">
        <a
          href="#top"
          className="flex items-center"
          aria-label="Gosto home"
          onClick={onAnchor("#top")}
        >
          <Wordmark size={28} />
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={onAnchor(item.href)}
              className="rounded-full px-3.5 py-2 text-[13px] font-medium text-ink-700 hover:bg-ink-900/[0.04] hover:text-ink-900 transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="md" className="hidden sm:inline-flex">
            Sign in
          </Button>
          <Button variant="ink" size="md">
            Get the app
          </Button>
        </div>
      </div>
    </motion.header>
  );
}
