import React, { useState , useEffect} from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../Sidebar/Sidebar';

const DepositBankReport = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [bankName, setBankName] = useState('');
  const [report, setReport] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [message, setMessage] = useState('');

  const fetchReport = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/deposit-withdraw/entries/report', {
        params: {
          startDate: startDate.toISOString().split('T')[0],
          endDate: endDate.toISOString().split('T')[0],
          bank_name: bankName,
        },
      });

      setReport(response.data.data);
      setTotalAmount(response.data.totalAmount);
      setMessage(response.data.message);
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
        style: { marginLeft: '10px' }, // Adjust the left margin as needed
      });
    }
  }, [message]);

  return (
    <>
    <Sidebar/>
    <div className="max-w-5xl mr-1 mx-auto mt-10 p-4 bg-white rounded shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-gray-800" style={{marginTop:'20px'}}>Bank-wise Deposit Report</h1>

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

        {/* Bank Name Input */}
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
        className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded mb-4"
      >
        Generate Report
      </button>

      <ToastContainer />
      {/* Total Amount Card */}
      <div className="bg-gray-100 p-4 rounded mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Total Amount: ₹{totalAmount}</h2>
      </div>

      {/* Table to Display Report */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-200">
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
    </>
  );
};

export default DepositBankReport;
