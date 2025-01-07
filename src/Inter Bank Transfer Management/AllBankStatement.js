import React, { useState, useEffect, useRef } from 'react';
import Sidebar from '../Sidebar/Sidebar';

const AllBankStatement = () => {
    const [bankName, setBankName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [statement, setStatement] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [bankSearch, setBankSearch] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const [filteredBanks, setFilteredBanks] = useState([]);
    const dropdownRef = useRef(null);

    const [formData, setFormData] = useState({
    bank_name: '',
    startDate: '',
    endDate: ''
});

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

    const fetchBankStatement = async () => {
        if (!bankName || !startDate || !endDate) {
            alert('Please fill in all fields');
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const response = await fetch('http://api.cptechsolutions.com/api/bank-statement/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    bank_name: bankName,
                    startDate,
                    endDate,
                }),
            });

            const data = await response.json();
            if (response.ok) {
                setStatement(data.data); // Extract the data object from the response
            } else {
                setError(data.message || 'Error generating the statement');
            }
        } catch (err) {
            setError(err.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 2,
        }).format(amount);
    };

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
        setBankSearch(bank); // Update the search input
        setFilteredBanks([]); // Clear filtered list
        setShowDropdown(false); // Hide dropdown
        setBankName(bank); // Update bankName state
    };
    
    
    return (
        <>
            <div className="flex ">
                <Sidebar className="fixed h-full w-60 bg-blue-900 text-white dark:bg-gray-800" />
                <div className="ml-80 p-6 bg-gray-100 dark:bg-gray-800 min-h-screen w-full text-gray-900 dark:text-gray-200 overflow-hidden max-w-auto">
                    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
                        <h1 className="text-2xl font-bold text-center mb-6">Generate Bank Statement</h1>
                        <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                                <label className="block text-sm font-semibold text-gray-700">Bank Name</label>
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
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Start Date</label>
                                <input
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">End Date</label>
                                <input
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="col-span-2">
                                <button
                                    onClick={fetchBankStatement}
                                    className="w-full sm:w-auto bg-[#001A3B] hover:bg-[#fff] text-white hover:text-[#001A3B] border hover:border-[#001A3B] py-2 px-4 rounded mb-4" disabled={loading}
                                >
                                    {loading ? 'Generating...' : 'Generate Bank Statement'}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <div className="mt-6 p-4 bg-red-100 text-red-800 rounded-md">
                                <strong>Error:</strong> {error}
                            </div>
                        )}

                        {statement && (
                            <div className="mt-6 p-6 bg-gray-50 shadow-lg rounded-xl border border-gray-200">
                                <h2 className="text-xl font-bold mb-4 text-green-800">Bank Statement</h2>
                                {/* <div className="text-gray-800">
                                    <p><strong>Bank Name:</strong> {statement.bank_name}</p>
                                    <p><strong>Start Date:</strong> {statement.startDate}</p>
                                    <p><strong>End Date:</strong> {statement.endDate}</p>
                                    <p><strong>Opening Balance:</strong> {statement.openingBalance}</p>
                                    <p><strong>Closing Balance:</strong> {statement.closingBalance}</p>
                                    <p><strong>Total Deposits:</strong> {statement.totalDeposits}</p>
                                    <p><strong>Total Withdrawals:</strong> {statement.totalWithdrawals}</p>
                                    <h3 className="font-semibold mt-4">Breakdown:</h3>
                                    <ul className="list-disc ml-5">
                                        <li><strong>Direct Deposits:</strong> {statement.depositBreakdown.directDeposits}</li>
                                        <li><strong>Interbank Deposits:</strong> {statement.depositBreakdown.interbankDeposits}</li>
                                        <li><strong>Direct Withdrawals:</strong> {statement.withdrawalBreakdown.directWithdrawals}</li>
                                        <li><strong>Expenses:</strong> {statement.withdrawalBreakdown.expenses}</li>
                                        <li><strong>Interbank Withdrawals:</strong> {statement.withdrawalBreakdown.interbankWithdrawals}</li>
                                    </ul>
                                </div> */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Start Date</p>
                                        <p className="text-lg font-semibold text-gray-800">{statement.startDate}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">End Date</p>
                                        <p className="text-lg font-semibold text-gray-800">{statement.endDate}</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 mt-5 gap-4">
                                    <div className="p-4 bg-blue-100 rounded-lg">
                                        <p className="text-sm font-medium text-blue-600">Opening Balance</p>
                                        <p className="text-xl font-bold text-blue-800">{formatCurrency(statement.openingBalance)}</p>
                                    </div>
                                    <div className="p-4 bg-red-100 rounded-lg">
                                        <p className="text-sm font-medium text-red-600">Total Withdrawals</p>
                                        <p className="text-xl font-bold text-red-800">{formatCurrency(statement.totalWithdrawals)}</p>
                                    </div>
                                    <div className="p-4 bg-green-100 rounded-lg">
                                        <p className="text-sm font-medium text-green-600">Total Deposit :</p>
                                        <p className="text-xl font-bold text-green-800">{formatCurrency(statement.totalDeposits)}</p>
                                    </div>
                                    <div className="p-4 bg-purple-100 rounded-lg">
                                        <p className="text-sm font-medium text-purple-600">Closing Balance</p>
                                        <p className="text-xl font-bold text-purple-800">{formatCurrency(statement.closingBalance)}</p>
                                    </div>
                                </div>
                                <h3 className="font-semibold mt-4">Breakdown :</h3>
                                <div className="grid grid-cols-2 mt-4 gap-4">
                                    <div className="p-4 bg-blue-50 rounded-lg">
                                        <p className="text-sm font-medium text-blue-600">Dataentry Deposit</p>
                                        <p className="text-xl font-bold text-blue-800">{formatCurrency(statement.depositBreakdown.directDeposits)}</p>
                                    </div>
                                    {/* <li><strong>Direct Withdrawals:</strong></li> */}
                                    <div className="p-4 bg-red-100 rounded-lg">
                                        <p className="text-sm font-medium text-red-600">Dataentry Withdrawal</p>
                                        <p className="text-xl font-bold text-red-800"> {formatCurrency(statement.withdrawalBreakdown.directWithdrawals)}</p>
                                    </div>
                                    <div className="p-4 bg-green-100 rounded-lg">
                                        <p className="text-sm font-medium text-green-600">Interbank Deposit</p>
                                        <p className="text-xl font-bold text-green-800">{formatCurrency(statement.depositBreakdown.interbankDeposits)}</p>
                                    </div>
                                    <div className="p-4 bg-red-100 rounded-lg">
                                        <p className="text-sm font-medium text-red-600">Interbank Withdrawal</p>
                                        <p className="text-xl font-bold text-red-800">{formatCurrency(statement.withdrawalBreakdown.interbankWithdrawals)}</p>
                                    </div>
                                    <div className="p-4 bg-purple-100 rounded-lg">
                                        <p className="text-sm font-medium text-purple-600">Expenses</p>
                                        <p className="text-xl font-bold text-purple-800">{formatCurrency(statement.withdrawalBreakdown.expenses)}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default AllBankStatement;
