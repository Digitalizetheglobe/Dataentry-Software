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
    <div className="flex bg-blue-900">
      {/* Sidebar */}
      <Sidebar className="fixed h-full w-60 bg-blue-900 text-white" />

      {/* Dashboard Content */}
      <div className="ml-60 p-6 bg-gray-100 min-h-screen w-full">
        <div className="flex justify-between items-center mb-8 ml-20">
          <h1 className="text-2xl font-bold">
            {branchId ? `Welcome, ${branchId}` : 'Welcome, Branch User'}
          </h1>
          {/* <button className="bg-gray-200 rounded-lg p-2 text-gray-600">Select dates</button> */}
        </div>

        {/* Cards Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ml-20">
          {/* Card 1: Amount Deposited */}
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-row items-center space-x-4">
            <div className="bg-gray-100 rounded-full p-4 flex-shrink-0">
              <img src={amount} alt="Amount Icon" className="w-10 h-10" />
            </div>
            <div className="flex flex-col items-start">
              <h2 className="text-md font-semibold text-black-900">Amount Deposited</h2>
              <p className="text-4xl font-bold text-blue-900">5,423</p>
              {/* <p className="text-green-500 text-sm mt-1">↑ 16% this month</p> */}
            </div>
          </div>

          {/* Card 2: Total Entries */}
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-row items-center space-x-4">
            <div className="bg-gray-100 rounded-full p-4 flex-shrink-0">
              <img src={amountentry} alt="Entries Icon" className="w-10 h-10" />
            </div>
            <div className="flex flex-col items-start">
              <h2 className="text-md font-semibold text-black-900">Total Entries</h2>
              <p className="text-4xl font-bold text-blue-900">1,893</p>
              {/* <p className="text-red-500 text-sm mt-1">↓ 1% this month</p> */}
            </div>
          </div>

          {/* Card 3: New Users Added */}
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-row items-center space-x-4">
            <div className="bg-gray-100 rounded-full p-4 flex-shrink-0">
              <img src={user} alt="Users Icon" className="w-10 h-10" />
            </div>
            <div className="flex flex-col items-start">
              <h2 className="text-md font-semibold text-black-900">New Users Added</h2>
              <p className="text-4xl font-bold text-blue-900">189</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
