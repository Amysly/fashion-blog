import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import SideBar from '../components/SideBar'

const AdminMainlayout = () => {
  return (
     <div className="min-h-screen flex">
      <SideBar />

      <div className="flex-1 flex flex-col">
        <Header />
        <Outlet />
      </div>
    </div>
  )
}

export default AdminMainlayout
