import React, { useState, useEffect, useMemo } from 'react';
import { Plus, Search, X, Loader2 } from 'lucide-react';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../../api/Product';
import TextInput from '../components/TextInput';
import AdminTable from '../components/AdminTable';
import SearchInput from '../components/SearchInput';
import Header from '../../components/Header';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    externalLink: '',
  });
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
    setFormData({ name: '', price: '', description: '', externalLink: '' });
    setImageFile(null);
    setImagePreview(null);
    setFormError('');
    setIsModalOpen(true);
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name || '',
      price: product.price ?? '',
      description: product.description || '',
      externalLink: product.externalLink || '',
    });
    setImageFile(null);
    setImagePreview(product.image || null);
    setFormError('');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    if (imagePreview && imagePreview.startsWith('blob:')) {
      URL.revokeObjectURL(imagePreview);
    }
    setIsModalOpen(false);
    setEditingProduct(null);
    setImageFile(null);
    setImagePreview(null);
    setFormError('');
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (imagePreview && imagePreview.startsWith('blob:')) {
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
    payload.append('price', Number(formData.price));
    payload.append('description', formData.description.trim());
    payload.append('externalLink', (formData.externalLink || '').trim());
    if (imageFile) payload.append('image', imageFile);

    setIsSaving(true);
    try {
      if (editingProduct) {
        const updated = await updateProduct(editingProduct._id, payload);
        setProducts((prev) =>
          prev.map((p) =>
            p._id === editingProduct._id
              ? {
                  ...p,
                  ...updated,
                  ...formData,
                  price: Number(formData.price),
                }
              : p
          )
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

  const filteredProducts = useMemo(
    () =>
      products.filter((p) =>
        p?.name?.toLowerCase().includes(search.toLowerCase())
      ),
    [products, search]
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <Header
          title="Product Catalog"
          description="Manage product listings, update prices, and upload product images."
          item="Add New Product"
          onClick={openCreateModal}
        />

        {error && (
          <p className="text-red-500 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-2">
            {error}
          </p>
        )}

        <SearchInput
          items={filteredProducts}
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          title="products"
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
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-3 z-50 overflow-y-auto">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm max-w-xl w-full space-y-5  mt-16">
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextInput
                  label="Product Name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Velvet Evening Gown"
                />

                <TextInput
                  label="Price (USD)"
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="199.99"
                  min="0"
                  step="0.01"
                />

                {/* Full-width on md+ so the URL has room */}
                <div className="md:col-span-2">
                  <TextInput
                    label="Product Link"
                    type="url"
                    name="externalLink"
                    value={formData.externalLink}
                    onChange={handleChange}
                    placeholder="https://etsy.com/listing/..."
                  />
                </div>

                <div className="md:col-span-2">
                  <TextInput
                    label="Description"
                    name="description"
                    rows={3}
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Provide details about this outfit..."
                  />
                </div>

                <div className="md:col-span-2">
                  <TextInput
                    label="Product Image"
                    imagePreview={imagePreview}
                    type="file"
                    accept="image/png, image/jpeg, image/webp"
                    onChange={handleImageChange}
                  />
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