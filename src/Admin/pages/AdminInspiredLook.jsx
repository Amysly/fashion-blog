import React, { useEffect, useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import {
  getInspiredLooks,
  createInspiredLook,
  updateInspiredLook,
  deleteInspiredLook,
} from '../../api/inspiredLooks';
import TextInput from '../components/TextInput';
import AdminTable from '../components/AdminTable';
import Header from '../../components/Header';
import SearchInput from '../components/SearchInput';

const AdminInspiredLook = () => {
  const [looks, setLooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLook, setEditingLook] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [formError, setFormError] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetchLooks();
  }, []);

  const fetchLooks = async () => {
    try {
      setLoading(true);
      const data = await getInspiredLooks();
      setLooks(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to load looks');
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const openCreateModal = () => {
    setEditingLook(null);
    setImageFile(null);
    setImagePreview('');
    setFormError('');
    setIsModalOpen(true);
  };

  const openEditModal = (look) => {
    setEditingLook(look);
    setImageFile(null);
    setImagePreview(look.image);
    setFormError('');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingLook(null);
    setImageFile(null);
    setImagePreview('');
    setFormError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!editingLook && !imageFile) {
      setFormError('Please select an image to upload.');
      return;
    }

    const formData = new FormData();
    if (imageFile) {
      formData.append('image', imageFile);
    }

    setIsSaving(true);
    setFormError('');

    try {
      if (editingLook) {
        const updated = await updateInspiredLook(editingLook._id, formData);
        setLooks((prev) =>
          prev.map((item) => (item._id === editingLook._id ? updated : item))
        );
      } else {
        const created = await createInspiredLook(formData);
        setLooks((prev) => [created, ...prev]);
      }
      closeModal();
    } catch (err) {
      setFormError(err.response?.data?.message || err.message || 'Action failed');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this look?')) return;

    setDeletingId(id);
    try {
      await deleteInspiredLook(id);
      setLooks((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to delete look');
    } finally {
      setDeletingId(null);
    }
  };

  // Filter & Format Data for Table
  const filteredLooks = looks
    .filter((look, index) => {
      const title = `Inspired Look #${looks.length - index}`;
      return title.toLowerCase().includes(search.toLowerCase());
    })
    .map((look, index) => ({
      ...look,
      name: `Inspired Look #${looks.length - index}`,
      date: look.createdAt
        ? new Date(look.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })
        : 'N/A',
    }));

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <Header
          title="Inspired Look Catalog"
          description="Manage image gallery and upload lookbook styles."
          item="Add New Image"
          onClick={openCreateModal}
        />

        {error && (
          <p className="text-red-500 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-2">
            {error}
          </p>
        )}

        <SearchInput
          items={filteredLooks}
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          title="inspired looks"
        />

        <AdminTable
          items={filteredLooks}
          loading={loading}
          deletingId={deletingId}
          onEdit={openEditModal}
          onDelete={handleDelete}
          showPrice={false}
          secondColumnHeader="Date Uploaded"
          secondColumnKey="date"
        />

        {/* Create / Edit Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm max-w-xl w-full space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-serif text-lg font-bold text-[#0a1128]">
                  {editingLook ? 'Update Look Image' : 'Add New Inspired Look'}
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
                  label="Look Image"
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
                  ) : editingLook ? (
                    'Save Changes'
                  ) : (
                    'Upload Look'
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

export default AdminInspiredLook;