import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("ADMIN_TOKEN");
    if(token) {
        navigate('admin/users')
    }
  }, [navigate])

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
        console.log(`i have reached the admin login takeoff`);
      const response = await axios.post("http://localhost:8000/adminpanel/admin-login/", {
        username,
        password,
      });
      if (response) {
        console.log(`this is the superuser : ${response.data}`);
        
      } else {
        console.log(`I did not got the super user : ${response.data}`);
      }

      if (response.data && response.data.access) {
        localStorage.setItem("ADMIN_TOKEN", response.data.access);
        navigate("/admin/users");
      } else {
        setErrorMessage("Failed to retrieve access token.");
      }
    } catch (error) {
      setErrorMessage("Login failed. Only admins can enter this page.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
          Admin Login
        </h2>

        {errorMessage && (
          <p className="text-red-500 mb-4 text-center">{errorMessage}</p>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
         <div className="flex justify-center"> 
         <button
          type="submit"
            className="relative inline-flex items-center justify-center px-10 py-3 overflow-hidden font-mono font-medium tracking-tighter text-white bg-gray-800 rounded-lg group"
          >
            <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-green-500 rounded-full group-hover:w-56 group-hover:h-56"></span>
            <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
            <span className="relative">Login</span>
          </button>
         </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
