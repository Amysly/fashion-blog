import React, { useState, useEffect } from 'react';
import { getProducts } from '../api/Product';
import { Link } from 'react-router-dom';
import Spinner from '../components/Spinner';

const Shop = ({ limit }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getProducts();
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const displayedProducts = limit ? products.slice(0, limit) : products;

  return (
    <div>
      <section className="max-w-[1200px] mx-auto px-margin-desktop py-section-gap border-t border-outline-variant/30">
        <div className="text-center mb-16">
          <span className="text-secondary font-label-caps text-label-caps tracking-[0.2em]">
            ESSENTIAL PIECES
          </span>
          <h3 className="font-headline-md text-headline-md mt-4">
            Shop the Look
          </h3>
        </div>

        {loading && (
          <Spinner label='Loading Product...'/>
        )}

        {error && !loading && (
          <div className="text-center py-12">
            <p className="text-red-500 font-label-caps mb-4">{error}</p>
            <button
              onClick={loadProducts}
              className="bg-primary text-on-primary px-6 py-2 rounded-lg font-label-caps text-xs tracking-widest hover:opacity-90 transition-opacity"
            >
              RETRY
            </button>
          </div>
        )}

        {!loading && !error && displayedProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-on-surface-variant font-label-caps">
              NO PRODUCTS AVAILABLE AT THIS TIME.
            </p>
          </div>
        )}

        {!loading && !error && displayedProducts.length > 0 && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-gutter">
            {displayedProducts.map((product) => {
              const slug = product.slug;
              const title = product.name;
              const price = typeof product.price === 'number' ? `${product.price.toLocaleString()}` : product.price;
              const imageSrc = product.image || product.images;

              return (
                <div key={slug} className="text-center group">
                  <div className="aspect-[3/4] bg-surface-variant/20 rounded-xl overflow-hidden mb-6 relative">
                    <Link to={`/product/${slug}`}>
                      <img
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        src={imageSrc}
                        alt={title}
                      />
                    </Link>
                    <button className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white text-primary font-label-caps text-[10px] px-6 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity tracking-widest delicate-shadow">
                      SHOP
                    </button>
                  </div>
                  <p className="font-label-caps text-label-caps tracking-widest text-on-surface uppercase">
                    {title}
                  </p>
                  <p className="text-secondary mt-1 font-body-md">
                    {price}
                  </p>
                </div>
              );
            })}
          </div>
        )}

        {limit && products.length > limit && (
          <div className="text-center mt-8">
            <Link
              to="/shop"
              className="inline-block border border-primary text-primary px-8 py-3 rounded-lg font-label-caps text-xs tracking-widest uppercase hover:bg-primary hover:text-on-primary transition-colors"
            >
              View All Products
            </Link>
          </div>
        )}
      </section>
    </div>
  );
};

export default Shop;