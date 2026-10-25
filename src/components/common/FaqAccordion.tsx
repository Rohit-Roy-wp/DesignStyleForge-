'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  faqs: FaqItem[];
  title?: string;
}

export function FaqAccordion({ faqs, title = 'Frequently Asked Questions' }: FaqAccordionProps) {
  const [openIndexes, setOpenIndexes] = useState<number[]>([0]);

  const toggle = (index: number) => {
    setOpenIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  if (!faqs || faqs.length === 0) return null;

  return (
    <div className="my-10 rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6 md:p-8 backdrop-blur">
      <div className="flex items-center gap-2.5 mb-6">
        <HelpCircle className="h-5 w-5 text-cyan-400" />
        <h3 className="text-xl font-bold text-neutral-100">{title}</h3>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIndexes.includes(idx);
          return (
            <div
              key={idx}
              className="overflow-hidden rounded-xl border border-neutral-800/80 bg-neutral-950/60 transition-colors hover:border-neutral-700/80"
            >
              <button
                type="button"
                onClick={() => toggle(idx)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between p-4 text-left font-medium text-neutral-200 transition-all hover:text-cyan-400"
              >
                <span className="text-sm md:text-base font-semibold">{faq.question}</span>
                <ChevronDown
                  className={`h-4 w-4 shrink-0 text-neutral-400 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-cyan-400' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="border-t border-neutral-800/60 px-4 pb-4 pt-3 text-sm leading-relaxed text-neutral-300">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
