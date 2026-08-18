import React, { useState } from 'react';
import { Image as ImageIcon } from 'lucide-react';
import { createBlog } from '../../api/Blog';
import { useNavigate } from 'react-router-dom';

const BLOG_CATEGORIES = [
  'Trends',
  'Street Style',
  'Outfit Ideas',
  'Beauty',
  'Accessories',
  'Seasonal Lookbook',
];

export default function CreatePost() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState('');
  const [isPending, setIsPending] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) setImageFile(file);
  };

  const handlePublish = async () => {
    setError('');

    if (!formData.title || !formData.description || !formData.category) {
      setError('Please fill in title, excerpt, and category.');
      return;
    }
    if (!imageFile) {
      setError('Please upload a featured image.');
      return;
    }

    const payload = new FormData();
    payload.append('title', formData.title);
    payload.append('description', formData.description);
    payload.append('category', formData.category);
    payload.append('image', imageFile);

    setIsPending(true);
    try {
      await createBlog(payload);
      navigate('/admin/all-post');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 space-y-6">
      <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-serif font-bold text-[#0a1128]">Create New Post</h2>
          <p className="text-slate-500 text-sm">Craft and publish a new fashion article</p>
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={handlePublish}
            disabled={isPending}
            className="px-4 py-2 bg-[#034078] hover:bg-[#001f54] text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
          >
            {isPending ? 'Publishing...' : 'Publish Article'}
          </button>
        </div>
      </div>

      {error && (
        <p className="text-red-500 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-2">
          {error}
        </p>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-[#0a1128] mb-2">Article Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. The Revival of 90s Minimalist Tailoring"
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-base focus:outline-none focus:border-[#034078]"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#0a1128] mb-2">Excerpt / Short Summary</label>
            <textarea
              name="description"
              rows={2}
              value={formData.description}
              onChange={handleChange}
              placeholder="Provide a brief summary for newsletter previews..."
              className="w-full p-4 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#034078]"
            />
          </div>
              <div className='w-[70%]'>
            <label className="block text-sm font-semibold text-[#0a1128] mb-2">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:border-[#034078]"
            >
            <option value="">Select Category</option>
            {BLOG_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
            </select>
          </div>

        </div>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-[#0a1128] mb-2">Featured Image</label>
            <label className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center bg-slate-50 flex flex-col items-center justify-center cursor-pointer">
              <ImageIcon className="text-slate-400 mb-2" size={32} />
              <p className="text-sm font-medium text-slate-700">
                {imageFile ? imageFile.name : 'Drag image here or click to upload'}
              </p>
              <span className="text-xs text-slate-400 mt-1">PNG, JPG up to 10MB</span>
              <input
                type="file"
                accept="image/png, image/jpeg"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>

        
           <div>
            <label className="block text-sm font-semibold text-[#0a1128] mb-2">Tags</label>
            <input
              type="text"
              placeholder="Paris, Vintage, Accessories (comma separated)"
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#034078]"
            />
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" defaultChecked className="w-4 h-4 text-[#034078] rounded border-slate-300 focus:ring-[#034078]" />
              <span className="text-sm font-medium text-[#0a1128]">Send directly to subscribers upon publishing</span>
            </label>
          </div>
        </div>
      </div>
        

        </div>
  );
}
