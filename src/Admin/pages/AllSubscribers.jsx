import React, { useState, useEffect } from 'react';
import { Mail, Send, Download, Search, Filter, Trash2, UserCheck, Loader2, AlertCircle } from 'lucide-react';
import { getEmailSubByAdmin } from '../../api/subscribe';

export default function AllSubscribers() {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getEmailSubByAdmin();

        const list = Array.isArray(response)
          ? response
          : response?.subscribers || response?.data || [];

        setSubscribers(list);
      } catch (err) {
        console.error('Failed to fetch subscribers:', err);
        setError(err?.response?.data?.message || err?.message || 'Failed to load subscribers.');
      } finally {
        setLoading(false);
      }
    };

    fetchSubscribers();
  }, []);

  // Filter subscribers based on search term
  const filteredSubscribers = subscribers.filter((sub) => {
    const email = typeof sub === 'string' ? sub : sub?.email || '';
    return email.toLowerCase().includes(searchTerm.toLowerCase());
  });

  
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return isNaN(date.getTime())
      ? 'N/A'
      : date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="space-y-6 p-5">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-serif font-bold text-[#0a1128]">Newsletter Subscribers</h2>
          <p className="text-slate-500 text-sm">Manage audience, signups, and email stats</p>
        </div>
        <div className="">
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
          <h3 className="text-3xl font-bold text-[#0a1128] mt-2">
            {loading ? '...' : subscribers.length.toLocaleString()}
          </h3>
          <span className="text-emerald-600 text-xs font-semibold mt-1 block">Live subscriber count</span>
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
        {/* Search & Filter Bar */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search subscriber email..."
              className="w-full pl-9 pr-4 py-1.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#034078]"
            />
          </div>
          <button className="flex items-center gap-2 text-sm text-slate-600 bg-white px-3 py-1.5 border border-slate-200 rounded-lg hover:bg-slate-50">
            <Filter size={16} /> Filter
          </button>
        </div>

        <div className="overflow-x-auto">
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
              {loading ? (
                <tr>
                  <td colSpan="4" className="py-12 text-center text-slate-400">
                    <div className="flex justify-center items-center gap-2">
                      <Loader2 className="animate-spin text-[#034078]" size={20} />
                      <span>Loading subscribers...</span>
                    </div>
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="4" className="py-10 text-center text-red-500">
                    <div className="flex justify-center items-center gap-2">
                      <AlertCircle size={18} />
                      <span>{error}</span>
                    </div>
                  </td>
                </tr>
              ) : filteredSubscribers.length === 0 ? (
                <tr>
                  <td colSpan="4" className="py-12 text-center text-slate-400">
                    {searchTerm ? `No subscribers matching "${searchTerm}"` : 'No subscribers found.'}
                  </td>
                </tr>
              ) : (
                filteredSubscribers.map((item, index) => {
                  const email = typeof item === 'string' ? item : item.email;
                  const date = typeof item === 'object' ? item.createdAt || item.date : null;
                  const status = typeof item === 'object' ? item.status || 'Active' : 'Active';
                  const id = typeof item === 'object' ? item._id || item.id || index : index;

                  return (
                    <tr key={id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-4 px-6 font-medium text-slate-900">{email}</td>
                      <td className="py-4 px-6 text-slate-500">{formatDate(date)}</td>
                      <td className="py-4 px-6">
                        <span
                          className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                            status.toLowerCase() === 'active'
                              ? 'bg-emerald-50 text-emerald-700'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button
                          title="Delete subscriber"
                          className="text-slate-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}