import React, { useState } from 'react';
import { createEmailSub } from '../api/subscribe';
import { Loader2 } from 'lucide-react';


const NewsLetter = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ loading: false, success: false, error: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: '' });

    try {
      await createEmailSub({ email });
      setStatus({ loading: false, success: true, error: '' });
      setEmail('');
    } catch (err) {
      setStatus({
        loading: false,
        success: false,
        error: err?.response?.data?.message || err?.message || 'Failed to subscribe. Please try again.',
      });
    }
  };

  return (
    <section className="w-full py-section-gap bg-surface-container-low">
      <div className="max-w-[800px] mx-auto px-margin-desktop text-center">
        <span className="text-secondary font-label-caps text-label-caps tracking-[0.2em]">
          JOIN OUR WORLD
        </span>
        <h3 className="font-headline-md text-headline-md mt-4 mb-8 italic">
          Receive our weekly curation of style and substance.
        </h3>

        {status.success ? (
          <div className="p-4 rounded-xl bg-primary/10 border border-primary/30 max-w-md mx-auto">
            <p className="text-primary font-body-md font-medium">
              Thank you for subscribing! 
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto">
            <input
              className="flex-grow bg-transparent border px-3 rounded-lg border-outline text-body-md py-2 focus:outline-none focus:border-primary placeholder:font-label-caps placeholder:text-[12px] tracking-widest"
              placeholder="YOUR EMAIL ADDRESS"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              disabled={status.loading}
              className="font-label-caps text-label-caps bg-primary text-on-primary px-8 py-4 sm:py-3
              rounded-lg tracking-widest hover:opacity-90 transition-opacity whitespace-nowrap disabled:opacity-60"
            >
              {status.loading ?
              (<span className="flex items-center gap-2">
                <Loader2 size={14} className="animate-spin" /> Subscribing...
              </span>):(
              'SUBSCRIBE NOW'
               )
               }
            </button>
          </form>
        )}

        {status.error && (
          <p className="text-red-500 text-xs mt-3">{status.error}</p>
        )}
      </div>
    </section>
  );
};

export default NewsLetter;