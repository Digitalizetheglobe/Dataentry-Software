import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../Sidebar/Sidebar';

const FetchData = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [bankName, setBankName] = useState('');
  const [report, setReport] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [message, setMessage] = useState('');
  const [bankSearch, setBankSearch] = useState('');
  const [filteredBanks, setFilteredBanks] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const [utrId, setUtrId] = useState('');


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleBankSelect = (bank) => {
    setBankSearch(bank);
    setFilteredBanks([]);
    setShowDropdown(false);
    // onBankSelect(bank); 
  };

  const fetchReport = async () => {
    try {
      const response = await axios.get('http://api.cptechsolutions.com/api/deposit-withdraw/entries');

      // Filter data by UTR ID if provided
      const filteredData = response.data.data.filter(entry =>
        utrId ? entry.utr_id?.toLowerCase() === utrId.toLowerCase() : true
      );

      setReport(filteredData);

      // Calculate the total amount
      const total = filteredData.reduce((sum, entry) => sum + Number(entry.amount), 0);
      setTotalAmount(total);

      // Set success message
      setMessage('Report generated successfully.');
    } catch (error) {
      console.error('Error fetching report:', error);
      setMessage('Error fetching report. Please try again.');
    }
  };


  useEffect(() => {
    if (message) {
      toast.success(message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        style: { marginLeft: '10px' },
      });
    }
  }, [message]);

  return (
    <>
      <div >
        <div className="flex ">

          <Sidebar className="fixed " />


          <div className="ml-60 p-6 bg-gray-100 dark:bg-gray-800 min-h-screen w-full text-gray-900 dark:text-gray-200 overflow-hidden">
            <div className="max-w-5xl mr-1 mx-auto justify-between items-center mb-8 ml-10 rounded">
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg ml-10">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-black-700"> Fetch Data Using UTR</h2>
                  <div className="flex items-center space-x-4">
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700">UTR ID</label>
                    <input
                      type="text"
                      name="utr_id"
                      value={utrId}
                      onChange={(e) => setUtrId(e.target.value)}
                      className="w-full border rounded px-2 py-1 text-sm"
                      required
                    />
                  </div>
                </div>
                <button
                  onClick={fetchReport}
                  className="w-full sm:w-auto bg-[#001A3B] hover:bg-[#fff] text-white hover:text-[#001A3B] border hover:border-[#001A3B] py-2 px-4 rounded mb-4"
                >
                  Generate Report
                </button>
              </div>
              <ToastContainer />
              <div className="p-4 bg-gray-50 rounded-lg ml-10 mt-5">
                <h2 className="text-lg font-semibold text-gray-800">Total Amount: ₹{totalAmount}</h2>
              </div>
              <div className="overflow-x-auto ml-10 mt-5 rounded">
                <table className="min-w-full border border-gray-300 rounded-lg">
                  <thead className="bg-gray-100 text-gray-600">
                    <tr>
                      {/* <th className="px-4 py-2 text-left border">Date</th> */}
                      <th className="px-4 py-2 text-left border">Player ID</th>
                      <th className="px-4 py-2 text-left border">Branch ID</th>
                      <th className="px-4 py-2 text-left border">UTR ID</th>
                      <th className="px-4 py-2 text-left border">Amount</th>
                      <th className="px-4 py-2 text-left border">Bank Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {report.map((entry, index) => (
                      <tr key={index} className="bg-white border-b">
                        {/* <td className="px-4 py-2 border">{new Date(entry.date).toLocaleDateString()}</td> */}
                        <td className="px-4 py-2 border">{entry.player_id}</td>
                        <td className="px-4 py-2 border">{entry.branch_id}</td>
                        <td className="px-4 py-2 border">{entry.utr_id}</td>
                        <td className="px-4 py-2 border">₹{entry.amount}</td>
                        <td className="px-4 py-2 border">{entry.bank_name}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};


export default FetchData