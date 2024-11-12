import React from 'react';

const BankWiseDeposit = () => {
    // Mock data for bank deposits
    const bankData = [
        { name: 'Bank 1', amount: 80 },
        { name: 'Bank 2', amount: 120 },
        { name: 'Bank 3', amount: 160 },
        { name: 'Bank 4', amount: 200 },
        { name: 'Bank 5', amount: 243, highlight: true },
        { name: 'Bank 6', amount: 100 },
        { name: 'Bank 7', amount: 140 },
        { name: 'Bank 8', amount: 180 },
        { name: 'Bank 9', amount: 120 },
        { name: 'Bank 10', amount: 160 },
        { name: 'Bank 11', amount: 200 },
        { name: 'Bank 12', amount: 150 },
    ];

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg mt-10 mx-20">
            <div className="flex items-center justify-between mb-4">
                {/* Header Links */}
                <div className="flex space-x-6 text-sm font-medium">
                    <span className="text-[#001A3B] border-b-2 border-[#001A3B] pb-1 cursor-pointer">Bank wise Deposit</span>
                    <span className="text-gray-500 cursor-pointer">Branch wise Deposit</span>
                    <span className="text-gray-500 cursor-pointer">Branch wise withdrawal</span>
                    <span className="text-gray-500 cursor-pointer">Bank wise withdrawal</span>
                </div>
                {/* Options Icon */}
                <div className="text-gray-400 cursor-pointer">...</div>
            </div>

            {/* Graph Container */}
            <div className="flex items-end justify-between mt-10">
                {bankData.map((bank, index) => (
                    <div
                        key={index}
                        className={`w-10 rounded-lg ${bank.highlight ? 'bg-gradient-to-b from-[#001A3B] to-[#243B55] h-36' : 'bg-[#f4e3c1] h-24'} relative flex flex-col items-center`}
                    >
                        {bank.highlight && (
                            <div className="absolute -top-6 bg-[#001A3B] text-white text-xs py-1 px-2 rounded-lg">
                                {bank.amount}K
                            </div>
                        )}
                        <div className={`text-xs text-gray-600 mt-2 ${bank.highlight ? 'font-bold' : ''}`} style={{ fontSize: '8px' }}>
                            {bank.name}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BankWiseDeposit;
