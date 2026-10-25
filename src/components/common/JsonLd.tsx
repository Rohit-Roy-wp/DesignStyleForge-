import React from 'react';

interface FaqItem {
  question: string;
  answer: string;
}

interface JsonLdProps {
  toolName: string;
  description: string;
  category: string;
  url: string;
  faqs?: FaqItem[];
}

export function JsonLd({ toolName, description, category, url, faqs }: JsonLdProps) {
  const softwareAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: toolName,
    description: description,
    url: url,
    applicationCategory: category,
    operatingSystem: 'All modern web browsers',
    offers: {
      '@type': 'Offer',
      price: '0.00',
      priceCurrency: 'USD',
    },
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
  };

  const faqSchema = faqs && faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  } : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
    </>
  );
}
