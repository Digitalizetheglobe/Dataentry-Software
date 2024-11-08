// import React, { useEffect, useState } from 'react';
// import { jwtDecode } from 'jwt-decode'; 
// import Sidebar from '../Sidebar/Sidebar';


// const Dashboard = () => {
//   const [branchId, setBranchId] = useState('');

//   useEffect(() => {
//     const token = localStorage.getItem('token');

//     if (token) {
//       const decodedToken = jwtDecode(token);
//       setBranchId(decodedToken.branch_id);
//     }
//   }, []);

//   return (
//     <>
//     <Sidebar/>
//     <div>
//       {branchId ? (
//         <h1>Welcome, {branchId}</h1>
//       ) : (
//         <h1>Welcome, Branch User</h1>
//       )}
//     </div>
//     </>
//   );
// };

// export default Dashboard;


import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import Sidebar from '../Sidebar/Sidebar';
import user from '../assets/file-plus-02.png'
import amount from '../assets/profile-2user.png'
import amountentry from '../assets/Icon.png'
import YearlyFinancialActivity from './YearlyFinancialActivity.js';
import BankWiseDeposit from './BankWiseDeposit.js';

const Dashboard = () => {
  const [branchId, setBranchId] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      setBranchId(decodedToken.branch_id);
    }
  }, []);

  return (
    <>
      <div className="flex bg-blue-900">
        {/* Sidebar */}
        <Sidebar className="fixed h-full w-60 bg-blue-900 text-white" />

        {/* Dashboard Content */}
        <div className="ml-60 p-6 bg-gray-100 min-h-screen w-full">
          <div className="flex justify-between items-center mb-8 ml-20">
            <h1 className="text-2xl font-bold">
              {branchId ? `Welcome, ${branchId}` : 'Welcome, Branch User'}
            </h1>
          </div>

          {/* Cards Container */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 ml-20 mt-10">
            {/* Card 1: Deposit */}
            <div className="bg-[#f4e3c1] p-4 rounded-lg shadow-lg flex flex-col items-start">
              <h2 className="text-sm font-semibold text-black-900 mb-2">Deposit</h2>
              <p className="text-3xl font-bold text-[#001A3B] mb-1">$7,265</p>
              <p className="text-xs text-green-600 flex items-center">
                +11.01% <span className="ml-1">↗</span>
              </p>
            </div>

            {/* Card 2: Withdrawal */}
            <div className="bg-[#e3f1ff] p-4 rounded-lg shadow-lg flex flex-col items-start">
              <h2 className="text-sm font-semibold text-black-900 mb-2">Withdrawal</h2>
              <p className="text-3xl font-bold text-[#001A3B] mb-1">$3,671</p>
              <p className="text-xs text-red-600 flex items-center">
                -0.03% <span className="ml-1">↘</span>
              </p>
            </div>

            {/* Card 3: New Users Added */}
            <div className="bg-[#fce3d4] p-4 rounded-lg shadow-lg flex flex-col items-start">
              <h2 className="text-sm font-semibold text-black-900 mb-2">New User Added</h2>
              <p className="text-3xl font-bold text-[#001A3B] mb-1">156</p>
              <p className="text-xs text-green-600 flex items-center">
                +15.03% <span className="ml-1">↗</span>
              </p>
            </div>

            {/* Card 4: Total Entries */}
            <div className="bg-[#d3dce4] p-4 rounded-lg shadow-lg flex flex-col items-start">
              <h2 className="text-sm font-semibold text-black-900 mb-2">Total Entries</h2>
              <p className="text-3xl font-bold text-[#001A3B] mb-1">2,318</p>
              <p className="text-xs text-green-600 flex items-center">
                +6.08% <span className="ml-1">↗</span>
              </p>
            </div>
          </div>


          <div className="grid grid-cols-5 grid-rows-5 gap-4 ml-20 mt-10">
            {/* Main graph section */}
            <div className="col-span-4 row-start-2 bg-white rounded-lg shadow-lg p-6" style={{ marginTop: '-178px' }}>
              <div className="flex items-center gap-4 mb-4">
                <div className="font-bold">This Week</div>
                <div className="text-gray-500">This Month</div>
                <div className="text-gray-500">Select date</div>
                <div className="ml-auto flex gap-4 text-sm">
                  <div className="text-[#001A3B] font-bold">• Deposit Amount</div>
                  <div className="text-[#D4A373] font-bold">• Withdrawal Amount</div>
                </div>
              </div>
              {/* Graph placeholder */}
              <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">
                Graph Section
              </div>
            </div>

            {/* Right box for Top Contributors */}
            <div className="row-span-2 col-start-5 bg-white rounded-lg shadow-lg p-4">
              <h2 className="font-bold text-lg mb-4">Top Contributors</h2>
              <p className="text-gray-500 mb-2">Users with the highest entries</p>
              <ul className="space-y-2">
                {[1, 2, 3, 4, 5].map((rank) => (
                  <li
                    key={rank}
                    className="flex items-center justify-between bg-gray-100 rounded-full p-2"
                  >
                    <div className="text-sm font-medium">Name Surname</div>
                    <div className={`w-4 h-4 rounded-full ${rank === 1 ? 'bg-[#001A3B]' : 'bg-gray-800'}`}></div>
                  </li>
                ))}
              </ul>
            </div>



          </div>
          {/* Bank-wise Deposit Section */}
          <div className="bg-white p-6 rounded-lg shadow-lg mt-10 ml-20" style={{ marginTop: '-479px' }}>
            <div className="flex items-center justify-between mb-4">
              {/* Header Links */}
              <div className="flex space-x-6 text-sm font-medium">
                <span className="text-[#001A3B] border-b-2 border-[#001A3B] pb-1 cursor-pointer">Bank wise Deposit</span>
                <span className="text-gray-500 cursor-pointer">Branch wise Deposit</span>
                <span className="text-gray-500 cursor-pointer">Branch wise withdrawal</span>
                <span className="text-gray-500 cursor-pointer">Bank wise withdrawal</span>
              </div>
              {/* Options Icon */}
              <div className="text-gray-400 cursor-pointer">...</div>
            </div>

            {/* Graph Container */}
            <div className="flex items-end justify-between mt-10">
              {/* Placeholder for the bar elements */}
              {Array.from({ length: 12 }).map((_, index) => (
                <div
                  key={index}
                  className={`w-8 rounded-lg ${index === 4 ? 'bg-gradient-to-b from-[#001A3B] to-[#243B55] h-32' : 'bg-[#f4e3c1] h-24'} relative flex justify-center`} style={{width:'52px'}}
                >
                  {index === 4 && (
                    <div className="absolute -top-6 bg-[#001A3B] text-white text-xs py-1 px-2 rounded-lg">
                      243K
                    </div>
                  )}
                  <p className="text-xs text-gray-600 mt-2" style={{ fontSize: '8px' }}>Bank {index + 1}</p>
                </div>
              ))}
            </div>
          </div>

          {/* <BankWiseDeposit /> */}
          <YearlyFinancialActivity/>
          {/* end */}
        </div>
      </div>
      
    </>
  );
};

export default Dashboard;
