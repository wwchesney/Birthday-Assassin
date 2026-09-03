import type { Metadata } from "next";
import { Cormorant_SC, Inter } from "next/font/google";
import "./globals.css";

const cormorantSC = Cormorant_SC({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Birthday Assassin",
  description: "Sign up, then find out who you're planning a birthday surprise for.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${cormorantSC.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-canvas text-ink">
        {children}
        <footer className="border-t border-rule py-4 text-center text-xs text-muted">
          © 2026 Chester Industries
        </footer>
      </body>
    </html>
  );
}
