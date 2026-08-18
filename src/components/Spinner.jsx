import React from 'react';
import { Loader2 } from 'lucide-react';

const Spinner = ({ label = 'Loading...', size = 24 }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12">
      <Loader2 size={size} className="animate-spin text-[#034078]" />
      {label && <p className="text-sm text-slate-500">{label}</p>}
    </div>
  );
};

export default Spinner;