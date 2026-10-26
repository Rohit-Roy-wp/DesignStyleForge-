import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/layout/ThemeProvider';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AdBanner } from '@/components/ads/AdBanner';
import { Analytics } from '@vercel/analytics/next';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://designstyleforge.com'),
  title: {
    default: 'DesignStyleForge — 20+ Frontend Style Generators & Canvas Tools',
    template: '%s | DesignStyleForge',
  },
  description:
    'The ultimate frontend utility platform for web developers and UI designers. Generate CSS for Glassmorphism, Cyberpunk Glitch, Aurora Gradients, Pixel Art, CRT Scanlines, and more.',
  keywords: [
    'CSS generator',
    'Glassmorphism builder',
    'Cyberpunk text generator',
    'Claymorphism buttons',
    'Aurora gradient',
    'Pixel art canvas',
    'Web developer utilities',
    'Tailwind CSS snippets',
    'DesignStyleForge',
  ],
  authors: [{ name: 'DesignStyleForge Team' }],
  creator: 'DesignStyleForge',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://designstyleforge.com',
    title: 'DesignStyleForge — 20+ Frontend Style Generators & Canvas Tools',
    description:
      'Free client-side generators for Glassmorphism, Cyberpunk, Claymorphism, Aurora Gradients, Pixel Art, Retro CRT, and more. 1-click CSS & Tailwind copy.',
    siteName: 'DesignStyleForge',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DesignStyleForge — Frontend Design Generators',
    description: 'Instant CSS, Tailwind & HTML generators for 20+ popular design aesthetics.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} dark`} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col forge-bg forge-text antialiased font-sans transition-colors duration-300" suppressHydrationWarning>
        <ThemeProvider>
          <Header />
          <div className="flex-1">{children}</div>
          <Footer />

          {/* Sticky Anchor Ad on Mobile Screens */}
          <div className="block md:hidden">
            <AdBanner format="sticky-anchor" />
          </div>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
