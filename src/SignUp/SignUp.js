import React, { useState, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import { ReactComponent as CalendarIcon } from './path/to/calendar-icon.svg';
import "../SignIn/SignIn.css";
import topimg from "../assets/Images/top image.svg";
import centerimg from "../assets/Images/Center.svg";
import bottomimg from "../assets/Images/bottom image.svg";

const SignUp = () => {
    const [accessControl, setAccessControl] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const dateInputRef = useRef(null);
  
    const openCalendar = () => {
      dateInputRef.current.setOpen(true);
    };
  
    const today = new Date().toISOString().split('T')[0];
  

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="grid md:grid-cols-2 items-center gap-4 max-md:gap-8 max-w-6xl max-md:max-w-lg w-full p-4 m-4">
        {/* Image Section (Left side now) */}
        <div
          className="md:h-full relative rounded-xl lg:p-12 p-8 size"
          style={{
            background:
              "linear-gradient(359.37deg, #003170 -5.19%, #001A3B 90.77%)",
          }}
        >
          {/* Top Image */}
          <img
            src={topimg}
            alt="Top"
            className="absolute top-0 left-0 w-full h-auto"
          />

          {/* Center Image (Positioned fully on the left side of the section) */}
          <img
            src={centerimg}
            alt="Center"
            className="absolute bottom-12 left-0 w-auto h-auto z-10 max-w-[50%] imgleft"
            style={{ transform: "translateX(-7%)", maxWidth: "75%" }} // Keep it inside the section
          />

          {/* Bottom Image */}
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
            <button className="block w-28 py-3 text-white bg-transparent border border-white rounded-md text-sm font-semibold hover:bg-white hover:text-[#001A3B]">
              Sign up
            </button>
          </div>
        </div>

        {/* Form Section (Right side now) */}
        <div className="md:max-w-md w-full px-4 py-4">
          <form>
            <div className="">
              <h3 className="text-gray-800 text-3xl font-extrabold">Join Us</h3>
              <p className="text-sm mt-2 text-gray-500 font-semibold">
                Create Your Account By Filling In Details
                {/* <a
                      href="javascript:void(0);"
                      className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap"
                    >
                      Register here
                    </a> */}
              </p>
            </div>

            <div className="flex gap-4 mt-6">
              {/* First Name Field */}
              <div className="flex-1">
                <label className="text-[#001A3B] text-sm block mb-2">
                  First Name
                </label>
                <div className="relative flex items-center">
                  <input
                    name="firstname"
                    type="text"
                    required
                    className="w-full text-gray-800 text-sm border border-gray-400 rounded-md focus:border-[#001A3B] px-2 py-3 outline-none"
                    placeholder="Enter your first name"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#bbb"
                    stroke="#bbb"
                    className="w-[18px] h-[18px] absolute right-2"
                    viewBox="0 0 682.667 682.667"
                  >
                    {/* SVG Content */}
                  </svg>
                </div>
              </div>

              {/* Last Name Field */}
              <div className="flex-1">
                <label className="text-[#001A3B] text-sm block mb-2">
                  Last Name
                </label>
                <div className="relative flex items-center">
                  <input
                    name="lastname"
                    type="text"
                    required
                    className="w-full text-gray-800 text-sm border border-gray-400 rounded-md focus:border-[#001A3B] px-2 py-3 outline-none"
                    placeholder="Enter your last name"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#bbb"
                    stroke="#bbb"
                    className="w-[18px] h-[18px] absolute right-2"
                    viewBox="0 0 682.667 682.667"
                  >
                    {/* SVG Content */}
                  </svg>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <label className="text-[#001A3B] text-sm block mb-2">
                Phone Number
              </label>
              <div className="relative flex items-center">
                <input
                  name="phone"
                  type="phone"
                  required
                  className="w-full text-gray-800 text-sm border border-gray-400 rounded-md focus:border-[#001A3B] px-2 py-3 outline-none"
                  placeholder="Enter your phone number"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#bbb"
                  stroke="#bbb"
                  className="w-[18px] h-[18px] absolute right-2 cursor-pointer"
                  viewBox="0 0 128 128"
                >
                  {/* SVG Content */}
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <label className="text-[#001A3B] text-sm block mb-2">
                Email ID
              </label>
              <div className="relative flex items-center">
                <input
                  name="email"
                  type="email"
                  required
                  className="w-full text-gray-800 text-sm border border-gray-400 rounded-md focus:border-[#001A3B] px-2 py-3 outline-none"
                  placeholder="Enter your email id"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#bbb"
                  stroke="#bbb"
                  className="w-[18px] h-[18px] absolute right-2 cursor-pointer"
                  viewBox="0 0 128 128"
                >
                  {/* SVG Content */}
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <label className="text-[#001A3B] text-sm block mb-2">
                Designation
              </label>
              <div className="relative flex items-center">
                <input
                  name="designation"
                  type="text"
                  required
                  className="w-full text-gray-800 text-sm border border-gray-400 rounded-md focus:border-[#001A3B] px-2 py-3 outline-none"
                  placeholder="Enter your designation"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#bbb"
                  stroke="#bbb"
                  className="w-[18px] h-[18px] absolute right-2 cursor-pointer"
                  viewBox="0 0 128 128"
                >
                  {/* SVG Content */}
                </svg>
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              {/* Access Control Dropdown */}
              <div className="flex-1">
                <label className="text-[#001A3B] text-sm block mb-2">
                  Access Control
                </label>
                <div className="relative flex items-center">
                  <select
                    name="access control"
                    value={accessControl}
                    onChange={(e) => setAccessControl(e.target.value)}
                    className="w-full text-gray-800 text-sm border border-gray-400 rounded-md focus:border-[#001A3B] px-2 py-3 outline-none"
                  >
                    <option value="" disabled>
                      Select your role
                    </option>
                    <option value="superadmin">Super Admin</option>
                    <option value="admin">Admin</option>
                    <option value="editor">Editor</option>
                    <option value="viewer">Manager</option>
                  </select>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#bbb"
                    stroke="#bbb"
                    className="w-[18px] h-[18px] absolute right-2"
                    viewBox="0 0 682.667 682.667"
                  >
                    {/* SVG for dropdown arrow */}
                    <path d="M0 0h682.667v682.667H0z" fill="none" />
                    <path d="M256 266.667l128 128 128-128H256z" />
                  </svg>
                </div>
              </div>

              {/* Joining Date Picker */}
              <div className="flex-1 relative">
                <label className="text-[#001A3B] text-sm block mb-2">
                  Date of Birth
                </label>
                <div className="flex items-center">
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    dateFormat="dd/MM/yyyy"
                    ref={dateInputRef}
                    className="w-full text-gray-800 text-sm border border-gray-400 rounded-md focus:border-[#001A3B] px-2 py-3 outline-none"
                    placeholderText="Select your date of birth"
                  />
                  <button type="button" onClick={openCalendar} className="absolute right-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#bbb"
                      stroke="#bbb"
                      className="w-[18px] h-[18px] cursor-pointer"
                      viewBox="0 0 512 512"
                    >
                      <path d="M366.5 16h-221C142 16 128 30 128 46v22H96c-13.3 0-24 10.7-24 24v332c0 13.3 10.7 24 24 24h340c13.3 0 24-10.7 24-24V92c0-13.3-10.7-24-24-24h-32V46c0-15.9-14.1-30-30.5-30zm-221 48h221c8.5 0 16 7.5 16 16v22h-253V64c0-8.5 7.5-16 16-16zm221 416H128V92h340v336z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
{/* 
            <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-3 block text-sm text-gray-800"
                >
                  Remember me
                </label>
              </div>
              <div>
                <a
                  href="javascript:void(0);"
                  className="text-gray-500 font-semibold text-sm hover:underline"
                >
                  Forgot Password?
                </a>
              </div>
            </div> */}

            <div className="mt-12">
              <button
                type="button"
                className="w-full shadow-xl py-2.5 px-4 text-sm tracking-wide rounded-md text-white bg-[#001A3B] hover:bg-[#001A3B] focus:outline-none"
              >
                Sign in
              </button>
            </div>

            <div className="space-x-6 flex justify-center mt-6">
              {/* Social Media Icons */}
              <button type="button" className="border-none outline-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32px"
                  className="inline"
                  viewBox="0 0 512 512"
                >
                  {/* Google SVG */}
                </svg>
              </button>
              <button type="button" className="border-none outline-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32px"
                  fill="#000"
                  viewBox="0 0 22.773 22.773"
                >
                  {/* GitHub SVG */}
                </svg>
              </button>
              <button type="button" className="border-none outline-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32px"
                  fill="#007bff"
                  viewBox="0 0 167.657 167.657"
                >
                  {/* Facebook SVG */}
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
