'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Mail, MessageSquare, Send, Check } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 text-neutral-300">
      <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-cyan-400 mb-6 transition-colors">
        <ArrowLeft className="h-3 w-3" />
        Back to Home
      </Link>

      <div className="rounded-3xl border border-neutral-800 bg-neutral-900/40 p-6 md:p-10 backdrop-blur">
        <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold mb-2">
          <Mail className="h-4 w-4" />
          <span>Support & Feedback</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
          Get in Touch
        </h1>
        <p className="text-sm text-neutral-400 mb-8">
          Have an idea for a new design style generator, found a bug, or interested in partnership/sponsorship inquiries? Send us a message!
        </p>

        {submitted ? (
          <div className="rounded-2xl border border-emerald-800/80 bg-emerald-950/40 p-6 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 mb-3">
              <Check className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Message Sent Successfully!</h3>
            <p className="text-xs text-neutral-300 mt-1">
              Thank you for reaching out. We appreciate your feedback and typically reply within 24-48 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">
                Your Name
              </label>
              <input
                type="text"
                required
                placeholder="Jane Doe"
                className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-2.5 text-sm text-white placeholder-neutral-600 focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">
                Your Email Address
              </label>
              <input
                type="email"
                required
                placeholder="developer@example.com"
                className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-2.5 text-sm text-white placeholder-neutral-600 focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">
                Subject
              </label>
              <input
                type="text"
                required
                placeholder="Feature Request / Partnership / Feedback"
                className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-2.5 text-sm text-white placeholder-neutral-600 focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">
                Your Message
              </label>
              <textarea
                rows={5}
                required
                placeholder="Tell us what you'd love to see or ask any question..."
                className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-2.5 text-sm text-white placeholder-neutral-600 focus:border-cyan-500 focus:outline-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-cyan-500/20 hover:opacity-95 active:scale-98 transition-all w-full sm:w-auto"
            >
              <Send className="h-4 w-4" />
              Send Message
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
