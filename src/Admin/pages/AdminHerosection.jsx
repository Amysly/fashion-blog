import React, { useState, useEffect } from 'react';
import { X, Upload, Loader2 } from 'lucide-react';
import {
  getHeroSectionData,
  createHeroSection,
  updateHeroSection,
  deleteHeroSection,
} from '../../api/HeroSection';
import TextInput from '../components/TextInput';
import AdminTable from '../components/AdminTable';
import Header from '../../components/Header';

const AdminTrendingOutfit = () => {
  const [heroSectionsData, setHeroSectionData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingHeroSection, setEditingHeroSection] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [formError, setFormError] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    loadHeroSections();
  }, []);

  const loadHeroSections = async () => {
    setLoading(true);
    setError('');

    try {
      const data = await getHeroSectionData();

      setHeroSectionData(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || 'Failed to fetch hero sections');
    } finally {
      setLoading(false);
    }
  };

  const openCreateModal = () => {
    setEditingHeroSection(null);

    setFormData({
      title: '',
    });

    setImageFile(null);
    setImagePreview(null);
    setFormError('');
    setIsModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingHeroSection(item);

    setFormData({
      title: item.title || '',
    });

    setImageFile(null);
    setImagePreview(item.image || null);
    setFormError('');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingHeroSection(null);

    setFormData({
      title: '',
    });

    setImageFile(null);
    setImagePreview(null);
    setFormError('');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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

    if (!formData.title.trim()) {
      setFormError('Please fill in all fields');
      return;
    }

    if (!editingHeroSection && !imageFile) {
      setFormError('Please fill in all fields');
      return;
    }

    const payload = new FormData();
    payload.append('title', formData.title.trim());

    if (imageFile) {
      payload.append('image', imageFile);
    }

    
    console.log('Title:', formData.title.trim());
    console.log('Image:', imageFile);
    console.log('FormData:', [...payload.entries()]);

    setIsSaving(true);

    try {
      if (editingHeroSection) {
        const updated = await updateHeroSection(
          editingHeroSection._id,
          payload
        );

        setHeroSectionData((prev) =>
          prev.map((item) =>
            item._id === editingHeroSection._id ? updated : item
          )
        );
      } else {
        const created = await createHeroSection(payload);

        setHeroSectionData((prev) => [created, ...prev]);
      }

      closeModal();
    } catch (err) {
      setFormError(err.message || 'Failed to save hero section');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this item? This cannot be undone.')) {
      return;
    }

    setDeletingId(id);

    try {
      await deleteHeroSection(id);

      setHeroSectionData((prev) =>
        prev.filter((item) => item._id !== id)
      );
    } catch (err) {
      setError(err.message || 'Failed to delete hero section');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-8">

        <Header
          title="Hero Sections"
          description="Manage hero sections, update details, and upload hero section images."
          item="Add Hero Section"
          onClick={openCreateModal}
        />

        {error && (
          <p className="text-red-500 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-2">
            {error}
          </p>
        )}

       <AdminTable
            items={heroSectionsData}
            loading={loading}
            deletingId={deletingId}
            onEdit={openEditModal}
            onDelete={handleDelete}
            secondColumnHeader="Title"
            secondColumnKey="title"
            />

        {isModalOpen && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm max-w-xl w-full space-y-5">

              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-serif text-lg font-bold text-[#0a1128]">
                  {editingHeroSection
                    ? 'Edit Hero Section'
                    : 'Create New Hero Section'}
                </h3>

                <button
                  type="button"
                  onClick={closeModal}
                  className="text-slate-400 hover:text-slate-600"
                >
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
                  label="Title"
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Hero Banner Title"
                />

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Hero Image
                  </label>

                  <div className="flex items-center gap-4">

                    {imagePreview && (
                      <img
                        src={imagePreview}
                        alt="Hero preview"
                        className="w-20 h-20 object-cover rounded-lg border"
                      />
                    )}

                    <label className="cursor-pointer flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-xl text-xs font-medium hover:bg-slate-50">
                      <Upload size={14} />

                      {imagePreview
                        ? 'Change Image'
                        : 'Upload Image'}

                      <input
                        type="file"
                        accept="image/*"
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
                    {isSaving ? (
                      <span className="flex items-center gap-2">
                        <Loader2
                          size={14}
                          className="animate-spin"
                        />
                        Saving...
                      </span>
                    ) : editingHeroSection ? (
                      'Save Changes'
                    ) : (
                      'Create Section'
                    )}
                  </button>

                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminTrendingOutfit;