import React from "react";
import Sidebar from "../Sidebar/Sidebar";

const Userregistration = () => {
  return (
    <>
   <div >
        <div className="ml-80">
          {/* Sidebar */}
          <Sidebar className="fixed" />
   
    {/* Main Content */}
    <div className="flex flex-col mr-1 mx-auto sm:h-screen p-4 align-item-center">
      <div className="max-w-md w-full mx-auto border border-gray-300 rounded-2xl p-8">
        <div className="text-center mb-6">
            <h1 className="text-[#001A3B] text-2xl font-bold"> User Profile</h1>
          {/* <a href="javascript:void(0)">
            <img
              src="https://readymadeui.com/readymadeui.svg"
              alt="logo"
              className="w-40 inline-block"
            />
          </a> */}
        </div>

        <form>
          <div className="space-y-6">
            <div>
              <label className="text-[#001A3B] text-sm mb-2 block">
              First Name
              </label>
              <input
                name="email"
                type="text"
                className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                placeholder="Enter email"
              />
            </div>
            <div>
              <label className="text-[#001A3B] text-sm mb-2 block">
              Lash Name
              </label>
              <input
                name="password"
                type="password"
                className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                placeholder="Enter password"
              />
            </div>
            <div>
              <label className="text-[#001A3B] text-sm mb-2 block">
              Branch id 
              </label>
              <input
                name="cpassword"
                type="password"
                className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                placeholder="Enter confirm password"
              />
            </div>
            <div>
              <label className="text-[#001A3B] text-sm mb-2 block">
              Designation
              </label>
              <input
                name="cpassword"
                type="password"
                className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                placeholder="Enter confirm password"
              />
            </div>
{/* 
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="text-gray-800 ml-3 block text-sm"
              >
                I accept the{" "}
                <a
                  href="javascript:void(0);"
                  className="text-blue-600 font-semibold hover:underline ml-1"
                >
                  Terms and Conditions
                </a>
              </label>
            </div> */}
          </div>

          <div className="!mt-12">
            <button
              type="button"
              className="w-full py-3 px-4 text-sm rounded-md mt-4 bg-[#001A3B] hover:bg-[#fff] text-white hover:text-[#001A3B] border hover:border-[#001A3B]"
            >
             Update Profile
            </button>
          </div>
          <p className="text-gray-800 text-sm mt-6 text-center">
            Already have an account?{" "}
            <a
              href="javascript:void(0);"
              className="text-blue-600 font-semibold hover:underline ml-1"
            >
              Login here
            </a>
          </p>
        </form>
      </div>
    </div>
    </div>
    </div>
    </>
  );
};

export default Userregistration;
