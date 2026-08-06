import React from 'react';
import { Edit, Trash2, CheckCircle, Clock, Plus, Search } from 'lucide-react';

export default function AllPosts() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-serif font-bold text-[#0a1128]">Blog Posts</h2>
          <p className="text-slate-500 text-sm">View and manage all published and draft articles</p>
        </div>
        <button className="bg-[#001f54] hover:bg-[#034078] text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors">
          <Plus size={16} />
          <span>New Article</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full pl-9 pr-4 py-1.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#034078]"
            />
          </div>
        </div>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 text-slate-500 text-xs uppercase border-b border-slate-100">
              <th className="py-3 px-6 font-semibold">Title</th>
              <th className="py-3 px-6 font-semibold">Category</th>
              <th className="py-3 px-6 font-semibold">Status</th>
              <th className="py-3 px-6 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            <tr>
              <td className="py-4 px-6 font-medium text-slate-900">The Revival of 90s Minimalist Tailoring</td>
              <td className="py-4 px-6 text-slate-500">Trends</td>
              <td className="py-4 px-6">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700">
                  <CheckCircle size={12} /> Published
                </span>
              </td>
              <td className="py-4 px-6 text-right">
                <div className="flex items-center justify-end gap-2 text-slate-400">
                  <button className="hover:text-[#034078] p-1"><Edit size={16} /></button>
                  <button className="hover:text-red-500 p-1"><Trash2 size={16} /></button>
                </div>
              </td>
            </tr>
            <tr>
              <td className="py-4 px-6 font-medium text-slate-900">Autumn Color Palette Preview 2026</td>
              <td className="py-4 px-6 text-slate-500">Runway</td>
              <td className="py-4 px-6">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700">
                  <Clock size={12} /> Scheduled
                </span>
              </td>
              <td className="py-4 px-6 text-right">
                <div className="flex items-center justify-end gap-2 text-slate-400">
                  <button className="hover:text-[#034078] p-1"><Edit size={16} /></button>
                  <button className="hover:text-red-500 p-1"><Trash2 size={16} /></button>
                </div>
              </td>
            </tr>
            <tr>
              <td className="py-4 px-6 font-medium text-slate-900">Sustainable Silk Alternatives</td>
              <td className="py-4 px-6 text-slate-500">Eco Fashion</td>
              <td className="py-4 px-6">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700">
                  <CheckCircle size={12} /> Published
                </span>
              </td>
              <td className="py-4 px-6 text-right">
                <div className="flex items-center justify-end gap-2 text-slate-400">
                  <button className="hover:text-[#034078] p-1"><Edit size={16} /></button>
                  <button className="hover:text-red-500 p-1"><Trash2 size={16} /></button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}