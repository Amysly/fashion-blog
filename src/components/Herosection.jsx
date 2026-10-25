import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getHeroSectionData } from '../api/HeroSection'; 
import defaultBgImage from '../assets/images/bgimge.jpg';

const Herosection = () => {
  const navigate = useNavigate();
  const [heroData, setHeroData] = useState(null);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const data = await getHeroSectionData();
        if (Array.isArray(data) && data.length > 0) {
          setHeroData(data[0]);
        } else if (data && typeof data === 'object') {
          setHeroData(data);
        }
      } catch (error) {
        console.error('Failed to load hero section data:', error);
      }
    };

    fetchHeroData();
  }, []);

  const title = heroData?.title ;
  const bgImageUrl = heroData?.image;

  return (
    <div>
      <section className="relative w-full h-[870px] overflow-hidden">
        <div
          className="absolute inset-0  transition-all duration-700"
          style={{
            backgroundImage: `url("${bgImageUrl}")`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
        />

      
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-24 text-center px-4">
          <>
            <h2 className="text-white font-display-lg text-display-lg-mobile md:text-display-lg max-w-2xl mb-8 leading-tight">
              {title}
            </h2>

            <button
              onClick={() => navigate('/shop')}
              className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-10 py-4 rounded-lg font-label-caps text-label-caps tracking-widest hover:bg-white hover:text-primary transition-all duration-500"
            >
              EXPLORE THE COLLECTION
            </button>
          </>
        </div>
      </section>
    </div>
  );
};

export default Herosection;