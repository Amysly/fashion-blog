import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { getBlogs } from '../api/Blog';
import Spinner from '../components/Spinner';
import { IoSearchOutline } from "react-icons/io5";

const Blogs = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const normalizeText = (value, fallback = '') => {
    return typeof value === 'string' ? value : fallback;
  };

  const categories = useMemo(() => {
    const cats = posts.map((p) => normalizeText(p.category, 'Beauty & Lifestyle'));
    return ['All', ...new Set(cats)];
  }, [posts]);

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

    const parsedDate = new Date(dateString);
    if (Number.isNaN(parsedDate.getTime())) return 'Recent';

    return parsedDate.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const filteredPosts = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return posts.filter((post) => {
      const category = normalizeText(post.category, 'Beauty & Lifestyle');
      const title = normalizeText(post.title, '');
      const description = normalizeText(post.description, '');

      const matchesCategory =
        selectedCategory === 'All' || category === selectedCategory;
      const matchesSearch =
        normalizedQuery.length === 0 ||
        title.toLowerCase().includes(normalizedQuery) ||
        description.toLowerCase().includes(normalizedQuery);

      return matchesCategory && matchesSearch;
    });
  }, [posts, selectedCategory, searchQuery]);

  if (loading) {
    return (
      <div className="max-w-[1200px] mx-auto px-6 md:px-16 py-16">
        <Spinner label="Loading Articles..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-[1200px] mx-auto px-6 md:px-16 py-16 text-center">
        <p className="text-red-500 text-xs font-mono uppercase tracking-widest">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-stone-900 font-sans selection:bg-stone-200">
     <header className="max-w-[1200px] mx-auto px-margin-mobile md:px-margin-desktop pt-16 pb-8 border-b border-outline-variant">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-8">
          <div>
            <span className="text-secondary font-label-caps text-[10px] tracking-widest uppercase block mb-2">
              The Editorial Archive
            </span>
          </div>

          <div className="w-full lg:w-80">
            <div className="relative">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-surface-variant/20 border border-outline-variant rounded-full py-3 pl-5 pr-10 text-xs font-body-md focus:outline-none focus:border-primary transition-all"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-xs">
                <IoSearchOutline size={18} />
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 mt-12 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2.5 rounded-full font-label-caps text-[10px] tracking-widest mb-2 uppercase whitespace-nowrap transition-all duration-300 ${
                selectedCategory === cat
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-white border border-stone-200 text-stone-600 hover:border-stone-400'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>
      <main className="max-w-[1400px] mx-auto px-6 md:px-16 py-16">
        {filteredPosts.length === 0 ? (
          <div className="py-24 text-center bg-white rounded-3xl border border-stone-200 shadow-sm">
            <p className="text-stone-500 font-mono text-xs uppercase tracking-[0.2em] mb-6">
              NO ARTICLES FOUND MATCHING YOUR CRITERIA.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="px-8 py-3 bg-stone-900 text-white rounded-full text-xs font-mono uppercase tracking-widest hover:bg-stone-800 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 space-y-12">
              <div className="flex items-center justify-between border-b border-stone-200 pb-4">
                <h3 className="text-xl font-label-caps  mb-2  text-stone-800">
                  Published Publications ({filteredPosts.length})
                </h3>
                <span className="font-label-caps text-[10px] tracking-widest mb-2 uppercase">
                  Showing Curated Stories
                </span>
              </div>

              <div className="space-y-10">
                {filteredPosts.map((post, index) => {
                  const id = post._id || post.slug || `blog-post-${index}`;
                  const articleLink = post.slug ? `/blog/${post.slug}` : '#';

                  return (
                    <article
                      key={id}
                      className="group bg-white rounded-3xl overflow-hidden border border-stone-200/80 shadow-sm hover:shadow-md transition-all duration-500 grid grid-cols-1 md:grid-cols-12 gap-0"
                    >
                      <div className="md:col-span-5 relative overflow-hidden bg-stone-100 min-h-[260px]">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-stone-900 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest shadow-sm">
                          {post.category || 'Beauty & Lifestyle'}
                        </span>
                      </div>

                      <div className="md:col-span-7 p-8 md:p-10 flex flex-col justify-between">
                        <div>
                          <span className="text-secondary font-label-caps text-[10px] tracking-widest mb-2 uppercase">
                            {formatDate(post.createdAt)}
                          </span>

                          <h4 className="font-headline-sm text-headline-sm mb-4 leading-snug group-hover:text-primary transition-colors">
                            {post.title}
                          </h4>

                          <p className="text-on-surface-variant font-body-md mb-6 line-clamp-2">
                            {post.description}
                          </p>
                        </div>

                        <Link
                          to={`/blog/${post.slug}`}
                          className="text-primary font-label-caps text-label-caps tracking-widest flex items-center gap-2 group-hover:translate-x-2 transition-transform"
                        >
                          Read Article  
                          <span className="material-symbols-outlined text-sm">
                          arrow_forward
                        </span>
                        </Link>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="bg-[#f5f3f3] p-8 md:p-10 rounded-3xl sticky top-8 border border-stone-300/40 shadow-sm">
                  <h3 className="font-headline-sm text-headline-sm mb-8 border-b border-outline-variant pb-4">
                 Most Popular
                    </h3>

                <div className="space-y-8">
                  {posts.slice(0, 4).map((post, index) => {
                    const id = post.slug || index;
                    const formattedIndex = String(index + 1).padStart(2, '0');

                    return (
                      <div key={id} className="group">
                        <Link to={`/blog/${post.slug}`} className="flex items-start gap-4 cursor-pointer">
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
                      </div>
                    );
                  })}
                </div>

        
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Blogs;