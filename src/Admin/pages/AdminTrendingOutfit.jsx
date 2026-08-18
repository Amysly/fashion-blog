import React, { useState, useEffect } from 'react';
import { Plus, Search, Image as ImageIcon, Edit, Trash2, X, Upload } from 'lucide-react';
import { getTrendingOutfit, createTrendingOutfit, updateTrendingOutfit, deleteTrendingOutfit } from '../../api/trendingOutfit';

const AdminTrendingOutfit = () => {
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTrendingOutfit, setEditingTrendingOutfit] = useState(null); 
  const [formData, setFormData] = useState({ name: '', description: '' });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [formError, setFormError] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    loadTrendings();
  }, []);

  const loadTrendings = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getTrendingOutfit();
      setTrending(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || 'Failed to fetch items');
    } finally {
      setLoading(false);
    }
  };

  const openCreateModal = () => {
    setEditingTrendingOutfit(null);
    setFormData({ name: '', description: '' });
    setImageFile(null);
    setImagePreview(null);
    setFormError('');
    setIsModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingTrendingOutfit(item);
    setFormData({ name: item.name || '', description: item.description || '' });
    setImageFile(null);
    setImagePreview(item.image || null);
    setFormError('');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTrendingOutfit(null);
    setImageFile(null);
    setImagePreview(null);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    setFormError('');

    if (!formData.name.trim()) {
      setFormError('Name is required.');
      return;
    }
    if (!editingTrendingOutfit && !imageFile) {
      setFormError('Please upload a trending image.');
      return;
    }

    const payload = new FormData();
    payload.append('name', formData.name.trim());
    payload.append('description', formData.description.trim());
    if (imageFile) payload.append('image', imageFile);

    setIsSaving(true);
    try {
      if (editingTrendingOutfit) {
        const updated = await updateTrendingOutfit(editingTrendingOutfit._id, payload);
        setTrending((prev) =>
          prev.map((p) => (p._id === editingTrendingOutfit._id ? updated : p))
        );
      } else {
        const created = await createTrendingOutfit(payload);
        setTrending((prev) => [created, ...prev]);
      }
      closeModal();
    } catch (err) {
      setFormError(err.message || 'Failed to save item');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this item? This cannot be undone.')) return;

    setDeletingId(id);
    try {
      await deleteTrendingOutfit(id);
      setTrending((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      setError(err.message || 'Failed to delete item');
    } finally {
      setDeletingId(null);
    }
  };

  const filteredtrendingOutfit = trending.filter((p) =>
    p?.name?.toLowerCase().includes(search.toLowerCase()) ||
    p?.description?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl font-bold tracking-wider text-[#0a1128]">
              Trending Outfit Catalog
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Manage trending listings, update details, and upload trending outfit images.
            </p>
          </div>

          <button
            type="button"
            onClick={openCreateModal}
            className="bg-[#034078] hover:bg-[#001f54] text-white font-medium px-5 py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm text-sm"
          >
            <Plus size={18} />
            <span>Add New Outfit</span>
          </button>
        </div>

        {error && (
          <p className="text-red-500 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-2">
            {error}
          </p>
        )}

        {/* Search Bar */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search outfits..."
              className="w-full bg-slate-50 text-slate-800 text-sm rounded-xl pl-10 pr-4 py-2 border border-slate-200 focus:outline-none focus:border-[#034078]"
            />
          </div>

          <div className="text-xs text-slate-500">
            Showing <span className="font-semibold text-slate-800">{filteredtrendingOutfit.length}</span> outfits
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            {loading ? (
              <p className="p-6 text-sm text-slate-500">Loading outfits...</p>
            ) : filteredtrendingOutfit.length === 0 ? (
              <p className="p-6 text-sm text-slate-500">No trending outfits found.</p>
            ) : (
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-xs tracking-wider">
                    <th className="py-4 px-6">Outfit</th>
                    <th className="py-4 px-6">Name</th>
                    <th className="py-4 px-6">Description</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredtrendingOutfit.map((item) => (
                    <tr key={item._id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 px-6">
                        <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center text-slate-400">
                          {item.image ? (
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          ) : (
                            <ImageIcon size={20} />
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-6 font-medium text-[#0a1128] whitespace-nowrap">{item.name}</td>
                      <td className="py-4 px-6 text-slate-600 max-w-xs truncate">
                        {item.description || <span className="text-slate-400 italic">No description</span>}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => openEditModal(item)}
                            className="p-2 text-slate-500 hover:text-[#034078] hover:bg-slate-100 rounded-lg transition-colors"
                            title="Edit Outfit"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(item._id)}
                            disabled={deletingId === item._id}
                            className="p-2 text-slate-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                            title="Delete Outfit"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm max-w-xl w-full space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-serif text-lg font-bold text-[#0a1128]">
                  {editingTrendingOutfit ? 'Edit Trending Outfit' : 'Create New Trending Outfit'}
                </h3>
                <button type="button" onClick={closeModal} className="text-slate-400 hover:text-slate-600">
                  <X size={18} />
                </button>
              </div>

              {formError && (
                <p className="text-red-500 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-2">
                  {formError}
                </p>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                    Outfit Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Summer Vacation Looks"
                    className="w-full bg-slate-50 text-slate-800 text-sm rounded-xl px-4 py-2.5 border border-slate-200 focus:outline-none focus:border-[#034078]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    rows={3}
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Provide details about this outfit..."
                    className="w-full bg-slate-50 text-slate-800 text-sm rounded-xl px-4 py-2.5 border border-slate-200 focus:outline-none focus:border-[#034078] resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                    Outfit Image
                  </label>
                  <label className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center bg-slate-50 cursor-pointer hover:bg-slate-100/50 transition-colors block relative">
                    {imagePreview ? (
                      <div className="flex flex-col items-center gap-2">
                        <img src={imagePreview} alt="Preview" className="w-20 h-20 object-cover rounded-xl border border-slate-200" />
                        <p className="text-xs text-[#034078] font-medium">Click to change image</p>
                      </div>
                    ) : (
                      <>
                        <Upload size={24} className="mx-auto text-slate-400 mb-2" />
                        <p className="text-xs text-slate-600 font-medium">
                          Click to upload or drag & drop image
                        </p>
                        <p className="text-[10px] text-slate-400 mt-1">
                          Supports JPG, PNG, WEBP
                        </p>
                      </>
                    )}
                    <input
                      type="file"
                      accept="image/png, image/jpeg, image/webp"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSaving}
                  className="px-5 py-2 bg-[#034078] hover:bg-[#001f54] text-white rounded-xl text-xs font-medium transition-colors shadow-sm disabled:opacity-50"
                >
                  {isSaving ? 'Saving...' : editingTrendingOutfit ? 'Save Changes' : 'Create Outfit'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminTrendingOutfit;