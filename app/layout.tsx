import type { Metadata } from "next";
import { Fraunces, Inter, Silkscreen } from "next/font/google";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/next";
import { Stellina } from "@/components/pixel/doodles";
import WelcomeModal from "@/components/WelcomeModal";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const silkscreen = Silkscreen({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-silkscreen",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ),
  title: {
    default: "Gayometro, misurazioni con falsa precisione scientifica",
    template: "%s | Gayometro",
  },
  description:
    "Il misuratore satirico che stabilisce quanto è gay qualsiasi comportamento, oggetto o abitudine. Verdetti inappellabili, precisione garantita al 73%.",
};

const NAV = [
  { href: "/", label: "Gayometro" },
  { href: "/bacheca", label: "Bacheca" },
  { href: "/quiz", label: "Quiz" },
  { href: "/info", label: "Info" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="it"
      className={`${fraunces.variable} ${inter.variable} ${silkscreen.variable}`}
    >
      <body className="flex min-h-dvh flex-col antialiased">
        <WelcomeModal />
        <header className="border-b-2 border-ink bg-paper">
          <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-4 py-4 sm:px-6">
            <Link
              href="/"
              className="flex items-center gap-2 font-display text-2xl font-black tracking-tight"
            >
              <Stellina className="size-5 text-rust" />
              Gayometro
            </Link>
            <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-bold uppercase tracking-wider">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="underline-offset-4 hover:underline"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </header>

        <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
          {children}
        </main>

        <footer className="border-t-2 border-ink bg-paper">
          <div className="mx-auto flex w-full max-w-5xl flex-col gap-2 px-4 py-6 text-sm sm:px-6">
            <p>
              Il Gayometro è un sito satirico: misura l&rsquo;assurdità di
              misurare le cose, non le persone.
            </p>
            <p className="text-ink/70">
              Niente nomi di persone reali, niente cattiverie. Dettagli, privacy
              e segnalazioni nella pagina{" "}
              <Link href="/info" className="font-bold underline underline-offset-4">
                Info
              </Link>
              .
            </p>
          </div>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
