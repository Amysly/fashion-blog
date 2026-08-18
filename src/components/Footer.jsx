import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoFacebook } from "react-icons/io";
import { createEmailSub } from '../api/subscribe';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ loading: false, success: false, error: '' });

  const navLinks = [
    { linkName: 'Home', path: '/' },
    { linkName: 'Blogs', path: '/blog' },
    { linkName: 'Shop', path: '/shop' },
    { linkName: 'Trending Outfit', path: '/trending-outfit' },
    { linkName: 'About', path: '/about' },
  ];

  const resourceLinks = [
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: '' });

    try {
      await createEmailSub({ email });
      setStatus({ loading: false, success: true, error: '' });
      setEmail('');
    } catch (error) {
      setStatus({
        loading: false,
        success: false,
        error: error?.response?.data?.message || error?.message || 'Subscription failed. Please try again.',
      });
    }
  };

  return (
    <footer className="w-full py-section-gap bg-surface-container-low border-t border-outline-variant">
      <div className="max-w-[1200px] mx-auto px-margin-desktop grid grid-cols-1 md:grid-cols-4 gap-gutter">

        <div className="flex flex-col gap-6 mr-10">
          <h2 className="font-headline-sm text-headline-sm italic text-on-surface">
            The Style Parlor
          </h2>
          <p className="text-on-tertiary-fixed-variant text-body-md max-w-xs leading-relaxed">
            Defining the modern standard of quiet luxury and intentional living through a curated fashion lens.
          </p>
          <div className="flex gap-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary cursor-pointer hover:text-primary transition-colors"
              aria-label="Instagram"
            >
              <FaInstagram className="text-2xl sm:text-xl" />
            </a>

            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary cursor-pointer hover:text-primary transition-colors"
              aria-label="Twitter / X"
            >
              <FaXTwitter className="text-2xl sm:text-xl" />
            </a>

            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary cursor-pointer hover:text-primary transition-colors"
              aria-label="Facebook"
            >
              <IoLogoFacebook className="text-2xl sm:text-xl" />
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="font-label-caps text-label-caps text-primary tracking-[0.2em] mb-2 uppercase">
            NAVIGATION
          </h4>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="text-on-tertiary-fixed-variant hover:text-primary font-medium font-sans hover:translate-x-1 transition-all duration-200 w-fit"
            >
              {link.linkName}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="font-label-caps text-label-caps text-primary tracking-[0.2em] mb-2 uppercase">
            RESOURCES
          </h4>
          {resourceLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="text-on-tertiary-fixed-variant font-medium font-sans hover:text-primary hover:translate-x-1 transition-all duration-200 w-fit"
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-6">
          <h4 className="font-label-caps text-label-caps text-primary tracking-[0.2em] mb-2 uppercase">
            NEWSLETTER
          </h4>
          <p className="text-on-tertiary-fixed-variant text-body-md leading-relaxed">
            Sign up to get the latest arrivals and editorial updates directly to your inbox.
          </p>

          {status.success ? (
            <p className="text-primary text-body-md">Thanks for subscribing! 🎉</p>
          ) : (
            <form onSubmit={handleSubscribe} className="relative flex items-center">
              <input
                className="w-full bg-transparent border border-outline-variant py-2.5 pl-4 pr-28 rounded-lg focus:outline-none focus:border-primary text-body-md font-label-caps text-[12px] tracking-widest"
                placeholder="EMAIL ADDRESS"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                disabled={status.loading}
                className="absolute right-0 top-0 bottom-0 w-28 bg-primary rounded-r-lg cursor-pointer text-on-primary font-bold text-[12px] tracking-wider hover:opacity-90 transition-opacity flex items-center justify-center disabled:opacity-60"
              >
                {status.loading ? '...' : 'Subscribe'}
              </button>
            </form>
          )}

          {status.error && (
            <p className="text-red-500 text-[11px]">{status.error}</p>
          )}
        </div>

      </div>

      <div className="max-w-[1200px] mx-auto px-margin-desktop mt-20 pt-8 border-t border-outline-variant/30 flex justify-between items-center">
        <span className="text-on-tertiary-fixed-variant font-body-md text-[12px] opacity-70">
          © {new Date().getFullYear()} The Style Parlor. All Rights Reserved.
        </span>
        <span className="text-on-tertiary-fixed-variant font-body-md text-[12px] opacity-70 tracking-widest">
          Established 2026
        </span>
      </div>
    </footer>
  );
};

export default Footer;