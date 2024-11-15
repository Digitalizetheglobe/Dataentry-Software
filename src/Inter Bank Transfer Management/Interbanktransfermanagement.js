import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../Sidebar/Sidebar';


const Interbanktransfermanagement = () => {
  const [formData, setFormData] = useState({
    sender_bank: '',
    amount: '',
    receiving_bank: '',
    utr_id: '',
    branch_id: '',
    date: '',
  });
  const [transfers, setTransfers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const branchIdFromToken = decoded.branch_id;
        setFormData((prevFormData) => ({
          ...prevFormData,
          branch_id: branchIdFromToken,
        }));
      } catch (error) {
        console.error('Failed to decode token:', error);
      }
    }

    // Automatically set today's date
    const today = new Date().toISOString().split('T')[0];
    setFormData((prevFormData) => ({
      ...prevFormData,
      date: today,
    }));

    fetchTransfers();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://api.cptechsolutions.com/api/interbank-transfer/add-transfer', formData);
      toast.success(response.data.message);
      setFormData({
        sender_bank: '',
        amount: '',
        receiving_bank: '',
        utr_id: '',
        branch_id: formData.branch_id,
        date: formData.date,
      });
      fetchTransfers();
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error adding transfer. Please try again.';
      toast.error(errorMessage);
    }
  };

  const fetchTransfers = async () => {
    try {
      const response = await axios.get('http://api.cptechsolutions.com/api/interbank-transfer/transfers');
      setTransfers(response.data.data);
    } catch (error) {
      toast.error('Error fetching transfers.');
      console.error('Error fetching transfers:', error);
    }
  };

  return (
    <>
      <Sidebar />
      <div className="max-w-5xl mr-1 mx-auto mt-10 p-4 bg-white rounded">
        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg ml-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Inter Bank Transfer Management</h2>

          </div>
          <form onSubmit={handleSubmit} className="mb-6">
          <div className="grid grid-cols-6 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700">Sender Bank</label>
              <input
                type="text"
                name="sender_bank"
                value={formData.sender_bank}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">Amount</label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">Receiving Bank</label>
              <input
                type="text"
                name="receiving_bank"
                value={formData.receiving_bank}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">UTR ID</label>
              <input
                type="text"
                name="utr_id"
                value={formData.utr_id}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">Branch ID</label>
              <input
                type="text"
                name="branch_id"
                value={formData.branch_id}
                disabled
                className="w-full border rounded px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                disabled
                className="w-full border rounded px-3 py-2 text-sm"
              />
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
          >
            Add Transfer
          </button>
        </form>
        </div>
       
        {/* <h1 className="text-2xl font-bold mb-6 text-gray-800">Inter Bank Transfer Management</h1> */}

        {/* <form onSubmit={handleSubmit} className="mb-6">
          <div className="grid grid-cols-6 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700">Sender Bank</label>
              <input
                type="text"
                name="sender_bank"
                value={formData.sender_bank}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">Amount</label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">Receiving Bank</label>
              <input
                type="text"
                name="receiving_bank"
                value={formData.receiving_bank}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">UTR ID</label>
              <input
                type="text"
                name="utr_id"
                value={formData.utr_id}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">Branch ID</label>
              <input
                type="text"
                name="branch_id"
                value={formData.branch_id}
                disabled
                className="w-full border rounded px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                disabled
                className="w-full border rounded px-3 py-2 text-sm"
              />
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
          >
            Add Transfer
          </button>
        </form> */}

        <ToastContainer />

        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 mt-6">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 text-left border">Sender Bank</th>
                <th className="px-4 py-2 text-left border">Amount</th>
                <th className="px-4 py-2 text-left border">Receiving Bank</th>
                <th className="px-4 py-2 text-left border">UTR ID</th>
                <th className="px-4 py-2 text-left border">Branch ID</th>
                <th className="px-4 py-2 text-left border">Date</th>
              </tr>
            </thead>
            <tbody>
              {transfers.map((transfer, index) => (
                <tr key={index} className="bg-white border-b">
                  <td className="px-4 py-2 border">{transfer.sender_bank}</td>
                  <td className="px-4 py-2 border">₹{transfer.amount}</td>
                  <td className="px-4 py-2 border">{transfer.receiving_bank}</td>
                  <td className="px-4 py-2 border">{transfer.utr_id}</td>
                  <td className="px-4 py-2 border">{transfer.branch_id}</td>
                  <td className="px-4 py-2 border">{new Date(transfer.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Interbanktransfermanagement;
