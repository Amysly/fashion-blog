import React from 'react'
import { Plus } from 'lucide-react';

const Header = ({onClick, title,description,item}) => {
  return (
     <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-serif text-xl sm:text-3xl font-bold tracking-wider text-[#0a1128]">
             {title}
            </h1>
            <p className="text-slate-500 text-sm mt-1">
                {description}
            </p>
          </div>

          <button
            type="button"
            onClick={onClick}
            className="bg-[#034078] hover:bg-[#001f54] text-white font-medium px-5 py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm text-sm"
          >
            <Plus size={18} />
            <span>{item}</span>
          </button>
        </div>
  )
}

export default Header
