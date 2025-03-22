import React, { useState, useEffect } from "react";
import Banner from "./banner"; // Import the Banner component

const HomePage = () => {
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 8000); // Show "Hi..." for 6 seconds
    }, 3000); // Repeat every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Banner />
      {/* Add other homepage content here */}
      <div className="flex justify-center mt-4">
        <img src="/wheel.jpeg" alt="Wheel" className="w-32 h-32 mx-2" />
        <img src="/wheelre.jpg" alt="Wheel Repair" className="w-32 h-32 mx-2" />
      </div>
      <div className="fixed bottom-5 right-5 z-50 flex items-center">
        <a href="#chatbot">
          <img src="/chatbot.png" alt="Chatbot" className="w-32 h-32" />
        </a>
        {showMessage && <div className="ml-1 text-lg font-bold text-gray-700">Hi...</div>}
      </div>
    </div>
  );
};

export default HomePage;