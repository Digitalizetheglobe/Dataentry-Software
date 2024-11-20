import React, { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import button3 from "../assets/icons/Button (3).png";

const ExpenseData = () => {
  const [activeTab, setActiveTab] = useState("addExpense");

  return (
    <>
      <div>
        <div className="flex">
          <Sidebar className="fixed" />
          <div className="ml-80 p-6 min-h-screen w-full text-gray-900 dark:text-gray-200">
            <div className="bg-gray-100 rounded-lg flex max-w-5xl mr-1 mx-auto items-center p-2">
              <img src={button3} className="w-8 h-8" />
              <h2 className="text-gray-500 mx-2">Expense Management </h2>
              <div className="flex ml-auto space-x-2"></div>
            </div>

            <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 mt-6 rounded-md">
              <div className="bg-white w-11/12 max-w-4xl rounded-lg shadow-md p-6">
                <h1 className="text-lg font-semibold mb-4">Expense Data</h1>
                <div className="flex space-x-6 border-b pb-2 mb-6 text-gray-500">
                  <button
                    onClick={() => setActiveTab("addExpense")}
                    className={`pb-2 ${
                      activeTab === "addExpense"
                        ? "text-[#001A3B] border-b-2 border-[#001A3B]"
                        : "hover:text-[#001A3B]"
                    }`}
                  >
                    Add New Expense
                  </button>
                  <button
                    onClick={() => setActiveTab("allExpenses")}
                    className={`pb-2 ${
                      activeTab === "allExpenses"
                        ? "text-[#001A3B] border-b-2 border-[#001A3B]"
                        : "hover:text-[#001A3B]"
                    }`}
                  >
                    All Expenses
                  </button>
                </div>

                {/* Add New Expense Form */}
                {activeTab === "addExpense" && (
                  <form className="bg-[#E7F1F0] rounded-lg p-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-[#001A3B]">
                          Type of Expense
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Food"
                          className="w-full text-[#001A3B99] p-2 mt-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-[#001A3B]">
                          Amount
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. 1200.05"
                          className="w-full p-2 mt-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-[#001A3B]">
                          Date
                        </label>
                        <input
                          type="date"
                          className="w-full p-2 mt-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-[#001A3B]">
                          Bank Name
                        </label>
                        <select className="w-full p-2 mt-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300">
                          <option value="" disabled selected>
                            Selected bank account
                          </option>
                          <option value="Bank1">Bank 1</option>
                          <option value="Bank2">Bank 2</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-[#001A3B]">
                        Name
                      </label>
                      <input
                        type="text"
                        placeholder="Enter your name"
                        className="w-full p-2 mt-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-[#001A3B]">
                        Remark
                      </label>
                      <textarea
                        placeholder="Enter Remark"
                        className="w-full p-2 mt-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      className="bg-[#001A3B] text-white py-2 px-4 rounded hover:bg-transparent border border-[#001A3B] hover:text-[#001A3B] focus:outline-none focus:ring-2 focus:ring-blue-300"
                    >
                      + Add New Expense
                    </button>
                  </form>
                )}

                {/* All Expenses Cards */}
                {activeTab === "allExpenses" && (
                  <div className="space-y-4">
                    <div className="justify-between items-center bg-gray-100 rounded-lg flex max-w-5xl mr-1 mx-auto items-center p-2">
                      <input
                        type="text"
                        placeholder="Search date, type, amount"
                        className="w-2/3 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                      />
                      <div className="flex space-x-2">
                        <button className="bg-gray-200 text-gray-600 py-2 px-4 rounded hover:bg-gray-300">
                          Filters
                        </button>
                       
                      </div>
                    </div>

                    {/* Expenses Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white border border-gray-200 rounded-lg shadow p-4">
                        <h2 className="text-lg font-semibold mb-4">
                          Type of expense
                        </h2>
                       <hr/>

                        <div className="flex justify-between text-sm text-gray-600 mt-4 mb-4 ">
                          <span>20 Nov, 2024</span>
                          <span>$400</span>
                        </div>d
                        <hr/>
                        <p className="text-sm text-gray-600 mt-4">
                          <strong>Bank Name:</strong> Selected bank account
                        </p>
                       
                        <p className="text-sm text-gray-600 mt-2">
                          <strong>Name:</strong> Entered Name
                        </p>
                        <hr/>
                        <li
                         className="text-sm text-gray-600 mt-4">
                          Remark written by the manager will be shown here
                        
                        </li>
                      </div>
                    </div>
                    
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExpenseData;
