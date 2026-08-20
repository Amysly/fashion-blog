import React from 'react';
import { Image as ImageIcon, Edit, Trash2, Loader2 } from 'lucide-react';

const AdminTable = ({ 
  items = [], 
  loading = false, 
  deletingId = null, 
  onEdit = () => {}, 
  onDelete = () => {}, 
  showPrice = false,
  secondColumnHeader = showPrice ? 'Price' : 'Description / Category',
  secondColumnKey = showPrice ? 'price' : 'description'
}) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        {loading ? (
          <div className="p-6 text-sm text-slate-500 flex items-center gap-2">
            <Loader2 size={16} className="animate-spin text-[#034078]" />
            <span>Loading catalog...</span>
          </div>
        ) : (items?.length ?? 0) === 0 ? (
          <p className="p-6 text-sm text-slate-500">No items found.</p>
        ) : (
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-xs tracking-wider">
                <th className="py-4 px-6">Image</th>
                <th className="py-4 px-6">Name</th>
                <th className="py-4 px-6">{secondColumnHeader}</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {items.map((item) => (
                <tr key={item._id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center text-slate-400">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name || item.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <ImageIcon size={20} />
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6 font-medium text-[#0a1128] whitespace-nowrap">
                    {item.name || item.title}
                  </td>
                  <td className="py-4 px-6">
                    {showPrice ? (
                      <span className="font-semibold text-slate-700">
                        ₦{Number(item.price || 0).toLocaleString()}
                      </span>
                    ) : (
                      <p className="text-slate-600 max-w-xs truncate">
                        {item[secondColumnKey] || item.category || item.description || (
                          <span className="text-slate-400 italic">N/A</span>
                        )}
                      </p>
                    )}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => onEdit(item)}
                        className="p-2 text-slate-500 hover:text-[#034078] hover:bg-slate-100 rounded-lg transition-colors"
                        title="Edit Item"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={() => onDelete(item._id)}
                        disabled={deletingId === item._id}
                        className="p-2 text-slate-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                        title="Delete Item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminTable;