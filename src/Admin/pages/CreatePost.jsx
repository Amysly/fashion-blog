import React from 'react';
import { Image as ImageIcon } from 'lucide-react';

export default function CreatePost() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 space-y-6">
      <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-serif font-bold text-[#0a1128]">Create New Post</h2>
          <p className="text-slate-500 text-sm">Craft and publish a new fashion article</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
            Save Draft
          </button>
          <button className="px-4 py-2 bg-[#034078] hover:bg-[#001f54] text-white rounded-lg text-sm font-medium transition-colors">
            Publish Article
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-[#0a1128] mb-2">Article Title</label>
            <input
              type="text"
              placeholder="e.g. The Revival of 90s Minimalist Tailoring"
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-base focus:outline-none focus:border-[#034078]"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#0a1128] mb-2">Excerpt / Short Summary</label>
            <textarea
              rows={2}
              placeholder="Provide a brief summary for newsletter previews..."
              className="w-full p-4 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#034078]"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#0a1128] mb-2">Article Body</label>
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <div className="bg-slate-50 border-b border-slate-200 p-2 flex gap-2 text-slate-600 text-sm font-semibold">
                <button className="px-2.5 py-1 bg-white border border-slate-200 rounded hover:bg-slate-100">B</button>
                <button className="px-2.5 py-1 bg-white border border-slate-200 rounded italic hover:bg-slate-100">I</button>
                <button className="px-2.5 py-1 bg-white border border-slate-200 rounded underline hover:bg-slate-100">U</button>
                <button className="px-2.5 py-1 bg-white border border-slate-200 rounded hover:bg-slate-100">H1</button>
                <button className="px-2.5 py-1 bg-white border border-slate-200 rounded hover:bg-slate-100">H2</button>
                <button className="px-2.5 py-1 bg-white border border-slate-200 rounded hover:bg-slate-100">Quote</button>
              </div>
              <textarea
                rows={12}
                placeholder="Write your fashion story here..."
                className="w-full p-4 border-none text-sm focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-[#0a1128] mb-2">Featured Image</label>
            <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center bg-slate-50 flex flex-col items-center justify-center">
              <ImageIcon className="text-slate-400 mb-2" size={32} />
              <p className="text-sm font-medium text-slate-700">Drag image here or click to upload</p>
              <span className="text-xs text-slate-400 mt-1">PNG, JPG up to 10MB</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#0a1128] mb-2">Category</label>
            <select className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:border-[#034078]">
              <option>Select Category...</option>
              <option>Runway & Collections</option>
              <option>Trends & Style Guides</option>
              <option>Sustainable Fashion</option>
              <option>Interviews</option>
            </select>
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