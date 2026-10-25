import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy and Cookie practices for DesignStyleForge web utility platform.',
};

export default function PrivacyPolicyPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 text-neutral-300">
      <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-cyan-400 mb-6 transition-colors">
        <ArrowLeft className="h-3 w-3" />
        Back to Home
      </Link>

      <div className="rounded-3xl border border-neutral-800 bg-neutral-900/40 p-6 md:p-10 backdrop-blur">
        <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold mb-2">
          <ShieldCheck className="h-4 w-4" />
          <span>Legal & Transparency</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-6">
          Privacy Policy
        </h1>
        <p className="text-xs text-neutral-500 mb-8">
          Last Updated: October 2026 • Effective Date: Immediate
        </p>

        <div className="space-y-6 text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-white mb-2">1. Overview & ₹0 Server Data Collection</h2>
            <p>
              At <strong>DesignStyleForge</strong> (accessible via designstyleforge.com), accessible to global web developers and creators, our core philosophy is <strong>100% client-side execution</strong>. All CSS generation, canvas manipulations (pixel art, retro scanlines, halftone filters), and typography previews run locally within your web browser. We do not store, process, or transmit your uploaded images, source code, or audio files to any server.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">2. Local Storage Usage</h2>
            <p>
              We utilize browser <code>localStorage</code> solely to remember your UI preferences, such as Dark Mode or Light Mode theme selection and recent preset parameters. This data never leaves your device.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">3. Google AdSense & Third-Party Cookies</h2>
            <p>
              DesignStyleForge displays advertisements served by <strong>Google AdSense</strong> and affiliated ad networks to support ₹0 free access for all creators.
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-neutral-400">
              <li>Third-party vendors, including Google, use cookies to serve ads based on a user&apos;s prior visits to our website or other websites.</li>
              <li>Google&apos;s use of advertising cookies enables it and its partners to serve ads to our users based on their visit to our site and/or other sites on the Internet.</li>
              <li>Users may opt out of personalized advertising by visiting <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-cyan-400 underline">Google Ads Settings</a>.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">4. Log Files & Analytics</h2>
            <p>
              Standard static hosting infrastructure (such as Vercel or Netlify) may log basic non-personally identifiable technical information (e.g., browser type, referring/exit pages, date/time stamp, click counts) for performance monitoring and DDoS prevention.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">5. Contact Information</h2>
            <p>
              If you have any questions or feedback regarding our privacy practices, please contact our team via our <Link href="/contact/" className="text-cyan-400 underline">Contact Page</Link>.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
