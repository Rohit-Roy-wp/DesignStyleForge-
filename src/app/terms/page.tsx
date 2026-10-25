import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms and Conditions for using DesignStyleForge web utility platform.',
};

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 text-neutral-300">
      <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-cyan-400 mb-6 transition-colors">
        <ArrowLeft className="h-3 w-3" />
        Back to Home
      </Link>

      <div className="rounded-3xl border border-neutral-800 bg-neutral-900/40 p-6 md:p-10 backdrop-blur">
        <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold mb-2">
          <FileText className="h-4 w-4" />
          <span>Terms & Conditions</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-6">
          Terms of Service
        </h1>
        <p className="text-xs text-neutral-500 mb-8">
          Last Updated: October 2026
        </p>

        <div className="space-y-6 text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-white mb-2">1. Acceptance of Terms</h2>
            <p>
              By accessing and using <strong>DesignStyleForge</strong>, you accept and agree to be bound by the terms and provision of this agreement. Our tools are provided completely free of charge under a royalty-free license for personal and commercial front-end development projects.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">2. Generated Code License (Commercial Use Allowed)</h2>
            <p>
              All CSS, HTML snippets, SVG paths, and canvas images generated through DesignStyleForge belong to you. You are 100% free to use them in commercial websites, client client applications, open-source repositories, and digital artwork with no attribution required.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">3. Disclaimer of Warranty</h2>
            <p>
              The materials and utilities on DesignStyleForge are provided on an &apos;as is&apos; basis. While we strive for cross-browser parity, DesignStyleForge makes no warranties, expressed or implied, regarding browser rendering discrepancies on deprecated or non-standard user agents.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
