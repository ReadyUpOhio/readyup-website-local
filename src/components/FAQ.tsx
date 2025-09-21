import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export const faqSections = [
  {
    title: 'General Store Questions',
    faqs: [
      {
        question: 'Where is the best place to buy and trade video games and collectibles near Mansfield, Ohio?',
        answer: 'Our shop is located in Ontario, Ohio, just outside Mansfield. We specialize in buying, selling, and trading video games, trading cards, and collectibles. Many local collectors stop by for retro finds, Pokémon packs, and unique items you won’t see at big box stores.',
      },
      {
        question: 'What are your store hours in Ontario, Ohio?',
        answer: 'We’re open Monday to Saturday from 11 AM to 7 PM, and Sunday from 12 PM to 6 PM. Our location near Richland Mall makes us convenient for collectors coming from Mansfield, Shelby, and surrounding areas.',
      },
      {
        question: 'Do you buy collections from local collectors?',
        answer: 'Yes, we buy full collections of trading cards, video games, and collectibles. Whether you’re downsizing or cashing out, bring your collection in and we’ll make a fair cash or trade offer. Learn more about our <a href="/sell" class="text-blue-500 hover:underline">trade-in process</a>.',
      },
    ],
  },
  {
    title: 'Video Games',
    faqs: [
      {
        question: 'Where can I trade in retro video games in Mansfield, Ohio?',
        answer: 'Our Ontario shop buys and trades retro games for Nintendo, Sega, PlayStation, Xbox, and more. Collectors in Mansfield and Richland County know us as the go-to spot for rare and classic titles.',
      },
      {
        question: 'Do you sell retro and modern video games on eBay and Whatnot?',
        answer: 'Yes! We list select video games on eBay and stream live sales on Whatnot, so even if you’re not local to Ontario, Ohio, you can shop our collection online.',
      },
      {
        question: 'Do you perform console repairs or modifications?',
        answer: 'We offer professional repair services for most consoles, from retro to modern. While we don\'t typically perform modifications, you can contact us to discuss your specific needs.',
      },
      {
        question: 'What is your return policy on used games?',
        answer: 'All pre-owned games are tested and guaranteed to work. If you encounter any issues, you can return a game for store credit or an identical replacement within 7 days of purchase.',
      },
      {
        question: 'Can I request a specific game if you don\'t have it in stock?',
        answer: 'Yes! We can add it to our wishlist and notify you if we get a copy in stock. We\'re always on the hunt for rare and popular titles.',
      },
      {
        question: 'Where is the best place to sell video games in Ohio?',
        answer: 'Ready Up Game Store! We give fair offers on items, paying up to 80%+ on certain items. We will match or beat any competitor\'s offer if it is an item we are interested in.',
      },
    ],
  },
  {
    title: 'Trading Cards',
    faqs: [
      {
        question: 'Where can I sell Pokémon or Yu-Gi-Oh! cards in Ontario, Ohio?',
        answer: 'Bring your cards to our shop near Mansfield. We evaluate condition, rarity, and demand, then make cash or trade offers. We also buy graded cards and sealed products.',
      },
      {
        question: 'Do you host Pokémon or Yu-Gi-Oh! tournaments in Mansfield, Ohio?',
        answer: 'Yes! We regularly host local card game events for collectors and players. Follow our Facebook or check in-store for <a href="/events" class="text-blue-500 hover:underline">tournament schedules</a>.',
      },
      {
        question: 'Can I buy Pokémon cards from you on eBay or Whatnot?',
        answer: 'Absolutely! We sell booster packs, singles, and sealed products both in-store and on our <a href="https://www.ebay.com/str/pixlearc?_pgn=5&rt=nc&_tab=shop" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:underline">eBay shop</a> and Whatnot live streams. Search for us by name to find our latest listings.',
      },
      {
        question: 'What\'s the difference between a booster pack, a blister pack, and an Elite Trainer Box (ETB)?',
        answer: 'A <strong>booster pack</strong> contains a small, randomized set of cards. A <strong>blister pack</strong> typically includes one or more booster packs plus a promo card. An <strong>Elite Trainer Box (ETB)</strong> is a larger kit that comes with multiple booster packs, card sleeves, dice, and other gameplay accessories.',
      },
      {
        question: 'Do you buy bulk common or uncommon cards?',
        answer: 'Yes, we do buy bulk cards! The rate depends on the game and current inventory, so bring your bulk in and we can give you a quote for cash or store credit.',
      },
      {
        question: 'How do you determine the price for single cards?',
        answer: 'We price our single cards based on current market rates from sources like TCGPlayer and recent eBay sales, factoring in the card\'s condition.',
      },
    ],
  },
  {
    title: 'Collectibles',
    faqs: [
      {
        question: 'Where can I find Funko Pops and action figures in Mansfield, Ohio?',
        answer: 'Our Ontario shop carries a rotating selection of Funko Pops, action figures, and other collectibles. Many are also listed on <a href="https://www.ebay.com/str/pixlearc?_pgn=5&rt=nc&_tab=shop" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:underline">eBay</a> and Whatnot for nationwide shipping.',
      },
      {
        question: 'Do you accept pre-orders for collectibles like Funko Pops?',
        answer: 'Yes, we accept pre-orders for select collectible releases. Ask in-store or follow our Whatnot streams for early access.',
      },
      {
        question: 'Where can I get my trading cards, video games, or collectibles authenticated?',
        answer: 'While we don\'t offer formal authentication services in-store, our experienced team can help you assess the condition and legitimacy of your items. For official grading and authentication of trading cards, we recommend professional services like PSA or Beckett. For video games and other collectibles, we can provide guidance and share our expertise to help you determine their authenticity.',
      },
    ],
  },
  {
    title: 'Online & Local',
    faqs: [
      {
        question: 'Do you sell collectibles and trading cards online, or only in-store?',
        answer: 'We sell both in-store and online. Our <a href="https://www.ebay.com/str/pixlearc?_pgn=5&rt=nc&_tab=shop" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:underline">eBay shop</a> and Whatnot live auctions let collectors from Mansfield and beyond grab items without visiting in person.',
      },
      {
        question: 'Do you ship video games and trading cards from Ontario, Ohio?',
        answer: 'Yes, we ship across the U.S. for all online orders placed through <a href="https://www.ebay.com/str/pixlearc?_pgn=5&rt=nc&_tab=shop" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:underline">eBay</a>, Whatnot, and our website. Local pickup is also available for Mansfield-area customers.',
      },
    ],
  },
];

const FAQ = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-36 pb-12">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold font-orbitron bg-gradient-to-r from-space-blue via-space-purple to-space-cyan bg-clip-text text-transparent mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have questions? We've got answers. If you can't find what you're looking for, feel free to contact us.
            </p>
          </div>

          <div className="glass-card p-8 md:p-12 rounded-3xl">
            <div className="space-y-12">
              {faqSections.map((section, sectionIndex) => (
                <div key={sectionIndex}>
                  <h2 className="text-3xl font-bold font-orbitron text-space-cyan mb-8">{section.title}</h2>
                  <Accordion type="single" collapsible className="w-full space-y-4">
                    {section.faqs.map((faq, faqIndex) => (
                      <AccordionItem value={`item-${sectionIndex}-${faqIndex}`} key={faqIndex} className="bg-black/20 border border-space-purple/20 rounded-lg backdrop-blur-sm">
                        <AccordionTrigger className="text-left font-bold text-lg p-6 hover:no-underline text-foreground">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="p-6 pt-0">
                          <div className="prose prose-invert max-w-none text-muted-foreground" dangerouslySetInnerHTML={{ __html: faq.answer }} />
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FAQ;
