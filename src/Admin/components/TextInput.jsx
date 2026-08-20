import React from 'react';
import { Upload } from 'lucide-react';

const TextInput = ({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  name,
  accept,
  imagePreview,
  rows
}) => {
  return (
    <div>
      {label && (
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
          {label}
        </label>
      )}

      {type === 'file' ? (
        <label className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center bg-slate-50 cursor-pointer hover:bg-slate-100/50 transition-colors block relative">
          {imagePreview ? (
            <div className="flex flex-col items-center gap-2">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-20 h-20 object-cover rounded-xl border border-slate-200"
              />
              <p className="text-xs text-[#034078] font-medium">Click to change image</p>
            </div>
          ) : (
            <>
              <Upload size={24} className="mx-auto text-slate-400 mb-2" />
              <p className="text-xs text-slate-600 font-medium">
                Click to upload or drag & drop image
              </p>
              <p className="text-[10px] text-slate-400 mt-1">Supports JPG, PNG, WEBP</p>
            </>
          )}
          <input
            type="file"
            accept={accept}
            onChange={onChange}
            className="hidden"
          />
        </label>
      ) : rows ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows}
          className="w-full bg-slate-50 text-slate-800 text-sm rounded-xl px-4 py-2.5 border border-slate-200 focus:outline-none focus:border-[#034078] resize-none"
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full bg-slate-50 text-slate-800 text-sm rounded-xl px-4 py-2.5 border border-slate-200 focus:outline-none focus:border-[#034078]"
        />
      )}
    </div>
  );
};

export default TextInput;