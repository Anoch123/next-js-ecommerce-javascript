"use client";

import { SideBarMenus } from '@/utils';
import React, { useState } from 'react'
import { useRouter } from "next/navigation";

const Sidebar = () => {
    const [open, setOpen] = useState(false);

    const router = useRouter();
    
  return (
    <div className='flex'>
      <div
        className={` ${
          open ? "w-52" : "w-20 "
        } bg-dark-purple h-screen p-5  pt-8 relative duration-300`}
      >
        <img
          src="../control.png"
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">
          <img
            src="../logo.png"
            className={`cursor-pointer duration-500 ${
              open && "rotate-[360deg]"
            }`}
          />
        </div>
        <ul className="pt-6">
        {SideBarMenus.map((Menu, index) => (
          <li
            key={index}
            className={`flex items-center rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm ${
              Menu.gap ? "mt-9" : "mt-2"
            } ${index === 0 && "bg-light-white"}`}
          >
            <a href="#" onClick={() => router.push(Menu.href)} className="flex items-center gap-2">
              <img src={`../${Menu.src}.png`} alt={Menu.title} className="w-6 h-6" />
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                {Menu.title}
              </span>
            </a>
          </li>
        ))}
        </ul>
      </div>
    </div>
    
  )
}

export default Sidebar