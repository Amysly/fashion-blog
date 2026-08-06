import React from 'react'
import { CheckCircle, Clock,Edit, Trash2} from 'lucide-react';
import NewsletterDetail from '../pages/NewsletterDetail';


const Table = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Posts Table (Takes up 2 columns) */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-[#0a1128]">Recent Articles</h3>
                  <p className="text-slate-500 text-xs mt-0.5">Manage and organize your fashion blog posts</p>
                </div>
                <button className="text-sm text-[#034078] hover:underline font-medium">View all</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider border-b border-slate-100">
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
                      <td className="py-4 px-6 font-[#0a1128] font-medium text-slate-900">Sustainable Silk Alternatives</td>
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
            <NewsletterDetail/>
        </div>
  )
}

export default Table
