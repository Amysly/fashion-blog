import React from 'react'
import Main from './Main'
const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex font-sans">
        <div className="flex-1 flex flex-col min-w-0">
            <Main/>
        </div>
    </div>
  )
}

export default AdminDashboard
