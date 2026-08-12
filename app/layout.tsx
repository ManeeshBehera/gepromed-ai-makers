import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GEO Command Center — Gepromed",
  description:
    "AI-visibility, citations and organic-search reporting for Gepromed — Profound, Ahrefs and Google Search Console in one workspace.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
