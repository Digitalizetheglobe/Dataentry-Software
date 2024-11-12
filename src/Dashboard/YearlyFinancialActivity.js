import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const YearlyFinancialActivity = () => {
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Deposit Amount',
                data: [10000, 15000, 12000, 30000, 20000, 17000, 11000, 13000, 19000, 14000, 22000, 27000],
                backgroundColor: '#001A3B',
            },
            {
                label: 'Withdrawal Amount',
                data: [5000, 10000, 8000, 25000, 18000, 15000, 9000, 11000, 16000, 12000, 20000, 23000],
                backgroundColor: '#D4A373',
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'top',
                align: 'start',
                labels: {
                    usePointStyle: true,
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: (value) => `${value / 1000}K`,
                },
            },
        },
    };

    return (
        
        <div className="bg-white p-6 rounded-lg shadow-lg mt-10 ml-20"  >
            <div className="flex items-center gap-4 mb-4">
                <div className="font-bold text-lg">Yearly Financial Activity</div>
                <div className="flex gap-4 ml-auto">
                    <span className="text-[#001A3B] font-bold">• Deposit Amount</span>
                    <span className="text-[#D4A373] font-bold">• Withdrawal Amount</span>
                </div>
            </div>
            <div className="h-64">
                <Bar data={data} options={options} />
            </div>
        </div>
    );
};

export default YearlyFinancialActivity;
