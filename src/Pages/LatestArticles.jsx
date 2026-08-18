import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getBlogs } from '../api/Blog';
import Spinner from '../components/Spinner';

const LatestArticles = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await getBlogs();
        setPosts(Array.isArray(data) ? data : data?.blogs || []);
      } catch (err) {
        setError(err.message || 'Failed to fetch articles');
      } finally {
        setLoading(false);
      }
    };
    loadPosts();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return 'Recent';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const latestPosts = posts.slice(0, 2);
  const popularPosts = posts.slice(2);

  return (
    <div>
      <section className="max-w-[1200px] mx-auto px-margin-desktop py-section-gap grid grid-cols-1 lg:grid-cols-3 gap-16">
        
        {/* Left Column: Latest Articles */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-10">
            <h3 className="font-headline-md text-headline-md">Latest Articles</h3>
          </div>

          {loading && (
            <Spinner label='Loading Articles...'/>
          )}

          {error && !loading && (
            <div className="py-12 text-center">
              <p className="text-red-500 font-label-caps">{error}</p>
            </div>
          )}

          {!loading && !error && posts.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-on-surface-variant font-label-caps">
                NO ARTICLES FOUND.
              </p>
            </div>
          )}

          {!loading && !error && latestPosts.length > 0 && (
            <div className="space-y-12">
              {latestPosts.map((post) => {
                const id = post._id || post.id;
                return (
                  <article key={id} className="flex flex-col md:flex-row gap-8 group">
                    <div className="md:w-1/2 aspect-[4/3] overflow-hidden rounded-xl delicate-shadow bg-surface-variant/20">
                      <img
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        src={post.image}
                        alt={post.title}
                      />
                    </div>

                    <div className="md:w-1/2 flex flex-col justify-center">
                      <span className="text-secondary font-label-caps text-[10px] tracking-widest mb-2 uppercase">
                        {post.category || 'Beauty & Lifestyle'} • {formatDate(post.createdAt)}
                      </span>
                      
                      <h4 className="font-headline-sm text-headline-sm mb-4 leading-snug group-hover:text-primary transition-colors">
                        {post.title}
                      </h4>
                      
                      <p className="text-on-surface-variant font-body-md mb-6 line-clamp-2">
                        {post.description}
                      </p>

                      <Link
                        to={`/blog/${post.slug}`}
                        className="text-primary font-label-caps text-label-caps tracking-widest flex items-center gap-2 group-hover:translate-x-2 transition-transform"
                      >
                        READ MORE{' '}
                        <span className="material-symbols-outlined text-sm">
                          arrow_forward
                        </span>
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>

        <div className="bg-[#f5f3f3] p-8 rounded-2xl h-fit">
          <h3 className="font-headline-sm text-headline-sm mb-8 border-b border-outline-variant pb-4">
            Most Popular
          </h3>

          {loading && (
             <Spinner label='Loading...'/>
          )}

          {!loading && popularPosts.length === 0 && (
            <p className="text-on-surface-variant font-label-caps text-xs">
              NO MORE ARTICLES.
            </p>
          )}

          {!loading && popularPosts.length > 0 && (
            <ul className="space-y-8">
              {popularPosts.map((post, index) => {
                const id = post.slug;
                const formattedIndex = String(index + 1).padStart(2, '0');

                return (
                  <li key={id}>
                    <Link to={`/blog/${post.slug}`} className="flex items-start gap-4 group cursor-pointer">
                      <span className="font-display-lg text-primary/20 text-4xl leading-none">
                        {formattedIndex}
                      </span>
                      <div>
                        <h5 className="font-body-lg font-bold leading-tight group-hover:text-primary transition-colors">
                          {post.title}
                        </h5>
                        <span className="text-on-surface-variant text-[11px] font-label-caps tracking-widest mt-2 block uppercase">
                          {post.category || 'Beauty & Lifestyle'} • {formatDate(post.createdAt)}
                        </span>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

      </section>
    </div>
  );
};

export default LatestArticles;