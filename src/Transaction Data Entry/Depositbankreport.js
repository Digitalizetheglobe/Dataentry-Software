import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../Sidebar/Sidebar';
import * as XLSX from "xlsx";

const DepositBankReport = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [bankName, setBankName] = useState('');
  const [report, setReport] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [message, setMessage] = useState('');

  const banks = [
    // Public Sector Banks
    "State Bank of India",
    "Punjab National Bank",
    "Bank of Baroda",
    "Canara Bank",
    "Union Bank of India",
    "Bank of India",
    "Indian Bank",
    "Central Bank of India",
    "Indian Overseas Bank",
    "UCO Bank",
    "Punjab & Sind Bank",

    // Private Sector Banks
    "HDFC Bank",
    "ICICI Bank",
    "Axis Bank",
    "Kotak Mahindra Bank",
    "Yes Bank",
    "IDBI Bank",
    "Federal Bank",
    "IndusInd Bank",
    "South Indian Bank",
    "RBL Bank",
    "Bandhan Bank",
    "Jammu & Kashmir Bank",
    "City Union Bank",
    "Karur Vysya Bank",
    "Tamilnad Mercantile Bank",
    "Dhanlaxmi Bank",
    "Lakshmi Vilas Bank",

    // Small Finance Banks
    "AU Small Finance Bank",
    "Equitas Small Finance Bank",
    "Ujjivan Small Finance Bank",
    "Suryoday Small Finance Bank",
    "Jana Small Finance Bank",
    "Fincare Small Finance Bank",
    "ESAF Small Finance Bank",
    "North East Small Finance Bank",
    "Capital Small Finance Bank",

    // Payments Banks
    "Paytm Payments Bank",
    "Airtel Payments Bank",
    "India Post Payments Bank",
    "Fino Payments Bank",
    "Jio Payments Bank",
    "NSDL Payments Bank",

    // Regional Rural Banks (RRBs)
    "Aryavart Bank",
    "Baroda UP Bank",
    "Kerala Gramin Bank",
    "Andhra Pradesh Grameena Vikas Bank",
    "Prathama UP Gramin Bank",
    "Madhya Pradesh Gramin Bank",
    "Chhattisgarh Rajya Gramin Bank",
    "Punjab Gramin Bank",
    "Rajasthan Marudhara Gramin Bank",
    "Sarva Haryana Gramin Bank",
    // Add more RRBs as needed

    // Cooperative Banks
    "Saraswat Cooperative Bank",
    "Cosmos Cooperative Bank",
    "Bassein Catholic Cooperative Bank",
    "Abhyudaya Cooperative Bank",
    "Shamrao Vithal Cooperative Bank",
    "Bombay Mercantile Cooperative Bank",

    // Foreign Banks in India
    "Citibank",
    "Standard Chartered Bank",
    "HSBC Bank",
    "Deutsche Bank",
    "Barclays Bank",
    "DBS Bank",
    "BNP Paribas",
    "Bank of America",
    "JP Morgan Chase",
    "Mizuho Bank",
    "MUFG Bank",
    "Credit Suisse",
    "UBS AG",
    "FLEXI PORTAL",
    "JALGAON-MAHAVEER-0122",
    "VK TREND-CSB-7566",
    "A K ACCESSORIES-KB-1001",
    "ANJALI-SIB-9608",
    "ELECTRON HUB-KB-1201",
    "JALGAON-PALARIYA-0309",
    "MATABERI PORTAL",
    "R S Traders-PSB-0609",
    "RM CREATION-CSB-7948",
    "S S ORGANIC-PSB-7440",
    "SHADAP GARMENTS-AXIS-5951",
    "SUNIL TRADERS-IOB-0474",
    "SUPER TRADERS-AXIS-8044",
    "VK TREND-CSB-7566",
    "VK TREND-KOTAK-2837",
    "SWAG BAGS-KB-1501",
    "ELECTRON HUB-IDBI-7204",
    "R S TRADERS-IB-4515",
    "DELUXE-IOB-0331",
    "RS TRADERS-BOI-0765",
    "RS TRADERS-BOM-9068",
    "RS TRADERS-KOTAK-9921",
    "MODERN-IOB-0348",
    "SHANKAR-FDRL-3766",
    "RM CREATION-TMB-5182",
    "RC FRUITS VEG-KB-2801",
    "RC FRUITS VEG-IDBI-5677",
    "UDAY FRUIT-BOB-1749",
    "RC FRUITS VEG-BOB-788",
    "S S ORGANIC-IDBI-9119",
    "SHADAP GARMENTS-BOB-742",
    "Flexi Payment",
    "Other"

  ];

  const [bankSearch, setBankSearch] = useState('');
  const [filteredBanks, setFilteredBanks] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

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

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setBankSearch(query);

    if (query.trim() === '') {
      setFilteredBanks([]);
      setShowDropdown(false);
    } else {
      const filtered = banks.filter((bank) =>
        bank.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredBanks(filtered);
      setShowDropdown(true);
    }
  };

  const handleBankSelect = (bank) => {
    setBankSearch(bank);
    setFilteredBanks([]);
    setShowDropdown(false);
    // onBankSelect(bank); 
  };

  const fetchReport = async () => {
    try {
      const response = await axios.get('http://api.cptechsolutions.com/api/deposit-withdraw/entries/report', {
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

  const handleExportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(report); // Convert data to worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Report");

    // Trigger file download
    XLSX.writeFile(workbook, "Report.xlsx");
  };

  return (
    <>
      <div >
        <div className="flex ">
          {/* Sidebar */}
          <Sidebar className="fixed " />

          {/* Main Content */}
          <div className="ml-60 p-6 bg-gray-100 dark:bg-gray-800 min-h-screen w-full text-gray-900 dark:text-gray-200 overflow-hidden">
            <div className="max-w-5xl mr-1 mx-auto justify-between items-center mb-8 ml-10 rounded">
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg ml-10">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-black-700">Bank-wise Deposit Report</h2>
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

                  {/* Bank Name Input */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700">Bank Name</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={bankSearch}
                        onChange={handleSearchChange}
                        placeholder="Search bank name"
                        className="w-full border rounded px-3 py-2 text-sm"
                        onFocus={() => setShowDropdown(true)}
                      />
                      {showDropdown && filteredBanks.length > 0 && (
                        <ul
                          ref={dropdownRef}
                          className="absolute z-10 bg-white border border-gray-300 rounded shadow-lg w-full max-h-60 overflow-y-auto"
                        >
                          {filteredBanks.map((bank, index) => (
                            <li
                              key={index}
                              className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                              onClick={() => {
                                handleBankSelect(bank);
                                setBankName(bank); // Update the bank name state
                              }}
                            >
                              {bank}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>


                </div>
                <button
                  onClick={fetchReport}
                  className="w-full sm:w-auto bg-[#001A3B] hover:bg-[#fff] text-white hover:text-[#001A3B] border hover:border-[#001A3B] py-2 px-4 rounded mb-4"
                >
                  Generate Report
                </button>
              </div>

              {/* <h1 className="text-2xl font-bold mb-6 text-gray-800" style={{marginTop:'20px'}}>Bank-wise Deposit Report</h1> */}

              {/* <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
       
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

              {/* <button
        onClick={fetchReport}
        className="w-full sm:w-auto bg-[#001A3B] hover:bg-[#fff] text-white hover:text-[#001A3B] border hover:border-[#001A3B] py-2 px-4 rounded mb-4"
      >
        Generate Report
      </button> */}

              <ToastContainer />
              {/* Total Amount Card */}
              <div className="p-4 bg-gray-50 rounded-lg ml-10 mt-5">
                <h2 className="text-lg font-semibold text-gray-800">Total Amount: ₹{totalAmount}</h2>
                <button
                  className="w-full mt-10 sm:w-auto bg-[#001A3B] hover:bg-[#fff] text-white hover:text-[#001A3B] border hover:border-[#001A3B] py-2 px-4 rounded mb-4"
                  onClick={handleExportToExcel}
              >
                Export to Excel
              </button>
              </div>
              
              {/* Table to Display Report */}
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

export default DepositBankReport;
