import React, { useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const WithdrawalReconciliationReport = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchReconciliationReport = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8000/api/withdrawal/reconciliation-report', {
        params: {
          startDate: startDate.toISOString().split('T')[0],
          endDate: endDate.toISOString().split('T')[0],
        },
      });

      setReportData(response.data);
      toast.success('Report generated successfully!');
    } catch (error) {
      console.error('Error fetching report:', error);
      toast.error('Error fetching report. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mr-1 mx-auto mt-10 p-4 bg-white rounded shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-gray-800" style={{marginTop:'20px'}}>Withdrawal Reconciliation Report</h1>

      {/* Form for Date Selection */}
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
        className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded mb-6"
        disabled={loading}
      >
        {loading ? 'Generating Report...' : 'Generate Report'}
      </button>

      {reportData && (
        <>
          {/* Matched Records Table */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Matched Records</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200">
                <thead className="bg-gray-200">
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

          {/* Discrepancies Table */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Discrepancies</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-4 py-2 text-left border">User ID</th>
                    <th className="px-4 py-2 text-left border">Amount</th>
                    <th className="px-4 py-2 text-left border">Branch ID</th>
                    <th className="px-4 py-2 text-left border">Date</th>
                    <th className="px-4 py-2 text-left border">Reason</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.discrepancies.map((discrepancy, index) => (
                    <tr key={index} className="bg-white border-b">
                      <td className="px-4 py-2 border">{discrepancy.user_id}</td>
                      <td className="px-4 py-2 border">₹{discrepancy.amount}</td>
                      <td className="px-4 py-2 border">{discrepancy.branch_id}</td>
                      <td className="px-4 py-2 border">{new Date(discrepancy.date).toLocaleDateString()}</td>
                      <td className="px-4 py-2 border text-red-600">{discrepancy.reason}</td>
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
  );
};

export default WithdrawalReconciliationReport;
