import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex space-x-2">
        <div className="w-4 h-4 rounded-full bg-blue-500 animate-bounce"></div>
        <div className="w-4 h-4 rounded-full bg-blue-500 animate-bounce delay-75"></div>
        <div className="w-4 h-4 rounded-full bg-blue-500 animate-bounce delay-150"></div>
      </div>
    </div>
  );
};

export default Loading;
