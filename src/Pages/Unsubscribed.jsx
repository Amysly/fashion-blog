import React from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineMailOpen } from 'react-icons/hi';

const Unsubscribed = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-center px-6">
      <div className="max-w-md space-y-4">
        <HiOutlineMailOpen className="text-5xl text-primary mx-auto" />
        <h1 className="font-headline-md text-2xl font-bold">You've been unsubscribed</h1>
        <p className="text-on-surface-variant text-sm">
          You won't receive any more emails from The Style Parlour. Sorry to see you go!
        </p>
        <Link
          to="/"
          className="inline-block mt-4 bg-primary text-on-primary px-6 py-2.5 rounded-xl text-xs uppercase tracking-widest font-bold hover:bg-opacity-90 transition-opacity"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Unsubscribed;