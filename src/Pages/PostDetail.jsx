import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  HiOutlineShare,
  HiOutlineBookmark,
  HiOutlineHeart,
  HiHeart,
} from 'react-icons/hi';
import { getBlogBySlug, getBlogs } from '../api/Blog';
import Spinner from '../components/Spinner';

const PostDetail = () => {
  const { slug } = useParams();

  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchPostData = async () => {
      setLoading(true);
      setError('');

      try {
        const data = await getBlogBySlug(slug);
        const singlePost = data?.blog || data;

        setPost(singlePost);

        const allBlogs = await getBlogs();

        const postsList = Array.isArray(allBlogs)
          ? allBlogs
          : allBlogs?.blogs || [];

        setRelatedPosts(
          postsList
            .filter((item) => item.slug !== slug)
            .slice(0, 4)
        );
      } catch (err) {
        setError(
          err.message || 'Failed to load article.'
        );
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPostData();
      window.scrollTo(0, 0);
    }
  }, [slug]);

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: post?.title,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Recently Published';

    return new Date(dateString).toLocaleDateString(
      'en-US',
      {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }
    );
  };

  return (
    <div className="bg-background min-pt-24 min-h-screen text-on-surface">
      <div className="max-w-[900px] mx-auto px-6 py-12">

        {/* Loading */}
        {loading && (
          <Spinner label="Loading Article..." />
        )}

        {/* Error */}
        {error && !loading && (
          <div className="py-24 text-center">
            <p className="text-red-500 font-label-caps mb-4">
              {error}
            </p>
          </div>
        )}

        {/* Article */}
        {!loading && !error && post && (
          <article>

          
            <div className="text-center max-w-2xl mx-auto mb-8">

              <span className="text-secondary font-label-caps text-[11px] tracking-[0.2em] uppercase">
                {post.category || 'Lifestyle'}
                {' • '}
                {formatDate(post.createdAt)}
              </span>

              <h1 className="font-headline-md text-3xl md:text-5xl font-bold mt-4 leading-tight text-on-surface">
                {post.title}
              </h1>
            </div>

          
          {post.image && (
          <div className="w-full overflow-hidden rounded-2xl delicate-shadow my-8 bg-surface-variant/20">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-auto object-contain"
            />
          </div>
        )}


            {post.description && (
              <p className="font-body-lg text-lg md:text-xl text-on-surface-variant leading-relaxed whitespace-pre-line mb-12 italic border-l-2 border-primary pl-4">
                {post.description}
              </p>
            )}

          
            {post.sections &&
              post.sections.length > 0 && (
                <div className="space-y-16">

                  {post.sections.map(
                    (section, index) => (
                      <section
                        key={
                          section._id ||
                          `${section.heading}-${index}`
                        }
                        className="space-y-5"
                      >

                    
                        {section.heading && (
                          <div>
                            <span className="text-secondary font-label-caps text-xs tracking-[0.2em] uppercase">
                              {String(
                                index + 1
                              ).padStart(2, '0')}
                            </span>

                            <h2 className="font-headline-sm text-2xl md:text-3xl font-bold mt-2 leading-tight">
                              {section.heading}
                            </h2>
                          </div>
                        )}

                        {/* Section Image */}
                        {section.image && (
                          <div className="w-full overflow-hidden rounded-2xl bg-surface-variant/20">
                            <img
                              src={section.image}
                              alt={
                                section.heading ||
                                `Article section ${
                                  index + 1
                                }`
                              }
                              className="w-full h-auto object-contain"
                            />
                          </div>
                        )}

                        {/* Section Description */}
                        {section.description && (
                          <p className="font-body-lg text-base md:text-lg text-on-surface-variant leading-8 whitespace-pre-line">
                            {section.description}
                          </p>
                        )}
                      </section>
                    )
                  )}
                </div>
              )}

            
            <div className="mt-16 pt-6 border-t border-outline-variant/30 flex items-center gap-2">
              <span className="font-label-caps text-xs text-on-surface-variant">
                TAGS:
              </span>

              <span className="bg-surface-variant/40 px-3 py-1 rounded-full text-xs font-label-caps text-primary uppercase">
                #{post.category}
              </span>
            </div>
          </article>
        )}

        {/* =========================
            RELATED / POPULAR ARTICLES
        ========================== */}
        {!loading && relatedPosts.length > 0 && (
          <section className="mt-20 pt-12 border-t border-outline-variant/30">

            <h3 className="font-headline-md text-2xl font-bold mb-8">
              Popular Reads
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

              {relatedPosts.map((related) => {
                const relId =
                  related.slug ||
                  related._id;

                return (
                  <Link
                    key={relId}
                    to={`/blog/${relId}`}
                    className="group flex flex-col"
                  >

                    {/* Related Image */}
                    <div className="aspect-[4/3] rounded-xl overflow-hidden mb-4 bg-surface-variant/20">

                      {related.image && (
                        <img
                          src={related.image}
                          alt={
                            related.title ||
                            'Related article'
                          }
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      )}

                    </div>

                    {/* Category */}
                    <span className="text-secondary font-label-caps text-[9px] tracking-widest uppercase mb-1">
                      {related.category ||
                        'Lifestyle'}
                    </span>

                    {/* Title */}
                    <h4 className="font-headline-sm text-base font-bold group-hover:text-primary transition-colors line-clamp-2">
                      {related.title}
                    </h4>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default PostDetail;