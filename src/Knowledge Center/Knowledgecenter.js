import Sidebar from "../Sidebar/Sidebar";
import button from "../assets/icons/Button.png";
import button1 from "../assets/icons/Button (1).png";
import button2 from "../assets/icons/Button (2).png";
import button3 from "../assets/icons/Button (3).png";
import VideoSection from "./Videosection";
import { useState } from "react";

const Knowledgecenter = () => {
  const [openSections, setOpenSections] = useState({
    reportsmanagement: true, // First section open by default
    reconciliationfeatures: false,
    interbank:false,
    dataentry:false,
    expenses: false,
  });

  const toggleSection = (sectionKey) => {
    setOpenSections((prev) => ({
      ...prev,
      [sectionKey]: !prev[sectionKey], // Toggle only the targeted section
    }));
  };
  return (
    <>
      <div>
        <div className="flex ">
          {/* Sidebar */}
          <Sidebar className="fixed " />

          {/* Dashboard Content */}
          <div className="ml-80 p-6 min-h-screen w-full text-gray-900 dark:text-gray-200">
            <div className="bg-gray-100 rounded-lg flex max-w-5xl mr-1 mx-auto items-center p-2">
              <img src={button3} className="w-8 h-8" />
              <h2 className="text-gray-500 mx-2">Knowledge Center</h2>
              {/* <p className="text-gray-500 mx-1">/</p> */}
              <div className="flex ml-auto space-x-2"></div>
            </div>

            <div className="max-w-5xl mr-1 mx-auto mt-10 p-4 bg-white rounded">
              <div className="max-w-5xl mx-auto mt-5">
                {/* Module 01 */}
                <div className="flex items-start mb-8 relative">
                  <div className="flex items-center mr-4 relative">
                    {/* Module icon */}
                    <div className="w-10 h-10 bg-[#001A3B] rounded-md z-10"></div>
                    <span className="text-gray-500 text-lg font-semibold ml-2">
                      01
                    </span>

                    {/* Horizontal line */}
                    <div className="flex-grow h-0.5 bg-gray-900 mx-4"></div>
                  </div>

                  <div className="w-full">
                    {/* Header Section */}
                    <div className="bg-[#001A3B] text-white p-4 rounded-lg flex justify-between items-center">
                      <h3 className="font-bold text-lg mb-2">
                        Reports Management
                      </h3>
                      {/* Toggle Arrow */}
                      <button
                         onClick={() => toggleSection("reportsmanagement")}
                        className="focus:outline-none"
                      >
                         {openSections.reportsmanagement ? (
              <span className="transform rotate-180">▼</span>
            ) : (
              <span>▼</span>
            )}
                      </button>
                    </div>

                    {/* Collapsible Content */}
                    
                    {openSections.reportsmanagement && (
                      <div className="bg-white shadow-md p-4 rounded-lg mt-4">
                        <ul className="list-disc ml-6">
                          <li>
                            <p className="text-gray-900 font-bold text-lg mt-2">
                              Report 1
                            </p>
                          </li>
                          <p className="text-gray-500 mt-2">
                            <span className="text-gray-700">Purpose:</span>{" "}
                            Displays data from the first set of Excel uploads
                            (e.g., balances, deposits, credits).
                          </p>
                        </ul>

                        <ul className="list-disc ml-6">
                          <li>
                            <p className="text-gray-900 font-bold text-lg mt-2">
                              Steps to Use:
                            </p>
                          </li>
                          <p className="text-gray-500 mt-2">
                            1. Upload your Excel file via the{" "}
                            <b>Upload Excel 1</b>
                            button.
                          </p>
                          <p className="text-gray-500 mt-4">
                            2. Use the <b>Update Excel 1</b> button to modify
                            existing records or add new data.
                          </p>
                          <p className="text-gray-500 mt-4">
                            3. View the table to verify your data.
                          </p>
                        </ul>

                        <ul className="list-disc ml-6">
                          <li>
                            <p className="text-gray-900 font-bold text-lg mt-2">
                              Report 2
                            </p>
                          </li>
                          <p className="text-gray-500 mt-2">
                            <span className="text-gray-700">Purpose:</span>{" "}
                            Displays data from the second set of Excel uploads
                            (e.g., transactions, timestamps).
                          </p>
                        </ul>

                        <ul className="list-disc ml-6">
                          <li>
                            <p className="text-gray-900 font-bold text-lg mt-2">
                              Steps to Use:
                            </p>
                          </li>
                          <p className="text-gray-500 mt-2">
                            1. Upload your Excel file via the
                            <b>Upload Excel 2</b>
                            button.
                          </p>
                          <p className="text-gray-500 mt-4">
                            2. Use the <b>Update Excel 2</b> for data
                            modifications or additions.
                          </p>
                          <p className="text-gray-500 mt-4">
                            3. View the records and analyze key metrics.
                          </p>
                        </ul>

                        <ul className="list-disc ml-6">
                          <li>
                            <p className="text-gray-900 font-bold text-lg mt-2">
                              Report 3
                            </p>
                          </li>
                          <p className="text-gray-500 mt-2">
                            <span className="text-gray-700">Purpose:</span>{" "}
                            Combines data from Report 1 and Report 2 for
                            consolidated insights.
                          </p>
                        </ul>

                        <ul className="list-disc ml-6">
                          <li>
                            <p className="text-gray-900 font-bold text-lg mt-2">
                              Steps to Use:
                            </p>
                          </li>
                          <p className="text-gray-500 mt-2">
                            1. Navigate to the
                            <b>Merge Report</b>
                            section.
                          </p>
                          <p className="text-gray-500 mt-4">
                            2. Click <b>Merge Report</b> to process and display
                            the combined report.
                          </p>
                          <p className="text-gray-500 mt-4">
                            3. Analyze the merged results for
                            cross-verifications and discrepancies.
                          </p>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                {/* Module 02 */}
                <div className="flex items-start relative">
                  <div className="flex items-center mr-4 relative">
                    {/* Module icon */}
                    <div className="w-10 h-10 bg-[#9D8D72] border border-[#8C754F] rounded-md z-10"></div>
                    <span className="text-gray-500 text-lg font-semibold ml-2">
                      02
                    </span>

                    {/* Horizontal line */}
                    <div className="flex-grow h-0.5 bg-gray-300 mx-4"></div>
                  </div>

                  <div className="w-full">
                    {/* Header Section */}
                    <div className="bg-[#9D8D72] text-white p-4 rounded-lg flex justify-between items-center">
                      <h3 className="font-bold text-lg mb-2">
                        Reconciliation Features
                      </h3>
                      {/* Toggle Arrow */}
                      <button
                         onClick={() => toggleSection("reconciliationfeatures")}
                        className="focus:outline-none"
                      >
                        {openSections.reconciliationfeatures ? (
              <span className="transform rotate-180">▼</span>
            ) : (
              <span>▼</span>
            )}
                      </button>
                    </div>

                    {/* Collapsible Content */}
                    {openSections.reconciliationfeatures && (
                      <div className="bg-white shadow-md p-4 rounded-lg mt-4">
                        <ul className="list-disc ml-6">
                          <li>
                            <p className="text-gray-900 font-bold text-lg mt-2">
                              Withdrawal Reconciliation
                            </p>
                          </li>
                          <p className="text-gray-500 mt-2">
                            <span className="text-gray-700">Purpose:</span>{" "}
                            Cross-check withdrawal records between manual
                            entries and Excel data.
                          </p>
                        </ul>

                        <ul className="list-disc ml-6">
                          <li>
                            <p className="text-gray-900 font-bold text-lg mt-2">
                              Steps to Use:
                            </p>
                          </li>
                          <p className="text-gray-500 mt-2">
                            1. Navigate to the
                            <b>Withdrawal Reconciliation</b>
                            tab.
                          </p>
                          <p className="text-gray-500 mt-4">
                            2. Select the date range for reconciliation.
                          </p>
                          <p className="text-gray-500 mt-4">
                            3. Generate the report to identify matches and
                            discrepancies.
                          </p>
                        </ul>

                        <ul className="list-disc ml-6">
                          <li>
                            <p className="text-gray-900 font-bold text-lg mt-2">
                              Deposit Reconciliation
                            </p>
                          </li>
                          <p className="text-gray-500 mt-2">
                            <span className="text-gray-700">Purpose:</span>{" "}
                            Match deposit records between manual entries and
                            Excel uploads.
                          </p>
                        </ul>

                        <ul className="list-disc ml-6">
                          <li>
                            <p className="text-gray-900 font-bold text-lg mt-2">
                              Steps to Use:
                            </p>
                          </li>
                          <p className="text-gray-500 mt-2">
                            1. Navigate to the <b>Deposit Reconciliation</b>{" "}
                            section.
                          </p>
                          <p className="text-gray-500 mt-4">
                            2. Select the desired date range.
                          </p>
                          <p className="text-gray-500 mt-4">
                            3. View the matched records and discrepancies for
                            further action.
                          </p>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                {/* {Module 03} */}
                <div className="flex items-start mt-6 relative">
                  <div className="flex items-center mr-4 relative">
                    {/* Module icon */}
                    <div className="w-10 h-10 bg-[#001A3B] rounded-md z-10"></div>
                    <span className="text-gray-500 text-lg font-semibold ml-2">
                      03
                    </span>

                    {/* Horizontal line */}
                    <div className="flex-grow h-0.5 bg-gray-900 mx-4"></div>
                  </div>

                  <div className="w-full">
                    {/* Header Section */}
                    <div className="bg-[#001A3B] text-white p-4 rounded-lg flex justify-between items-center">
                      <h3 className="font-bold text-lg mb-2">
                        Data Entry Management
                      </h3>
                      {/* Toggle Arrow */}
                      <button
                        onClick={() => toggleSection("dataentry")}
                        className="focus:outline-none"
                      >
                                   {openSections.dataentry ? (
              <span className="transform rotate-180">▼</span>
            ) : (
              <span>▼</span>
            )}
                      </button>
                    </div>

                    {/* Collapsible Content */}
                    {openSections.dataentry && (
                      <div className="bg-white shadow-md p-4 rounded-lg mt-4">
                        <ul className="list-disc ml-6">
                          <li>
                            <p className="text-gray-900 font-bold text-lg mt-2">
                              Transaction Data Entry
                            </p>
                          </li>
                          <p className="text-gray-500 mt-2">
                            <span className="text-gray-700">Purpose:</span> Add
                            or update manual transaction data.
                          </p>
                        </ul>

                        <ul className="list-disc ml-6">
                          <li>
                            <p className="text-gray-900 font-bold text-lg mt-2">
                              Steps to Use:
                            </p>
                          </li>
                          <p className="text-gray-500 mt-2">
                            1. Navigate to the
                            <b>Transaction Data Entry</b>
                            page.
                          </p>
                          <p className="text-gray-500 mt-4">
                            2. Choose the type of transaction: Deposit,
                            Withdrawal, or Inter-Bank Transfer.
                          </p>
                          <p className="text-gray-500 mt-4">
                            3. Enter relevant details like `amount`, `date`,
                            `bank`, and submit.
                          </p>
                        </ul>

                        <ul className="list-disc ml-6">
                          <li>
                            <p className="text-gray-900 font-bold text-lg mt-2">
                              Withdrawal Bank Report
                            </p>
                          </li>
                          <p className="text-gray-500 mt-2">
                            <span className="text-gray-700">Purpose:</span>{" "}
                            Generate detailed withdrawal reports per bank.
                          </p>
                        </ul>

                        <ul className="list-disc ml-6">
                          <li>
                            <p className="text-gray-900 font-bold text-lg mt-2">
                              Steps to Use:
                            </p>
                          </li>
                          <p className="text-gray-500 mt-2">
                            1. Go to the <b>Withdrawal Bank Report</b> section.
                          </p>
                          <p className="text-gray-500 mt-4">
                            2. Choose filters like bank name or date range.
                          </p>
                          <p className="text-gray-500 mt-4">
                            3. Download the report in CSV/Excel formats.
                          </p>
                        </ul>

                        <ul className="list-disc ml-6">
                          <li>
                            <p className="text-gray-900 font-bold text-lg mt-2">
                              Deposit Bank Repor
                            </p>
                          </li>
                          <p className="text-gray-500 mt-2">
                            <span className="text-gray-700">Purpose:</span>{" "}
                            Create comprehensive deposit reports categorized by
                            banks.
                          </p>
                        </ul>

                        <ul className="list-disc ml-6">
                          <li>
                            <p className="text-gray-900 font-bold text-lg mt-2">
                              Steps to Use:
                            </p>
                          </li>
                          <p className="text-gray-500 mt-2">
                            1. Access the <b>Deposit Bank Report</b> page.
                          </p>
                          <p className="text-gray-500 mt-4">
                            2. Select parameters like bank and time period.
                          </p>
                          <p className="text-gray-500 mt-4">
                            3. View and export the generated report.
                          </p>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                {/* {module 04} */}

                <div className="flex items-start relative mt-6">
                  <div className="flex items-center mr-4 relative">
                    {/* Module icon */}
                    <div className="w-10 h-10 bg-[#9D8D72] border border-[#8C754F] rounded-md z-10"></div>
                    <span className="text-gray-500 text-lg font-semibold ml-2">
                      04
                    </span>

                    {/* Horizontal line */}
                    <div className="flex-grow h-0.5 bg-gray-300 mx-4"></div>
                  </div>

                  <div className="w-full">
                    {/* Header Section */}
                    <div className="bg-[#9D8D72] text-white p-4 rounded-lg flex justify-between items-center">
                      <h3 className="font-bold text-lg mb-2">
                        Inter-Bank Management
                      </h3>
                      {/* Toggle Arrow */}
                      <button
                         onClick={() => toggleSection("interbank")}
                        className="focus:outline-none"
                      >
                           {openSections.interbank ? (
              <span className="transform rotate-180">▼</span>
            ) : (
              <span>▼</span>
            )}
                      </button>
                    </div>

                    {/* Collapsible Content */}
                    {openSections.interbank && (
                      <div className="bg-white shadow-md p-4 rounded-lg mt-4">
                        <ul className="list-disc ml-6">
                          <li>
                            <p className="text-gray-900 font-bold text-lg mt-2">
                              Inter-Bank Management
                            </p>
                          </li>
                          <p className="text-gray-500 mt-2">
                            <span className="text-gray-700">Purpose:</span>{" "}
                            Manage inter-bank transfers and reconciliation.
                          </p>
                        </ul>

                        <ul className="list-disc ml-6">
                          <li>
                            <p className="text-gray-900 font-bold text-lg mt-2">
                              Steps to Use:
                            </p>
                          </li>
                          <p className="text-gray-500 mt-2">
                            1. Add details of inter-bank transactions via the{" "}
                            <b>Inter-Bank Transfer</b> form.
                          </p>
                          <p className="text-gray-500 mt-4">
                            2. Generate reports to track and manage bank-to-bank
                            movements.
                          </p>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

{/* {module 05} */}

<div className="flex items-start relative mt-6">
                  <div className="flex items-center mr-4 relative">
                    {/* Module icon */}
                    <div className="w-10 h-10 bg-[#001A3B] border border-[#8C754F] rounded-md z-10"></div>
                    <span className="text-gray-500 text-lg font-semibold ml-2">
                      05
                    </span>

                    {/* Horizontal line */}
                    <div className="flex-grow h-0.5 bg-gray-300 mx-4"></div>
                  </div>

                  <div className="w-full">
                    {/* Header Section */}
                    <div className="bg-[#001A3B] text-white p-4 rounded-lg flex justify-between items-center">
                      <h3 className="font-bold text-lg mb-2">
                      Expense Management
                      </h3>
                      {/* Toggle Arrow */}
                      <button
                        onClick={() => toggleSection("expenses")}
                        className="focus:outline-none"
                      >
                        {openSections.expenses ? (
              <span className="transform rotate-180">▼</span>
            ) : (
              <span>▼</span>
            )}
                      </button>
                    </div>

                    {/* Collapsible Content */}
                    {openSections.expenses && (
                      <div className="bg-white shadow-md p-4 rounded-lg mt-4">
                        <ul className="list-disc ml-6">
                          <li>
                            <p className="text-gray-900 font-bold text-lg mt-2">
                              Inter-Bank Management
                            </p>
                          </li>
                          <p className="text-gray-500 mt-2">
                            <span className="text-gray-700">Purpose:</span>{" "}
                            Record and track business expenses effectively.
                          </p>
                        </ul>

                        <ul className="list-disc ml-6">
                          <li>
                            <p className="text-gray-900 font-bold text-lg mt-2">
                              Steps to Use:
                            </p>
                          </li>
                          <p className="text-gray-500 mt-2">
                            1. Navigate to the <b>Expense Management</b> page.
                          </p>
                          <p className="text-gray-500 mt-4">
                            2. Enter details like:
                            <ul>
<li>  Type of Expense </li>
    <li> Amount </li>
     <li> Bank Name </li>
     <li> Date </li> 
     <li> Remarks (Optional) </li>
     </ul>
                          </p>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
      <VideoSection />
    </>
  );
};

export default Knowledgecenter;
