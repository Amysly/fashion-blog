import React, { useState, useEffect } from 'react';
import { Plus, Search, Image as ImageIcon, Edit, Trash2, X, Upload } from 'lucide-react';
import { getTrendingOutfit, createTrendingOutfit, updateTrendingOutfit, deleteTrendingOutfit } from '../../api/trendingOutfit';
import { Loader2 } from 'lucide-react';
import TextInput from '../components/TextInput';
import AdminTable from '../components/AdminTable';
import SearchInput from '../components/SearchInput';

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

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-serif text-xl sm:text-3xl font-bold tracking-wider text-[#0a1128]">
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

        <SearchInput
        items={filteredtrendingOutfit}
          onChange={(e) => setSearch(e.target.value)}
         value={search}
         title='outfits'
        />

      <AdminTable
        items={filteredtrendingOutfit}
        loading={loading}
        deletingId={deletingId}
        onEdit={openEditModal}
        onDelete={handleDelete}
        secondColumnHeader="Description"
       secondColumnKey="description"
      />
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
                <TextInput
                  label="Outfit Name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Velvet Evening Gown"
                />
              
                <TextInput
                  label="Description"
                  name="description"
                  rows={3}
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Provide details about this outfit..."
                />
                <TextInput
                  label="Product Image"
                  imagePreview={imagePreview}
                  type="file"
                  accept="image/png, image/jpeg, image/webp"
                  onChange={handleImageChange}
                />
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
                  {isSaving ? (
                      <span className="flex items-center gap-2">
                        <Loader2 size={14} className="animate-spin" /> Saving...
                      </span>
                    ) : editingTrendingOutfit ? (
                      'Save Changes'
                    ) : (
                      'Create Outfit'
                    )}
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