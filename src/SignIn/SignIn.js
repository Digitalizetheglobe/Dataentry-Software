import React, { useState } from "react";
import axios from "axios";
import "./SignIn.css";
import topimg from "../assets/Images/top image.svg";
import centerimg from "../assets/Images/Center.svg";
import bottomimg from "../assets/Images/bottom image.svg";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
  const [branchName, setBranchName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Adjust the API URL if needed    http://localhost:8000
      const response = await axios.post("https://api.cptechsolutions.com/api/branch/login", {
        branch_id: branchName, // Ensure it matches the backend field
        password,
      });

      // Save the JWT token in localStorage (if provided in the response)
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
        setMessage("Login successful!");

        // Redirect to a protected route or dashboard
        navigate("/"); // Replace with your desired route
      } else {
        setMessage("Login failed. Please try again.");
      }
    } catch (error) {
      const errorMessage =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : "Error logging in. Please try again.";
      setMessage(errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="grid md:grid-cols-2 items-center gap-4 max-md:gap-8 max-w-6xl max-md:max-w-lg w-full p-4 m-4">
        {/* Image Section */}
        <div className="md:h-full relative rounded-xl lg:p-12 p-8 size" style={{
          background: "linear-gradient(359.37deg, #003170 -5.19%, #001A3B 90.77%)",
        }}>
          <img src={topimg} alt="Top" className="absolute top-0 left-0 w-full h-auto" />
          <img src={centerimg} alt="Center" className="absolute bottom-12 left-0 w-auto h-auto z-10 max-w-[50%] imgleft" style={{ transform: "translateX(-7%)", maxWidth: "75%" }} />
          <img src={bottomimg} alt="Bottom" className="absolute bottom-0 left-0 w-full h-auto z-0" />
          <h1 className="text-white text-md pt-6 relative ">Simplest way to manage your workforce</h1>
          <span className="text-white text-xs font-light text-[11px] leading-[21px] relative">
            Enter your credentials to access your account
          </span>
          <div className="absolute top-1/2 right-0 transform -translate-y-1/2 space-y-4">
            <button className="block w-28 py-3 text-[#001A3B] bg-white rounded-md text-sm font-semibold hover:bg-gray-100">
              Sign in
            </button>
            <Link to="/sign-up">
              <button className="block mt-4 w-28 py-3 text-white bg-transparent border border-white rounded-md text-sm font-semibold hover:bg-white hover:text-[#001A3B]">
                Sign up
              </button>
            </Link>
          </div>
        </div>

        {/* Form Section */}
        <div className="md:max-w-md w-full px-4 py-4">
          <form onSubmit={handleLogin}>
            <div className="">
              <h3 className="text-gray-800 text-3xl font-extrabold">Welcome Back Branch</h3>
              <p className="text-sm mt-2 text-gray-500 font-semibold">
                Welcome Back! Please Enter Your Details
              </p>
            </div>

            <div>
              <label className="text-[#001A3B] text-sm block mb-2 mt-6">Branch Name</label>
              <div className="relative flex items-center">
                <input
                  value={branchName}
                  onChange={(e) => setBranchName(e.target.value)}
                  name="branchname"
                  type="text"
                  required
                  className="w-full text-gray-800 text-sm border border-gray-400 rounded-md focus:border-[#001A3B] px-2 py-3 outline-none"
                  placeholder="Enter your branch name"
                />
              </div>
            </div>

            <div className="mt-8">
              <label className="text-[#001A3B] text-sm block mb-2">Password</label>
              <div className="relative flex items-center">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  name="password"
                  type="password"
                  required
                  className="w-full text-gray-800 text-sm border border-gray-400 rounded-md focus:border-[#001A3B] px-2 py-3 outline-none"
                  placeholder="Enter password"
                />
              </div>
            </div>

            <div className="mt-12">
              <button
                type="submit"
                className="w-full shadow-xl py-2.5 px-4 text-sm tracking-wide rounded-md text-white bg-[#001A3B] hover:bg-[#001A3B] focus:outline-none"
              >
                Sign in
              </button>
            </div>
          </form>
        
          {message && <p className="mt-4 text-center text-red-600">{message}</p>}
          <br/>
          < Link to='/AdminLogin'
           className="text-sm mt-5 text-gray-500 font-semibold items-center">Login As Admin  </Link>
        </div>
       
      </div>
    </div>
  );
};

export default SignIn;
