import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Deposit = () => {
  const [entries, setEntries] = useState([]);
  const [formData, setFormData] = useState({
    player_id: '',
    branch_id: '',
    utr_id: '',
    amount: '',
    bank_name: '',
    remark: ''
  });
  const [message, setMessage] = useState('');

  // Function to handle form field changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Function to submit the form and add a new entry
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/deposit-withdraw/add-entry', formData);
      toast.success("Entry added successfully.");
      setFormData({
        player_id: '',
        branch_id: '',
        utr_id: '',
        amount: '',
        bank_name: '',
        remark: ''
      });
      fetchEntries(); // Refresh entries after adding a new one
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error adding entry. Please try again.';
      toast.error(errorMessage);
    }
  };


  const fetchEntries = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/deposit-withdraw/entries');

      // Sort entries so that the most recent entries come first
      const sortedEntries = response.data.data.sort((a, b) => new Date(b.date) - new Date(a.date));

      setEntries(sortedEntries);
    } catch (error) {
      console.error('Error fetching entries:', error);
    }
  };


  // Fetch entries when the component loads
  useEffect(() => {
    fetchEntries();
  }, []);

  return (
    <div className="max-w-5xl mr-1 mx-auto mt-10 p-4 bg-white rounded shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-gray-800" style={{marginLeft:'20px'}}>Deposit Entries</h1>

      {/* Form to Add New Entry */}
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="grid grid-cols-6 gap-4" style={{marginLeft:'20px'}}>
          <div>
            <label className="block text-xs font-semibold text-gray-700" >Player ID</label>
            <input
              type="text"
              name="player_id"
              value={formData.player_id}
              onChange={handleChange}
              className="w-full border rounded px-2 py-1 text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700">Branch ID</label>
            <input
              type="text"
              name="branch_id"
              value={formData.branch_id}
              onChange={handleChange}
              className="w-full border rounded px-2 py-1 text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700">UTR ID</label>
            <input
              type="text"
              name="utr_id"
              value={formData.utr_id}
              onChange={handleChange}
              className="w-full border rounded px-2 py-1 text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700">Amount</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="w-full border rounded px-2 py-1 text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700">Bank Name</label>
            <input
              type="text"
              name="bank_name"
              value={formData.bank_name}
              onChange={handleChange}
              className="w-full border rounded px-2 py-1 text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700">Remark</label>
            <input
              type="text"
              name="remark"
              value={formData.remark}
              onChange={handleChange}
              className="w-full border rounded px-2 py-1 text-sm"
            />
          </div>
        </div>
        <button
          type="submit"
          className="mt-4 w-40 h-10 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded right-0" style={{marginLeft:'20px'}}
        >
          Add Entry
        </button>
      </form>
      <ToastContainer />

      {/* {message && <p className="text-center text-green-600 mb-4">{message}</p>} */}

      {/* Table to Display Entries */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded-lg shadow-lg">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="px-4 py-2 text-left border-b">Date</th>
              <th className="px-4 py-2 text-left border-b">Player ID</th>
             
              <th className="px-4 py-2 text-left border-b">UTR ID</th>
              <th className="px-4 py-2 text-left border-b">Amount</th>
              <th className="px-4 py-2 text-left border-b">Bank Name</th>
              <th className="px-4 py-2 text-left border-b">Branch ID</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {entries.map((entry, index) => (
              <tr key={index} className="hover:bg-gray-100 transition-colors duration-200">
                <td className="px-4 py-2 border-b">{new Date(entry.created_at).toLocaleDateString()}</td>
                <td className="px-4 py-2 border-b">{entry.player_id}</td>
        
                <td className="px-4 py-2 border-b">{entry.utr_id}</td>
                <td className="px-4 py-2 border-b">{entry.amount}</td>
                <td className="px-4 py-2 border-b">{entry.bank_name}</td>
                <td className="px-4 py-2 border-b">{entry.branch_id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default Deposit;
