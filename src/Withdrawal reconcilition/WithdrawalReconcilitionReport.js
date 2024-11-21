import React, { useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import { ToastContainer, toast } from 'react-toastify';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../Sidebar/Sidebar';

const WithdrawalReconciliationReport = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [skippedEntries, setSkippedEntries] = useState([]);
  

  const toggleSkip = (user_id) => {
    setSkippedEntries((prev) =>
      prev.includes(user_id) ? prev.filter((id) => id !== user_id) : [...prev, user_id]
    );
  };

  const fetchReconciliationReport = async () => {
    setLoading(true);
    try {
      // api.cptechsolutions.com
      const response = await axios.get('http://api.cptechsolutions.com/api/withdrawal/reconciliation-report', {
        params: {
          startDate: startDate.toISOString().split('T')[0],
          endDate: endDate.toISOString().split('T')[0],
        },
      });
      console.log('Report Data:', response.data);
      setReportData(response.data);
      toast.success('Report generated successfully!');
    } catch (error) {
      console.error('Error fetching report:', error);
      toast.error('Error fetching report. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // const exportToCSV = () => {
  //   if (!reportData) return;

  //   const headers = ["User ID", "Amount", "Branch ID", "Date", "Matched"];
  //   const csvRows = reportData.matchedRecords.map(record => [
  //     record.user_id,
  //     `₹${record.amount}`,
  //     record.branch_id,
  //     new Date(record.date).toLocaleDateString(),
  //     "✔"
  //   ]);

  //   const csvContent = [
  //     headers.join(","), 
  //     ...csvRows.map(row => row.join(",")) 
  //   ].join("\n");

  //   const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  //   const url = URL.createObjectURL(blob);
  //   const link = document.createElement('a');
  //   link.href = url;
  //   link.setAttribute('download', 'ReconciliationReport.csv');
  //   document.body.appendChild(link);
  //   link.click();
  // };


  // const exportToExcel = () => {
  //   if (!reportData) return;

  //   const worksheet = utils.json_to_sheet(reportData.matchedRecords);
  //   const workbook = utils.book_new();
  //   utils.book_append_sheet(workbook, worksheet, 'Matched Records');
  //   writeFile(workbook, 'ReconciliationReport.xlsx');
  // };

  return (
    <>
  <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/4">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="w-4/5 overflow-y-auto">
      <div className="max-w-5xl mr-1 mx-auto mt-10 p-4 bg-white rounded">
        <div className="p-4 bg-gray-50 rounded-lg ml-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-black-700">Withdrawal Reconciliation Report</h2>
            <div className="flex items-center space-x-4">
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700">Start Date</label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                className="w-full border rounded px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">End Date</label>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                className="w-full border rounded px-3 py-2 text-sm"
              />
            </div>
          </div>

          <button
            onClick={fetchReconciliationReport}
            className="bg-[#001A3B] hover:bg-[#fff] text-white hover:text-[#001A3B] border hover:border-[#001A3B] py-2 px-4 rounded-md"
            disabled={loading}
          >
            {loading ? 'Generating Report...' : 'Generate Report'}
          </button>

        </div>
        {/* <h1 className="text-4xl font-bold mb-6 text-gray-800" style={{ marginTop: '20px', marginLeft: '20px' }}>
          Withdrawal Reconciliation Report
        </h1> */}

        {/* <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6" style={{ marginLeft: '20px' }}>
          <div>
            <label className="block text-sm font-semibold text-gray-700">Start Date</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              className="w-full border rounded px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">End Date</label>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              className="w-full border rounded px-3 py-2 text-sm"
            />
          </div>
        </div> */}

        {/* <button
          onClick={fetchReconciliationReport}
          className="bg-[#001A3B] hover:bg-[#fff] text-white hover:text-[#001A3B] border hover:border-[#001A3B] py-2 px-4 rounded-md"
          disabled={loading}
          style={{ marginLeft: '20px' }}
        >
          {loading ? 'Generating Report...' : 'Generate Report'}
        </button> */}

        {reportData && (
          <>
            <div className="flex items-center justify-between mb-6 ml-10 mt-5">
              <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Generated Result</h2>
              <div className="flex items-center space-x-4">
                <button className="bg-[#001A3B] hover:bg-[#fff] text-white hover:text-[#001A3B] border hover:border-[#001A3B] py-2 px-4 rounded-md"              >Export CSV</button>
                <button className="bg-[#001A3B] hover:bg-[#fff] text-white hover:text-[#001A3B] border hover:border-[#001A3B] py-2 px-4 rounded-md"              >Export Excel</button>
              </div>
            </div>


            {/* <div className="flex justify-end space-x-4 mt-4">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Export CSV</button>
              <button className="bg-green-500 text-white px-4 py-2 rounded-md">Export Excel</button>
            </div> */}

            {/* Total Amounts */}
            <div className="p-4 bg-gray-50 rounded-lg ml-10">
              <h2 className="text-lg font-semibold text-black-700">
                Manual Data Total : ₹ {new Intl.NumberFormat('en-IN').format(reportData.totalManualAmount)}
              </h2>
              <h2 className="text-lg font-semibold text-black-700">
                Excel Data Total : ₹ {new Intl.NumberFormat('en-IN').format(reportData.totalExcelAmount)}
              </h2>
            </div>

            {/* Matched Records Table */}
            <div className="p-4 bg-gray-50 rounded-lg ml-10 mt-5">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Matched Records</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300 rounded-lg">
                  <thead className="bg-gray-100 text-gray-600">
                    <tr>
                      <th className="px-4 py-2 text-left border">User ID</th>
                      <th className="px-4 py-2 text-left border">Amount</th>
                      <th className="px-4 py-2 text-left border">Branch ID</th>
                      <th className="px-4 py-2 text-left border">Date</th>
                      <th className="px-4 py-2 text-left border">Matched</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reportData.matchedRecords.map((record, index) => (
                      <tr key={index} className="bg-white border-b">
                        <td className="px-4 py-2 border">{record.user_id}</td>
                        <td className="px-4 py-2 border">₹{record.amount}</td>
                        <td className="px-4 py-2 border">{record.branch_id}</td>
                        <td className="px-4 py-2 border">{new Date(record.date).toLocaleDateString()}</td>
                        <td className="px-4 py-2 border text-green-600">✔</td>
                      </tr>
                    ))}

                  </tbody>
                </table>
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg ml-10 mt-5">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Discrepancies</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300 rounded-lg">
                  <thead className="bg-gray-100 text-gray-600">
                    <tr>
                      <th className="px-4 py-2 text-left border">User ID</th>
                      <th className="px-4 py-2 text-left border">Amount</th>
                      {/* <th className="px-4 py-2 text-left border">Branch ID</th> */}
                      <th className="px-4 py-2 text-left border">Date</th>
                      <th className="px-4 py-2 text-left border">Reason</th>
                      <th className="px-4 py-2 text-left border">Action</th>

                    </tr>
                  </thead>
                  <tbody>
                    {reportData.discrepancies.map((record, index) => (
                      <tr key={index}  className={`border-b ${skippedEntries.includes(record.user_id) ? 'bg-gray-200' : 'bg-white'}`}>
                        <td className="px-4 py-2 border">{record.user_id}</td>
                        <td className="px-4 py-2 border">₹{record.amount}</td>
                        {/* <td className="px-4 py-2 border">{record.branch_id}</td> */}
                        <td className="px-4 py-2 border">{new Date(record.date).toLocaleDateString()}</td>
                        <td className="px-4 py-2 border text-red-600">{record.reason}</td>
                         <td className="px-4 py-2 border">
                        <button
                          onClick={() => toggleSkip(record.user_id)}
                          className={`bg-green-600 border border-green-700 hover:bg-white hover:text-green-700 text-white hover:border-green-700 text-white px-2 py-1 rounded ${skippedEntries.includes(record.user_id) ? 'bg-gray-500 text-white' : 'bg-blue-500 text-white'
                            }`}
                        >
                          {skippedEntries.includes(record.user_id) ? 'Unskip' : 'Skip'}
                        </button>
                      </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            

          </>
        )}
        <ToastContainer />
      </div>
      </div>
      </div>
    </>
  );
};

export default WithdrawalReconciliationReport;
