import React, { useState } from 'react';
import { ChevronFirst, ChevronLast, EllipsisVertical, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, NavLink } from 'react-router-dom';
import { useGlobalContext } from '../context/context';
const Sidebar = ({ children }) => {
  const { expanded, handleSetExpanded } = useGlobalContext();
  const [isOpen, setIsOpen] = useState(false);

  const handleSetIsOpen = () => {
    setIsOpen((prev) => !prev);
    console.log(isOpen);

  };
  return (
    <aside className='min-h-screen'>
      <nav className={`flex flex-col justify-between  border-r border-gray-200 shadow-xl p-4  h-full ${expanded ? "w-20" : "w-64"} transition-all duration-300 ease-linear`}>
        {/* Header part */}
        <div className='flex items-center justify-between mb-4 relative'>
          <div className='flex items-center gap-4 justify-center'>
            <img src="" alt="" className='rounded-full  bg-red-200 h-10 w-10' />
            <h2 className={`${expanded ? "hidden" : ""}`}>{
              expanded ? "" : "HMS Management"}</h2>
          </div>

          <button onClick={handleSetExpanded} className={`${expanded ? 'absolute -right-4' : ''}`}>
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
        <div className='flex items-center justify-between relative'>
          <img src="" alt="Logo" />
          <div className={`${expanded ? "hidden" : "text-xs"}`}>
            <h2>username</h2>
            <p>Jannoelpaed@gmail.com</p>
          </div>

          <div className='absolute bottom-10 -right-6 px-6 py-2  '>
            {
              isOpen ? <div className='flex flex-col justify-end items-center space-y-2 border px-2 py-2'>
                <Button variant="outline">

                  <Link> Settings</Link>
                </Button>
                <Button variant="outline">

                  <Link>  Logout</Link>
                </Button>
              </div> : ""
            }
          </div>
          <button onClick={handleSetIsOpen}>
            {
              isOpen ? <X /> : <EllipsisVertical />
            }
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
    <NavLink
      to={to}
      className="flex items-center lg:space-x-2 rounded-lg justify-between transition-colors duration-500 my-3 relative"
    >
      <div
        className={`relative flex items-center group w-full px-3 py-2 rounded-md ${expanded ? "justify-center" : "justify-start space-x-2"
          }`}
      >
        {/* Background hover effect */}
        <span className="absolute top-0 left-0 h-full w-0 bg-blue-200 transition-all duration-500 ease-in-out group-hover:w-full origin-left rounded-lg"></span>

        {/* Icon */}
        <span className="relative z-10 group-hover:text-blue-800 duration-500 transition-colors">
          {icon}
        </span>

        {/* Text (when sidebar is not expanded) */}
        {!expanded && (
          <span className="relative z-10 text-sm font-semibold group-hover:text-blue-800 duration-500 transition-colors">
            {text}
          </span>
        )}

        {/* Active indicator dot (only show when not expanded) */}
        {active && !expanded && (
          <div className="absolute w-2 h-2 bg-blue-600 rounded-xl right-2"></div>
        )}

        {/* Tooltip - MOVED OUTSIDE of active condition */}
        {expanded && (
          <div className="absolute left-full rounded-md px-2 py-1 ml-6 bg-blue-500 text-white text-sm invisible opacity-0 -translate-x-3 transition-all duration-300 group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 z-50 whitespace-nowrap shadow-lg">
            {text}
          </div>
        )}
      </div>
    </NavLink>
  );
};