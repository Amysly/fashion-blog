import React from 'react';
import { Search, Bell, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="h-16 sm:h-20 shrink-0 bg-white border-b border-slate-200 px-4 sm:px-8 flex items-center justify-between shadow-sm gap-4">
      {/* Search bar */}
      <div className="relative w-full max-w-[200px] sm:max-w-xs lg:max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input
          type="text"
          placeholder="Search..."
          className="w-full pl-9 pr-3 py-2 bg-slate-100 border border-transparent rounded-lg text-sm focus:outline-none focus:border-[#034078] focus:bg-white transition-all"
        />
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-2 sm:gap-4 shrink-0">
        <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg relative transition-colors">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#034078] rounded-full"></span>
        </button>
        <Link 
          to="/admin/create-post"
          className="bg-[#001f54] hover:bg-[#034078] text-white px-3 sm:px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 shadow-sm transition-colors"
        >
          <Plus size={16} />
          <span className="hidden sm:inline">New Post</span>
        </Link>
      </div>
    </header>
  );
};

export default Header;