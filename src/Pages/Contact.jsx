import React, { useState } from 'react';
import {messageContact} from '../api/contactMessage';
import { 
  HiOutlineMail, 
  HiOutlineSparkles, 
  HiOutlineLocationMarker, 
  HiOutlineChatAlt2,
  HiCheckCircle,
  HiExclamationCircle
} from 'react-icons/hi';
import { 
  FaInstagram, 
  FaPinterestP, 
  FaTiktok 
} from 'react-icons/fa';

const SUBJECT_DATA = [
 'Brand Collaboration and Sponsorship',
  'General Inquiry'
];


const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: '' });

    try {
      await messageContact(formData);
      
      setStatus({ loading: false, success: true, error: '' });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setStatus({
        loading: false,
        success: false,
        error: err?.message || 'Failed to send message. Please try again later.',
      });
    }
  };

  const contactChannels = [
    {
      icon: <HiOutlineMail className="text-2xl text-primary" />,
      title: "General Inquiries",
      detail: "hello@thestyleparlor.com",
      description: "Questions regarding our posts, style guides, or site content."
    },
    {
      icon: <HiOutlineSparkles className="text-2xl text-primary" />,
      title: "Press & Partnerships",
      detail: "partnerships@thestyleparlor.com",
      description: "Brand collaborations, editorial features, and PR requests."
    },
    {
      icon: <HiOutlineLocationMarker className="text-2xl text-primary" />,
      title: "Studio Location",
      detail: "Lagos & Abuja",
      description: "Editorial team based across Nigeria."
    }
  ];

  return (
    <div className="bg-background min-h-screen text-on-surface">
      <section className="max-w-[1200px] mx-auto px-6 pt-16 pb-12 text-center">
        <span className="text-secondary font-label-caps text-xs tracking-[0.25em] uppercase">
          GET IN TOUCH
        </span>
        <h1 className="font-headline-md text-3xl md:text-5xl font-bold mt-4 mb-6 leading-tight max-w-2xl mx-auto">
          We’d Love to Hear From You
        </h1>
        <p className="text-on-surface-variant font-body-md text-base md:text-lg max-w-xl mx-auto leading-relaxed">
          Have a question, feedback on an article, or interested in collaborating with The Style Parlor? Drop us a line below.
        </p>
      </section>

      <section className="max-w-[1200px] mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-6">
              {contactChannels.map((channel, idx) => (
                <div 
                  key={idx}
                  className="bg-surface-variant/20 border border-outline-variant/30 rounded-2xl p-6 transition-all hover:border-outline-variant/60"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-surface-variant/40 flex items-center justify-center shrink-0">
                      {channel.icon}
                    </div>
                    <div>
                      <h3 className="font-headline-sm text-lg font-bold">
                        {channel.title}
                      </h3>
                      <p className="text-primary font-label-caps text-xs tracking-wider uppercase font-semibold my-1">
                        {channel.detail}
                      </p>
                      <p className="text-on-surface-variant text-xs leading-relaxed">
                        {channel.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-surface-variant/10 border border-outline-variant/30 rounded-2xl p-6">
              <h3 className="font-headline-sm text-base font-bold mb-2">
                Follow The Parlor
              </h3>
              <p className="text-on-surface-variant text-xs mb-4">
                Join our community across social platforms for daily style curation.
              </p>
              <div className="flex items-center gap-3">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-surface-variant/40 flex items-center justify-center text-on-surface hover:bg-primary hover:text-on-primary transition-colors"
                  aria-label="Instagram"
                >
                  <FaInstagram className="text-base" />
                </a>
                <a
                  href="https://pinterest.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-surface-variant/40 flex items-center justify-center text-on-surface hover:bg-primary hover:text-on-primary transition-colors"
                  aria-label="Pinterest"
                >
                  <FaPinterestP className="text-base" />
                </a>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-surface-variant/40 flex items-center justify-center text-on-surface hover:bg-primary hover:text-on-primary transition-colors"
                  aria-label="TikTok"
                >
                  <FaTiktok className="text-base" />
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-background border border-outline-variant/40 rounded-3xl p-8 md:p-10 delicate-shadow">
            <h2 className="font-headline-md text-2xl font-bold mb-2">
              Send Us a Message
            </h2>
            <p className="text-on-surface-variant text-xs font-label-caps tracking-wider uppercase mb-8">
              We typically respond within 24 to 48 hours.
            </p>

            {status.error && (
              <div className="mb-6 p-4 rounded-xl bg-error/10 border border-error/30 text-error flex items-center gap-3 text-sm">
                <HiExclamationCircle className="text-xl shrink-0" />
                <span>{status.error}</span>
              </div>
            )}

            {status.success ? (
              <div className="bg-surface-variant/30 border border-primary/30 rounded-2xl p-8 text-center space-y-4 my-8">
                <HiCheckCircle className="text-5xl text-primary mx-auto" />
                <h3 className="font-headline-sm text-2xl font-bold text-on-surface">
                  Message Sent!
                </h3>
                <p className="text-on-surface-variant text-sm max-w-md mx-auto">
                  Thank you for reaching out. A member of The Style Parlor team will get back to you shortly.
                </p>
                <button
                  onClick={() => setStatus({ ...status, success: false })}
                  className="mt-4 bg-primary text-on-primary px-6 py-2.5 rounded-xl font-label-caps text-xs tracking-widest uppercase hover:bg-opacity-90 transition-opacity"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-xs font-label-caps tracking-widest text-on-surface uppercase font-bold">
                      Your Name <span className="text-primary">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Jane Doe"
                      className="w-full bg-surface-variant/20 border border-outline-variant/40 rounded-xl px-4 py-3 text-sm text-on-surface focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-xs font-label-caps tracking-widest text-on-surface uppercase font-bold">
                      Email Address <span className="text-primary">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="jane@example.com"
                      className="w-full bg-surface-variant/20 border border-outline-variant/40 rounded-xl px-4 py-3 text-sm text-on-surface focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="block text-xs font-label-caps tracking-widest text-on-surface uppercase font-bold">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full bg-surface-variant/20 border border-outline-variant/40 rounded-xl px-4 py-3 text-sm text-on-surface focus:outline-none focus:border-primary transition-colors cursor-pointer"
                  >
                    <option value=""></option>
                    {SUBJECT_DATA.map((subject) => (
                      <option key={subject} value={subject}>
                        {subject}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="block text-xs font-label-caps tracking-widest text-on-surface uppercase font-bold">
                    Message <span className="text-primary">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="How can we help you today?"
                    className="w-full bg-surface-variant/20 border border-outline-variant/40 rounded-xl px-4 py-3 text-sm text-on-surface focus:outline-none focus:border-primary transition-colors resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={status.loading}
                  className="w-full bg-primary text-on-primary py-4 rounded-xl font-label-caps text-xs tracking-widest uppercase font-bold hover:bg-opacity-90 disabled:opacity-50 transition-opacity delicate-shadow flex items-center justify-center gap-2"
                >
                  {status.loading ? (
                    <span className="animate-pulse">SENDING MESSAGE...</span>
                  ) : (
                    <>
                      SEND MESSAGE <HiOutlineChatAlt2 className="text-base" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>
      </section>
    </div>
  );
};

export default Contact;