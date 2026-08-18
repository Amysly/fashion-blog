import React from 'react';
import { Edit, Trash2 } from 'lucide-react';

export default function Categories() {
  return (
    <div className="space-y-6 p-5">
      <div>
        <h2 className="text-2xl font-serif font-bold text-[#0a1128]">Categories</h2>
        <p className="text-slate-500 text-sm">Organize fashion subjects and taxonomy</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Add Category Form */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 h-fit">
          <h3 className="text-lg font-bold text-[#0a1128]">Add New Category</h3>
          <div>
            <label className="block text-sm font-semibold text-[#0a1128] mb-1">Name</label>
            <input
              type="text"
              placeholder="Category Name"
              className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#034078]"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#0a1128] mb-1">Slug</label>
            <input
              type="text"
              placeholder="category-slug"
              className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#034078]"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#0a1128] mb-1">Description</label>
            <textarea
              rows={3}
              placeholder="Brief description..."
              className="w-full p-3 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#034078]"
            />
          </div>
          <button className="w-full py-2.5 bg-[#001f54] hover:bg-[#034078] text-white rounded-lg text-sm font-medium transition-colors">
            Add Category
          </button>
        </div>

        {/* Categories Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase border-b border-slate-100">
                <th className="py-3 px-6 font-semibold">Name</th>
                <th className="py-3 px-6 font-semibold">Slug</th>
                <th className="py-3 px-6 font-semibold">Post Count</th>
                <th className="py-3 px-6 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              <tr>
                <td className="py-4 px-6 font-medium text-slate-900">Runway & Collections</td>
                <td className="py-4 px-6 text-slate-500">/runway</td>
                <td className="py-4 px-6 font-semibold text-[#034078]">18 posts</td>
                <td className="py-4 px-6 text-right">
                  <div className="flex justify-end gap-2 text-slate-400">
                    <button className="hover:text-[#034078] transition-colors"><Edit size={16} /></button>
                    <button className="hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="py-4 px-6 font-medium text-slate-900">Trends & Style Guides</td>
                <td className="py-4 px-6 text-slate-500">/trends</td>
                <td className="py-4 px-6 font-semibold text-[#034078]">14 posts</td>
                <td className="py-4 px-6 text-right">
                  <div className="flex justify-end gap-2 text-slate-400">
                    <button className="hover:text-[#034078] transition-colors"><Edit size={16} /></button>
                    <button className="hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="py-4 px-6 font-medium text-slate-900">Sustainable Fashion</td>
                <td className="py-4 px-6 text-slate-500">/eco-fashion</td>
                <td className="py-4 px-6 font-semibold text-[#034078]">9 posts</td>
                <td className="py-4 px-6 text-right">
                  <div className="flex justify-end gap-2 text-slate-400">
                    <button className="hover:text-[#034078] transition-colors"><Edit size={16} /></button>
                    <button className="hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}