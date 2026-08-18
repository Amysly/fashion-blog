import React from 'react';
import { Link } from 'react-router-dom';
import { 
  HiOutlineSparkles, 
  HiOutlineBookOpen, 
  HiOutlineTag, 
  HiOutlineLightBulb, 
  HiOutlineShoppingBag 
} from 'react-icons/hi';

const About = () => {
  const offerings = [
    {
      icon: <HiOutlineSparkles className="text-2xl text-primary" />,
      title: 'Curated Outfit Ideas',
      description: 'Thoughtfully styled looks tailored for every occasion, season, and mood.',
    },
    {
      icon: <HiOutlineBookOpen className="text-2xl text-primary" />,
      title: 'Fashion Lookbooks',
      description: 'Visual editorial guides designed to spark creativity in your daily wardrobe.',
    },
    {
      icon: <HiOutlineTag className="text-2xl text-primary" />,
      title: 'Affordable Luxury',
      description: 'Elevated, chic style finds that give you a high-fashion look on any budget.',
    },
    {
      icon: <HiOutlineLightBulb className="text-2xl text-primary" />,
      title: 'Confidence & Styling Tips',
      description: 'Practical advice on how to seamlessly integrate current trends into your personal style.',
    },
    {
      icon: <HiOutlineShoppingBag className="text-2xl text-primary" />,
      title: 'Handpicked Recommendations',
      description: 'Carefully vetted fashion & beauty picks that you will genuinely fall in love with.',
    },
  ];

  return (
    <div className="bg-background min-h-screen text-on-surface">
      <section className="max-w-[1200px] mx-auto px-6 pt-16 pb-12 text-center">
        <span className="text-secondary font-label-caps text-xs tracking-[0.25em] uppercase">
          OUR STORY & PHILOSOPHY
        </span>
        <h1 className="font-headline-md text-3xl md:text-5xl font-bold mt-4 mb-6 leading-tight max-w-3xl mx-auto">
          Style is curated. Inspiration is endless. Every outfit tells a story.
        </h1>
        <p className="text-on-surface-variant font-body-lg text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Welcome to <span className="text-primary font-bold">The Style Parlor</span>, where getting dressed becomes an exciting, effortless, and deeply personal ritual.
        </p>
      </section>


      <section className="max-w-[1200px] mx-auto px-6 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-surface-variant/20 delicate-shadow">
            <img
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000&auto=format&fit=crop"
              alt="Fashion editorial model in neutral blazer"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-surface-variant/20 delicate-shadow md:translate-y-6">
            <img
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1000&auto=format&fit=crop"
              alt="Stylish woman walking down urban street"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-surface-variant/20 delicate-shadow">
            <img
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop"
              alt="Minimalist fashion accessories flatlay"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>
      </section>


      <section className="bg-surface-variant/20 py-16 border-y border-outline-variant/30">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="text-secondary font-label-caps text-xs tracking-[0.2em] uppercase">
            OUR MISSION
          </span>
          <h2 className="font-headline-sm text-2xl md:text-4xl font-bold mt-4 text-primary leading-snug">
            "To make getting dressed feel exciting, effortless, and inspiring."
          </h2>
        </div>
      </section>

     
      <section className="max-w-[1200px] mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <span className="text-secondary font-label-caps text-xs tracking-[0.2em] uppercase">
            WHAT WE OFFER
          </span>
          <h3 className="font-headline-md text-3xl font-bold mt-2">
            Here, You'll Discover
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offerings.map((item, index) => (
            <div
              key={index}
              className="bg-background border border-outline-variant/40 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-surface-variant/40 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h4 className="font-headline-sm text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {item.title}
                </h4>
                <p className="text-on-surface-variant font-body-md leading-relaxed text-sm">
                  {item.description}
                </p>
              </div>
            </div>
          ))}

          
          <div className="bg-primary text-on-primary rounded-2xl p-8 flex flex-col justify-between shadow-xl">
            <div>
              <span className="font-label-caps text-[10px] tracking-widest uppercase text-on-primary/70">
                THE PARLOR PROMISE
              </span>
              <h4 className="font-headline-sm text-2xl font-bold mt-2 mb-4">
                Authentic & Effortless
              </h4>
              <p className="text-on-primary/90 font-body-md text-sm leading-relaxed">
                Elevate your everyday capsule with pieces designed for real life and lasting style.
              </p>
            </div>
            <div className="mt-8">
              <Link
                to="/shop"
                className="inline-block bg-white text-primary px-6 py-2.5 rounded-lg font-label-caps text-xs tracking-widest font-bold hover:bg-opacity-90 transition-opacity"
              >
                EXPLORE COLLECTION
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-[1000px] mx-auto px-6 pb-24">
        <div className="bg-surface-variant/10 border border-outline-variant/30 rounded-3xl p-8 md:p-14 text-center delicate-shadow">
          <p className="font-body-lg text-lg md:text-2xl text-on-surface leading-relaxed font-serif italic mb-8">
            "Every piece of content at The Style Parlor is thoughtfully created to help you build a wardrobe that reflects your personality, lifestyle, individuality, authenticity, and aesthetic—without sacrificing style or breaking the bank."
          </p>
          <div className="inline-block border-t border-primary/30 pt-4">
            <span className="font-label-caps text-xs tracking-[0.25em] text-primary font-bold uppercase block">
              WELCOME TO THE STYLE PARLOR
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;