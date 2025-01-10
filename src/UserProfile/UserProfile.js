import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../Sidebar/Sidebar";
import button3 from "../assets/icons/Button (3).png";
import avatarimage from "../assets/Avatar Image.png";
import edit from "../assets/icons/edit.png";
import deleteIcon from "../assets/trash-01.png";

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("My Profile");
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setNewPassword(password);

    // Simple password strength checker
    if (password.length < 6) {
      setPasswordStrength("Weak");
    } else if (password.length < 10) {
      setPasswordStrength("Medium");
    } else {
      setPasswordStrength("Strong");
    }
  };


  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setOldPassword("");
    setNewPassword("");
    setPasswordStrength("");
  };
  const handleSavePassword = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        "https://api.cptechsolutions.com/admin/change-password",
        { oldPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        alert("Password changed successfully!");
        closeModal();
      } else {
        alert(response.data.message || "Failed to change password.");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Error changing password.");
    }
  };

  // Fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token"); // Ensure this key matches how you store the token
        if (!token) {
          console.error("No token found in local storage");
          setError("Authentication token not found.");
          return;
        }

        const response = await axios.get("https://api.cptechsolutions.com/admin/info", {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        });

        if (response.data && response.data.success) {
          setProfile(response.data.admin); // Extract the admin object from the response
        } else {
          setError("Failed to load profile data.");
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError(
          err.response?.data?.message || "Failed to fetch profile. Please try again."
        );
      }
    };

    fetchProfile();
  }, []);

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
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
            <img src={button3} className="w-8 h-8" alt="icon" />
            <h2 className="text-gray-500 mx-2">User Profile</h2>
            <h2 className="text-gray-500 mx-2">/ Default</h2>
          </div>

          <div className="flex min-h-screen bg-gray-100 mt-4 rounded-md">
            <aside className="w-60 bg-white border-r">
              <ul className="p-5 space-y-4">
                {["My Profile",
                  // "Access Control"
                  , "Delete Account"].map((tab) => (
                    <li
                      key={tab}
                      className={`cursor-pointer px-3 py-2 rounded-md ${activeTab === tab
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
                        <h2 className="text-lg text-[#001A3BCC] font-semibold">
                          {profile.firstName} {profile.lastName}
                        </h2>
                        <p className="text-sm text-[#001A3BCC]">{profile.role}</p>
                        <p className="text-sm text-gray-600">{profile.email}</p>
                      </div>
                    </div>
                    <button className="flex gap-2 text-[#3A3F4B] hover:underline text-sm font-bold border border-gray-400 rounded-md p-1">
                      <img src={edit} className="w-4 h-4 mb-1" alt="edit" />
                      Edit
                    </button>
                  </div>

                  <div className="bg-white shadow rounded-lg p-6 mb-6">
                    <div className="flex justify-between mb-4">
                      <h2 className="font-semibold text-lg">Profile Information</h2>
                      <button className="flex gap-2 text-[#3A3F4B] hover:underline text-sm font-bold border border-gray-400 rounded-md p-1">
                        <img src={edit} className="w-4 h-4 mb-1" alt="edit" />
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
                        <p className="font-semibold">
                          {new Date(profile.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    {/* --- */}

                  </div>
                  <div className="bg-white shadow rounded-lg p-6 flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <div>
                        <h2 className="text-lg text-[#001A3BCC] font-semibold">
                          Do you want change passward ?
                        </h2>
                      </div>
                    </div>
                    <button className="flex gap-2 text-[#3A3F4B] hover:underline text-sm font-bold border border-gray-400 rounded-md p-1"
                      onClick={openModal}
                    >
                      <img src={edit} className="w-4 h-4 mb-1" alt="edit" />
                      Edit
                    </button>
                  </div>
                </>
              )}
              {activeTab === "Delete Account" && (
                <div className="bg-white shadow rounded-lg p-6">
                  <h2 className="font-semibold text-lg mb-4 text-[#FE1919]">Delete Account</h2>
                  <p>Are you sure you want to delete your account? This action cannot be undone.</p>
                  <button className="bg-red-500 text-white px-4 py-2 rounded-md mt-4">
                    Delete My Account
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-2xl max-w-sm w-full relative">
            <h2 className="text-2xl font-extrabold text-gray-800 mb-6 text-center">
              Change Password
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Old Password
                </label>
                <input
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Enter old password"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Enter new password"
                />
                <p
                  className={`mt-5 text-sm font-medium ${passwordStrength === "Weak"
                      ? "text-red-500"
                      : passwordStrength === "Medium"
                        ? "text-yellow-500"
                        : "text-green-500"
                    }`}
                >
                  Strength : {passwordStrength}
                </p>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-gray-700 hover:text-gray-900 font-semibold border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-2 focus:ring-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSavePassword}
                className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 font-semibold rounded-lg shadow-md hover:shadow-lg focus:ring-2 focus:ring-blue-500"
              >
                Save
              </button>
            </div>
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-lg focus:outline-none"
            >
              &times;
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default UserProfile;
