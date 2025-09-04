import React, { useEffect } from 'react';
import FAQ, { faqSections } from '../components/FAQ';


const FAQPage: React.FC = () => {

  useEffect(() => {
    const allFaqs = faqSections.flatMap(section => section.faqs);

    const schema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': allFaqs.map(faq => ({
        '@type': 'Question',
        'name': faq.question,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': faq.answer.replace(/<[^>]*>/g, ''), // Strip HTML tags for plain text
        },
      })),
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div>
      <FAQ />
    </div>
  );
};

export default FAQPage;
