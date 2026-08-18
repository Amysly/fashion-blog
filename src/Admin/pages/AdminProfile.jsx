import React from 'react';
import { User, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminProfile = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-6 md:p-10">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="font-serif text-3xl font-bold tracking-wider text-slate-900">
            Admin Profile
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Manage your account credentials and editor settings for The Style Parlor.
          </p>
        </div>

        {/* Top Card - Avatar & Main Info */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm flex flex-col md:flex-row items-center gap-6">
          {/* Avatar Icon Container */}
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-[#0a1128] border-2 border-slate-200 flex items-center justify-center text-white shadow-inner">
              <User size={48} className="text-slate-200" />
            </div>
          </div>

          {/* User Details */}
          <div className="text-center md:text-left flex-1 space-y-1">
            <div className="flex flex-col md:flex-row md:items-center gap-2">
              <h2 className="text-xl font-bold text-slate-900">
                {user?.name || 'Admin User'}
              </h2>
              <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-0.5 rounded-full bg-[#034078]/10 text-[#034078] border border-[#034078]/20 w-fit mx-auto md:mx-0 capitalize">
                <Shield size={12} /> {user?.role || 'Admin'}
              </span>
            </div>
            <p className="text-slate-600 text-sm">{user?.role || 'Editor-in-Chief'}</p>
            <p className="text-slate-400 text-xs">{user?.email || 'admin@thestyleparlor.com'}</p>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5">
          <h3 className="font-serif text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
            Personal Information
          </h3>

          <div className="space-y-4">
            <div>
              <span className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                Full Name
              </span>
              <p className="text-sm font-medium text-slate-800 bg-slate-50 px-4 py-3 rounded-xl border border-slate-200">
                {user?.name || 'N/A'}
              </p>
            </div>

            <div>
              <span className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                Email Address
              </span>
              <p className="text-sm font-medium text-slate-800 bg-slate-50 px-4 py-3 rounded-xl border border-slate-200">
                {user?.email || 'N/A'}
              </p>
            </div>

            <div>
              <span className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                Role
              </span>
              <p className="text-sm font-medium text-slate-800 bg-slate-50 px-4 py-3 rounded-xl border border-slate-200 capitalize">
                {user?.role || 'N/A'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;