import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode'; // Use named import
import Sidebar from '../Sidebar/Sidebar';


const Dashboard = () => {
  const [branchId, setBranchId] = useState('');

  useEffect(() => {
    // Get the token from localStorage
    const token = localStorage.getItem('token');
    
    if (token) {
      // Decode the token to get the branch_id
      const decodedToken = jwtDecode(token);
      setBranchId(decodedToken.branch_id);
    }
  }, []);

  return (
    <>
    <Sidebar/>
    <div>
      {branchId ? (
        <h1>Welcome, {branchId}</h1>
      ) : (
        <h1>Welcome, Branch User</h1>
      )}
    </div>
    </>
  );
};

export default Dashboard;
