import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Withdrawal = () => {
  const [formData, setFormData] = useState({
    user_id: '',
    amount: '',
    bank: '',
    branch_id: '',
    remark: '',
  });
  const [withdrawals, setWithdrawals] = useState([]);

  // Function to handle form field changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Function to submit the form and add a new withdrawal entry
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/withdrawal-report/add-entry', formData);
      toast.success('Withdrawal entry added successfully');
      setFormData({
        user_id: '',
        amount: '',
        bank: '',
        branch_id: '',
        remark: '',
      });
      fetchWithdrawals(); // Refresh the table after adding a new entry
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error adding withdrawal entry. Please try again.';
      toast.error(errorMessage);
    }
  };

  // Function to fetch all withdrawal entries
  const fetchWithdrawals = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/withdrawal-report/entries');
      setWithdrawals(response.data.data);
    } catch (error) {
      toast.error('Error fetching withdrawal entries.');
      console.error('Error fetching entries:', error);
    }
  };

  // Fetch withdrawal entries when the component loads
  useEffect(() => {
    fetchWithdrawals();
  }, []);

  return (
    <div className="max-w-5xl mr-1 mx-auto mt-10 p-4 bg-white rounded shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-gray-800" style={{marginLeft:'20px'}}>Withdrawal Entry</h1>

      {/* Form to Add New Withdrawal Entry */}
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="grid grid-cols-6 gap-4" style={{marginLeft:'20px'}}>
          <div>
            <label className="block text-sm font-semibold text-gray-700">User ID</label>
            <input
              type="text"
              name="user_id"
              value={formData.user_id}
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
            <label className="block text-sm font-semibold text-gray-700">Bank Name</label>
            <input
              type="text"
              name="bank"
              value={formData.bank}
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
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 text-sm"
              required
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-semibold text-gray-700">Remark</label>
            <input
              type="text"
              name="remark"
              value={formData.remark}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 text-sm"
            />
          </div>
        </div>
        <button
          type="submit"
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          Add Withdrawal Entry
        </button>
      </form>

      <ToastContainer />

      {/* Table to Display Withdrawal Entries */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200" style={{ marginTop: '20px' }}>
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left border">User ID</th>
              <th className="px-4 py-2 text-left border">Amount</th>
              <th className="px-4 py-2 text-left border">Bank</th>
              <th className="px-4 py-2 text-left border">Branch ID</th>
              <th className="px-4 py-2 text-left border">Remark</th>
              <th className="px-4 py-2 text-left border">Date</th>
            </tr>
          </thead>
          <tbody>
            {withdrawals.map((entry, index) => (
              <tr key={index} className="bg-white border-b">
                <td className="px-4 py-2 border">{entry.user_id}</td>
                <td className="px-4 py-2 border">₹{entry.amount}</td>
                <td className="px-4 py-2 border">{entry.bank}</td>
                <td className="px-4 py-2 border">{entry.branch_id}</td>
                <td className="px-4 py-2 border">{entry.remark}</td>
                <td className="px-4 py-2 border">{new Date(entry.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Withdrawal;
