import React, { useState } from 'react';
import {
  LayoutDashboard,
  FileText,
  PlusSquare,
  Mail,
  FolderOpen,
  Settings,
  LogOut,
  User,
  ShoppingBag,
  Menu,
  X
} from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import { useAuth } from '../../context/AuthContext';
import { logoutUser } from '../../api/Auth';

const navLinks = [
  { linkName: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={18} />, end: true },
  { linkName: 'Create Post', path: '/admin/create-post', icon: <PlusSquare size={18} /> },
  { linkName: 'All Posts', path: '/admin/all-post', icon: <FileText size={18} /> },
  { linkName: 'Subscribers', path: '/admin/subscribers', icon: <Mail size={18} /> },
  { linkName: 'Categories', path: '/admin/categories', icon: <FolderOpen size={18} /> },
  { linkName: 'Trending Outfit', path: '/admin/trending-outfit', icon: <FolderOpen size={18} /> },
  { linkName: 'Product', path: '/admin/product', icon: <ShoppingBag size={18} /> },
  { linkName: 'Profile', path: '/admin/profile', icon: <User size={18} /> },
  { linkName: 'Settings', path: '/admin/settings', icon: <Settings size={18} /> },
];

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (err) {
      console.log('logout failed', err);
    } finally {
      navigate('/');
    }
  };

  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      {/* Mobile Top Navbar Bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-[#0a1128] text-white px-4 flex items-center justify-between z-30 border-b border-[#034078]/30">
        <div className="flex items-center gap-3">
          {logo && <img src={logo} alt="The Style Parlor" className="h-7 w-auto object-contain" />}
          <h1 className="font-serif text-base font-bold tracking-wider text-white">
            The Style Parlor
          </h1>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-slate-300 hover:text-white rounded-lg focus:outline-none"
          aria-label="Toggle Navigation Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dark Backdrop Overlay */}
      {isOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* Main Sidebar Panel */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-64 bg-[#0a1128] text-white flex flex-col justify-between shrink-0 shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Top Header & Navigation Links */}
        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="p-6 border-b border-[#034078]/30 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              {logo && <img src={logo} alt="The Style Parlor" className="h-8 w-auto object-contain" />}
              <div>
                <h1 className="font-serif text-lg font-bold tracking-wider text-white leading-tight">
                  The Style Parlor
                </h1>
                <span className="text-[#034078] font-sans font-light text-xs uppercase block tracking-widest mt-0.5">
                  Admin Portal
                </span>
              </div>
            </div>
            <button
              onClick={closeSidebar}
              className="lg:hidden text-slate-400 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation Links Area (Scrollable if links overflow screen height) */}
          <nav className="p-4 flex flex-col gap-1 overflow-y-auto flex-1">
            {navLinks.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                onClick={closeSidebar}
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

        {/* Bottom User Profile Section */}
        <div className="p-4 border-t border-[#034078]/30 shrink-0">
          <div className="flex items-center justify-between p-2 rounded-lg bg-[#001f54]/50">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-9 h-9 rounded-full bg-[#034078] border border-white/20 flex items-center justify-center font-bold text-sm shrink-0">
                AD
              </div>
              <div className="truncate">
                <p className="text-sm font-medium text-white leading-none truncate">
                  {user?.name || 'Admin'}
                </p>
                <span className="text-xs text-slate-400">Editor-in-Chief</span>
              </div>
            </div>
            <button
              onClick={handleLogout}
              type="button"
              className="text-slate-400 hover:text-red-400 p-1.5 transition-colors shrink-0"
              title="Logout"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default SideBar;