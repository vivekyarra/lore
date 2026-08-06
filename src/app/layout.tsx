import type { Metadata } from "next";
import "./globals.css";
import "./motion.css";
import "./interactions.css";

export const metadata: Metadata = {
  title: "Lore | The continuity editor for YouTube",
  description:
    "Recover the stories your channel and audience started together.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
