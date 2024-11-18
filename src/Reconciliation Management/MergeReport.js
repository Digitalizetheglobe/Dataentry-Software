import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../Sidebar/Sidebar';

const MergeReport = () => {
  const [mergedData, setMergedData] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchMergedData = async () => {
      try {
        const response = await axios.get('http://api.cptechsolutions.com/api/excel/merged-data');
        setMergedData(response.data.data);
      } catch (err) {
        console.error('Error fetching merged data:', err);
        setError('Failed to fetch merged data. Please try again.');
      }
    };

    fetchMergedData();
  }, []);

  const handleGenerateMergedData = async () => {
    setIsLoading(true);
    setError('');
    try {
      await axios.post('http://api.cptechsolutions.com/api/excel/merge');
      const response = await axios.get('http://api.cptechsolutions.com/api/excel/merged-data');
      setMergedData(response.data.data);
    } catch (err) {
      console.error('Error generating merged data:', err);
      setError('Failed to generate merged data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
<>
   <div >
        <div className="flex">
          {/* Sidebar */}
          <Sidebar className="fixed " />

      {/* Main Content */}
      <div className="ml-80 p-6 bg-gray-100 dark:bg-gray-800 min-h-screen w-full">
      <div className=" bg-gray-50 ">
        <div className="h-full flex flex-col max-h-screen">
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-700">Excel 1 and Excel 2 Merged Data</h2>
              <button
                className="bg-[#001A3B] hover:bg-[#fff] text-white hover:text-[#001A3B] border hover:border-[#001A3B] py-2 px-4 rounded-md"
                onClick={handleGenerateMergedData}
                disabled={isLoading}
              >
                {isLoading ? 'Generating...' : 'Generate Merged Data'}
              </button>
            </div>
            {error && <p className="text-red-500 mb-4">{error}</p>}
          </div>

          {/* Scrollable Table */}
          <div className="flex-grow bg-white shadow-md rounded-lg mt-4 p-4">
            <table className="w-full border border-gray-300">
              <thead className="bg-gray-100 text-gray-600">
                <tr>
                  <th className="border p-2 text-left">ID</th>
                  <th className="border p-2 text-left">Account</th>
                  <th className="border p-2 text-left">Balance</th>
                  <th className="border p-2 text-left">Deposit</th>
                  <th className="border p-2 text-left">Withdraw</th>
                  <th className="border p-2 text-left">Ref Profit/Loss</th>
                  <th className="border p-2 text-left">From/To</th>
                </tr>
              </thead>
              <tbody>
                {mergedData.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center p-4">
                      No merged data available.
                    </td>
                  </tr>
                ) : (
                  mergedData.map((row, index) => (
                    <tr key={index} className="text-left">
                      <td className="border p-2">{row.id}</td>
                      <td className="border p-2">{row.account}</td>
                      <td className="border p-2">{row.balance}</td>
                      <td className="border p-2">{row.deposit}</td>
                      <td className="border p-2">{row.withdraw}</td>
                      <td className="border p-2">{row.ref_profit_loss}</td>
                      <td className="border p-2">{row.from_to}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      </div>
      </div>
      </div>
    
    </>
  );
};

export default MergeReport;
