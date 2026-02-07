import type { Metadata } from "next";
import { Playfair_Display, Dancing_Script } from "next/font/google";
import "./globals.css";
import GiftWrapper from "@/components/GiftWrapper";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const dancing = Dancing_Script({
  variable: "--font-dancing",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Be My Valentine? ❤️",
  description: "An immersive, interactive experience for someone very special.",
};

import { RibbonProvider, RibbonToggle } from "@/components/RibbonControl";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${dancing.variable} antialiased relative min-h-screen`}
      >
        <RibbonProvider>
          <div id="ribbon-back-portal" className="absolute top-0 left-0 w-full h-full pointer-events-none z-0" />
          <div id="main-content" className="relative z-10 w-full min-h-screen">
            {children}
          </div>
          <div id="ribbon-front-portal" className="absolute top-0 left-0 w-full h-full pointer-events-none z-[60]" />
          <GiftWrapper />
          <RibbonToggle />
        </RibbonProvider>
      </body>
    </html>
  );
}
