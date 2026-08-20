import React, { useState, useEffect } from 'react';
import { X, AlertTriangle } from 'lucide-react';
import { getBlogs, deleteBlog, updateBlog } from '../../api/Blog';
import SearchInput from '../components/SearchInput';
import AdminTable from '../components/AdminTable';

export default function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  const [postToDelete, setPostToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [postToEdit, setPostToEdit] = useState(null);
  const [editFormData, setEditFormData] = useState({ title: '', category: '' });
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const loadPosts = async () => {
      try {
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

  const filteredPosts = posts
    .filter((post) => (post.title || post.name)?.toLowerCase().includes(search.toLowerCase()))
    .map((post) => ({
      ...post,
      name: post.title || post.name, // Normalizes title to name for AdminTable
      description: post.category ? `Category: ${post.category}` : post.description,
    }));

  return (
    <div className="w-full p-6 space-y-6">
      <div className="text-center">
        <h2 className="text-lg sm:text-2xl font-serif font-bold text-[#0a1128]">Blog Posts</h2>
        <p className="text-slate-500 text-sm">View and manage all published articles</p>
      </div>

      {error && (
        <div className="flex items-center justify-between text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-3">
          <span>{error}</span>
          <button onClick={() => setError('')} className="text-red-400 hover:text-red-600">
            <X size={16} />
          </button>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <SearchInput
          items={filteredPosts}
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          title="blogs"
        />

        <AdminTable
          items={filteredPosts}
          loading={loading}
          deletingId={isDeleting ? postToDelete?._id : null}
          onEdit={handleOpenEdit}
          onDelete={(id) => setPostToDelete(posts.find((p) => p._id === id))}
          secondColumnHeader="Category"
          secondColumnKey="category"
        />
      </div>

      {/* Delete Confirmation Modal */}
      {postToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-100">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-red-100 text-red-600 rounded-full shrink-0">
                <AlertTriangle size={24} />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-slate-900">Delete Post</h3>
                <p className="text-sm text-slate-500 mt-1">
                  Are you sure you want to delete{' '}
                  <span className="font-semibold text-slate-800">
                    "{postToDelete.title || postToDelete.name}"
                  </span>
                  ? This action cannot be undone.
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={() => setPostToDelete(null)}
                disabled={isDeleting}
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                disabled={isDeleting}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors disabled:opacity-50"
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {postToEdit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-100">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-lg font-bold text-[#0a1128]">Edit Article</h3>
              <button
                onClick={() => setPostToEdit(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-md"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleUpdateSubmit} className="space-y-4 mt-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
                  Title
                </label>
                <input
                  type="text"
                  required
                  value={editFormData.title}
                  onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#034078]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
                  Category
                </label>
                <input
                  type="text"
                  required
                  value={editFormData.category}
                  onChange={(e) => setEditFormData({ ...editFormData, category: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#034078]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setPostToEdit(null)}
                  disabled={isUpdating}
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="px-4 py-2 text-sm font-medium text-white bg-[#001f54] hover:bg-[#034078] rounded-lg transition-colors disabled:opacity-50"
                >
                  {isUpdating ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}