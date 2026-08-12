import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Growth Command Center — Gepromed",
  description:
    "AI-visibility, citations, organic-search and growth-plan reporting for Gepromed — Profound, Ahrefs and Google Search Console in one workspace.",
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
