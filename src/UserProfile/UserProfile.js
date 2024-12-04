import React, { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import button3 from "../assets/icons/Button (3).png";
import avatarimage from '../assets/Avatar Image.png';
import edit from '../assets/icons/edit.png';
import deleteIcon from '../assets/trash-01.png'; 

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("My Profile");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const members = [
    {
      name: "John Smith",
      role: "Branch Manager",
      branchId: "Branch ID",
      accessControl: "Administrator",
    },
    {
      name: "John Smith",
      role: "Branch Manager",
      branchId: "Branch ID",
      accessControl: "Standard User",
    },
    {
      name: "John Smith",
      role: "Branch Manager",
      branchId: "Branch ID",
      accessControl: "Editor",
    },
    {
      name: "John Smith",
      role: "Branch Manager",
      branchId: "Branch ID",
      accessControl: "Guest User",
    },
  ];

  return (
    <>
      <div>
        <div className="flex">
          <Sidebar className="fixed" />
          <div className="ml-80 p-6 min-h-screen w-full text-gray-900 dark:text-gray-200">
            <div className="bg-gray-100 rounded-lg flex max-w-5xl mr-1 mx-auto items-center p-2">
              <img src={button3} className="w-8 h-8" />
              <h2 className="text-gray-500 mx-2">User Profile </h2>
              <h2 className="text-gray-500 mx-2">/ Default </h2>
            </div>

            <div className="flex min-h-screen bg-gray-100 mt-4 rounded-md">
              {/* Sidebar */}
              <aside className="w-60 bg-white border-r">
                <ul className="p-5 space-y-4">
                  {["My Profile", "Access Control", "Teams", "Team Member", "Notifications", "Delete Account"].map(
                    (tab) => (
                      <li
                        key={tab}
                        className={`cursor-pointer px-3 py-2 rounded-md ${
                          activeTab === tab
                            ? "bg-[#9D8D7266] text-[#001A3BCC]"
                            : tab === "Delete Account"
                            ? "text-[#FE1919]"
                            : "text-[#3A3F4B] hover:bg-gray-200"
                        }`}
                        onClick={() => handleTabClick(tab)}
                      >
                        {tab}
                      </li>
                    )
                  )}
                </ul>
              </aside>

              {/* Main Content */}
              <div className="flex-1 p-6">

                {activeTab === "My Profile" && (
                  <>
                    {/* Profile Header */}
                    <h1 className="text-2xl text-[#3A3F4B] font-semibold mb-6">My Profile</h1>

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
                      <button className="flex gap-2 text-[#3A3F4B] hover:underline text-sm font-bold border border-gray-400 rounded-md p-1">
                        <img src={edit} className="w-4 h-4 mb-1" />
                        Edit
                      </button>
                    </div>

                    {/* Profile Information */}
                    <div className="bg-white shadow rounded-lg p-6 mb-6">
                      <div className="flex justify-between mb-4">
                        <h2 className="font-semibold text-lg">Profile Information</h2>
                        <button className="flex gap-2 text-[#3A3F4B] hover:underline text-sm font-bold border border-gray-400 rounded-md p-1">
                          <img src={edit} className="w-4 h-4 mb-1" />
                          Edit
                        </button>
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
                  </>
                )}

                {activeTab === "Access Control" && (
                  <div className="bg-white shadow rounded-lg p-6">
                    <h2 className="font-semibold text-lg mb-4">Access Control</h2>
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="py-2 px-4">Name</th>
                          <th className="py-2 px-4">Role</th>
                          <th className="py-2 px-4">Branch ID</th>
                          <th className="py-2 px-4">Access Control</th>
                          <th className="py-2 px-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {members.map((member, index) => (
                          <tr key={index} className="border-b">
                            <td className="py-4 px-4 flex items-center">
                              <img
                                src={avatarimage}
                                alt="Avatar"
                                className="w-10 h-10 rounded-full mr-3"
                              />
                              {member.name}
                            </td>
                            <td className="py-4 px-4">{member.role}</td>
                            <td className="py-4 px-4">{member.branchId}</td>
                            <td className="py-4 px-4">
                              <select
                                className="border border-gray-300 rounded-md p-2 bg-gray-50"
                                defaultValue={member.accessControl}
                              >
                                <option value="Administrator">Administrator</option>
                                <option value="Standard User">Standard User</option>
                                <option value="Editor">Editor</option>
                                <option value="Guest User">Guest User</option>
                              </select>
                            </td>
                            <td className="py-4 px-4 text-center">
                              <button>
                                <img
                                  src={deleteIcon}
                                  alt="Delete"
                                  className="w-5 h-5"
                                />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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

export default UserProfile;
