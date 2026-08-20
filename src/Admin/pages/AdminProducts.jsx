import React, { useState, useEffect } from 'react';
import { Plus, Search, X, Loader2 } from 'lucide-react';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../../api/Product';
import TextInput from '../components/TextInput';
import AdminTable from '../components/AdminTable';
import SearchInput from '../components/SearchInput';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({ name: '', price: '', description: '' });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [formError, setFormError] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getProducts();
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const openCreateModal = () => {
    setEditingProduct(null);
    setFormData({ name: '', price: '', description: '' });
    setImageFile(null);
    setImagePreview(null);
    setFormError('');
    setIsModalOpen(true);
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name || '',
      price: product.price || '',
      description: product.description || ''
    });
    setImageFile(null);
    setImagePreview(product.image || null);
    setFormError('');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    if (imageFile && imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    setIsModalOpen(false);
    setEditingProduct(null);
    setImageFile(null);
    setImagePreview(null);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (imageFile && imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    setFormError('');

    if (!formData.name.trim() || !formData.price || !formData.description.trim()) {
      setFormError('Name, price, and description are required.');
      return;
    }
    if (!editingProduct && !imageFile) {
      setFormError('Please upload a product image.');
      return;
    }

    const payload = new FormData();
    payload.append('name', formData.name.trim());
    payload.append('price', formData.price);
    payload.append('description', formData.description.trim());
    if (imageFile) payload.append('image', imageFile);

    setIsSaving(true);
    try {
      if (editingProduct) {
        const updated = await updateProduct(editingProduct._id, payload);
        setProducts((prev) =>
          prev.map((p) => (p._id === editingProduct._id ? updated : p))
        );
      } else {
        const created = await createProduct(payload);
        setProducts((prev) => [created, ...prev]);
      }
      closeModal();
    } catch (err) {
      setFormError(err.message || 'Failed to save product');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product? This cannot be undone.')) return;

    setDeletingId(id);
    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      setError(err.message || 'Failed to delete product');
    } finally {
      setDeletingId(null);
    }
  };

  const filteredProducts = products.filter((p) =>
    p?.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-xl sm:text-3xl font-bold tracking-wider text-[#0a1128]">
              Product Catalog
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Manage product listings, update prices, and upload product images.
            </p>
          </div>

          <button
            type="button"
            onClick={openCreateModal}
            className="bg-[#034078] hover:bg-[#001f54] text-white font-medium px-5 py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm text-sm"
          >
            <Plus size={18} />
            <span>Add New Product</span>
          </button>
        </div>

        {error && (
          <p className="text-red-500 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-2">
            {error}
          </p>
        )}

         <SearchInput
        itmes={filteredProducts}
          onChange={(e) => setSearch(e.target.value)}
         value={search}
         title='products'
        />

      <AdminTable
        items={filteredProducts}
        loading={loading}
        deletingId={deletingId}
        onEdit={openEditModal}
        onDelete={handleDelete}
        showPrice={true}
      />

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm max-w-xl w-full space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-serif text-lg font-bold text-[#0a1128]">
                  {editingProduct ? 'Edit Product' : 'Create New Product'}
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
                  label="Product Name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Velvet Evening Gown"
                />
                <TextInput
                  label="Price (₦)"
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="25000"
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
                  ) : editingProduct ? (
                    'Save Changes'
                  ) : (
                    'Create Product'
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

export default AdminProducts;