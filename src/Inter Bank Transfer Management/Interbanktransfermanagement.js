import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../Sidebar/Sidebar';

const InterbankTransferManagement = () => {
  const [formData, setFormData] = useState({
    sender_bank: '',
    amount: '',
    receiving_bank: '',
    utr_id: '',
    branch_id: '',
    date: '',
  });

  const [transfers, setTransfers] = useState([]);
  const [bankSearchSender, setBankSearchSender] = useState('');
  const [bankSearchReceiver, setBankSearchReceiver] = useState('');
  const [filteredBanksSender, setFilteredBanksSender] = useState([]);
  const [filteredBanksReceiver, setFilteredBanksReceiver] = useState([]);

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
    "Other"

  ];

  useEffect(() => {
    // Automatically filter sender banks
    setFilteredBanksSender(
      banks.filter((bank) =>
        bank.toLowerCase().includes(bankSearchSender.toLowerCase())
      )
    );

    // Automatically filter receiver banks
    setFilteredBanksReceiver(
      banks.filter((bank) =>
        bank.toLowerCase().includes(bankSearchReceiver.toLowerCase())
      )
    );
  }, [bankSearchSender, bankSearchReceiver]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const usernameFromToken = decoded.username;
        setFormData((prevFormData) => ({
          ...prevFormData,
          branch_id: usernameFromToken,
        }));
      } catch (error) {
        console.error('Failed to decode token:', error);
      }
    }

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
      const response = await axios.post(
        'http://localhost:8000/api/interbank-transfer/add-transfer',
        formData
      );
      toast.success(response.data.message);
      setFormData({
        sender_bank: '',
        amount: '',
        receiving_bank: '',
        utr_id: '',
        branch_id: formData.branch_id,
        date: formData.date,
      });
      setBankSearchSender('');
      setBankSearchReceiver('');
      fetchTransfers();
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        'Error adding transfer. Please try again.';
      toast.error(errorMessage);
    }
  };

  const fetchTransfers = async () => {
    try {
      const response = await axios.get(
        'http://localhost:8000/api/interbank-transfer/transfers'
      );
      setTransfers(response.data.data);
    } catch (error) {
      toast.error('Error fetching transfers.');
      console.error('Error fetching transfers:', error);
    }
  };

  const handleBankSelect = (field, bank) => {
    setFormData((prev) => ({
      ...prev,
      [field]: bank,
    }));

    if (field === 'sender_bank') {
      setBankSearchSender('');
    } else if (field === 'receiving_bank') {
      setBankSearchReceiver('');
    }
  };

  return (
    <>
      <div>
        <div className="flex">
          <Sidebar className="fixed" />

          <div className="ml-60 p-6 bg-gray-100 dark:bg-gray-800 min-h-screen w-full text-gray-900 dark:text-gray-200 overflow-hidden">
            <div className="max-w-5xl mr-1 mx-auto justify-between items-center mb-8 ml-10 rounded">
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg ml-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                    Inter Bank Transfer Management
                  </h2>
                </div>
                <form onSubmit={handleSubmit} className="mb-6">
                  <div className="grid grid-cols-6 gap-4">
                    {/* Sender Bank */}
                    <div className="relative">
                      <label className="block text-sm font-semibold text-gray-700">
                        Sender Bank
                      </label>
                      <input
                        type="text"
                        value={bankSearchSender}
                        onChange={(e) => setBankSearchSender(e.target.value)}
                        placeholder="Search Sender Bank"
                        className="w-full border rounded px-3 py-2 text-sm"
                      />
                      {bankSearchSender && (
                        <ul className="absolute z-10 w-full bg-white border rounded shadow-lg">
                          {filteredBanksSender.map((bank, index) => (
                            <li
                              key={index}
                              onClick={() => handleBankSelect('sender_bank', bank)}
                              className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                            >
                              {bank}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    {/* Receiving Bank */}
                    <div className="relative">
                      <label className="block text-sm font-semibold text-gray-700">
                        Receiving Bank
                      </label>
                      <input
                        type="text"
                        value={bankSearchReceiver}
                        onChange={(e) => setBankSearchReceiver(e.target.value)}
                        placeholder="Search Receiving Bank"
                        className="w-full border rounded px-3 py-2 text-sm"
                      />
                      {bankSearchReceiver && (
                        <ul className="absolute z-10 w-full bg-white border rounded shadow-lg">
                          {filteredBanksReceiver.map((bank, index) => (
                            <li
                              key={index}
                              onClick={() => handleBankSelect('receiving_bank', bank)}
                              className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                            >
                              {bank}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    {/* Other Form Fields */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700">
                        Amount
                      </label>
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
                      <label className="block text-sm font-semibold text-gray-700">
                        UTR ID
                      </label>
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
                      <label className="block text-sm font-semibold text-gray-700">
                        Branch ID
                      </label>
                      <input
                        type="text"
                        name="branch_id"
                        value={formData.branch_id}
                        disabled
                        className="w-full border rounded px-3 py-2 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700">
                        Date
                      </label>
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
                    className="mt-4 bg-[#001A3B] hover:bg-[#fff] text-white hover:text-[#001A3B] border hover:border-[#001A3B] py-2 px-4 rounded-md"
                  >
                    Add Transfer
                  </button>
                </form>
              </div>
              <ToastContainer />

              {/* Table for Transfers */}
              <div className="overflow-x-auto ml-8">
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
                        <td className="px-4 py-2 border">
                          {new Date(transfer.date).toLocaleDateString()}
                        </td>
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

export default InterbankTransferManagement;
