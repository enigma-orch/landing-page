import { Wordmark } from "./Logo";

export function Footer() {
  const cols = [
    {
      title: "Product",
      items: ["Wardrobe", "Outfits", "Discover", "Calendar", "Studio"],
    },
    {
      title: "Company",
      items: ["About", "Careers", "Press", "Contact"],
    },
    {
      title: "Legal",
      items: ["Privacy", "Terms", "Cookies", "Open source"],
    },
  ];

  return (
    <footer className="relative border-t border-ink-900/8 bg-cream-50">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <Wordmark size={32} animated={false} />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink-600">
            A quiet stylist that lives inside your phone. Built in Algiers,
            available on iOS.
          </p>
        </div>

        {cols.map((col) => (
          <div key={col.title}>
            <div className="eyebrow text-ink-500">{col.title}</div>
            <ul className="mt-4 space-y-3">
              {col.items.map((label) => (
                <li key={label}>
                  <a
                    href="#"
                    className="text-sm text-ink-700 hover:text-ink-900 transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-ink-900/8">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-6 py-6 text-xs text-ink-500 sm:flex-row sm:items-center">
          <span>© {new Date().getFullYear()} Gosto.</span>
          <span>Algiers · iOS</span>
        </div>
      </div>
    </footer>
  );
}
