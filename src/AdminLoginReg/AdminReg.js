import React, { useState } from "react";
import axios from "axios";
import "../SignIn/SignIn.css";
import topimg from "../assets/Images/top image.svg";
import centerimg from "../assets/Images/Center.svg";
import bottomimg from "../assets/Images/bottom image.svg";
import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// Toast Notification Setup
// toast.configure();

const AdminReg = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin"); // "admin" is set by default
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the payload for registration
    const adminData = {
      firstName,
      lastName,
      email,
      username,
      password,
      role,
    };

    try {
      const response = await axios.post("http://api.cptechsolutions.com/admin/register", adminData);
      
      if (response.data.success) {
        // toast.success("Admin registered successfully!");
        // Redirect to login page after success
        navigate("/AdminLogin");
      }
    } catch (error) {
    //   toast.error("Error registering admin. Please try again.");
      console.error("Registration error:", error.response || error);
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
            <Link to="/AdminLogin">
              <button className="block w-28 py-3 text-[#001A3B] bg-white rounded-md text-sm font-semibold hover:bg-gray-100">
                Sign in
              </button>
            </Link>
            <button className="block w-28 py-3 text-white bg-transparent border border-white rounded-md text-sm font-semibold hover:bg-white hover:text-[#001A3B]">
              Sign up
            </button>
          </div>
        </div>

        {/* Form Section */}
        <div className="md:max-w-md w-full px-4 py-4">
          <form onSubmit={handleSubmit}>
            <div>
              <h3 className="text-gray-800 text-3xl font-extrabold">Admin Registration</h3>
              <p className="text-sm mt-2 text-gray-500 font-semibold">Create Your Admin Account</p>
            </div>

            <div className="mt-6">
              <label className="text-[#001A3B] text-sm block mb-2">First Name</label>
              <input
                type="text"
                required
                className="w-full text-gray-800 text-sm border border-gray-400 rounded-md focus:border-[#001A3B] px-2 py-3 outline-none"
                placeholder="Enter First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <label className="text-[#001A3B] text-sm block mb-2">Last Name</label>
              <input
                type="text"
                required
                className="w-full text-gray-800 text-sm border border-gray-400 rounded-md focus:border-[#001A3B] px-2 py-3 outline-none"
                placeholder="Enter Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="mt-4">
              <label className="text-[#001A3B] text-sm block mb-2">Email Id</label>
              <input
                type="text"
                required
                className="w-full text-gray-800 text-sm border border-gray-400 rounded-md focus:border-[#001A3B] px-2 py-3 outline-none"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mt-4">
              <label className="text-[#001A3B] text-sm block mb-2">User Name</label>
              <input
                type="text"
                required
                className="w-full text-gray-800 text-sm border border-gray-400 rounded-md focus:border-[#001A3B] px-2 py-3 outline-none"
                placeholder="Enter Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="mt-4">
              <label className="text-[#001A3B] text-sm block mb-2">Password</label>
              <input
                type="password"
                required
                className="w-full text-gray-800 text-sm border border-gray-400 rounded-md focus:border-[#001A3B] px-2 py-3 outline-none"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Admin Role Checkbox */}
            <div className="mt-6">
              <label className="inline-flex items-center text-sm text-[#001A3B]">
                <input
                  type="checkbox"
                  checked={role === "admin"}
                  onChange={() => setRole(role === "admin" ? "user" : "admin")}
                  className="form-checkbox h-5 w-5 text-[#001A3B]"
                />
                <span className="ml-2">Set as Admin</span>
              </label>
            </div>

            <div className="mt-5">
              <button
                type="submit"
                className="w-full shadow-xl py-2.5 px-4 text-sm tracking-wide rounded-md text-white bg-[#001A3B] hover:bg-[#001A3B] focus:outline-none"
              >
                Sign Up
              </button>
            </div>
          </form>
<br/>
          < Link to='/AdminLogin'
                     className="text-sm mt-5 text-gray-500 font-semibold items-center">Login As Admin  </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminReg;
