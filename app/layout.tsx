import type { Metadata } from "next";
import { Playfair_Display, Dancing_Script } from "next/font/google";
import "./globals.css";
import { RibbonProvider, RibbonToggle } from "@/components/RibbonControl";
import VisualEffects from "@/components/VisualEffects";

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
          <div id="main-content" className="relative z-10 w-full min-h-screen">
            {children}
          </div>
          <VisualEffects />
          <RibbonToggle />
        </RibbonProvider>
      </body>
    </html>
  );
}
