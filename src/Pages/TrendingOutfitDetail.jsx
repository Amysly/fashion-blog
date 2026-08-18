import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { HiOutlineBookmark, HiBookmark } from 'react-icons/hi';
import { getTrendingBySlug } from '../api/trendingOutfit';
import Spinner from '../components/Spinner';


const TrendingOutfitDetail = () => {
  const { slug } = useParams();

  const [outfit, setOutfit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (slug) {
      loadOutfitDetail();
    }
  }, [slug]);

  const loadOutfitDetail = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getTrendingBySlug(slug);
      setOutfit(data);
    } catch (err) {
      setError(err?.message || 'Failed to load outfit details');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Spinner label='Loading Curated Outfit'/>
    );
  }

  if (error || !outfit) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <p className="text-red-500 font-label-caps mb-4">{error || 'Outfit not found.'}</p>
      </div>
    );
  }

  const imageSrc = outfit.image;
  const name = outfit.name;
  const description = outfit.description || 'A carefully curated combination embodying quiet luxury and contemporary tailoring.';

  return (
    <div className="bg-background min-h-screen">
      <section className="max-w-[1200px] mx-auto px-margin-desktop py-8">

        <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 items-start">

          <div className="lg:col-span-4 sm:w-80 aspect-[3/4] bg-surface-variant/20 
          rounded-2xl overflow-hidden delicate-shadow relative">
            <img
              src={imageSrc}
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="lg:col-span-6 space-y-8">
            <div>
              <span className="text-secondary font-label-caps text-xs tracking-[0.2em] uppercase">
                STYLE EDIT
              </span>
              <h1 className="font-headline-md text-3xl md:text-4xl font-bold text-on-surface uppercase tracking-wide mt-2">
                {name}
              </h1>
            </div>

            <p className="text-on-surface-variant text-sm leading-relaxed font-body-md">
              {description}
            </p>

            <div className="flex items-center gap-4 pt-2">
              <button
                onClick={() => setIsSaved(!isSaved)}
                className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl border text-xs font-label-caps tracking-widest uppercase transition-all ${
                  isSaved
                    ? 'border-primary bg-primary/10 text-primary font-bold'
                    : 'border-outline-variant/60 text-on-surface hover:border-primary'
                }`}
              >
                {isSaved ? <HiBookmark className="text-base text-primary" /> : <HiOutlineBookmark className="text-base" />}
                {isSaved ? 'LOOK SAVED' : 'SAVE LOOK'}
              </button>
            </div>

          </div>

        </div>
      </section>
    </div>
  );
};

export default TrendingOutfitDetail;