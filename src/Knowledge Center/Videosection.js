import React from 'react';
import youtubeimg from '../assets/Frame 629139.png';
import ContactSection from './ContactSection';

const VideoSection = () => {
  return (
    <>
    <div className="min-h-screen w-full text-gray-900 dark:text-gray-200">
     <div className="py-10 px-4 flex max-w-4xl mr-1 mx-auto p-2">
    <div className="bg-slate-800 text-white items-center p-6 rounded-lg shadow-lg max-w-5xl mx-auto">
      {/* Video Embed Section */}
      <div className="relative w-full h-[420px] rounded-lg overflow-hidden">
        <img
          className="w-full h-full rounded-lg"
          src={youtubeimg}
          alt="CPT Data Management"
        />
      </div>

      {/* Video Title */}
      <h3 className="text-lg font-semibold mt-4 mb-2 text-center">
        How CPT (Data Management) System Works?
      </h3>

      {/* Action Buttons Section */}
      <p className="text-gray-300 text-sm text-left">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
      </p>
    </div>
    </div>
    </div>
    <ContactSection/>
    </>
  );
};

export default VideoSection;
