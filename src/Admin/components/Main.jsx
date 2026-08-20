import React from 'react';
import { Mail, TrendingUp, Eye, FileText, Send } from 'lucide-react';
import Table from './Table';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';


const Main = () => {
  const { user } = useAuth();
  const navigate = useNavigate()

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="bg-gradient-to-r from-[#0a1128] via-[#001f54] to-[#034078] rounded-2xl p-6 text-white shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg sm:text-2xl font-serif font-semibold">
            Welcome back, {user?.name?.split(' ')[0] || 'admin'}! 👋
          </h2>
          <p className="text-slate-300 text-sm mt-1">
            Here is what is happening with your fashion journal today.
          </p>
        </div>
        <button
          onClick={()=>navigate('//admin/all-post')}
          className="bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/20 px-4 py-2 rounded-lg text-sm text-white transition-all w-full sm:w-auto text-center shrink-0"
        >
          View Live Blog
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-sm font-medium">Total Subscribers</span>
            <div className="p-2 bg-[#034078]/10 text-[#034078] rounded-lg">
              <Mail size={20} />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl sm:text-3xl font-bold text-[#0a1128]">1,284</h3>
            <span className="text-emerald-600 text-xs font-semibold flex items-center gap-1 mt-1">
              <TrendingUp size={12} /> +12% this week
            </span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-sm font-medium">Published Articles</span>
            <div className="p-2 bg-[#034078]/10 text-[#034078] rounded-lg">
              <FileText size={20} />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl sm:text-3xl font-bold text-[#0a1128]">48</h3>
            <span className="text-slate-400 text-xs mt-1 block">4 scheduled for release</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-sm font-medium">Monthly Readers</span>
            <div className="p-2 bg-[#034078]/10 text-[#034078] rounded-lg">
              <Eye size={20} />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl sm:text-3xl font-bold text-[#0a1128]">24.5k</h3>
            <span className="text-emerald-600 text-xs font-semibold flex items-center gap-1 mt-1">
              <TrendingUp size={12} /> +18% vs last month
            </span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-sm font-medium">Campaigns Sent</span>
            <div className="p-2 bg-[#034078]/10 text-[#034078] rounded-lg">
              <Send size={20} />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl sm:text-3xl font-bold text-[#0a1128]">12</h3>
            <span className="text-slate-400 text-xs mt-1 block">Avg. open rate: 42%</span>
          </div>
        </div>
      </div>
      <Table />
    </div>
  );
};

export default Main;