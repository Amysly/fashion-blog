import React, { useEffect, useState } from 'react';
import { CheckCircle, Clock, Edit, Trash2, X } from 'lucide-react';
import NewsletterDetail from '../pages/NewsletterDetail';
import { useNavigate } from 'react-router-dom';
import { getBlogs, deleteBlog, updateBlog } from '../../api/Blog';

const Table = () => {
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [postToDelete, setPostToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [postToEdit, setPostToEdit] = useState(null);
  const [editFormData, setEditFormData] = useState({ title: '', category: '', link: '' });
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        const data = await getBlogs();
        setPosts(Array.isArray(data) ? data : data?.blogs || []);
      } catch (err) {
        setError(err.message || 'Failed to load posts');
      } finally {
        setLoading(false);
      }
    };
    loadPosts();
  }, []);

  const confirmDelete = async () => {
    if (!postToDelete) return;
    setIsDeleting(true);
    try {
      await deleteBlog(postToDelete._id);
      setPosts((prev) => prev.filter((post) => post._id !== postToDelete._id));
      setPostToDelete(null);
    } catch (err) {
      setError(err.message || 'Failed to delete post');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleOpenEdit = (post) => {
    setPostToEdit(post);
    setEditFormData({
      title: post.title || post.name || '',
      category: post.category || '',
      link: post.link || '',
    });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    if (!postToEdit) return;

    setIsUpdating(true);
    try {
      const updatedData = await updateBlog(postToEdit._id, editFormData);
      setPosts((prev) =>
        prev.map((post) =>
          post._id === postToEdit._id
            ? { ...post, ...editFormData, ...(updatedData || {}) }
            : post
        )
      );
      setPostToEdit(null);
    } catch (err) {
      setError(err.message || 'Failed to update post');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Recent Posts Table (Takes up 2 columns) */}
      <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-[#0a1128]">Recent Articles</h3>
            <p className="text-slate-500 text-xs mt-0.5">
              Manage and organize your fashion blog posts
            </p>
          </div>
          <button
            onClick={() => navigate('/admin/all-post')}
            className="text-sm text-[#034078] hover:underline font-medium"
          >
            View all
          </button>
        </div>

        {error && (
          <div className="p-4 bg-red-50 text-red-600 text-xs text-center border-b border-red-100">
            {error}
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider border-b border-slate-100">
                <th className="py-3 px-6 font-semibold">Title</th>
                <th className="py-3 px-6 font-semibold">Category</th>
                <th className="py-3 px-6 font-semibold">Status</th>
                <th className="py-3 px-6 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {loading ? (
                <tr>
                  <td colSpan="4" className="py-8 text-center text-slate-400">
                    Loading articles...
                  </td>
                </tr>
              ) : posts.length === 0 ? (
                <tr>
                  <td colSpan="4" className="py-8 text-center text-slate-400">
                    No articles found.
                  </td>
                </tr>
              ) : (
                posts.slice(0, 3).map((post) => (
                  <tr key={post._id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-6 font-medium text-slate-900">
                      {post.title || post.name}
                    </td>
                    <td className="py-4 px-6 text-slate-500">
                      {post.category || 'Uncategorized'}
                    </td>
                    <td className="py-4 px-6">
                      {post.status === 'scheduled' ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700">
                          <Clock size={12} /> Scheduled
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700">
                          <CheckCircle size={12} /> Published
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2 text-slate-400">
                        <button
                          onClick={() => handleOpenEdit(post)}
                          className="hover:text-[#034078] p-1 transition-colors"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => setPostToDelete(post)}
                          className="hover:text-red-500 p-1 transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <NewsletterDetail />

      {/* Edit Post Modal */}
      {postToEdit && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-bold text-[#0a1128]">Edit Article</h4>
              <button
                onClick={() => setPostToEdit(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleUpdateSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={editFormData.title}
                  onChange={(e) =>
                    setEditFormData((prev) => ({ ...prev, title: e.target.value }))
                  }
                  required
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#034078]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">
                  Category
                </label>
                <input
                  type="text"
                  value={editFormData.category}
                  onChange={(e) =>
                    setEditFormData((prev) => ({ ...prev, category: e.target.value }))
                  }
                  required
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#034078]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">
                  Link / URL
                </label>
                <input
                  type="url"
                  value={editFormData.link}
                  onChange={(e) =>
                    setEditFormData((prev) => ({ ...prev, link: e.target.value }))
                  }
                  placeholder="https://example.com"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#034078]"
                />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setPostToEdit(null)}
                  className="px-4 py-2 text-sm text-slate-600 font-medium hover:bg-slate-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="px-4 py-2 text-sm text-white bg-[#034078] hover:bg-[#001f54] rounded-lg font-medium transition-colors disabled:opacity-50"
                >
                  {isUpdating ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {postToDelete && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-xl border border-slate-100 text-center">
            <h4 className="text-lg font-bold text-[#0a1128] mb-2">Delete Article?</h4>
            <p className="text-sm text-slate-500 mb-6">
              Are you sure you want to delete &quot;{postToDelete.title || postToDelete.name}&quot;? This action cannot be undone.
            </p>
            <div className="flex justify-center gap-3">
              <button
                type="button"
                onClick={() => setPostToDelete(null)}
                className="px-4 py-2 text-sm text-slate-600 font-medium hover:bg-slate-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                disabled={isDeleting}
                className="px-4 py-2 text-sm text-white bg-red-600 hover:bg-red-700 rounded-lg font-medium transition-colors disabled:opacity-50"
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;