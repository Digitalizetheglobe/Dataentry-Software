import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../SignIn/SignIn.css";
import topimg from "../assets/Images/top image.svg";
import centerimg from "../assets/Images/Center.svg";
import bottomimg from "../assets/Images/bottom image.svg";
import { toast } from "react-toastify"; // Ensure you have react-toastify installed

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Frontend validation
    if (!username || !password) {
      toast.error("Please enter both username and password.");
      return;
    }

    // Login API request
    try {
      const response = await axios.post("http://api.cptechsolutions.com/admin/login", {
        username,
        password,
      });

      // Log the full response to inspect the role
      console.log(response.data);

      if (response.data.success) {
        toast.success("Login successful");

        // Check if role exists in the response
        const role = response.data.role;
        if (role) {
          localStorage.setItem("role", role);
        } else {
          console.error("Role is missing in the response");
        }

        // Store token
        localStorage.setItem("token", response.data.token);
        navigate("/"); // Adjust the navigation
      }
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error("Invalid credentials. Please try again.");
    }

  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="grid md:grid-cols-2 items-center gap-4 max-md:gap-8 max-w-6xl max-md:max-w-lg w-full p-4 m-4">
        {/* Image Section */}
        <div
          className="md:h-full relative rounded-xl lg:p-12 p-8 size"
          style={{
            background:
              "linear-gradient(359.37deg, #003170 -5.19%, #001A3B 90.77%)",
          }}
        >
          <img
            src={topimg}
            alt="Top"
            className="absolute top-0 left-0 w-full h-auto"
          />
          <img
            src={centerimg}
            alt="Center"
            className="absolute bottom-12 left-0 w-auto h-auto z-10 max-w-[50%] imgleft"
            style={{ transform: "translateX(-7%)", maxWidth: "75%" }}
          />
          <img
            src={bottomimg}
            alt="Bottom"
            className="absolute bottom-0 left-0 w-full h-auto z-0"
          />
          <h1 className="text-white text-md pt-6 relative ">
            Simplest way to manage your workforce
          </h1>
          <span className="text-white text-xs font-light text-[11px] leading-[21px] relative">
            Enter your credentials to access your account
          </span>
          <div className="absolute top-1/2 right-0 transform -translate-y-1/2 space-y-4">
            <button className="block w-28 py-3 text-[#001A3B] bg-white rounded-md text-sm font-semibold hover:bg-gray-100">
              Sign in
            </button>
            <button
              className="block mt-4 w-28 py-3 text-white bg-transparent border border-white rounded-md text-sm font-semibold hover:bg-white hover:text-[#001A3B]"
              onClick={() => navigate("/sign-up")}
            >
              Sign up
            </button>
          </div>
        </div>

        {/* Form Section */}
        <div className="md:max-w-md w-full px-4 py-4">
          <form onSubmit={handleSubmit}>
            <div>
              <h3 className="text-gray-800 text-3xl font-extrabold">
                Welcome Back Admin
              </h3>
              <p className="text-sm mt-2 text-gray-500 font-semibold">
                Welcome Back! Please Enter Your Details
              </p>
            </div>

            <div>
              <label className="text-[#001A3B] text-sm block mb-2 mt-6">
                Admin User Name
              </label>
              <input
                name="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full text-gray-800 text-sm border border-gray-400 rounded-md focus:border-[#001A3B] px-2 py-3 outline-none"
                placeholder="Enter your Admin Username"
              />
            </div>

            <div className="mt-8">
              <label className="text-[#001A3B] text-sm block mb-2">
                Password
              </label>
              <input
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full text-gray-800 text-sm border border-gray-400 rounded-md focus:border-[#001A3B] px-2 py-3 outline-none"
                placeholder="Enter password"
              />
            </div>

            <div className="mt-5">
              <button
                type="submit"
                className="w-full shadow-xl py-2.5 px-4 text-sm tracking-wide rounded-md text-white bg-[#001A3B] hover:bg-[#001A3B] focus:outline-none"
              >
                Sign in
              </button>
            </div>
          </form>
          <br/>
          < Link to='/AdminReg'
            className="text-sm mt-5 text-gray-500 font-semibold items-center">Admin Registration  </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
