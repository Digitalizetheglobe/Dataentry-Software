import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineForm, AiOutlineReconciliation, AiOutlineTransaction } from 'react-icons/ai';
import { FaFileAlt, FaExchangeAlt } from 'react-icons/fa';
import { AiFillFileText } from 'react-icons/ai'; // Report icon
import { AiOutlineArrowRight } from 'react-icons/ai'; // Inter Bank Transfer icon
import { AiOutlineUserAdd } from 'react-icons/ai'; // User Registration icon
import { AiOutlineBook } from 'react-icons/ai';
import './Sidebar.css'

const Sidebar = () => {
  const [isOpenReconciliation, setIsOpenReconciliation] = useState(true); // Open by default
  const [isOpenTransaction, setIsOpenTransaction] = useState(true); // Open by default
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleReconciliation = () => {
    setIsOpenReconciliation((prev) => !prev);
  };

  const toggleTransaction = () => {
    setIsOpenTransaction((prev) => !prev);
  };

  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <nav className="bg-[#001A3B] shadow-lg h-screen fixed top-0 left-0 min-w-[250px] py-6 px-4 overflow-auto">
      
      {/* <button
        onClick={toggleSidebar}
        className="text-white mb-6 focus:outline-none"
      >
        {isCollapsed ? '>' : '<'}
      </button> */}

      <ul className="mt-8">
        <li>
          <Link
            className="text-black hover:text-blue-600 text-sm flex items-center hover:bg-gray-500 rounded px-4 py-3"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              className="w-[18px] h-[18px] mr-4"
              viewBox="0 0 512 512"
            >
              <path d="M197.332 170.668h-160C16.746 170.668 0 153.922 0 133.332v-96C0 16.746 16.746 0 37.332 0h160c20.59 0 37.336 16.746 37.336 37.332v96c0 20.59-16.746 37.336-37.336 37.336zM37.332 32A5.336 5.336 0 0 0 32 37.332v96a5.337 5.337 0 0 0 5.332 5.336h160a5.338 5.338 0 0 0 5.336-5.336v-96A5.337 5.337 0 0 0 197.332 32zm160 480h-160C16.746 512 0 495.254 0 474.668v-224c0-20.59 16.746-37.336 37.332-37.336h160c20.59 0 37.336 16.746 37.336 37.336v224c0 20.586-16.746 37.332-37.336 37.332zm-160-266.668A5.337 5.337 0 0 0 32 250.668v224A5.336 5.336 0 0 0 37.332 480h160a5.337 5.337 0 0 0 5.336-5.332v-224a5.338 5.338 0 0 0-5.336-5.336zM474.668 512h-160c-20.59 0-37.336-16.746-37.336-37.332v-96c0-20.59 16.746-37.336 37.336-37.336h160c20.586 0 37.332 16.746 37.332 37.336v96C512 495.254 495.254 512 474.668 512zm-160-138.668a5.338 5.338 0 0 0-5.336 5.336v96a5.337 5.337 0 0 0 5.336 5.332h160a5.336 5.336 0 0 0 5.332-5.332v-96a5.337 5.337 0 0 0-5.332-5.336zm160-74.664h-160c-20.59 0-37.336-16.746-37.336-37.336v-224C277.332 16.746 294.078 0 314.668 0h160C495.254 0 512 16.746 512 37.332v224c0 20.59-16.746 37.336-37.332 37.336zM314.668 32a5.337 5.337 0 0 0-5.336 5.332v224a5.338 5.338 0 0 0 5.336 5.336h160a5.337 5.337 0 0 0 5.332-5.336v-224A5.336 5.336 0 0 0 474.668 32zm0 0" />
            </svg>
            {!isCollapsed && <span className='text-white'>Data Entry</span>}

          </Link>
        </li>
      </ul>

      <div className="mt-6">
        <div className="flex items-center cursor-pointer group" onClick={toggleReconciliation}>
          <AiOutlineReconciliation className="w-[18px] h-[18px] text-white mr-4" />
          {!isCollapsed && (
          <Link
          to='/reconciliation-management'
          className="text-white group-hover:text-white text-sm flex-1"
        >
          Reconciliation Management
        </Link>
          )}
           {!isCollapsed && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`w-3 fill-white transition-transform ${isOpenReconciliation ? 'rotate-180' : ''}`}
            viewBox="0 0 451.847 451.847"
          >
            <path d="M225.923 354.706c-8.098 0-16.195-3.092-22.369-9.263L9.27 151.157c-12.359-12.359-12.359-32.397 0-44.751 12.354-12.354 32.388-12.354 44.748 0l171.905 171.915 171.906-171.909c12.359-12.354 32.391-12.354 44.744 0 12.365 12.354 12.365 32.392 0 44.751L248.292 345.449c-6.177 6.172-14.274 9.257-22.369 9.257z" />
          </svg>
           )}
        </div>

        {isOpenReconciliation && !isCollapsed && (
          <ul className="space-y-1 mt-2 pl-4">
            <li>
              <Link
                to="/report-1"
                className="text-white hover:text-white transition-all text-sm flex items-center rounded-md px-4 py-3"
              >
                <AiFillFileText className="w-[18px] h-[18px] mr-4" />
                <span>Report-1</span>
              </Link>
            </li>
            <li>
              <Link
                to="/report-2"
                className="text-white hover:text-white transition-all text-sm flex items-center rounded-md px-4 py-3"
              >
                <AiFillFileText className="w-[18px] h-[18px] mr-4" />
                <span>Report-2</span>
              </Link>
            </li>
          </ul>
        )}
      </div>

      <div className="mt-6">
        <div className="flex cursor-pointer group" onClick={toggleTransaction}>
          <AiOutlineTransaction className="w-[18px] h-[18px] text-white " />
          {!isCollapsed && (
          <Link
          to='/transaction-data-entry'
          className="text-white group-hover:text-white text-sm  px-4 flex-1">Transaction Data Entry</Link>
        )}
          {!isCollapsed && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`w-3 fill-white transition-transform ${isOpenTransaction ? 'rotate-180' : ''}`}
            viewBox="0 0 451.847 451.847"
          >
            <path d="M225.923 354.706c-8.098 0-16.195-3.092-22.369-9.263L9.27 151.157c-12.359-12.359-12.359-32.397 0-44.751 12.354-12.354 32.388-12.354 44.748 0l171.905 171.915 171.906-171.909c12.359-12.354 32.391-12.354 44.744 0 12.365 12.354 12.365 32.392 0 44.751L248.292 345.449c-6.177 6.172-14.274 9.257-22.369 9.257z" />
          </svg>
          )}
        </div>

        {isOpenTransaction && !isCollapsed && (
          <ul className="space-y-1 mt-2 pl-4">
            <li>
              <Link
                to="/deposit"
                className="text-white hover:text-white transition-all text-sm flex items-center rounded-md px-4 py-3"
              >
                <FaExchangeAlt className="w-[18px] h-[18px] mr-4" />
                <span>Deposit</span>
              </Link>
            </li>
            <li>
              <Link
                to="/withdrawal"
                className="text-white hover:text-white transition-all text-sm flex items-center rounded-md px-4 py-3"
              >
                <FaExchangeAlt className="w-[18px] h-[18px] mr-4" />
                <span>Withdrawal</span>
              </Link>
            </li>
          </ul>
        )}
      </div>
     
        <>        
      <div className="mt-6 flex items-center">
        <AiFillFileText className="w-[18px] h-[18px] text-white " />
       
        <Link
        to='/report-management'
        className="text-white text-sm px-4">Report Management</Link>
      
      </div>
        
      <div className="mt-6 flex items-center">
        <AiOutlineArrowRight className="w-[18px] h-[18px] text-white " />
      
        <Link
        to='/inter-bank-transfer-management'
        className="text-white text-sm px-4">Inter Bank Transfer Management</Link>
      
      </div>

      <div className="mt-6 flex items-center">
        <AiOutlineUserAdd className="w-[18px] h-[18px] text-white " />
       
        <Link 
        to='/user-registration'
        className="text-white text-sm px-4">User Registration</Link>
      
      </div>

      <div className="mt-6 flex items-center">
        <AiOutlineBook className="w-[18px] h-[18px] text-white " />
        
        <Link to='/knowledge-center'
        className="text-white text-sm px-4">Knowledge Center</Link>
      
      </div>
      </>
      
    </nav>
  );
};

export default Sidebar;
