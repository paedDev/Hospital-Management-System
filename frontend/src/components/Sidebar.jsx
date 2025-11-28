import React, { useState } from 'react';
import { ChevronFirst, ChevronLast, EllipsisVertical } from "lucide-react";
import { NavLink } from 'react-router-dom';
import { useGlobalContext } from '../context/context';
const Sidebar = ({ children }) => {
  const { expanded, handleSetExpanded } = useGlobalContext();
  const [open, setOpen] = useState(false);

  return (
    <aside className='h-screen'>
      <nav className={`flex flex-col justify-between  border-r border-gray-200 shadow-xl p-4  h-full ${expanded ? "w-20" : "w-64"} transition-all duration-300 ease-linear`}>
        {/* Header part */}
        <div className='flex items-center justify-between mb-4 relative'>
          <div className='flex items-center gap-4 justify-center'>
            <img src="" alt="" className='rounded-full  bg-red-200 h-10 w-10' />
            <h2>{
              expanded ? "" : "HMS Management"}</h2>
          </div>

          <button onClick={handleSetExpanded} className='absolute -right-16'>
            {
              expanded ? <ChevronLast /> : <ChevronFirst />
            }
          </button>
        </div>
        {/* Nav */}

        <ul className='flex-1 px-1 py-4'>
          {children}
        </ul>

        {/* Footer */}
        <div className='flex items-center justify-between'>
          <img src="" alt="Logo" />
          <div className={`${expanded ? "hidden" : "text-xs"}`}>
            <h2>username</h2>
            <p>Jannoelpaed@gmail.com</p>
          </div>
          <button>
            <EllipsisVertical />
          </button>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;


export const SideBarItem = ({ icon, text, active, alert, to }) => {
  const { expanded, handleSetExpanded } = useGlobalContext();
  return (
    <NavLink to={to}>
      <div
        className={`relative flex items-center group w-full px-3 py-2 rounded-md ${expanded ? "justify-center" : "justify-start space-x-2"
          }`}
      >
        <span className="relative z-10 group-hover:text-blue-800 duration-500 transition-colors">
          {icon}
        </span>
        {
          expanded ? '' : <span>{text}</span>
        }
      </div>
    </NavLink>
  );
};