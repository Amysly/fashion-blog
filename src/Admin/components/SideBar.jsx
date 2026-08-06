import React from 'react';
import {
  LayoutDashboard,
  FileText,
  PlusSquare,
  Mail,
  FolderOpen,
  Settings,
  LogOut,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/images/logo.png';

const navLinks = [
  { linkName: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={18} />, end: true },
  { linkName: 'Create Post', path: '/admin/create-post', icon: <PlusSquare size={18} /> },
  { linkName: 'All Posts', path: '/admin/all-post', icon: <FileText size={18} /> },
  { linkName: 'Subscribers', path: '/admin/subscribers', icon: <Mail size={18} /> },
  { linkName: 'Categories', path: '/admin/categories', icon: <FolderOpen size={18} /> },
  { linkName: 'Settings', path: '/admin/settings', icon: <Settings size={18} /> },
];

const SideBar = () => {
  return (
    <div className="h-screen sticky top-0">
      <aside className="w-64 bg-[#0a1128] text-white flex flex-col h-full justify-between shrink-0 shadow-xl">
        <div>
          <div className="p-6 border-b border-[#034078]/30 flex items-center gap-3">
            {logo ? (
              <img src={logo} alt="The Style Parlor" className="h-8 w-auto object-contain" />
            ) : null}
            <div>
              <h1 className="font-serif text-lg font-bold tracking-wider text-white leading-tight">
                The Style Parlor
              </h1>
              <span className="text-[#034078] font-sans font-light text-xs uppercase block tracking-widest mt-0.5">
                Admin Portal
              </span>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="p-4 flex flex-col gap-1">
            {navLinks.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 font-medium rounded-xl transition-colors ${
                    isActive
                      ? 'bg-[#034078] text-white'
                      : 'text-slate-300 hover:bg-[#001f54] hover:text-white'
                  }`
                }
              >
                {item.icon}
                <span>{item.linkName}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Admin Footer */}
        <div className="p-4 border-t border-[#034078]/30">
          <div className="flex items-center justify-between p-2 rounded-lg bg-[#001f54]/50">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#034078] border border-white/20 flex items-center justify-center font-bold text-sm">
                AD
              </div>
              <div>
                <p className="text-sm font-medium text-white leading-none">Admin User</p>
                <span className="text-xs text-slate-400">Editor-in-Chief</span>
              </div>
            </div>
            <button 
              type="button" 
              className="text-slate-400 hover:text-red-400 p-1 transition-colors"
              title="Logout"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default SideBar;