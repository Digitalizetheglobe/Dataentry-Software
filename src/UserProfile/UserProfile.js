import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../Sidebar/Sidebar";
import button3 from "../assets/icons/Button (3).png";
import avatarimage from '../assets/Avatar Image.png';
import edit from '../assets/icons/edit.png';
import deleteIcon from '../assets/trash-01.png';

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("My Profile");
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // Fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token"); // Ensure this key matches how you store the token
        if (!token) {
          console.error("No token found in local storage");
          return;
        }
    
        const response = await axios.get("http://localhost:8000/admin/info", {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        });
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    
  }, []);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
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
            <aside className="w-60 bg-white border-r">
              <ul className="p-5 space-y-4">
                {["My Profile", "Access Control", "Delete Account"].map((tab) => (
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
                ))}
              </ul>
            </aside>

            <div className="flex-1 p-6">
              {activeTab === "My Profile" && (
                <>
                  <h1 className="text-2xl text-[#3A3F4B] font-semibold mb-6">My Profile</h1>
                  <div className="bg-white shadow rounded-lg p-6 flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <img
                        className="w-16 h-16 rounded-full mr-4"
                        src={avatarimage}
                        alt="Profile"
                      />
                      <div>
                        <h2 className="text-lg text-[#001A3BCC] font-semibold">{profile.firstName} {profile.lastName}</h2>
                        <p className="text-sm text-[#001A3BCC]">{profile.role}</p>
                        <p className="text-sm text-gray-600">{profile.email}</p>
                      </div>
                    </div>
                    <button className="flex gap-2 text-[#3A3F4B] hover:underline text-sm font-bold border border-gray-400 rounded-md p-1">
                      <img src={edit} className="w-4 h-4 mb-1" />
                      Edit
                    </button>
                  </div>

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
                        <p className="text-sm text-gray-600">First Name</p>
                        <p className="font-semibold">{profile.firstName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Last Name</p>
                        <p className="font-semibold">{profile.lastName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Email address</p>
                        <p className="font-semibold">{profile.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Username</p>
                        <p className="font-semibold">{profile.username}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Role</p>
                        <p className="font-semibold">{profile.role}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Created At</p>
                        <p className="font-semibold">{new Date(profile.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
