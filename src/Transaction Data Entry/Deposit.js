import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../Sidebar/Sidebar";
import { jwtDecode } from "jwt-decode";
import deposite from "../assets/deposit.png";
import edit from "../assets/Shape.png";
import trash from "../assets/trash-01.png";
import exportone from "../assets/download-cloud-02.png";

const Deposit = () => {
  const [entries, setEntries] = useState([]);
  const [branchId, setBranchId] = useState("");
  const [selectedEntries, setSelectedEntries] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    player_id: "",
    branch_id: "",
    utr_id: "",
    amount: "",
    bank_name: "",
    remark: "",
  });
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
  useEffect(() => {
    // Get the token from local storage
    const token = localStorage.getItem("token");
    if (token) {
      // Decode the token to get the branch ID
      const decoded = jwtDecode(token);
      if (decoded.branch_id) {
        setBranchId(decoded.branch_id);
        // Set the branch ID in the form data automatically
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
      });
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

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };
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

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const totalPages = Math.ceil(entries.length / entriesPerPage);
  // new changes

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
                  <div
                    className="grid grid-cols-6 gap-4"
                    style={{ marginLeft: "20px" }}
                  >
                    <div>
                      <label className="block text-xs font-semibold text-gray-700">
                        Player ID
                      </label>
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
                      <label className="block text-xs font-semibold text-gray-700">
                        UTR ID
                      </label>
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
                      <label className="block text-xs font-semibold text-gray-700">
                        Amount
                      </label>
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
                      <label className="block text-xs font-semibold text-gray-700">
                        Bank Name
                      </label>
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
                      <label className="block text-xs font-semibold text-gray-700">
                        Branch ID
                      </label>
                      <input
                        type="text"
                        name="branch_id"
                        value={formData.branch_id}
                        onChange={handleChange}
                        className="w-full border rounded px-2 py-1 text-sm"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700">
                        Remark
                      </label>
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
                    className="mt-4 w-40 h-10 bg-[#001A3B] hover:bg-[#fff] text-white hover:text-[#001A3B] border hover:border-[#001A3B] py-2 rounded right-0"
                    // className=" py-2 px-4 rounded-md"

                    style={{ marginLeft: "20px" }}
                  >
                    Add Entry
                  </button>

                  <button
                    type="submit"
                    className="mt-4 w-40 h-10 bg-[#001A3B] hover:bg-[#fff] text-white hover:text-[#001A3B] border hover:border-[#001A3B] py-2 rounded right-0"
                    // className=" py-2 px-4 rounded-md"

                    style={{ marginLeft: "20px" }}
                  >
                    Reset Form
                  </button>
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
                        onChange={handleSearchChange}
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
                    {/* <button
                      className="bg-transperent hover:bg-[#fff] text-[#001A3B] hover:text-[#001A3B] border hover:border-[#001A3B] py-2 rounded right-0"
                      style={{ height: "40px", width: "100px" }}
                    >
                      <img
                        src={exportone}
                        alt="export"
                        className="w-5 h-5 inline"
                      />{" "}
                      Export
                    </button> */}
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
                        <th className="px-4 py-3 text-left text-sm font-semibold border-b">
                          UTR ID
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold border-b">
                          Amount
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold border-b">
                          Bank Name
                        </th>
                        <th className="px-10 py-3 text-left text-sm font-semibold border-b">
                          Branch ID
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold border-b">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white text-gray-800">
                      {currentEntries.map((entry, index) => (
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
                            {new Date(entry.date).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-4 border-b text-sm">
                            {entry.player_id}
                          </td>
                          <td className="px-4 py-4 border-b text-sm">
                            {entry.utr_id}
                          </td>
                          <td className="px-6 py-4 border-b text-sm">
                            {entry.amount}
                          </td>
                          <td className="px-6 py-4 border-b text-sm">
                            {entry.bank_name}
                          </td>
                          <td className="px-10 py-4 border-b text-sm">
                            {entry.branch_id}
                          </td>
                          <td className="px-4 py-4 border-b text-sm">
                            <button className="text-blue-500 hover:text-blue-700">
                              <img
                                src={edit}
                                alt="Edit"
                                className="w-4 h-4 inline"
                              />
                            </button>
                            {/* <button
                    className="text-red-500 hover:text-red-700 ml-2"
                    onClick={() => handleCheckboxChange(entry.id)}
                  >
                    <img src={trash} alt="Delete" className="w-4 h-4 inline" />
                  </button> */}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {/* Pagination */}
                <div className="flex justify-center mt-4">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => handlePageChange(i + 1)}
                      className={`px-3 py-1 border rounded ${currentPage === i + 1
                        ? "bg-blue-500 text-white"
                        : "bg-white text-gray-700"
                        }`}
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

export default Deposit;
