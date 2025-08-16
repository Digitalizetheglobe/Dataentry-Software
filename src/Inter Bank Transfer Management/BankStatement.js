import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Sidebar from "../Sidebar/Sidebar";

const BankStatement = () => {
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    bank_name: "",
  });
  const [statement, setStatement] = useState(null);
  const [error, setError] = useState("");
  const [bankName, setBankName] = useState("");

  const banks = [
    // New bank names
    "SHIV-JSB-304",
    "RATHOD-CSB-7837",
    "SHIV-SAHAYOG-9065",
    "SHIV-BMC-8606",
    "MERAGE-BMC-8607",
    "SHIV-BHARAT-6788",
    "SHIV-HDFC-4651",
    "SHIV-KOKAN-1889",
    "MARHABA-IOB-1841",
    "YUSUF-IOB-4162",
    "BLACKBAG-IOB-1847",
    "MOMTAZ-IOB-4174",
    "GARMENT-IOB-1865",
    "MD-IOB-4318",
    "SMART-IOB-1848",
    "MD-IOB-4179",
    "SWAG-BOI-0940",
    "MARHABA--COSMOS-2066",
    "TOFIK-BOI-7800",
    "BHARGAV-BOI-6774",
    "SAHIL-BOI-6770",
    "KUKAVA-BOI-4669",
    "SUMRA-BOI-4679",
    "GANESH-IOB-1413",
    "GANESHH--JALGAON-0380",
    "BALAJI-JALGAON-0403",
    "RADHIKA-J&K-0375",
    "RADHIKA-PSB-0629",
    "A2ZIOB-0358",
    "MAHIRA-PSB-6800",
    "BALWINDER-SURYODAY-8807",

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
    "Other",
  ];

  const [bankSearch, setBankSearch] = useState("");
  const [filteredBanks, setFilteredBanks] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

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

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fetchBankStatement = async () => {
    try {
      const { startDate, endDate, bank_name } = formData;
      if (!startDate || !endDate || !bank_name.trim()) {
        setError("Please fill all fields.");
        return;
      }

      const response = await axios.get(
        "https://api.cptechsolutions.com/api/bank-statement",
        {
          params: { startDate, endDate, bank_name },
        }
      );

      setStatement(response.data.data);
      setError("");
    } catch (error) {
      console.error("Error fetching bank statement:", error);
      setError("Failed to fetch bank statement. Please try again.");
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    }).format(amount);
  };

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
    setBankSearch(bank); // Update the search input
    setFilteredBanks([]); // Clear filtered list
    setShowDropdown(false); // Hide dropdown
  };

  return (
    <>
      <div className="flex ">
        <Sidebar className="fixed h-full w-60 bg-blue-900 text-white dark:bg-gray-800" />
        <div className="ml-80 p-6 bg-gray-100 dark:bg-gray-800 min-h-screen w-full text-gray-900 dark:text-gray-200 overflow-hidden max-w-auto">
          <div className=" bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-200">
            <h1 className="text-2xl font-bold mb-4">Bank Statement</h1>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  Start Date
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  End Date
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2 text-sm"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Bank Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="bank_name"
                    value={bankSearch}
                    onChange={handleSearchChange}
                    placeholder="Search bank name"
                    className="w-full border rounded px-3 py-2 text-sm"
                    onFocus={() => setShowDropdown(true)} // Show dropdown on focus
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
                            setFormData({ ...formData, bank_name: bank }); // Update formData with selected bank
                          }}
                        >
                          {bank}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              <div className="col-span-2">
                <button
                  onClick={fetchBankStatement}
                  className="w-full sm:w-auto bg-[#001A3B] hover:bg-[#fff] text-white hover:text-[#001A3B] border hover:border-[#001A3B] py-2 px-4 rounded mb-4"
                >
                  Generate Statement
                </button>
              </div>
            </div>

            {error && <p className="text-red-500 mt-4">{error}</p>}

            {statement && (
              <div className="mt-6 p-6 bg-gray-50 shadow-lg rounded-xl border border-gray-200">
                <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">
                  Bank Statement ( Deposit And Withdrawal )
                </h2>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700">
                      Bank Name
                    </label>
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
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Start Date
                    </p>
                    <p className="text-lg font-semibold text-gray-800">
                      {statement.startDate}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      End Date
                    </p>
                    <p className="text-lg font-semibold text-gray-800">
                      {statement.endDate}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm font-medium text-blue-600">
                      Opening Balance (Last Day Deposit )
                    </p>
                    <p className="text-xl font-bold text-blue-800">
                      {formatCurrency(statement.openingBalance)}
                    </p>
                  </div>
                  <div className="p-4 bg-red-50 rounded-lg">
                    <p className="text-sm font-medium text-red-600">
                      Total Withdrawals
                    </p>
                    <p className="text-xl font-bold text-red-800">
                      {formatCurrency(statement.totalWithdrawals)}
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <p className="text-sm font-medium text-green-600">
                      Total Deposits
                    </p>
                    <p className="text-xl font-bold text-green-800">
                      {formatCurrency(statement.totalDeposits)}
                    </p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <p className="text-sm font-medium text-purple-600">
                      Closing Balance
                    </p>
                    <p className="text-xl font-bold text-purple-800">
                      {formatCurrency(statement.closingBalance)}
                    </p>
                  </div>
                </div>
              </div>
            )}
            <br />
            {statement && (
              <button
                onClick={() => {
                  setFormData({ startDate: "", endDate: "", bank_name: "" });
                  setStatement(null);
                  setError("");
                  setBankSearch("");
                  setFilteredBanks([]);
                  setShowDropdown(false);
                }}
                className="w-full sm:w-auto bg-[#001A3B] hover:bg-[#fff] text-white hover:text-[#001A3B] border hover:border-[#001A3B] py-2 px-4 rounded mb-4"
              >
                Generate Another Bank Report
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BankStatement;
