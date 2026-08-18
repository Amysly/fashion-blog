import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { updateProfile } from '../../api/Auth';

export default function Settings() {
  const { user, setUser } = useAuth();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isPending, setIsPending] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async () => {
    setError('');
    setSuccess('');

    if (!formData.name || !formData.email) {
      setError('Name and email are required.');
      return;
    }

    setIsPending(true);
    try {
      const updatedUser = await updateProfile(formData);
      setUser(updatedUser);
      setSuccess('Profile updated successfully.');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 flex items-center justify-center p-4 md:p-8">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 space-y-6 w-full max-w-4xl">
        <div className="border-b border-slate-100 pb-4">
          <h2 className="text-2xl font-serif font-bold text-[#0a1128]">Admin Profile & Preferences</h2>
          <p className="text-slate-500 text-sm">Manage platform settings and sole administrator credentials</p>
        </div>

        {error && (
          <p className="text-red-500 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-2">
            {error}
          </p>
        )}
        {success && (
          <p className="text-emerald-600 text-sm bg-emerald-50 border border-emerald-200 rounded-lg px-4 py-2">
            {success}
          </p>
        )}

        <div className="space-y-6">
          <div className="flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-[#0a1128] text-white flex items-center justify-center font-serif text-2xl font-bold border-2 border-[#034078]">
              {formData.name ? formData.name.slice(0, 2).toUpperCase() : 'AD'}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-[#0a1128] mb-1">Admin Display Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#034078]"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#0a1128] mb-1">Admin Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#034078]"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <h3 className="text-lg font-bold text-[#0a1128] mb-3">Newsletter & Automated Settings</h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3">
                <input type="checkbox" defaultChecked className="w-4 h-4 text-[#034078] rounded border-slate-300 focus:ring-[#034078]" />
                <span className="text-sm text-slate-700">Send confirmation email automatically upon new subscription</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" defaultChecked className="w-4 h-4 text-[#034078] rounded border-slate-300 focus:ring-[#034078]" />
                <span className="text-sm text-slate-700">Receive email notification for new subscriber signups</span>
              </label>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="button"
              onClick={handleSave}
              disabled={isPending}
              className="px-6 py-2.5 bg-[#034078] hover:bg-[#001f54] text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
            >
              {isPending ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}