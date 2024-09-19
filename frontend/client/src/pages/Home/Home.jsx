import React, { useEffect, useState } from "react";
import Profile from "../../components/User/UserProfile/Profile";

const Home = () => {
  return (
    <div>
      <div
      className={`min-h-screen bg-gradient-to-r from-blue-800 to-purple-600 flex justify-center items-center p-6 transition-opacity duration-1000 ease-in-out`}
    >
      
      <Profile />
    </div>
    </div>
    
  );
};

export default Home;
