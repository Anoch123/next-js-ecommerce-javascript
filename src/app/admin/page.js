import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import React from 'react'

const Admin = () => {
  return (
    <>
      <div className="flex">
        <Sidebar/>
        <div className="h-[150vh] md:h-[120vh] lg:h-[120vh] flex-1 p-7 bg-gray-100">
          Admin
        </div>
      </div>
    </>
  )
}

export default Admin