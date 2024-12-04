import React, { useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../Sidebar/Sidebar';

const WithdrwalBankReport = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [bankName, setBankName] = useState('');
  const [report, setReport] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [message, setMessage] = useState('');


  // const fetchReport = async () => {
  //   try {
  //     const response = await axios.get('http://api.cptechsolutions.com/api/withdrawal-report/entries/report', {
  //       params: {
  //         startDate: startDate.toISOString().split('T')[0],
  //         endDate: endDate.toISOString().split('T')[0],
  //         bank_name: bankName.trim(), 
  //       },
  //     });

  //     setReport(response.data.data);
  //     setTotalAmount(response.data.totalAmount);
  //     setMessage(response.data.message);
  //     toast.success('Report generated successfully!');
  //   } catch (error) {
  //     console.error('Error fetching report:', error);
  //     setMessage('Error fetching report. Please try again.');
  //     toast.error('Error fetching report. Please try again.');
  //   }
  // };

  
  
  const fetchReport = async () => {
    if (!bankName.trim()) {
      toast.error('Please enter a valid bank name.');
      return;
    }
  
    try {
      const response = await axios.get('http://api.cptechsolutions.com/api/withdrawal-report/entries/report', {
        params: {
          startDate: startDate.toISOString().split('T')[0],
          endDate: endDate.toISOString().split('T')[0],
          bank_name: bankName.trim(),
        },
      });
  
      setReport(response.data.data);
      setTotalAmount(response.data.totalAmount);
      setMessage(response.data.message);
      toast.success('Report generated successfully!');
    } catch (error) {
      console.error('Error fetching report:', error);
      setMessage('Error fetching report. Please try again.');
      toast.error('Error fetching report. Please try again.');
    }
  };
  
  return (
    <>
 <div>
        <div className="flex ">
          {/* Sidebar */}
          <Sidebar className="fixed " />
         
          {/* Main Content */}
          <div className="ml-60 p-6 bg-gray-100 dark:bg-gray-800 min-h-screen w-full text-gray-900 dark:text-gray-200 overflow-hidden">
      <div className="max-w-5xl mr-1 mx-auto justify-between items-center mb-8 ml-10 rounded">
        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg ml-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-black-700">Withdrawal Bank Report</h2>
            <div className="flex items-center space-x-4">
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {/* Date Pickers */}
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

            <div>
              <label className="block text-sm font-semibold text-gray-700">Bank Name</label>
              <input
                type="text"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                placeholder="Enter bank name"
                className="w-full border rounded px-3 py-2 text-sm"
              />
            </div>
          </div>
          <button
            onClick={fetchReport}
            className="w-full sm:w-auto bg-[#001A3B] hover:bg-[#fff] text-white hover:text-[#001A3B] border hover:border-[#001A3B]  py-2 px-4 rounded mb-4"

          >
            Generate Report
          </button>
        </div>
        {/* <h1 className="text-4xl font-bold mb-6 text-gray-800" style={{marginTop:'20px'}}>Withdrawal Bank Report</h1> */}
        {/* 
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

        <div>
          <label className="block text-sm font-semibold text-gray-700">Bank Name</label>
          <input
            type="text"
            value={bankName}
            onChange={(e) => setBankName(e.target.value)}
            placeholder="Enter bank name"
            className="w-full border rounded px-3 py-2 text-sm"
          />
        </div>
      </div> */}
        {/* 
      <button
        onClick={fetchReport}
        className="w-full sm:w-auto bg-[#001A3B] hover:bg-[#fff] text-white hover:text-[#001A3B] border hover:border-[#001A3B]  py-2 px-4 rounded mb-4"

      >
        Generate Report
      </button> */}

        {message && <p className="text-center text-green-600 mb-4">{message}</p>}

        {/* Total Amount Card */}
        <div className="p-4 bg-gray-50 rounded-lg ml-10 mt-5">
          <h2 className="text-lg font-semibold text-gray-800">Total Amount: ₹{totalAmount}</h2>
        </div>

        {/* Table to Display Report */}
        <div className="overflow-x-auto ml-10 mt-5 rounded">
          <table className="min-w-full border border-gray-300 rounded-lg">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="px-4 py-2 text-left border">Date</th>
                <th className="px-4 py-2 text-left border">User ID</th>
                <th className="px-4 py-2 text-left border">Amount</th>
                <th className="px-4 py-2 text-left border">Bank</th>
                <th className="px-4 py-2 text-left border">Branch ID</th>
                <th className="px-4 py-2 text-left border">Remark</th>
              </tr>
            </thead>
            <tbody>
              {report.map((entry, index) => (
                <tr key={index} className="bg-white border-b">
                  <td className="px-4 py-2 border">{new Date(entry.date).toLocaleDateString()}</td>
                  <td className="px-4 py-2 border">{entry.user_id}</td>
                  <td className="px-4 py-2 border">₹{entry.amount}</td>
                  <td className="px-4 py-2 border">{entry.bank}</td>
                  <td className="px-4 py-2 border">{entry.branch_id}</td>
                  <td className="px-4 py-2 border">{entry.remark}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <ToastContainer />
      </div>
      </div>
      </div>
      </div>
    </>
  );
};

export default WithdrwalBankReport;
