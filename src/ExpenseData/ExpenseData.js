import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import button3 from "../assets/icons/Button (3).png";
import axios from "axios"; // Import axios for API requests
import axios from "axios"; // Import axios for API requests

const ExpenseData = () => {
  const [activeTab, setActiveTab] = useState("addExpense");
  const [expenses, setExpenses] = useState([]);
  const [formData, setFormData] = useState({
    type_of_expense: "",
    amount: "",
    date: "",
    bankName: "",
    name: "",
    remark: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    // Destructure formData for clarity
    const { type_of_expense, amount, bank_name, date, name, remark } = formData;

    // Validate required fields
    if (!type_of_expense || !amount || !bank_name || !date) {
      setError("Type of expense, amount, bank name, and date are required.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://api.cptechsolutions.com/api/expenses/add-expense",
        {
          type_of_expense,
          amount,
          bank_name,
          date,
          name: name || "",
          remark: remark || "",
        }
      );

      console.log("Expense added:", response.data);
      setSuccess(true);
      setFormData({
        type_of_expense: "",
        amount: "",
        bank_name: "",
        date: "",
        name: "",
        remark: "",
      });
    } catch (err) {
      console.error("Error adding expense:", err);
      setError(err.response?.data?.message || "Failed to add expense");
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch expenses data
  const fetchExpenses = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        "http://api.cptechsolutions.com/api/expenses/expenses"
      );
      setExpenses(response.data.data); // Set the fetched expenses to the state
      console.log("Fetched Expenses:", response.data.data);
    } catch (err) {
      console.error("Error fetching expenses:", err);
      setError("Failed to fetch expenses data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // UseEffect to fetch expenses when switching to "All Expenses" tab
  useEffect(() => {
    if (activeTab === "allExpenses") {
      fetchExpenses();
    }
  }, [activeTab]);

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
                    className={`pb-2 ${activeTab === "addExpense"
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
                  <form
                    onSubmit={handleSubmit}
                    className="bg-[#E7F1F0] rounded-lg p-6 space-y-4"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-[#001A3B]">
                          Type of Expense
                        </label>
                        <input
                          className="w-full text-[#001A3B99] p-2 mt-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                          type="text"
                          name="type_of_expense"
                          value={formData.type_of_expense}
                          onChange={handleInputChange}
                          placeholder="e.g. New Office Supplies"
                          required
                        />

                      </div>
                      <div>
                        <label className="block text-sm font-bold text-[#001A3B]">
                          Amount
                        </label>
                        <input
                          className="w-full p-2 mt-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                          type="text"
                          name="amount"
                          value={formData.amount}
                          onChange={handleInputChange}
                          placeholder="e.g. 1200.5"
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-[#001A3B]">
                          Date
                        </label>
                        <input
                          className="w-full p-2 mt-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                          type="date"
                          name="date"
                          value={formData.date}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-[#001A3B]">
                          Bank Name
                        </label>
                        <select
                          className="w-full p-2 mt-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                          name="bank_name"
                          value={formData.bank_name}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="" disabled>
                            Select bank account
                          </option>
                          <option value="HDFC Bank">HDFC Bank</option>
                          <option value="ICICI Bank">ICICI Bank</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-[#001A3B]">
                        Name
                      </label>
                      <input
                        className="w-full p-2 mt-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g. Prasad"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-[#001A3B]">
                        Remark
                      </label>
                      <textarea
                        className="w-full p-2 mt-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                        name="remark"
                        value={formData.remark}
                        onChange={handleInputChange}
                        placeholder="e.g. Purchase of printer paper"
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-[#001A3B] text-white py-2 px-4 rounded hover:bg-transparent border border-[#001A3B] hover:text-[#001A3B] focus:outline-none focus:ring-2 focus:ring-blue-300"
                      disabled={loading}
                      disabled={loading}
                    >
                      {loading ? "Adding Expense..." : "+ Add New Expense"}
                      {loading ? "Adding Expense..." : "+ Add New Expense"}
                    </button>
                    {error && (
                      <p className="text-red-500 text-sm mt-2">
                        Error: {error}
                      </p>
                    )}
                    {success && (
                      <p className="text-green-500 text-sm mt-2">
                        Expense added successfully!
                      </p>
                    )}
                  </form>
                )}

                {/* All Expenses Section */}
                {activeTab === "allExpenses" && (
                  <div className="space-y-4">
                    {loading && <p>Loading expenses...</p>}
                    {error && <p className="text-red-500">{error}</p>}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {expenses.map((expense) => (
                        <div
                          key={expense.id}
                          className="bg-white border border-gray-200 rounded-lg shadow p-4"
                        >
                          <h2 className="text-lg font-semibold">
                            {expense.type_of_expense || "Type of expense"}
                          </h2>
                          <hr />
                          <div className="flex justify-between text-sm mt-4">
                            <span>
                              {new Date(expense.date).toLocaleDateString()}
                            </span>
                            <span>
                              ₹
                              {new Intl.NumberFormat("en-IN", {
                                style: "currency",
                                currency: "INR",
                              })
                                .format(expense.amount)
                                .replace("₹", "")
                                .trim()}
                            </span>
                          </div>
                          <p className="text-sm mt-4">
                            <strong>Bank Name:</strong>{" "}
                            {expense.bank_name || "N/A"}
                          </p>
                          <p className="text-sm mt-2">
                            <strong>Name:</strong> {expense.name || "N/A"}
                          </p>
                          <p className="text-sm mt-4">
                            <strong>Remark:</strong>{" "}
                            {expense.remark || "No remarks"}
                          </p>
                        </div>
                      ))}
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
