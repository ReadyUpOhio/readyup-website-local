import { Helmet } from 'react-helmet';

const businessName = "Ready Up Gamestore";
const domain = "https://www.readyupgamestore.com";
const logoUrl = `${domain}/lovable-uploads/e6568095-9de9-49a5-a3c9-cfe668a2153d.png`;
const telephone = "(419) 709-8325";
const address = {
  streetAddress: "676 Richland Mall",
  addressLocality: "Ontario",
  addressRegion: "OH",
  postalCode: "44906",
  addressCountry: "US",
};
const mapsUrl = "https://www.google.com/maps?daddr=676+Richland+Mall,+Mansfield,+OH+44906";
const openingHours = [
    { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], "opens": "11:00", "closes": "19:00" },
    { "@type": "OpeningHoursSpecification", "dayOfWeek": "Sunday", "opens": "12:00", "closes": "17:00" }
];
const sameAs = [
    "https://facebook.com/readyupgamestore",
  "https://instagram.com/readyupgamestore",
  "https://www.ebay.com/str/pixlearc?_pgn=5&rt=nc&_tab=shop",
    "https://www.whatnot.com/user/readyupohio"
];

const faqData = [
  {
    question: "Where is the best place to buy and trade video games and collectibles near Mansfield, Ohio?",
    answer: "Our shop is located in Ontario, Ohio, just outside Mansfield. We specialize in buying, selling, and trading video games, trading cards, and collectibles. Many local collectors stop by for retro finds, Pokémon packs, and unique items you won’t see at big box stores."
  },
  {
    question: "What are your store hours in Ontario, Ohio?",
    answer: "We’re open Monday-Saturday 11am-7pm and Sunday 12pm-5pm. Our location near Richland Mall makes us convenient for collectors coming from Mansfield, Shelby, and surrounding areas."
  },
  {
    question: "Do you buy collections from local collectors?",
    answer: "Yes, we buy full collections of trading cards, video games, and collectibles. Whether you’re downsizing or cashing out, bring your collection in and we’ll make a fair cash or trade offer."
  },
  {
    question: "Where can I trade in retro video games in Mansfield, Ohio?",
    answer: "Our Ontario shop buys and trades retro games for Nintendo, Sega, PlayStation, Xbox, and more. Collectors in Mansfield and Richland County know us as the go-to spot for rare and classic titles."
  },
  {
    question: "Do you sell retro and modern video games on eBay and Whatnot?",
    answer: "Yes! We list select video games on eBay and stream live sales on Whatnot, so even if you’re not local to Ontario, Ohio, you can shop our collection online."
  },
  {
    question: "Where can I sell Pokémon or Yu-Gi-Oh! cards in Ontario, Ohio?",
    answer: "Bring your cards to our shop near Mansfield. We evaluate condition, rarity, and demand, then make cash or trade offers. We also buy graded cards and sealed products."
  },
  {
    question: "Do you host Pokémon or Yu-Gi-Oh! tournaments in Mansfield, Ohio?",
    answer: "Yes! We regularly host local card game events for collectors and players. Follow our Facebook or check in-store for tournament schedules."
  },
  {
    question: "Can I buy Pokémon cards from you on eBay or Whatnot?",
    answer: "Absolutely! We sell booster packs, singles, and sealed products both in-store and on our eBay shop and Whatnot live streams. Search for us by name to find our latest listings."
  },
  {
    question: "Where can I find Funko Pops and action figures in Mansfield, Ohio?",
    answer: "Our Ontario shop carries a rotating selection of Funko Pops, action figures, and other collectibles. Many are also listed on eBay and Whatnot for nationwide shipping."
  },
  {
    question: "Do you accept pre-orders for collectibles like Funko Pops?",
    answer: "Yes, we accept pre-orders for select collectible releases. Ask in-store or follow our Whatnot streams for early access."
  },
  {
    question: "Do you sell collectibles and trading cards online, or only in-store?",
    answer: "We sell both in-store and online. Our eBay shop and Whatnot live auctions let collectors from Mansfield and beyond grab items without visiting in person."
  },
  {
    question: "Do you ship video games and trading cards from Ontario, Ohio?",
    answer: "Yes, we ship across the U.S. for all online orders placed through eBay, Whatnot, and our website. Local pickup is also available for Mansfield-area customers."
  }
];

const SeoSchemas = () => {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGameStore",
    "@id": `${domain}/#business`,
    "name": businessName,
    "url": domain,
    "logo": logoUrl,
    "image": logoUrl,
    "telephone": telephone,
    "description": "Buy, sell, and trade video games, trading cards, and collectibles in Ontario, Ohio (near Mansfield). Retro Nintendo & Sega, Pokémon, Yu-Gi-Oh!, Funko Pops, and more.",
    "address": {
      "@type": "PostalAddress",
      ...address
    },
    "openingHoursSpecification": openingHours,
    "sameAs": sameAs,
    "hasMap": mapsUrl,
  };

  const faqPageSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${domain}/faq/#faqs`,
    "mainEntity": faqData.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${domain}/#website`,
    "url": domain,
    "name": businessName,
    // No SearchAction as there is no site-wide search functionality currently.
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(faqPageSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
    </Helmet>
  );
};

export default SeoSchemas;
