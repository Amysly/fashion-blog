import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { HiOutlineChevronLeft } from 'react-icons/hi';
import { getProductBySlug} from '../api/Product';
import Spinner from '../components/Spinner';

const ProductDetail = () => {
  const { slug } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (slug) {
      loadProduct();
    }
  }, [slug]);

  const loadProduct = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getProductBySlug(slug);
      setProduct(data);
    } catch (err) {
      setError(err?.message || 'Failed to load product details');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Spinner lable='Loading product detail...'/>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <p className="text-red-500 font-label-caps mb-4">{error || 'Product not found.'}</p>
      </div>
    );
  }

  const imageSrc =
    product.image ||
    (Array.isArray(product.images) ? product.images[0] : product.images);

  const formattedPrice =
    typeof product.price === 'number'
      ? ` ${product.price.toLocaleString()}`
      : product.price;

  return (
    <div className="bg-background min-h-screen">
      <section className="max-w-[1200px] mx-auto px-margin-desktop py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-start">

          <div className=" sm:w-80 aspect-[3/4] bg-surface-variant/20 rounded-2xl overflow-hidden 
          delicate-shadow">
            <img
                src={imageSrc}
                alt={product.name}
                className="w-full h-full object-cover"
            />
            </div>

          <div className="space-y-6">
            <h1 className="font-headline-md text-3xl md:text-4xl font-bold text-on-surface uppercase tracking-wide">
              {product.name}
            </h1>

            <p className="text-2xl font-body-md text-primary font-semibold">
              {formattedPrice}
            </p>

            <p className="text-on-surface-variant text-sm leading-relaxed font-body-md">
              {product.description || 'No description available.'}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;