import type { Metadata } from "next";
import VantaBackground from "@/components/VantaBackground";
import PageTransition from "@/components/PageTransition";
import "./globals.css";

export const metadata: Metadata = {
  title: "Naabi Kage",
  description: "Selected works by Naabi Kage.",
  openGraph: {
    title: "Naabi Kage",
    description: "Selected works by Naabi Kage.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=EB+Garamond:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <VantaBackground />
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
