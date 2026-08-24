import { useState, useEffect } from "react";
import Spinner from "../components/Spinner";
import { getInspiredLooks } from "../api/inspiredLooks";

const InspiredLooks = () => {
  const [looks, setLooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadLooks = async () => {
      try {
        setLoading(true);
        const data = await getInspiredLooks();
        setLooks(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.response?.data?.message || err.message || "Failed to fetch inspired looks");
      } finally {
        setLoading(false);
      }
    };
    loadLooks();
  }, []);
  if (loading) {
    return (
      <div className="max-w-[1200px] mx-auto px-margin-mobile md:px-margin-desktop py-section-gap">
        <Spinner label="Loading inspired images..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-[1200px] mx-auto px-margin-mobile md:px-margin-desktop py-section-gap text-center">
        <p className="text-red-500 font-label-caps">{error}</p>
      </div>
    );
  }

  return (
    <div>
      <section className="max-w-[1200px] mx-auto px-margin-mobile md:px-margin-desktop py-section-gap">
        {/* Header Section */}
           <div className="flex items-center justify-between mb-12">
          <h3 className="font-headline-md text-headline-sm md:text-headline-md">
            Inspired by You
          </h3>
          
          <div className="flex items-center gap-2 text-secondary font-label-caps md:text-[11px] text-[9px] tracking-widest uppercase">
            <a
              href="https://pin.it/K9uDtmmGn"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-secondary font-label-caps text-[11px] tracking-widest uppercase hover:opacity-80 transition-opacity"
            >
              FOLLOW ON PINTEREST{" "}
              <span className="material-symbols-outlined md:text-base text-sm">
                north_east
              </span>
            </a>
          </div>
        </div>
       

        { looks.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-on-surface-variant font-label-caps">
              NO IMAGE FOUND.
            </p>
          </div>
        )}

        {looks.length > 0 && (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {looks.slice(0, 6).map((look) => (
              <div
                key={look._id}
                className="break-inside-avoid rounded-2xl overflow-hidden delicate-shadow group bg-slate-100"
              >
                <img
                  className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  src={look.image}
                  alt="Inspired Look"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default InspiredLooks;