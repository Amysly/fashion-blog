import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/images/logo.png';


const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { linkName: 'HOME', path: '/' },
    { linkName: 'BLOGS', path: '/blog' },
    { linkName: 'SHOP', path: '/shop' },
    { linkName: 'TRENDING OUTFIT', path: '/trending-outfit' },
    { linkName: 'ABOUT', path: '/about' },
    { linkName: 'CONTACT', path: '/contact-us' },
  ];

  return (
    <header className="w-full top-0 sticky z-50 bg-background/80 backdrop-blur-md">
      <div className="px-4 md:px-8 flex justify-between items-center h-24">
        
        <div className="text-xl font-bold text-primary">
          <Link to="/">
            <img
              //src={}
              alt="logo-image"
              className="h-60 w-60 object-contain"
            />
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `font-label-caps text-label-caps tracking-widest transition-colors duration-300 ${
                  isActive
                    ? 'text-primary border-b border-secondary-fixed-dim pb-1'
                    : 'text-on-surface-variant hover:text-primary'
                }`
              }
            >
              {item.linkName}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button className="hidden md:block bg-primary text-on-primary px-6 py-2.5 rounded-lg font-label-caps text-label-caps tracking-widest cursor-pointer hover:opacity-90 transition-opacity">
            SUBSCRIBE
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-on-surface-variant hover:text-primary focus:outline-none"
            aria-label="Toggle Menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      <div
        className={`
          md:hidden 
          bg-background 
          px-4 
          overflow-hidden
          transition-all 
          duration-300 
          ease-in-out
          ${isMobileMenuOpen 
            ? 'max-h-[500px] opacity-100 pt-2 pb-6' 
            : 'max-h-0 opacity-0 pt-0 pb-0'
          }
        `}
      >
        <div className="space-y-4">
          {navLinks.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `block font-label-caps text-label-caps tracking-widest  border-b border-secondary-fixed-dim py-2 transition-colors ${
                  isActive
                    ? 'text-primary font-bold'
                    : 'text-on-surface-variant hover:text-primary'
                }`
              }
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.linkName}
            </NavLink>
          ))}

          <div className="pt-2">
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full bg-primary text-on-primary px-6 py-3.5 rounded-lg font-label-caps text-label-caps tracking-widest cursor-pointer hover:opacity-90 transition-opacity"
            >
              SUBSCRIBE
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;