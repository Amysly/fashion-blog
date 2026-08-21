import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTrendingOutfit } from '../api/trendingOutfit';
import Spinner from '../components/Spinner';

const TrendingOutfit = ({limit}) => {
  const [outfits, setOutfits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadOutfits();
  }, []);

  const loadOutfits = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getTrendingOutfit();
      setOutfits(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err?.message || 'Failed to fetch trending outfits');
    } finally {
      setLoading(false);
    }
  };

  const createSlug = (text) => {
    if (!text) return '';
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '') 
      .replace(/[\s_]+/g, '-')      
      .replace(/^-+|-+$/g, '');
  };

  const displayedTrendingOutfit = limit ? outfits.slice(0, limit) : outfits;


  return (
    <div>
      <section className="max-w-[1200px] mx-auto px-margin-desktop py-section-gap">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-secondary font-label-caps text-label-caps tracking-[0.2em]">
              CURATED STYLE
            </span>
            <h3 className="font-headline-md text-headline-md mt-2">
              Trending Outfits
            </h3>
          </div>
          {limit && (
            <Link
            className="text-on-surface-variant border-b border-outline-variant pb-1 font-label-caps text-[11px] tracking-widest hover:text-primary transition-colors"
            to="/trending-outfit"
          >
            VIEW ALL TRENDS
          </Link>
          )}
        </div>

        {loading && (
          <Spinner lable='Loading Trending Outfit'/>
        )}

       
        {error && !loading && (
          <div className="text-center py-12">
            <p className="text-red-500 font-label-caps mb-4">{error}</p>
            <button
              onClick={loadOutfits}
              className="bg-primary text-on-primary px-6 py-2 rounded-lg font-label-caps text-xs tracking-widest hover:opacity-90 transition-opacity"
            >
              RETRY
            </button>
          </div>
        )}

        {!loading && !error && displayedTrendingOutfit.length === 0 && (
          <div className="text-center py-12">
            <p className="text-on-surface-variant font-label-caps tracking-widest">
              NO TRENDING OUTFITS AVAILABLE AT THIS TIME.
            </p>
          </div>
        )}

        {!loading && !error && displayedTrendingOutfit.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter">
            {displayedTrendingOutfit.map((item) => {
              const id = item._id || item.id;
              const title = item.title || item.name;
              const imageSrc =
                item.image ||
                (Array.isArray(item.images) ? item.images[0] : item.images);

              const slug = item.slug || createSlug(title) || id;

              return (
                <Link
                  key={id}
                  to={`/trending-outfit/${slug}`}
                  className="group cursor-pointer block"
                >
                  <div className="aspect-[3/4] overflow-hidden rounded-xl mb-4 delicate-shadow bg-surface-variant/20">
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      alt={title}
                      src={imageSrc}
                    />
                  </div>
                  <h4 className="font-headline-sm text-headline-sm text-center text-on-surface group-hover:text-primary transition-colors">
                    {title}
                  </h4>
                </Link>
              );
            })}
          </div>
        )}

      </section>
    </div>
  );
};

export default TrendingOutfit;