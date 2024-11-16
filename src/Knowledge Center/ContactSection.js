import React from 'react';
import contactIllustration from '../assets/Group 1000000881.png';
import mail from '../assets/icons/mail-01.png'
import phone from '../assets/icons/phone.png'
import clock from '../assets/icons/clock.png'
import building from '../assets/icons/building-06.png'

const ContactSection = () => {
  return (
    <div className=" p-6 min-h-screen w-full text-gray-900 dark:text-gray-200">
    <div className="py-10 px-4 md:px-8 max-w-3xl mr-1 mx-auto items-center p-2">
      {/* Main Heading */}
      <h2 className="text-left text-xl md:text-xl font-bold ">
        Need Assistance? We’re Here to Help!
      </h2>

      {/* Main Container */}
      <div className="flex flex-col md:flex-row justify-between items-center max-w-5xl mx-auto">
        {/* Contact Card */}
        <div className="bg-slate-800 text-white rounded-lg p-6 w-full md:w-1/2 mb-6 md:mb-0">
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          
          {/* Email */}
          <div className="flex items-start mb-4">
            <div className="w-10 h-10 flex justify-center items-center mr-4">
              <img src={mail} className="mb-4"></img>
            </div>
            <a href="mailto:info@dtgsomething.com" className="text-gray-300 hover:text-white">
              info@dtgsomething.com
            </a>
          </div>

          {/* Phone Number */}
          <div className="flex items-start mb-4">
          <div className="w-10 h-10 flex justify-center items-center mr-4">
          <img src={phone} className="mb-4"></img>
            </div>
            <a href="tel:+911234567890" className="text-gray-300 hover:text-white">
              +91 123 456 7890
            </a>
          </div>

          {/* Address */}
          <div className="flex items-start mb-4">
          <div className="w-10 h-10 flex justify-center items-center mr-4">
          <img src={building} className="mb-4"></img>
            </div>
            <p className="text-gray-300">
              Office U2, First Floor, Runwal Platinum, Bavdhan - 411021, India
            </p>
          </div>

          {/* Working Hours */}
          <div className="flex items-start">
          <div className="w-10 h-10 flex justify-center items-center mr-4">
          <img src={clock} className="mb-4"></img>
            </div>
            <p className="text-gray-300">09:00 AM – 08:00 PM</p>
          </div>
        </div>

        {/* Illustration Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={contactIllustration}
            alt="Illustration"
            className="max-w-xs md:max-w-sm"
          />
        </div>
      </div>
    </div>
    </div>
  );
};

export default ContactSection;
