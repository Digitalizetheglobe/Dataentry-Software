import React, { useState } from "react";
import axios from "axios";
import "../SignIn/SignIn.css";
import topimg from "../assets/Images/top image.svg";
import centerimg from "../assets/Images/Center.svg";
import bottomimg from "../assets/Images/bottom image.svg";

const SignUp = () => {
  const [branchId, setBranchId] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Prepare data for the API request
      const requestData = {
        branch_id: branchId,
        password,
      };

      // Send a POST request to the branch registration API
      const response = await axios.post(
        "http://localhost:8000/api/branch/register",
        requestData
      );

      // Handle success response
      const { message, token } = response.data;

      // Save the token to local storage
      if (token) {
        localStorage.setItem("authToken", token);
        setMessage(message);
      } else {
        setMessage("Registration successful, but no token received.");
      }
    } catch (error) {
      // Handle error response
      const errorMessage =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : "Error registering branch. Please try again.";
      setMessage(errorMessage);
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
          <img src={topimg} alt="Top" className="absolute top-0 left-0 w-full h-auto" />
          <img src={centerimg} alt="Center" className="absolute bottom-12 left-0 w-auto h-auto z-10 max-w-[50%] imgleft" style={{ transform: "translateX(-7%)", maxWidth: "75%" }} />
          <img src={bottomimg} alt="Bottom" className="absolute bottom-0 left-0 w-full h-auto z-0" />
          <h1 className="text-white text-md pt-6 relative ">Simplest way to manage your workforce</h1>
          <span className="text-white text-xs font-light text-[11px] leading-[21px] relative">Enter your credentials to access your account</span>
          <div className="absolute top-1/2 right-0 transform -translate-y-1/2 space-y-4">
            <button className="block w-28 py-3 text-[#001A3B] bg-white rounded-md text-sm font-semibold hover:bg-gray-100">Sign in</button>
            <button className="block w-28 py-3 text-white bg-transparent border border-white rounded-md text-sm font-semibold hover:bg-white hover:text-[#001A3B]">Sign up</button>
          </div>
        </div>

        {/* Form Section */}
        <div className="md:max-w-md w-full px-4 py-4">
          <form onSubmit={handleSubmit}>
            <div className="">
              <h3 className="text-gray-800 text-3xl font-extrabold">Branch Registration</h3>
              <p className="text-sm mt-2 text-gray-500 font-semibold">Create Your Branch Account</p>
            </div>

            <div className="mt-6">
              <label className="text-[#001A3B] text-sm block mb-2">Branch ID</label>
              <input
                value={branchId}
                onChange={(e) => setBranchId(e.target.value)}
                type="text"
                required
                className="w-full text-gray-800 text-sm border border-gray-400 rounded-md focus:border-[#001A3B] px-2 py-3 outline-none"
                placeholder="Enter Branch ID"
              />
            </div>

            <div className="mt-4">
              <label className="text-[#001A3B] text-sm block mb-2">Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                required
                className="w-full text-gray-800 text-sm border border-gray-400 rounded-md focus:border-[#001A3B] px-2 py-3 outline-none"
                placeholder="Enter Password"
              />
            </div>

            <div className="mt-12">
              <button
                type="submit"
                className="w-full shadow-xl py-2.5 px-4 text-sm tracking-wide rounded-md text-white bg-[#001A3B] hover:bg-[#001A3B] focus:outline-none"
              >
                Sign Up
              </button>
            </div>
          </form>
          {message && <p className="mt-4 text-center text-green-600">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
