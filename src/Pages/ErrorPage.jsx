import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const ErrorPage = ({ 
  errorCode = "404", 
  title = "Page Not Found", 
  message = "Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or never existed." 
}) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-on-surface flex items-center justify-center px-6 py-12 transition-colors duration-200">
      <div className="max-w-md w-full text-center space-y-8">
        
        <div className="relative flex items-center justify-center">
          <h1 className="text-8xl sm:text-9xl font-headline-md font-bold text-primary/15 tracking-widest select-none">
            {errorCode}
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[11px] font-label-caps tracking-[0.25em] text-secondary bg-surface-variant/40 border border-outline-variant/30 px-5 py-1.5 rounded-full delicate-shadow uppercase">
              Oops!
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl sm:text-3xl font-headline-sm font-bold text-on-surface tracking-tight">
            {title}
          </h2>
          <p className="text-sm sm:text-base font-body-md text-on-surface-variant max-w-sm mx-auto leading-relaxed">
            {message}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => navigate(-1)} 
            className="w-full sm:w-auto px-6 py-3 text-xs font-label-caps tracking-widest uppercase text-on-surface bg-background border border-outline-variant/60 rounded-xl hover:bg-on-surface hover:text-background transition-all"
          >
            ← Go Back
          </button>

          <Link
            to="/"
            className="w-full sm:w-auto px-6 py-3 text-xs font-label-caps tracking-widest uppercase text-on-primary bg-primary rounded-xl hover:bg-opacity-90 transition-all delicate-shadow"
          >
            Back to Home
          </Link>
        </div>

      </div>
    </div>
  );
};

export default ErrorPage;