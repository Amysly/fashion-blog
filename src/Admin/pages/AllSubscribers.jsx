import React from 'react';
import { Mail, Send, Download, Search, Filter, Trash2, UserCheck } from 'lucide-react';

export default function AllSubscribers() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-serif font-bold text-[#0a1128]">Newsletter Subscribers</h2>
          <p className="text-slate-500 text-sm">Manage audience, signups, and email stats</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-slate-300 bg-white text-slate-700 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-slate-50 transition-colors">
            <Download size={16} /> Export CSV
          </button>
          <button className="px-4 py-2 bg-[#001f54] hover:bg-[#034078] text-white rounded-lg text-sm font-medium flex items-center gap-2 transition-colors">
            <Send size={16} /> Create Campaign
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-sm font-medium">Total Active Subscribers</span>
            <UserCheck size={20} className="text-[#034078]" />
          </div>
          <h3 className="text-3xl font-bold text-[#0a1128] mt-2">1,284</h3>
          <span className="text-emerald-600 text-xs font-semibold mt-1 block">+42 this week</span>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-sm font-medium">Average Open Rate</span>
            <Mail size={20} className="text-[#034078]" />
          </div>
          <h3 className="text-3xl font-bold text-[#0a1128] mt-2">48.2%</h3>
          <span className="text-emerald-600 text-xs font-semibold mt-1 block">+3.1% above industry avg</span>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-sm font-medium">Unsubscribed</span>
            <Trash2 size={20} className="text-slate-400" />
          </div>
          <h3 className="text-3xl font-bold text-[#0a1128] mt-2">12</h3>
          <span className="text-slate-400 text-xs mt-1 block">0.8% churn rate</span>
        </div>
      </div>

     
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="Search subscriber email..."
              className="w-full pl-9 pr-4 py-1.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#034078]"
            />
          </div>
          <button className="flex items-center gap-2 text-sm text-slate-600 bg-white px-3 py-1.5 border border-slate-200 rounded-lg hover:bg-slate-50">
            <Filter size={16} /> Filter
          </button>
        </div>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 text-slate-500 text-xs uppercase border-b border-slate-100">
              <th className="py-3 px-6 font-semibold">Subscriber Email</th>
              <th className="py-3 px-6 font-semibold">Date Subscribed</th>
              <th className="py-3 px-6 font-semibold">Status</th>
              <th className="py-3 px-6 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            <tr>
              <td className="py-4 px-6 font-medium text-slate-900">sophia.loren@gmail.com</td>
              <td className="py-4 px-6 text-slate-500">Aug 3, 2026</td>
              <td className="py-4 px-6">
                <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700">Active</span>
              </td>
              <td className="py-4 px-6 text-right">
                <button className="text-slate-400 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
              </td>
            </tr>
            <tr>
              <td className="py-4 px-6 font-medium text-slate-900">marcus.v@fashionweek.com</td>
              <td className="py-4 px-6 text-slate-500">Aug 2, 2026</td>
              <td className="py-4 px-6">
                <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700">Active</span>
              </td>
              <td className="py-4 px-6 text-right">
                <button className="text-slate-400 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
              </td>
            </tr>
            <tr>
              <td className="py-4 px-6 font-medium text-slate-900">elena.style@outlook.com</td>
              <td className="py-4 px-6 text-slate-500">Aug 1, 2026</td>
              <td className="py-4 px-6">
                <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700">Active</span>
              </td>
              <td className="py-4 px-6 text-right">
                <button className="text-slate-400 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}