import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import Sidebar from '../Sidebar/Sidebar';
import user from '../assets/file-plus-02.png';
import amount from '../assets/profile-2user.png';
import amountentry from '../assets/Icon.png';
import YearlyFinancialActivity from './YearlyFinancialActivity.js';
import BankWiseDeposit from './BankWiseDeposit.js';
import BranchSidebar from '../Sidebar/BranchSidebar.js';


const BranchDashobard =() => {
     const [branchId, setBranchId] = useState('');
      const [darkMode, setDarkMode] = useState(false);
    
      useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
          const decodedToken = jwtDecode(token);
          setBranchId(decodedToken.branch_id);
        }
      }, []);
    
      const toggleDarkMode = () => setDarkMode(!darkMode);
  return (
    <>
    <div className={darkMode ? "dark" : ""}>
      <div className="flex bg-blue-900 dark:bg-gray-900">
        {/* Sidebar */}
        <BranchSidebar className="fixed h-full w-60 bg-blue-900 text-white dark:bg-gray-800" />

        {/* Dashboard Content */}
        <div className="ml-60 p-6 bg-gray-100 dark:bg-gray-800 min-h-screen w-full text-gray-900 dark:text-gray-200">
          <div className="flex justify-between items-center mb-8 ml-20">
            <h1 className="text-2xl font-bold">
              {branchId ? `Welcome, ${branchId}` : 'Welcome, Branch User'}
            </h1>
            <button 
              onClick={toggleDarkMode} 
              className="px-4 py-2 bg-[#001A3B] dark:bg-blue-300 text-white dark:text-black rounded-lg"
            >
              {darkMode ? 'Light' : 'Dark'} Mode
            </button>
          </div>

          {/* Cards Container */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 ml-20 mt-10">
            {/* Card 1: Deposit */} 

            <div className="bg-[#E0D7C8] dark:bg-gray-700 p-4 rounded-lg shadow-lg flex flex-col items-start">
              <h2 className="text-sm font-semibold text-black-900 dark:text-gray-100 mb-2">Deposit</h2>
              <p className="text-3xl font-bold text-[#001A3B] dark:text-gray-200 mb-1">$7,265</p>
              <p className="text-xs text-green-600 flex items-center">
                +11.01% <span className="ml-1">↗</span>
              </p>
            </div>

            {/* Card 2: Withdrawal */}

            <div className="bg-[#E6F1FD] dark:bg-gray-700 p-4 rounded-lg shadow-lg flex flex-col items-start">
              <h2 className="text-sm font-semibold text-black-900 dark:text-gray-100 mb-2">Withdrawal</h2>
              <p className="text-3xl font-bold text-[#001A3B] dark:text-gray-200 mb-1">$3,671</p>
              <p className="text-xs text-red-600 flex items-center">
                -0.03% <span className="ml-1">↘</span>
              </p>
            </div>

            {/* Card 3: New Users Added */}

            <div className="bg-[#E0D7C866] dark:bg-gray-700 p-4 rounded-lg shadow-lg flex flex-col items-start">
              <h2 className="text-sm font-semibold text-black-900 dark:text-gray-100 mb-2">New User Added</h2>
              <p className="text-3xl font-bold text-[#001A3B] dark:text-gray-200 mb-1">156</p>
              <p className="text-xs text-green-600 flex items-center">
                +15.03% <span className="ml-1">↗</span>
              </p>
            </div>

            {/* Card 4: Total Entries */}

            <div className="bg-[#475A7233] dark:bg-gray-700 p-4 rounded-lg shadow-lg flex flex-col items-start">
              <h2 className="text-sm font-semibold text-black-900 dark:text-gray-100 mb-2">Total Entries</h2>
              <p className="text-3xl font-bold text-[#001A3B] dark:text-gray-200 mb-1">2,318</p>
              <p className="text-xs text-green-600 flex items-center">
                +6.08% <span className="ml-1">↗</span>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-5 grid-rows-5 gap-4 ml-20 mt-10">
            {/* Main graph section */}
            <div className="col-span-4 row-start-2 bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6" style={{ marginTop: '-178px' }}>
              <div className="flex items-center gap-4 mb-4">
                <div className="font-bold dark:text-gray-100">This Week</div>
                <div className="text-gray-500 dark:text-gray-300">This Month</div>
                <div className="text-gray-500 dark:text-gray-300">Select date</div>
                <div className="ml-auto flex gap-4 text-sm">
                  <div className="text-[#001A3B] dark:text-gray-200 font-bold">• Deposit Amount</div>
                  <div className="text-[#D4A373] dark:text-gray-200 font-bold">• Withdrawal Amount</div>
                </div>
              </div>
              {/* Graph placeholder */}
              <div className="h-48 bg-gray-100 dark:bg-gray-600 rounded-lg flex items-center justify-center text-gray-500 dark:text-gray-300">
                Graph Section
              </div>
            </div>

            {/* Right box for Top Contributors */}
            <div className="row-span-2 col-start-5 bg-white dark:bg-gray-700 rounded-lg shadow-lg p-2" style={{ marginTop: '-22px' }}>
              <h2 className="font-bold text-m mb-4 dark:text-gray-100">Top Contributors</h2>
              <p className="text-gray-500 dark:text-gray-300 text-m mb-2" style={{ fontSize: '14px' }}>Users with the highest entries</p>
              <ul className="space-y-2">
                {[1, 2, 3, 4, 5].map((rank) => (
                  <li
                    key={rank}
                    className="flex items-center justify-between bg-gray-100 dark:bg-gray-600 rounded-full p-2"
                  >
                    <div className="text-sm font-medium dark:text-gray-200">SKY - 20</div>
                    <div className={`w-4 h-4 rounded-full ${rank === 1 ? 'bg-[#001A3B]' : 'bg-gray-800'}`}></div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bank-wise Deposit Section */}
          <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg mt-10 ml-20" style={{ marginTop: '-411px' }}>
            <div className="flex items-center justify-between mb-4">
              {/* Header Links */}
              <div className="flex space-x-6 text-sm font-medium">
                <span className="text-[#001A3B] dark:text-gray-200 border-b-2 border-[#001A3B] dark:border-gray-200 pb-1 cursor-pointer">Bank wise Deposit</span>
                <span className="text-gray-500 dark:text-gray-300 cursor-pointer">Branch wise Deposit</span>
                <span className="text-gray-500 dark:text-gray-300 cursor-pointer">Branch wise withdrawal</span>
                <span className="text-gray-500 dark:text-gray-300 cursor-pointer">Bank wise withdrawal</span>
              </div>
              {/* Options Icon */}
              <div className="text-gray-400 dark:text-gray-300 cursor-pointer">...</div>
            </div>

            {/* Graph Container */}
            <div className="flex items-end justify-between mt-10">
              {/* Placeholder for the bar elements */}
              {Array.from({ length: 12 }).map((_, index) => (
                <div
                  key={index}
                  className={`w-8 rounded-lg ${index === 4 ? 'bg-gradient-to-b from-[#001A3B] to-[#243B55] h-32 dark:from-gray-500 dark:to-gray-700' : 'bg-[#f4e3c1] dark:bg-gray-600 h-24'} relative flex justify-center`}
                  style={{ width: '52px' }}
                >
                  {index === 4 && (
                    <div className="absolute -top-6 bg-[#001A3B] dark:bg-gray-800 text-white text-xs py-1 px-2 rounded-lg">
                      243K
                    </div>
                  )}
                  <p className="text-xs text-gray-600 dark:text-gray-300 mt-2" style={{ fontSize: '8px' }}>Bank {index + 1}</p>
                </div>
              ))}
            </div>
          </div>

          <YearlyFinancialActivity />
        </div>
      </div>
    </div>
  </>
  )
}

export default BranchDashobard