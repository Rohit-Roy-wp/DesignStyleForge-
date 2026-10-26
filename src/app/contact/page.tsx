'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Mail, Send, Check, Loader2, AlertCircle } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('https://formsubmit.co/ajax/dailystudyhindi@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          _subject: `UXForge Message: ${formData.subject || 'New Contact Request'}`,
          message: formData.message,
          _template: 'table',
          _captcha: 'false',
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitted(true);
      } else {
        setError(data.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      console.error('Contact submit error:', err);
      // Fallback: If network / CORS blocked ajax, form still succeeded or show clean retry
      setError('Unable to reach server. Please check your internet connection or email directly at dailystudyhindi@gmail.com');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 forge-text">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs forge-text-muted hover:text-cyan-400 mb-6 transition-colors"
      >
        <ArrowLeft className="h-3 w-3" />
        Back to Home
      </Link>

      <div className="rounded-3xl border border-[var(--app-card-border)] bg-[var(--app-card)] p-6 md:p-10 backdrop-blur-xl shadow-xl">
        <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold mb-2">
          <Mail className="h-4 w-4" />
          <span>Support & Direct Inquiries</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold forge-text mb-3">
          Get in Touch
        </h1>
        <p className="text-sm forge-text-muted mb-8">
          Have an idea for a new design style generator, found a bug, or interested in partnership / sponsorship inquiries? Send us a message directly!
        </p>

        {submitted ? (
          <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-8 text-center animate-in fade-in zoom-in-95 duration-300">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 mb-4 shadow-lg shadow-emerald-500/20">
              <Check className="h-7 w-7" />
            </div>
            <h3 className="text-xl font-bold forge-text">Message Sent Successfully!</h3>
            <p className="text-xs sm:text-sm forge-text-muted mt-2 max-w-md mx-auto leading-relaxed">
              Thank you for reaching out, <strong>{formData.name || 'there'}</strong>. Your message has been dispatched to our team inbox. We typically reply within 24–48 hours.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({ name: '', email: '', subject: '', message: '' });
              }}
              className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-[var(--app-card-border)] bg-[var(--app-input-bg)] text-xs font-semibold forge-text hover:border-cyan-500 transition-colors cursor-pointer"
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="flex items-center gap-2 rounded-xl border border-rose-500/40 bg-rose-500/10 p-3 text-xs text-rose-400">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold forge-text mb-1">
                Your Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Jane Doe"
                className="w-full rounded-xl border border-[var(--app-card-border)] bg-[var(--app-input-bg)] px-4 py-2.5 text-sm forge-text placeholder-[var(--app-text-muted)] focus:border-cyan-500 focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold forge-text mb-1">
                Your Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="developer@example.com"
                className="w-full rounded-xl border border-[var(--app-card-border)] bg-[var(--app-input-bg)] px-4 py-2.5 text-sm forge-text placeholder-[var(--app-text-muted)] focus:border-cyan-500 focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold forge-text mb-1">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="Feature Request / Partnership / Feedback"
                className="w-full rounded-xl border border-[var(--app-card-border)] bg-[var(--app-input-bg)] px-4 py-2.5 text-sm forge-text placeholder-[var(--app-text-muted)] focus:border-cyan-500 focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold forge-text mb-1">
                Your Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                required
                placeholder="Tell us what you'd love to see or ask any question..."
                className="w-full rounded-xl border border-[var(--app-card-border)] bg-[var(--app-input-bg)] px-4 py-2.5 text-sm forge-text placeholder-[var(--app-text-muted)] focus:border-cyan-500 focus:outline-none transition-colors"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-cyan-500/20 hover:opacity-95 active:scale-98 transition-all w-full sm:w-auto cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Sending Message...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Send Message
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
