import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Whop Landing",
  description: "Ultra-fast lead capture and redirect",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}

export const runtime = "edge";
