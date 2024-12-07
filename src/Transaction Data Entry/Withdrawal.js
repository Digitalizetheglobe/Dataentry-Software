import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../Sidebar/Sidebar';
import deposite from '../assets/deposit.png';
import edit from '../assets/Shape.png';
import trash from '../assets/trash-01.png';
import exportone from '../assets/download-cloud-02.png';

const Withdrawal = () => {
  const [formData, setFormData] = useState({
    user_id: '',
    amount: '',
    bank: '',
    branch_id: '',
    remark: '',
  });


  const [withdrawals, setWithdrawals] = useState([]);
  const [branchId, setBranchId] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFile, setSelectedFile] = useState(null);
  const [entries, setEntries] = useState([]);

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
  
  const [bankSearch, setBankSearch] = useState("");
  const [filteredBanks, setFilteredBanks] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const entriesPerPage = 20;
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      if (decoded.branch_id) {
        setBranchId(decoded.branch_id);
        setFormData((prevData) => ({
          ...prevData,
          branch_id: decoded.branch_id,
        }));
      }
    }
    fetchWithdrawals();
  }, []);

 // Close dropdown when clicking outside
 useEffect(() => {
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };
  document.addEventListener("mousedown", handleClickOutside);
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setBankSearch(query);
    if (query.trim() === "") {
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
    setFormData({ ...formData, bank });
    setBankSearch(bank);
    setFilteredBanks([]);
    setShowDropdown(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      await axios.post('http://api.cptechsolutions.com/api/withdrawal-report/add-entry', formData);
      toast.success('Withdrawal entry added successfully');
      setFormData({
        user_id: '',
        amount: '',
        bank: '',
        branch_id: branchId,
        remark: '',
      });
      fetchWithdrawals();
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error adding withdrawal entry. Please try again.';
      toast.error(errorMessage);
    }
  };

  const fetchWithdrawals = async () => {
    try {
      const response = await axios.get('http://api.cptechsolutions.com/api/withdrawal-report/entries');
      setWithdrawals(response.data.data);
    } catch (error) {
      toast.error('Error fetching withdrawal entries.');
      console.error('Error fetching entries:', error);
    }
  };
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };
  const filteredEntries = withdrawals.filter((entry) =>
    entry.user_id.toString().includes(searchQuery) ||
    entry.bank.toLowerCase().includes(searchQuery.toLowerCase()) ||
    entry.amount.toString().includes(searchQuery)
  );

  const currentEntries = filteredEntries.slice((currentPage - 1) * entriesPerPage, currentPage * entriesPerPage);
  const totalPages = Math.ceil(filteredEntries.length / entriesPerPage);


  // ----------------------
  const handlePutUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post(
        "http://api.cptechsolutions.com/api/withdrawal-report/bulk-upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success(response.data.message);
      setSelectedFile(null);
      fetchWithdrawals(); // Refresh table data
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Error during bulk upload.";
      toast.error(errorMessage);
    }
  };
  
  



  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };



  return (
    <>
      <div >
        <div className="flex ">
          {/* Sidebar */}
          <Sidebar className="fixed " />
          {/* Main Content */}
          <div className="ml-60 p-6 bg-gray-100 dark:bg-gray-800 min-h-screen w-full text-gray-900 dark:text-gray-200 overflow-hidden">
            <div className="max-w-5xl mr-1 mx-auto justify-between items-center mb-8 ml-10 rounded ">
              <div className="p-4 bg-gray-50 rounded-lg ml-10">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-gray-700">Overview</h2>
                  <div className="flex items-center space-x-4">
                    <button className="px-4 py-2 bg-gray-200 text-gray-600 rounded-full">Today</button>
                    {/* <button className="px-4 py-2 bg-gray-200 text-gray-600 rounded-full flex items-center">
                      Select dates
                      <svg className="w-5 h-5 ml-2 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </button> */}
                  </div>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {/* Amount Deposited Card */}
                  <div className="flex items-center p-4 bg-white rounded-lg shadow">
                    <div className="p-2 bg-[#E0D7C8] rounded-full">
                      <svg className="w-8 h-8 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l1.94 1.94L7 7h3.74l-1.62 6 4.38-4.4h3.75l-1.63 6H17l1.94 1.94M2 2l20 20" />
                      </svg>
                    </div>
                    <div className="ml-4 ">
                      <h3 className="text-lg  text-gray-800">Amount Withdrawal</h3>
                      <p className="text-2xl font-bold text-gray-900">5,423</p>
                      <p className="text-sm text-green-500">▲ 16% this month</p>
                    </div>
                  </div>

                  {/* Total Entries Card */}
                  <div className="flex items-center p-4 bg-white rounded-lg shadow">
                    <div className="p-4 bg-[#E0D7C8] rounded-full">
                      <svg className="w-8 h-8 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6M5 7h14M7 3h10v18H7V3z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg  text-gray-800">Total Entries</h3>
                      <p className="text-2xl font-bold text-gray-900">1,893</p>
                      <p className="text-sm text-red-500">▼ 1% this month</p>
                    </div>
                  </div>

                  {/* New User Added Card */}
                  <div className="flex items-center p-4 bg-white rounded-lg shadow">
                    <div className="p-4 bg-[#E0D7C8] rounded-full">
                      <svg className="w-8 h-8 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0v8" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg  text-gray-800">New User Added</h3>
                      <p className="text-2xl font-bold text-gray-900">0</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center mb-6 ml-10 mt-10">
                <img src={deposite} alt="Deposit Icon" className="w-5 h-5 ml-2 text-gray-500" />
                <h2 className="text-lg font-semibold text-gray-700 ml-2">Withdrawal Entries</h2>
                <div className="flex items-center space-x-4">
                </div>
              </div>


              <div className="p-4 bg-gray-50 rounded-lg ml-10 mt-5">
                <form onSubmit={handleSubmit} className="mb-6">
                  <div className="grid grid-cols-6 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700">User ID</label>
                      <input type="text" name="user_id" value={formData.user_id} onChange={handleChange} className="w-full border rounded px-3 py-2 text-sm" required />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700">Amount</label>
                      <input type="number" name="amount" value={formData.amount} onChange={handleChange} className="w-full border rounded px-3 py-2 text-sm" required />
                    </div>
                    <div className="relative" ref={dropdownRef}>
      {/* Input Field */}
      <label htmlFor="bank_name" className="block text-sm font-semibold text-gray-700">
        Bank Name
      </label>
      <input
        type="text"
        id="bankSearch"
        name="bankSearch"
        value={bankSearch}
        onChange={handleSearchChange}
        placeholder="Search bank"
        className="w-full border rounded px-3 py-2 text-sm"
      />

      {/* Dropdown List */}
      {showDropdown && filteredBanks.length > 0 && (
        <ul
          className="absolute border border-gray-300 bg-white overflow-y-auto text-sm rounded mt-1 w-full shadow-lg z-10"
          style={{ maxHeight: "200px" }}
        >
          {filteredBanks.map((bank, index) => (
            <li
              key={index}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleBankSelect(bank)}
            >
              {bank}
            </li>
          ))}
        </ul>
      )}

      {/* Selected Bank Display */}
      {formData.bank_name && (
        <div className="mt-2 text-[12px] text-green-600">
          Selected Bank: {formData.bank_name}
        </div>
      )}
    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700">Branch ID</label>
                      <input type="text" name="branch_id" value={formData.branch_id} readOnly className="w-full border rounded px-3 py-2 text-sm bg-gray-100" />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-semibold text-gray-700">Remark</label>
                      <input type="text" name="remark" value={formData.remark} onChange={handleChange} className="w-full border rounded px-3 py-2 text-sm" />
                    </div>
                  </div>
                  <button type="submit" className="mt-4 w-60 h-10 bg-[#001A3B] hover:bg-[#fff] text-white hover:text-[#001A3B] border hover:border-[#001A3B] py-2 rounded">Add Withdrawal Entry</button>
                  <button type="submit" className="mt-4 w-40 h-10 bg-[#001A3B] hover:bg-[#fff] text-white hover:text-[#001A3B] border hover:border-[#001A3B] py-2 rounded " style={{ marginLeft: '20px' }}>Reset Form</button>

                </form>
                <hr />
                <div className="flex items-center justify-between mb-6 mt-8">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="mr-2"
                    style={{ marginLeft: "23px" }}
                  />
                  <button
                    onClick={handlePutUpload}
                    className="text-green-600 hover:bg-green-600 border border-green-700 hover:text-white hover:border-green-700 py-2 px-4 rounded ml-2"
                  >
                    Bulk Upload
                  </button>
                </div>
              </div>

              <ToastContainer />

              {/* Main Table for Withdrawal Entries */}
              <div className="p-4 bg-gray-50 rounded-lg ml-10 mt-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    {/* Tab Button */}
                    <button className="px-4 py-2 bg-gray-200 text-gray-600 rounded-md">
                      Deposite Entries Table
                    </button>

                    {/* Search Bar */}
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search by User ID, Bank, or Amount"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="pl-10 pr-6 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                      <svg
                        className="w-5 h-5 text-gray-400 absolute left-3 top-2.5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M9 17a8 8 0 100-16 8 8 0 000 16z" />
                      </svg>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    {/* Filter Button */}
                    {/* <button  className="px-2 py-2 bg-[#001A3B] hover:bg-[#fff] text-white hover:text-[#001A3B] border hover:border-[#001A3B] py-2 rounded right-0">
                Filters
              </button> */}

                    {/* Export Button */}
                    {/* <button className="bg-transperent hover:bg-[#fff] text-[#001A3B] hover:text-[#001A3B] border hover:border-[#001A3B] py-2 rounded right-0" style={{ height: '40px', width: '100px' }}>
                      <img src={exportone} alt="export" className="w-5 h-5 inline" />  Export
                    </button> */}
                  </div>
                </div>
                <div className="mt-5">
                  <table className="min-w-full border border-gray-300 rounded-lg">
                    <thead className="bg-gray-100 text-gray-600">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold border-b"><input type="checkbox" className="form-checkbox" /></th>
                        <th className="px-4 py-3 text-left text-sm font-semibold border-b">Date</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold border-b">User ID</th>
                        <th className="px-1 py-3 text-left text-sm font-semibold border-b">Amount</th>
                        <th className="px-10 py-3 text-left text-sm font-semibold border-b">Bank</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold border-b">Branch ID</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold border-b">Remark</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold border-b">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white text-gray-800">
                      {withdrawals.map((entry, index) => (
                        <tr key={index} className={`hover:bg-gray-50 transition-colors duration-150 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                          <td className="px-4 py-4 border-b text-sm"><input type="checkbox" className="form-checkbox" /></td>
                          <td className="px-4 py-2 border">{new Date(entry.date).toLocaleDateString()}</td>
                          <td className="px-4 py-4 border-b text-sm">{entry.user_id}</td>
                          <td className="px-1 py-4 border-b text-sm">{entry.amount}</td>
                          <td className="px-8 py-4 border-b text-sm">{entry.bank}</td>
                          <td className="px-6 py-4 border-b text-sm">{entry.branch_id}</td>
                          <td className="px-4 py-4 border-b text-sm">{entry.remark}</td>
                          <td className="px-4 py-4 border-b text-sm">
                            <button className="text-blue-500 hover:text-blue-700"><img src={edit} alt="Edit" className="w-4 h-4 inline" /></button>
                            <button className="text-red-500 hover:text-red-700 ml-2"><img src={trash} alt="Delete" className="w-4 h-4 inline" /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {/* Pagination */}
                <div className="flex justify-center mt-4">
                  {Array.from({ length: currentPage }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => handlePageChange(i + 1)}
                      className={`px-3 py-1 border rounded ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Withdrawal;
