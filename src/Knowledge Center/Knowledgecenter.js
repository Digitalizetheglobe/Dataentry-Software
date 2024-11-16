import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import button from "../assets/icons/Button.png";
import button1 from "../assets/icons/Button (1).png";
import button2 from "../assets/icons/Button (2).png";
import button3 from "../assets/icons/Button (3).png";
import VideoSection from "./Videosection";

const Knowledgecenter = () => {
  return (
    <>
     <div >
        <div className="flex dark:bg-gray-900">
          {/* Sidebar */}
          <Sidebar className="fixed h-full w-60 text-white " />

          {/* Dashboard Content */}
          <div className="ml-80 p-6 min-h-screen w-full text-gray-900 dark:text-gray-200">
      <div className="bg-gray-100 rounded-lg flex max-w-5xl mr-1 mx-auto items-center p-2">
        <img src={button3} className="w-8 h-8" />
        <h2 className="text-gray-500 mx-2">Knowledge Center</h2>
        {/* <p className="text-gray-500 mx-1">/</p> */}
        {/* <p className="text-gray-500 mx-1">Default</p> */}
        <div className="flex ml-auto space-x-2">
          {/* <img src={button} className="w-8 h-8" />
          <img src={button1} className="w-8 h-8" />
          <img src={button2} className="w-8 h-8" /> */}
        </div>
      </div>

      <div className="max-w-5xl mr-1 mx-auto mt-10 p-4 bg-white rounded">
        <div className="max-w-5xl mx-auto mt-5">
          
          {/* Module 01 */}
          <div className="flex items-start mb-8 relative">
            <div className="flex items-center mr-4 relative">
              {/* Module icon */}
              <div className="w-10 h-10 bg-[#001A3B] rounded-md z-10"></div>
              <span className="text-gray-500 text-lg font-semibold ml-2">Module 01</span>
              
              {/* Horizontal line */}
              <div className="flex-grow h-0.5 bg-gray-900 mx-4"></div>
            </div>
            
            <div className="w-full">
              <div className="bg-[#001A3B] text-white p-4 rounded-lg">
                <h3 className="font-bold text-lg mb-2">Dashboard</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              </div>
              <div className="bg-white shadow-md p-4 rounded-lg mt-4">
                <p className="text-gray-500 mt-2">01 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.</p>
                <p className="text-gray-500 mt-4">02 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.</p>
                <p className="text-gray-500 mt-4">03 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.</p>
              </div>
            </div>
          </div>

          {/* Module 02 */}
          <div className="flex items-start relative">
            <div className="flex items-center mr-4 relative">
              {/* Module icon */}
              <div className="w-10 h-10 bg-[#9D8D72] border border-[#8C754F] rounded-md z-10"></div>
              <span className="text-gray-500 text-lg font-semibold ml-2">Module 02</span>
              
              {/* Horizontal line */}
              <div className="flex-grow h-0.5 bg-gray-300 mx-4"></div>
            </div>

            <div className="w-full">
              <div className="bg-[#9D8D72] border border-[#8C754F] text-white p-4 rounded-lg">
                <h3 className="font-bold text-lg mb-2">Reconciliation Management</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              </div>
              <div className="bg-white shadow-md p-4 rounded-lg mt-4">
                <p className="text-gray-600 font-semibold">Report-1</p>
                <p className="text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.</p>
              </div>
              <div className="bg-white shadow-md p-4 rounded-lg mt-4">
                <p className="text-gray-600 font-semibold">Report-2</p>
                <p className="text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.</p>
              </div>
              <div className="bg-white shadow-md p-4 rounded-lg mt-4">
                <p className="text-gray-600 font-semibold">Merge Report</p>
                <p className="text-gray-500">01 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.</p>
                <p className="text-gray-500">02 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.</p>
              </div>
            </div>
          </div>

          {/* {Module 03} */}
          <div className="flex items-start mt-6 relative">
            <div className="flex items-center mr-4 relative">
              {/* Module icon */}
              <div className="w-10 h-10 bg-[#001A3B] rounded-md z-10"></div>
              <span className="text-gray-500 text-lg font-semibold ml-2">Module 03</span>
              
              {/* Horizontal line */}
              <div className="flex-grow h-0.5 bg-gray-900 mx-4"></div>
            </div>
            
            <div className="w-full">
              <div className="bg-[#001A3B] text-white p-4 rounded-lg">
                <h3 className="font-bold text-lg mb-2">Dashboard</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              </div>
              <div className="bg-white shadow-md p-4 rounded-lg mt-4">
                <p className="text-gray-500 mt-2">01 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.</p>
                <p className="text-gray-500 mt-4">02 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.</p>
              </div>
              <div className="bg-white shadow-md p-4 rounded-lg mt-4">
                <p className="text-gray-600 font-semibold">Report-2</p>
                <p className="text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.</p>
              </div>
              <div className="bg-white shadow-md p-4 rounded-lg mt-4">
                <p className="text-gray-600 font-semibold">Merge Report</p>
                <p className="text-gray-500">01 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.</p>
                <p className="text-gray-500">02 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.</p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
      </div>
      </div>
      </div>
      <VideoSection/>
    </>
  );
};

export default Knowledgecenter;
