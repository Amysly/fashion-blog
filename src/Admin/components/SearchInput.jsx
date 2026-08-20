import React from 'react'
import { Search } from 'lucide-react';

const SearchInput = ({value, onChange, items,title}) => {
  return (
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              value={value}
              onChange={onChange}
              placeholder="Search outfits..."
              className="w-full bg-slate-50 text-slate-800 text-sm rounded-xl pl-10 pr-4 py-2 border border-slate-200 focus:outline-none focus:border-[#034078]"
            />
          </div>

          <div className="text-xs text-slate-500">
            Showing <span className="font-semibold text-slate-800">{items.length}</span> {title}
          </div>
        </div>
  )
}

export default SearchInput
