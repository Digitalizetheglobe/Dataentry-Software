import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AiOutlineForm,
  AiOutlineReconciliation,
  AiOutlineTransaction,
} from "react-icons/ai";
import { FaFileAlt, FaExchangeAlt } from "react-icons/fa";
import { AiFillFileText } from "react-icons/ai";
import { AiOutlineArrowRight } from "react-icons/ai";
import { AiOutlineUserAdd } from "react-icons/ai";
import { AiOutlineBook } from "react-icons/ai";
import "./Sidebar.css";
import reconciliation from "../assets/icons/user-profile.png";
import report from "../assets/icons/file.png";
import dataentry from "../assets/icons/bar-chart.png";
import laptop from "../assets/icons/clipboard.png";
import banktransfer from "../assets/icons/cash-flow.png";
import knowledge from "../assets/icons/knowledge (1).png";
import LogoutDialog from "../Dialogs/LogoutDialog";

const Sidebar = () => {
  const [isOpenReconciliation, setIsOpenReconciliation] = useState(true);
  const [isOpenTransaction, setIsOpenTransaction] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState("");
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);


  const handleOpenLogoutDialog = () => {
    setIsLogoutDialogOpen(true);
  };

  // Function to close the dialog
  const handleCloseLogoutDialog = () => {
    setIsLogoutDialogOpen(false);
  };

  const toggleReconciliation = (menu) => {
    setIsOpenReconciliation((prev) => !prev);
    setActiveMenu(menu);
  };
  
  const toggleTransaction = (menu) => {
    setIsOpenTransaction((prev) => !prev);
    setActiveMenu(menu);
  };

  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
    
  };

  return (
    <nav className="bg-[#001A3B] shadow-lg h-screen fixed top-0 left-0 min-w-[250px] py-6 px-4 overflow-auto">
      {/* <button
        onClick={toggleSidebar}
        className="text-white mb-6 focus:outline-none"
      >
        {isCollapsed ? '>' : '<'}
      </button> */}
      <ul className="">
        <li>
          <Link
            to="/"
            className="text-black hover:text-blue-600 text-sm flex items-center hover:bg-gray-700 rounded px-4 py-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              className="w-[18px] h-[18px] mr-4"
              viewBox="0 0 512 512"
            >
              <path d="M197.332 170.668h-160C16.746 170.668 0 153.922 0 133.332v-96C0 16.746 16.746 0 37.332 0h160c20.59 0 37.336 16.746 37.336 37.332v96c0 20.59-16.746 37.336-37.336 37.336zM37.332 32A5.336 5.336 0 0 0 32 37.332v96a5.337 5.337 0 0 0 5.332 5.336h160a5.338 5.338 0 0 0 5.336-5.336v-96A5.337 5.337 0 0 0 197.332 32zm160 480h-160C16.746 512 0 495.254 0 474.668v-224c0-20.59 16.746-37.336 37.332-37.336h160c20.59 0 37.336 16.746 37.336 37.336v224c0 20.586-16.746 37.332-37.336 37.332zm-160-266.668A5.337 5.337 0 0 0 32 250.668v224A5.336 5.336 0 0 0 37.332 480h160a5.337 5.337 0 0 0 5.336-5.332v-224a5.338 5.338 0 0 0-5.336-5.336zM474.668 512h-160c-20.59 0-37.336-16.746-37.336-37.332v-96c0-20.59 16.746-37.336 37.336-37.336h160c20.586 0 37.332 16.746 37.332 37.336v96C512 495.254 495.254 512 474.668 512zm-160-138.668a5.338 5.338 0 0 0-5.336 5.336v96a5.337 5.337 0 0 0 5.336 5.332h160a5.336 5.336 0 0 0 5.332-5.332v-96a5.337 5.337 0 0 0-5.332-5.336zm160-74.664h-160c-20.59 0-37.336-16.746-37.336-37.336v-224C277.332 16.746 294.078 0 314.668 0h160C495.254 0 512 16.746 512 37.332v224c0 20.59-16.746 37.336-37.332 37.336zM314.668 32a5.337 5.337 0 0 0-5.336 5.332v224a5.338 5.338 0 0 0 5.336 5.336h160a5.337 5.337 0 0 0 5.332-5.336v-224A5.336 5.336 0 0 0 474.668 32zm0 0" />
            </svg>
            {!isCollapsed && <span className="text-white">CPT - Data Entry Software</span>}
          </Link>
        </li>
      </ul>

      <div className="mt-6">
        <div
          className="flex items-center cursor-pointer group"
          onClick={toggleReconciliation}
        >
          <img
            src={reconciliation}
            className="w-[18px] h-[18px] mr-4 filter invert"
          />
          {!isCollapsed && (
            <Link
              to=""
              className="text-white group-hover:text-white text-sm flex-1"
            >
              Reconciliation Management
            </Link>
          )}
          {!isCollapsed && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`w-3 fill-white transition-transform ${isOpenReconciliation ? "rotate-180" : ""
                }`}
              viewBox="0 0 451.847 451.847"
            >
              <path d="M225.923 354.706c-8.098 0-16.195-3.092-22.369-9.263L9.27 151.157c-12.359-12.359-12.359-32.397 0-44.751 12.354-12.354 32.388-12.354 44.748 0l171.905 171.915 171.906-171.909c12.359-12.354 32.391-12.354 44.744 0 12.365 12.354 12.365 32.392 0 44.751L248.292 345.449c-6.177 6.172-14.274 9.257-22.369 9.257z" />
            </svg>
          )}
        </div>

        {isOpenReconciliation && !isCollapsed && (
          <ul className="space-y-1 mt-2 pl-4">
            <li>
              <Link
                to="/report-1"
                className={`transition-all text-sm flex items-center rounded-md px-4 py-3 ${activeMenu === "report-1"
                    ? "bg-gray-700 text-white"
                    : "bg-transparent text-white hover:bg-gray-700"
                  }`}
                onClick={() => handleMenuClick("report-1")}
              >
                <img src={report} className="w-[18px] h-[18px] mr-4 filter invert" />
                <span>Report-1</span>
              </Link>
            </li>

            <li>
              <Link
                to="/report-2"
                className={`transition-all text-sm flex items-center rounded-md px-4 py-3 ${activeMenu === "report-2"
                    ? "bg-gray-700 text-white"
                    : "bg-transparent text-white hover:bg-gray-700"
                  }`}
                onClick={() => handleMenuClick("report-2")}
              >
                <img
                  src={report}
                  className="w-[18px] h-[18px] mr-4 filter invert"
                />
                <span>Report-2</span>
              </Link>
            </li>
            <li>
              <Link
                to="/MergeReport"
                className={` transition-all text-sm flex items-center rounded-md px-4 py-3 
                  ${activeMenu === "MergeReport"
                    ? "bg-gray-700 text-white"
                    : "bg-transparent text-white hover:bg-gray-700"
                  }`}
                onClick={() => handleMenuClick("MergeReport")}
              >
                <img
                  src={report}
                  className="w-[18px] h-[18px] mr-4 filter invert"
                />
                <span>Merge Report</span>
              </Link>
            </li>
            <hr />
            <li>
              <Link
                to="/WithdrawalReconcilitionReport"
                className={` transition-all text-sm flex items-center rounded-md px-4 py-3
                   ${activeMenu === "WithdrawalReconcilitionReport"
                    ? "bg-gray-700 text-white"
                    : "bg-transparent text-white hover:bg-gray-700"
                  }`}
                onClick={() => handleMenuClick("WithdrawalReconcilitionReport")}
              >
                <img
                  src={report}
                  className="w-[18px] h-[18px] mr-4 filter invert"
                />
                <span>Withdrawal Reconciliation <br /> Report</span>
              </Link>
            </li>

            <li>
              <Link
                to="/Depositreconcilition"
                className={`transition-all text-sm flex items-center rounded-md px-4 py-3 
                  ${activeMenu === "Depositreconcilition"
                    ? "bg-gray-700 text-white"
                    : "bg-transparent text-white hover:bg-gray-700"
                  }`}
                onClick={() => handleMenuClick("Depositreconcilition")}
              >
                <img
                  src={report}
                  className="w-[18px] h-[18px] mr-4 filter invert"
                />
                <span>Deposit Reconciliation <br /> Report</span>
              </Link>
            </li>
          </ul>
        )}
      </div>

      <div className="mt-6">
        <div className="flex cursor-pointer group" onClick={toggleTransaction}>
          <img
            src={dataentry}
            className="w-[18px] h-[18px] text-white filter invert"
          />
          {!isCollapsed && (
            <Link
              to=""
              className="text-white group-hover:text-white text-sm  px-4 flex-1"
            >
              Transaction Data Entry
            </Link>
          )}
          {!isCollapsed && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`w-3 fill-white transition-transform ${isOpenTransaction ? "rotate-180" : ""
                }`}
              viewBox="0 0 451.847 451.847"
            >
              <path d="M225.923 354.706c-8.098 0-16.195-3.092-22.369-9.263L9.27 151.157c-12.359-12.359-12.359-32.397 0-44.751 12.354-12.354 32.388-12.354 44.748 0l171.905 171.915 171.906-171.909c12.359-12.354 32.391-12.354 44.744 0 12.365 12.354 12.365 32.392 0 44.751L248.292 345.449c-6.177 6.172-14.274 9.257-22.369 9.257z" />
            </svg>
          )}
        </div>

        {isOpenTransaction && !isCollapsed && (
          <ul className="space-y-1 mt-2 pl-4">
            <li>
              <Link
                to="/deposit"
                className={`transition-all text-sm flex items-center rounded-md px-4 py-3
                   ${activeMenu === "deposit"
                    ? "bg-gray-700 text-white"
                    : "bg-transparent text-white hover:bg-gray-700"
                  }`}
                onClick={() => handleMenuClick("deposit")}
              >
                <FaExchangeAlt className="w-[18px] h-[18px] mr-4" />
                <span>Deposit</span>
              </Link>
            </li>
            <li>
              <Link
                to="/withdrawal"
                className={`transition-all text-sm flex items-center rounded-md px-4 py-3 
                  ${activeMenu === "withdrawal"
                    ? "bg-gray-700 text-white"
                    : "bg-transparent text-white hover:bg-gray-700"
                  }`}
                onClick={() => handleMenuClick("withdrawal")}
              >
                <FaExchangeAlt className="w-[18px] h-[18px] mr-4" />
                <span>Withdrawal</span>
              </Link>
            </li>
            <li>
              <Link
                to="/withdrawal-bank-report"
                className={`transition-all text-sm flex items-center rounded-md px-4 py-3 
                  ${activeMenu === "withdrawal-bank-report"
                    ? "bg-gray-700 text-white"
                    : "bg-transparent text-white hover:bg-gray-700"
                  }`}
                onClick={() => handleMenuClick("withdrawal-bank-report")}
              >
                <FaExchangeAlt className="w-[18px] h-[18px] mr-4" />
                <span>Withdrawal Bank Report</span>
              </Link>
            </li>
            <li>
              <Link
                to='/deposit-bank-report'
                className={`transition-all text-sm flex items-center rounded-md px-4 py-3 
                  ${activeMenu === "depositbankreport"
                    ? "bg-gray-700 text-white"
                    : "bg-transparent text-white hover:bg-gray-700"
                  }`}
                onClick={() => handleMenuClick("depositbankreport")}
              >
                <FaExchangeAlt className="w-[18px] h-[18px] mr-4" />
                <span>Deposit Bank Report</span>
              </Link>
            </li>
          </ul>
        )}
      </div>

      <>
        <div
          className={`transition-all flex items-center px-4 py-3 mt-2 rounded-md 
            ${activeMenu === "interbanktransfer" ? "bg-gray-700 text-white"
              : "bg-transparent text-white hover:bg-gray-700"
            }`}
          onClick={() => handleMenuClick("interbanktransfer")}
        >
          <img
            src={banktransfer}
            className="w-[18px] h-[18px] text-white filter invert"
            style={{ marginLeft: '-16px' }}
          />
          <Link
            to="/inter-bank-transfer-management"
            className="text-white text-sm pl-4 flex-1"
          >
            Inter Bank Transfer Management
          </Link>
        </div>

        <div
          className={`transition-all flex items-center px-4 py-3 rounded-md 
            ${activeMenu === "userregistration" ? "bg-gray-700 text-white"
              : "bg-transparent text-white hover:bg-gray-700"
            }`}
          onClick={() => handleMenuClick("userregistration")}
        >
          <AiOutlineUserAdd className="w-[18px] h-[18px] text-white" style={{ marginLeft: '-16px' }} />
          <Link
            to="/User-Profile"
            className="text-white text-sm pl-4 flex-1"

          >
            User Profile
          </Link>
        </div>

        <div
          className={`transition-all flex items-center px-4 py-3 rounded-md 
            ${activeMenu === "knowledgecenter" ? "bg-gray-700 text-white"
              : "bg-transparent text-white hover:bg-gray-700"
            }`}
          onClick={() => handleMenuClick("knowledgecenter")}
        >
          <img
            src={knowledge}
            className="w-[18px] h-[18px] text-white filter invert"
            style={{ marginLeft: '-16px' }}
          />
          <Link
            to="/knowledge-center"
            className="text-white text-sm pl-4 flex-1"
          >
            Knowledge Center
          </Link>
        </div>
        <hr />


        <button onClick={handleOpenLogoutDialog}
          className="bg-[#001A3B] w-full mt-10 hover:bg-[#fff] text-white hover:text-[#001A3B] border hover:border-[#001A3B] py-2 px-4 rounded-md"
        >
          Log Out
        </button>
        <LogoutDialog isOpen={isLogoutDialogOpen} onClose={handleCloseLogoutDialog} />
      </>
    </nav>
  );
};

export default Sidebar;
