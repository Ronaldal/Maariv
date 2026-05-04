import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "מעריב — תרגיל Next.js",
    template: "%s | מעריב",
  },
  description: "פרונטאנד לתרגיל: כתבות, תגיות, ותצוגה רספונסיבית.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="he"
      dir="rtl"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:right-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
        >
          דלג לתוכן
        </a>
        <header className="border-b border-border bg-card">
          <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
            <a
              href="/"
              className="text-base font-semibold tracking-tight sm:text-lg"
            >
              מעריב — תרגיל
            </a>
            <nav
              className="flex items-center gap-2 text-sm text-muted-foreground sm:gap-4 sm:text-base"
              aria-label="ניווט ראשי"
            >
              <span className="hidden sm:inline">דפים דינמיים יתווספו בשלב הבא</span>
            </nav>
          </div>
        </header>
        <main id="main-content" className="flex flex-1 flex-col">
          {children}
        </main>
        <footer className="mt-auto border-t border-border bg-muted/40">
          <div className="mx-auto max-w-5xl px-4 py-6 text-center text-xs text-muted-foreground sm:px-6 sm:text-sm lg:px-8">
            פרויקט לימודי — ללא קשר לתוכן אמיתי של מעריב.
          </div>
        </footer>
      </body>
    </html>
  );
}
