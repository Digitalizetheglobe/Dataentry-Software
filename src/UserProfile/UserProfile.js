import React, { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import button3 from "../assets/icons/Button (3).png";
import avatarimage from '../assets/Avatar Image.png'

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("setting");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <div>
        <div className="flex">
          <Sidebar className="fixed" />
          <div className="ml-80 p-6 min-h-screen w-full text-gray-900 dark:text-gray-200">
            <div className="bg-gray-100 rounded-lg flex max-w-5xl mr-1 mx-auto items-center p-2">
              <img src={button3} className="w-8 h-8" />
              <h2 className="text-gray-500 mx-2">Knowledge Center</h2>
              <div className="flex ml-auto space-x-2"></div>
            </div>

            <div className="flex min-h-screen bg-gray-100 mt-4 rounded-md">
      {/* Sidebar */}
      <aside className="w-60 bg-white border-r">
        <ul className="p-5 space-y-4">
          <li className="text-red-500 font-semibold">My Profile</li>
          <li className="text-gray-600">Access Control</li>
          <li className="text-gray-600">Teams</li>
          <li className="text-gray-600">Team Member</li>
          <li className="text-gray-600">Notifications</li>
          <li className="text-red-500">Delete Account</li>
        </ul>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h1 className="text-2xl text-[#3A3F4B] font-semibold mb-6">My Profile</h1>

        {/* Profile Header */}
        <div className="bg-white shadow rounded-lg p-6 flex items-center justify-between mb-6">
          <div className="flex items-center">
            <img
              className="w-16 h-16 rounded-full mr-4"
              src={avatarimage}
              alt="Profile"
            />
            <div>
              <h2 className="text-lg text-[#001A3BCC] font-semibold">John Smith</h2>
              <p className="text-sm text-[#001A3BCC]">Branch Manager</p>
              <p className="text-sm text-gray-600">johnsmith@gmail.com</p>
            </div>
          </div>
          <button className="text-blue-600 hover:underline text-sm">Edit</button>
        </div>

        {/* Profile Information */}
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <div className="flex justify-between mb-4">
            <h2 className="font-semibold text-lg">Profile Information</h2>
            <button className="text-blue-600 hover:underline text-sm">Edit</button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Full Name</p>
              <p className="font-semibold">John Smith</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Last Name</p>
              <p className="font-semibold">Smith</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Email address</p>
              <p className="font-semibold">johnsmith@gmail.com</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Phone</p>
              <p className="font-semibold">123-456-7890</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Role</p>
              <p className="font-semibold">Branch Manager</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Access</p>
              <p className="font-semibold">Editor</p>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Date of Joining</p>
              <p className="font-semibold">16-12-2024</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">City/State</p>
              <p className="font-semibold">New York</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Postal Code</p>
              <p className="font-semibold">123456</p>
            </div>
          </div>
        </div>
      </div>
    </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
