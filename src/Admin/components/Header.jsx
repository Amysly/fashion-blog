import React from 'react'
import { Search, Bell, Plus} from 'lucide-react';

const Header = () => {
  return (
   <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between shadow-sm">
          {/* Search bar */}
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search posts, subscribers, tags..."
              className="w-full pl-10 pr-4 py-2 bg-slate-100 border border-transparent rounded-lg text-sm focus:outline-none focus:border-[#034078] focus:bg-white transition-all"
            />
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg relative transition-colors">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#034078] rounded-full"></span>
            </button>
            <button className="bg-[#001f54] hover:bg-[#034078] text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 shadow-sm transition-colors">
              <Plus size={16} />
              <span>New Post</span>
            </button>
          </div>
        </header>
        </div>
  )
}

export default Header
