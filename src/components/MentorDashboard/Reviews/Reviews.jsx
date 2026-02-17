import React from "react";

export default function Myearnings() {
  return (
    <div className="h-[80vh] flex items-center justify-center px-6">
      <div className="text-center space-y-6">
        
        {/* Animated Loader */}
        {/* <div className="flex justify-center">
          <div className="w-14 h-14 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
        </div> */}

        {/* Heading */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          Mentor Reviews
        </h1>

        {/* Subtext */}
        <p className="text-gray-500 text-lg max-w-md mx-auto">
          We're working on something great. Your earnings dashboard will be available soon.
        </p>

        {/* Status Badge */}
        <div className="inline-block px-4 py-2 bg-indigo-100 text-indigo-600 text-sm font-medium rounded-full">
           Launching Soon
        </div>

      </div>
    </div>
  );
}
