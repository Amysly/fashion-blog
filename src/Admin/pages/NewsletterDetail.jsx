import React from 'react'
import {Send, MoreVertical} from 'lucide-react';

const NewsletterDetail = () => {
  return (
    <div>
      {/* Subscriber Signups Panel */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <h3 className="text-lg font-bold text-[#0a1128]">Newsletter Subscribers</h3>
                    <p className="text-slate-500 text-xs mt-0.5">Latest signups</p>
                  </div>
                  <button className="text-slate-400 hover:text-slate-600">
                    <MoreVertical size={18} />
                  </button>
                </div>

                <div className="mt-4 divide-y divide-slate-100">
                  <div className="py-3 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-800">sophia.loren@gmail.com</p>
                      <span className="text-xs text-slate-400">Aug 3, 2026</span>
                    </div>
                    <span className="text-xs font-semibold px-2 py-1 bg-slate-100 text-slate-600 rounded">Active</span>
                  </div>
                  <div className="py-3 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-800">marcus.v@fashionweek.com</p>
                      <span className="text-xs text-slate-400">Aug 2, 2026</span>
                    </div>
                    <span className="text-xs font-semibold px-2 py-1 bg-slate-100 text-slate-600 rounded">Active</span>
                  </div>
                  <div className="py-3 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-800">elena.style@outlook.com</p>
                      <span className="text-xs text-slate-400">Aug 1, 2026</span>
                    </div>
                    <span className="text-xs font-semibold px-2 py-1 bg-slate-100 text-slate-600 rounded">Active</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <button className="w-full py-2.5 bg-[#001f54] text-white rounded-xl text-sm font-medium hover:bg-[#034078] transition-colors flex items-center justify-center gap-2">
                  <Send size={16} />
                  <span>Send Newsletter Campaign</span>
                </button>
              </div>
            </div>
    </div>
  )
}

export default NewsletterDetail
