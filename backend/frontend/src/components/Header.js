import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { MdLogout } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../actions/userActions'
import { useProSidebar } from "react-pro-sidebar";
import { GiHamburgerMenu } from 'react-icons/gi';

function Header({setCurrentLocation, currentLocation}) {
  const { collapseSidebar } = useProSidebar();
  const [show, setShow] = useState(false)
  const dispatch = useDispatch()
  const location = useLocation()
  const userLogin = useSelector(state => state.userLogin)
  const { loading, error, userInfo } = userLogin
  useEffect(() => {
    setCurrentLocation(location.pathname)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])
  return (
    <div className={`border-b w-full px-6 py-4 items-center flex flex-row justify-end`}>

        {userInfo && <GiHamburgerMenu className='mr-auto hover:cursor-pointer h-8 w-8 text-gray-500' onClick={() => collapseSidebar()}/>}
        {/* {(!loading && !error && userInfo) && <span className="text-sm">{userInfo.username}</span>} */}
        {(currentLocation!=='/' && currentLocation!=='/register' && currentLocation!=='/reset') &&
        <div className="relative inline-block text-left">
          <div>
            <button onClick={()=>setShow(!show)} type="button" className="inline-flex w-full justify-center items-center rounded-md bg-transparent px-4 py-0 font-normal text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100" id="menu-button" aria-expanded="true" aria-haspopup="true">
              {userInfo?.name}
              {/* <!-- Heroicon name: mini/chevron-down --> */}
              <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          {/* <!--
            Dropdown menu, show/hide based on menu state.

            Entering: "transition ease-out duration-100"
              From: "transform opacity-0 scale-95"
              To: "transform opacity-100 scale-100"
            Leaving: "transition ease-in duration-75"
              From: "transform opacity-100 scale-100"
              To: "transform opacity-0 scale-95"
          --> */}
          {show && <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
            <div className="py-1" role="none">
              {/* <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" --> */}
              <Link to="/profile" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-0">Account settings</Link>
              <Link to="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-1">Support</Link>
              <Link to="#" onClick={()=>dispatch(logout())} className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-2">Logout</Link>
              
            </div>
          </div>}
        </div>}
        
        

    </div>
  )
}

export default Header