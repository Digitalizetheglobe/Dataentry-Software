import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../Sidebar/Sidebar';
const MergeReport = () => {


    const [mergedData, setMergedData] = useState([]);
    const [error, setError] = useState('');
  
    useEffect(() => {
      const fetchMergedData = async () => {
        try {
          const response = await axios.get('http://localhost:8000/api/excel/merged-data');
          setMergedData(response.data.data);
        } catch (err) {
          console.error('Error fetching merged data:', err);
          setError('Failed to fetch merged data. Please try again.');
        }
      };
  
      fetchMergedData();
    }, []);
  
    return (
      <>
      <Sidebar/>
        <div className="max-w-5xl mx-auto mt-10 p-4 bg-white rounded">
          <h2 className="text-4xl font-bold mb-6 text-gray-800" style={{ marginLeft: '170px', marginTop: '10px' }}>Merged Data</h2>
          {error && <p className="text-red-500">{error}</p>}
          <div className="flex items-center mb-4" style={{ marginLeft: '170px' }}>
            <table className="min-w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                <th className="border p-2">id</th>
                  <th className="border p-2">Account</th>
                  {/* <th className="border p-2">UID</th> */}
                  {/* <th className="border p-2">Credit Ref</th> */}
                  <th className="border p-2">Balance</th>
                  {/* <th className="border p-2">Exposure</th> */}
                  {/* <th className="border p-2">Available Balance</th> */}
                  {/* <th className="border p-2">Exposure Limit</th> */}
                  
                  {/* <th className="border p-2">Date/Time</th> */}
                  <th className="border p-2">Deposit</th>
                  <th className="border p-2">Withdraw</th>
                  <th className="border p-2">Ref Profit/Loss</th>
                  {/* <th className="border p-2">Remark</th> */}
                  <th className="border p-2">From/To</th>
                </tr>
              </thead>
              <tbody>
                {mergedData.length === 0 ? (
                  <tr>
                    <td colSpan="13" className="text-center p-4">
                      No merged data available.
                    </td>
                  </tr>
                ) : (
                  mergedData.map((row, index) => (
                    <tr key={index} className="text-center">
                        <td className="border p-2">{row.id}</td>
                      <td className="border p-2">{row.account}</td>
                      {/* <td className="border p-2">{row.uid}</td> */}
                      {/* <td className="border p-2">{row.credit_ref}</td> */}
                      <td className="border p-2">{row.balance}</td>
                      {/* <td className="border p-2">{row.exposure}</td> */}
                      {/* <td className="border p-2">{row.available_balance}</td> */}
                      {/* <td className="border p-2">{row.exposure_limit}</td> */}
                      <td className="border p-2">{row.ref_profit_loss}</td>
                      {/* <td className="border p-2">
                        {row.date_time ? new Date(row.date_time).toLocaleString() : 'N/A'}
                      </td> */}
                      <td className="border p-2">{row.deposit}</td>
                      <td className="border p-2">{row.withdraw}</td>
                      {/* <td className="border p-2">{row.remark}</td> */}
                      <td className="border p-2">{row.from_to}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        </>
      );
}

export default MergeReport