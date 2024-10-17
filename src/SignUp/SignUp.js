import React, { useState, useRef } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../SignIn/SignIn.css";
import topimg from "../assets/Images/top image.svg";
import centerimg from "../assets/Images/Center.svg";
import bottomimg from "../assets/Images/bottom image.svg";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [designation, setDesignation] = useState("");
  const [accessControl, setAccessControl] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [message, setMessage] = useState("");
  const dateInputRef = useRef(null);

  const openCalendar = () => {
    dateInputRef.current.setOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Prepare data for the API request
      const requestData = {
        first_name: firstName,
        last_name: lastName,
        number: phone,
        email,
        role: designation,
        access_control: accessControl,
        joining_date: startDate.toISOString().split("T")[0], // Format as YYYY-MM-DD
      };

      // Send a POST request to the registration API
      const response = await axios.post(
        "http://localhost:8000/api/new-users/register",
        requestData
      );

      // Handle success response
      setMessage(response.data.message);
    } catch (error) {
      // Handle error response
      const errorMessage =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : "Error registering user. Please try again.";
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
              <h3 className="text-gray-800 text-3xl font-extrabold">Join Us</h3>
              <p className="text-sm mt-2 text-gray-500 font-semibold">Create Your Account By Filling In Details</p>
            </div>

            <div className="flex gap-4 mt-6">
              <div className="flex-1">
                <label className="text-[#001A3B] text-sm block mb-2">First Name</label>
                <input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  type="text"
                  required
                  className="w-full text-gray-800 text-sm border border-gray-400 rounded-md focus:border-[#001A3B] px-2 py-3 outline-none"
                  placeholder="Enter your first name"
                />
              </div>

              <div className="flex-1">
                <label className="text-[#001A3B] text-sm block mb-2">Last Name</label>
                <input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  type="text"
                  required
                  className="w-full text-gray-800 text-sm border border-gray-400 rounded-md focus:border-[#001A3B] px-2 py-3 outline-none"
                  placeholder="Enter your last name"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="text-[#001A3B] text-sm block mb-2">Phone Number</label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="tel"
                required
                className="w-full text-gray-800 text-sm border border-gray-400 rounded-md focus:border-[#001A3B] px-2 py-3 outline-none"
                placeholder="Enter your phone number"
              />
            </div>

            <div className="mt-4">
              <label className="text-[#001A3B] text-sm block mb-2">Email ID</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
                className="w-full text-gray-800 text-sm border border-gray-400 rounded-md focus:border-[#001A3B] px-2 py-3 outline-none"
                placeholder="Enter your email id"
              />
            </div>

            <div className="mt-4">
              <label className="text-[#001A3B] text-sm block mb-2">Designation</label>
              <input
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                type="text"
                required
                className="w-full text-gray-800 text-sm border border-gray-400 rounded-md focus:border-[#001A3B] px-2 py-3 outline-none"
                placeholder="Enter your designation"
              />
            </div>

            <div className="flex gap-4 mt-6">
              <div className="flex-1">
                <label className="text-[#001A3B] text-sm block mb-2">Access Control</label>
                <select
                  value={accessControl}
                  onChange={(e) => setAccessControl(e.target.value)}
                  className="w-full text-gray-800 text-sm border border-gray-400 rounded-md focus:border-[#001A3B] px-2 py-3 outline-none"
                >
                  <option value="" disabled>Select your role</option>
                  <option value="superadmin">Super Admin</option>
                  <option value="admin">Admin</option>
                  <option value="editor">Editor</option>
                  <option value="manager">Manager</option>
                  <option value="branch">Branch</option>
                </select>
              </div>

              <div className="flex-1 relative">
                <label className="text-[#001A3B] text-sm block mb-2">Joining Date</label>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  dateFormat="dd/MM/yyyy"
                  className="w-full text-gray-800 text-sm border border-gray-400 rounded-md focus:border-[#001A3B] px-2 py-3 outline-none"
                  ref={dateInputRef}
                />
                <button type="button" onClick={openCalendar} className="absolute right-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px]" viewBox="0 0 512 512">
                    <path d="M366.5 16h-221C142 16 128 30 128 46v22H96c-13.3 0-24 10.7-24 24v332c0 13.3 10.7 24 24 24h340c13.3 0 24-10.7 24-24V92c0-13.3-10.7-24-24-24h-32V46c0-15.9-14.1-30-30.5-30zm-221 48h221c8.5 0 16 7.5 16 16v22h-253V64c0-8.5 7.5-16 16-16zm221 416H128V92h340v336z" />
                  </svg>
                </button>
              </div>
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
