import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import SideBar from '../components/SideBar';

const AdminMainlayout = () => {
  return (
    <div className="min-h-screen flex bg-slate-50">
      <SideBar />

      <div className="flex-1 flex flex-col min-w-0 pt-16 lg:pt-0">
        <Header />
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminMainlayout;