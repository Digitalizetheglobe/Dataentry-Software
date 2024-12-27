import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../Sidebar/Sidebar";
import { jwtDecode } from "jwt-decode";
import deposite from "../assets/deposit.png";
import edit from "../assets/Shape.png";
import trash from "../assets/trash-01.png";
import exportone from "../assets/download-cloud-02.png";
import '../SignIn/SignIn.css'
import * as XLSX from 'xlsx';

const Deposit = () => {
  const [entries, setEntries] = useState([]);
  const [branchId, setBranchId] = useState("");
  const [selectedEntries, setSelectedEntries] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [filteredBanks, setFilteredBanks] = useState([]);
  const [bankSearch, setBankSearch] = useState("");
  const [showFullList, setShowFullList] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const dropdownRef = useRef(null);

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

  useEffect(() => {
    // Filter banks based on the search query
    setFilteredBanks(
      banks.filter((bank) =>
        bank.toLowerCase().includes(bankSearch.toLowerCase())
      )
    );
  }, [bankSearch]);

  const initialFormState = {
    player_id: "",
    utr_id: "",
    amount: "",
    bank_name: "",
    remark: "",
  };

  const [formData, setFormData] = useState(initialFormState);

  // Ensure state update is only triggered under specific conditions
  const handleReset = () => {
    setFormData(initialFormState);
  };


  const [message, setMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const entriesPerPage = 20;
  // Function to handle form field changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Close dropdown when clicking outside the component
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false); // Hide the dropdown
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setBankSearch(query);

    if (query.trim() === '') {
      setFilteredBanks([]);
    } else {
      const filtered = banks.filter((bank) =>
        bank.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredBanks(filtered);
      setShowDropdown(true); // Show dropdown only when there are results
    }
  };

  const handleBankSelect = (bank) => {
    setFormData({ ...formData, bank_name: bank });
    setBankSearch(bank);
    setFilteredBanks([]);
    setShowFullList(false);
  };

  const toggleShowFullList = () => {
    setShowFullList((prev) => !prev);
  };

  useEffect(() => {
    // Get the token from local storage
    const token = localStorage.getItem("token");
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
    fetchEntries();
  }, []);
  // Function to submit the form and add a new entry
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://api.cptechsolutions.com/api/deposit-withdraw/add-entry",
        formData
      );
      toast.success("Entry added successfully.");
      setFormData({
        player_id: "",
        branch_id: "",
        utr_id: "",
        amount: "",
        bank_name: "",
        remark: "",
        bonus: "",
        created_at: "",
      });
      window.location.reload();
      fetchEntries();
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Error adding entry. Please try again.";
      toast.error(errorMessage);
    }
  };
  const fetchEntries = async () => {
    try {
      // {api.cptechsolutions.com}localhost:8000
      const response = await axios.get(
        "http://api.cptechsolutions.com/api/deposit-withdraw/entries"
      );
      // Sort entries so that the most recent entries come first
      const sortedEntries = response.data.data.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );

      setEntries(sortedEntries);
    } catch (error) {
      console.error("Error fetching entries:", error);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);


  const handleCheckboxChange = (id) => {
    setSelectedEntries((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((entryId) => entryId !== id)
        : [...prevSelected, id]
    );
  };
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
        "http://api.cptechsolutions.com/api/deposit-withdraw/upload-excel",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success(response.data.message);
      setSelectedFile(null);
      fetchEntries();
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Error during bulk upload. Please try again.";
      toast.error(errorMessage);
    }
  };
  const handleDelete = async () => {
    try {
      // Delete each selected entry   {http://api.cptechsolutions.com }
      await Promise.all(
        selectedEntries.map((id) =>
          axios.delete(
            `http://api.cptechsolutions.com/api/deposit-withdraw/delete-entry/${id}`
          )
        )
      );
      toast.success("Selected entries deleted successfully.");
      setSelectedEntries([]);
      fetchEntries();
    } catch (error) {
      toast.error("Error deleting entries. Please try again.");
    }
  };

  const filteredEntries = entries.filter(
    (entry) =>
      entry.player_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.utr_id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // const currentEntries = entries.slice((currentPage - 1) * entriesPerPage, currentPage * entriesPerPage);
  const currentEntries = filteredEntries.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  // const handleBankNameChange = (id, newBankName) => {
  //   const updatedEntries = entries.map((entry) =>
  //     entry.id === id ? { ...entry, bank_name: newBankName } : entry
  //   );
  //   setEntries(updatedEntries);
  // };


  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const totalPages = Math.ceil(entries.length / entriesPerPage);
  // new changes
  const handleBankNameChange = (id, newBankName) => {
    const updatedEntries = entries.map((entry) =>
      entry.id === id ? { ...entry, bank_name: newBankName } : entry
    );
    setEntries(updatedEntries);
  };



  const exportToExcel = () => {
    if (filteredEntries.length === 0) {
      alert('No data to export');
      return;
    }

    // Prepare the data for Excel
    const dataToExport = filteredEntries.map((entry) => ({
      Date: new Date(entry.created_at).toLocaleDateString('en-GB', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }),
      'Player ID': entry.player_id,
      'UTR ID': entry.utr_id,
      Amount: entry.amount,
      'Bank Name': entry.bank_name,
      'Branch ID': entry.branch_id,
    }));

    // Convert JSON data to a worksheet
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);

    // Create a new workbook and append the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Report');

    // Write the workbook and trigger the download
    XLSX.writeFile(workbook, 'Report.xlsx');
  };
  // ------------------------------
  const handleEdit = (entry) => {
    setSelectedEntry(entry);
    setIsModalOpen(true);
  };
  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `http://api.cptechsolutions.com/api/deposit-withdraw/update-entry/${selectedEntry.id}`,
        selectedEntry
      );
      console.log("Update successful:", response.data);
      setIsModalOpen(false);
      fetchEntries(); // Refresh the entries list
    } catch (error) {
      console.error("Error updating entry:", error);
    }
  };

  useEffect(() => {
    // Set today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split("T")[0];
    setFormData((prevData) => ({ ...prevData, created_at: today }));
  }, []);

  const handleChangeupdate = (e) => {
    const { name, value } = e.target;
    setSelectedEntry((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <div>
        <div className="flex ">
          {/* Sidebar */}
          <Sidebar className="fixed " />
          {/* Main Content */}
          <div className="ml-60 p-6 bg-gray-100 dark:bg-gray-800 min-h-screen w-full text-gray-900 dark:text-gray-200 overflow-hidden">
            <div className="max-w-5xl mr-1 mx-auto justify-between items-center mb-8 ml-10 rounded ">
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg ml-10">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                    Overview
                  </h2>
                  <div className="flex items-center space-x-4">
                    <button className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-600 rounded-full">
                      Today
                    </button>
                    {/* <button className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-600 rounded-full flex items-center">
                      Select dates
                      <svg
                        className="w-5 h-5 ml-2 text-gray-500 dark:text-gray-300"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </button> */}
                  </div>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {/* Amount Deposited Card */}
                  <div className="flex items-center p-4 bg-white dark:bg-gray-700 rounded-lg shadow">
                    <div className="p-4 bg-[#E0D7C8] rounded-full">
                      <svg
                        className="w-8 h-8 text-gray-700"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 10l1.94 1.94L7 7h3.74l-1.62 6 4.38-4.4h3.75l-1.63 6H17l1.94 1.94M2 2l20 20"
                        />
                      </svg>
                    </div>
                    <div className="ml-4 ">
                      <h3 className="text-lg text-gray-800 dark:text-gray-200">
                        Amount Deposited
                      </h3>
                      <p className="text-2xl font-bold text-gray-900">5,423</p>
                      <p className="text-sm text-green-500">▲ 16% this month</p>
                    </div>
                  </div>

                  {/* Total Entries Card */}
                  <div className="flex items-center p-4 bg-white rounded-lg shadow">
                    <div className="p-4 bg-[#E0D7C8] rounded-full">
                      <svg
                        className="w-8 h-8 text-gray-700"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 12h6m-6 4h6M5 7h14M7 3h10v18H7V3z"
                        />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg  text-gray-800">Total Entries</h3>
                      <p className="text-2xl font-bold text-gray-900">1,893</p>
                      <p className="text-sm text-red-500">▼ 1% this month</p>
                    </div>
                  </div>

                  {/* New User Added Card */}
                  <div className="flex items-center p-4 bg-white rounded-lg shadow ">
                    <div className="p-4 bg-[#E0D7C8] rounded-full">
                      <svg
                        className="w-8 h-8 text-gray-700"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 14l9-5-9-5-9 5 9 5zm0 0v8"
                        />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg  text-gray-800">New User Added</h3>
                      <p className="text-2xl font-bold text-gray-900">189</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* <h1 className="text-4xl font-bold mb-6 text-gray-800" style={{ marginLeft: '20px' }}>Deposit Entries</h1> */}
              <div className="flex items-center mb-6 ml-10 mt-10">
                <img
                  src={deposite}
                  alt="Deposit Icon"
                  className="w-5 h-5 ml-2 text-gray-500"
                />
                <h2 className="text-lg font-semibold text-gray-700 ml-2">
                  Deposit Entries
                </h2>
                <div className="flex items-center space-x-4"></div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg ml-10">
                {/* Form to Add New Entry */}
                <form onSubmit={handleSubmit} className="mb-6">
                  <div className="grid grid-cols-6 gap-4" style={{ marginLeft: "20px" }}>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700">Player ID</label>
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

                    <div className="relative" ref={dropdownRef}>
                      {/* Input Field for Bank Name */}
                      <label htmlFor="bank_name" className="block text-xs font-semibold text-gray-700">
                        Bank Name
                      </label>
                      <input
                        type="text"
                        id="bankSearch"
                        name="bankSearch"
                        value={bankSearch}
                        onChange={handleSearchChange}
                        placeholder="Search bank"
                        className="w-full border rounded px-2 py-1 text-sm"
                      />

                      {/* Dropdown List for Bank Selection */}
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

                    {/* Select Date Field */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-700">Select Date</label>
                      <input
                        type="date"
                        name="created_at"
                        value={formData.created_at}
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
                        value={formData.branch_id || "Admin"}
                        onChange={handleChange}
                        className="w-full border rounded px-2 py-1 text-sm"
                        readOnly={!!formData.branch_id}
                        placeholder="Enter Branch ID"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700">Bonus</label>
                      <input
                        type="text"
                        name="bonus"
                        value={formData.bonus}
                        onChange={handleChange}
                        className="w-full border rounded px-2 py-1 text-sm"
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

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="mt-4 w-40 h-10 bg-[#001A3B] hover:bg-[#fff] text-white hover:text-[#001A3B] border hover:border-[#001A3B] py-2 rounded right-0"
                    style={{ marginLeft: "20px" }}
                  >
                    Add Entry
                  </button>

                  {/* Reset Button */}
                  <button
                    type="button"
                    className="mt-4 w-40 h-10 bg-[#001A3B] hover:bg-[#fff] text-white hover:text-[#001A3B] border hover:border-[#001A3B] py-2 rounded right-0"
                    onClick={() => setFormData(initialFormState)} // Reset logic here
                    style={{ marginLeft: "20px" }}
                  >
                    Reset Form
                  </button>
                </form>

                <hr />

                {/* Bulk Upload Section */}
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

              <br />
              <ToastContainer />

              {/* {message && <p className="text-center text-green-600 mb-4">{message}</p>} */}

              {/* Table to Display Entries */}
              <div className="p-4 bg-gray-50 rounded-lg ml-10">
                {/* Toolbar */}
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
                        placeholder="Search by Player ID or UTR ID"
                        value={searchQuery}
                        onChange={handleSearch}
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                      <svg
                        className="w-5 h-5 text-gray-400 absolute left-3 top-2.5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M21 21l-4.35-4.35M9 17a8 8 0 100-16 8 8 0 000 16z"
                        />
                      </svg>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    {/* Filter Button */}
                    {/* <button  className="px-2 py-2 bg-[#001A3B] hover:bg-[#fff] text-white hover:text-[#001A3B] border hover:border-[#001A3B] py-2 rounded right-0">
                Filters
              </button> */}

                    {/* Export Button */}
                    <button
                      className="bg-transperent hover:bg-[#fff] text-[#001A3B] hover:text-[#001A3B] border hover:border-[#001A3B] py-2 rounded right-0"
                      style={{ height: "40px", width: "100px" }}
                      onClick={exportToExcel}
                    >
                      <img
                        src={exportone}
                        alt="export"
                        className="w-5 h-5 inline"
                      />{" "}
                      Export
                    </button>
                    <button
                      className={`bg-red-500 text-white px-4 py-2 rounded ${selectedEntries.length === 0
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                        }`}
                      onClick={handleDelete}
                      disabled={selectedEntries.length === 0}
                    >
                      Delete
                    </button>
                  </div>
                </div>
                {/* Table */}
                <div className="ml-[-6px]">
                  <table className="min-w-full border border-gray-300 rounded-lg">
                    <thead className="bg-gray-100 text-gray-600">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold border-b">
                          <input
                            type="checkbox"
                            className="form-checkbox"
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedEntries(
                                  entries.map((entry) => entry.id)
                                );
                              } else {
                                setSelectedEntries([]);
                              }
                            }}
                            checked={
                              selectedEntries.length === entries.length &&
                              entries.length > 0
                            }
                          />
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold border-b">
                          Date
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold border-b">
                          Player ID
                        </th>
                        <th className="px-1 py-1 text-left text-sm font-semibold border-b">
                          UTR ID
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold border-b">
                          Amount
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold border-b">
                          Bank Name
                        </th>
                        <th className="px-4 py-2 text-left text-sm font-semibold border-b">
                          Branch ID
                        </th>
                        <th className="px-1 py-1 text-left text-sm font-semibold border-b">
                          Bonus
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold border-b">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white text-gray-800">
                      {filteredEntries.map((entry, index) => (
                        <tr
                          key={index}
                          className={`hover:bg-gray-50 transition-colors duration-150 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"
                            }`}
                        >
                          <td className="px-4 py-4 border-b text-sm">
                            <input
                              type="checkbox"
                              className="form-checkbox"
                              onChange={() => handleCheckboxChange(entry.id)}
                              checked={selectedEntries.includes(entry.id)}
                            />
                          </td>
                          <td className="px-4 py-4 border-b text-sm">
                            {new Date(entry.created_at).toLocaleDateString("en-GB", {
                              year: "numeric",
                              month: "2-digit",
                              day: "2-digit",
                            })}
                          </td>
                          <td className="px-4 py-3 border-b text-sm">{entry.player_id}</td>
                          <td className="px-1 py-1 border-b text-sm">{entry.utr_id}</td>
                          <td className="px-4 py-2 border-b text-sm">{entry.amount}</td>
                          <td className="px-4 py-2 border-b text-sm">{entry.bank_name}</td>
                          <td className="px-4 py-2 border-b text-sm">{entry.branch_id}</td>
                          <td className="px-1 py-1 border-b text-sm">{entry.bonus}</td>
                          <td className="px-4 py-3 border-b text-sm">
                            <button
                              className="text-blue-500 hover:text-blue-700"
                              onClick={() => handleEdit(entry)}
                            >
                              <img
                                src={edit}
                                alt="Edit"
                                className="w-4 h-4 inline"
                              />
                            </button>

                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {/* Pagination */}
                <div className="flex justify-center mt-4">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                    if (
                      page <= 3 || // First three pages
                      page > totalPages - 3 || // Last three pages
                      (page >= currentPage - 1 && page <= currentPage + 1) // Pages around the current page
                    ) {
                      return (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`px-3 py-1 border rounded ${currentPage === page
                            ? 'bg-blue-500 text-white'
                            : 'bg-white text-gray-700'
                            }`}
                        >
                          {page}
                        </button>
                      );
                    }

                    // Add ellipsis for skipped pages
                    if (
                      (page === 4 && currentPage > 4) || // Ellipsis after first three pages
                      (page === totalPages - 3 && currentPage < totalPages - 3) // Ellipsis before last three pages
                    ) {
                      return (
                        <span key={page} className="px-3 py-1 text-gray-500">
                          ...
                        </span>
                      );
                    }

                    return null; // Skip other pages
                  })}
                </div>

              </div>
            </div>
          </div>
        </div>
        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-1/3">
              <h2 className="text-lg font-semibold mb-4">Edit Entry</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Date
                  </label>
                  <input
                    type="date"
                    name="created_at"
                    value={
                      selectedEntry.created_at
                        ? new Date(selectedEntry.created_at).toISOString().slice(0, 10)
                        : ""
                    }
                    onChange={handleChangeupdate}
                    className="w-full border rounded px-2 py-1 text-sm"
                  />

                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Player ID
                  </label>
                  <input
                    type="text"
                    name="player_id"
                    value={selectedEntry.player_id}
                    onChange={handleChangeupdate}
                    className="w-full border rounded px-2 py-1 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    UTR ID
                  </label>
                  <input
                    type="text"
                    name="utr_id"
                    value={selectedEntry.utr_id}
                    onChange={handleChangeupdate}
                    className="w-full border rounded px-2 py-1 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Amount
                  </label>
                  <input
                    type="number"
                    name="amount"
                    value={selectedEntry.amount}
                    onChange={handleChangeupdate}
                    className="w-full border rounded px-2 py-1 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Bank Name
                  </label>
                  <input
                    type="text"
                    name="bank_name"
                    value={selectedEntry.bank_name}
                    onChange={handleChangeupdate}
                    className="w-full border rounded px-2 py-1 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Branch ID
                  </label>
                  <input
                    type="text"
                    name="branch_id"
                    value={selectedEntry.branch_id}
                    onChange={handleChangeupdate}
                    className="w-full border rounded px-2 py-1 text-sm"
                  />
                </div>
              </div>
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="mt-4 w-40 h-10 bg-[#001A3B] hover:bg-[#fff] text-white hover:text-[#001A3B] border hover:border-[#001A3B] py-2 rounded right-0"                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdate}
                  className="mt-4 w-40 h-10 bg-[#001A3B] hover:bg-[#fff] text-white hover:text-[#001A3B] border hover:border-[#001A3B] py-2 rounded right-0"                >
                  Update
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Deposit;
