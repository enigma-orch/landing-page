import {
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import type { ReactNode } from "react";
import appCss from "~/styles/app.css?url";
import { LenisProvider } from "~/components/LenisProvider";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1, viewport-fit=cover",
      },
      {
        title: "Gosto — your wardrobe, styled by AI",
      },
      {
        name: "description",
        content:
          "Gosto turns your closet into outfits, calendar-aware looks and music-matched vibes. Built for people who love getting dressed.",
      },
      { name: "theme-color", content: "#F5F0E6" },
      { property: "og:title", content: "Gosto — your wardrobe, styled by AI" },
      {
        property: "og:description",
        content:
          "Snap your clothes. Let Gosto build the outfit. Match the calendar, the weather, even the song stuck in your head.",
      },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
    ],
  }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <LenisProvider>
        <Outlet />
      </LenisProvider>
    </RootDocument>
  );
}

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
