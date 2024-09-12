import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { loginUser } from "../../../redux/actions";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { error, loading, token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  if(token){
    navigate('/home');
  }



  return (
    <div className="flex justify-center items-center h-screen font-montserrat bg-gray-50">
      <div className="bg-black p-0.5 rounded-lg shadow-lg">
        <div className="flex flex-col justify-center items-center p-8 bg-white rounded-lg w-full sm:w-96">
          <form onSubmit={handleSubmit} className="w-full">
            <h1 className="text-center text-black font-bold text-3xl mb-8">Login</h1>
            <div className="grid grid-cols-1 gap-6">
              <div className="flex items-center gap-3 border-b border-black py-2">
                <i className="fa-regular fa-user text-gray-500"></i>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  className="focus:outline-none w-full tracking-wide placeholder-gray-400"
                  required
                />
              </div>

              <div className="flex items-center gap-3 border-b border-black py-2">
                <i className="fa-solid fa-lock text-gray-500"></i>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="focus:outline-none w-full tracking-wide placeholder-gray-400"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="mt-4 text-red-500 text-center text-sm font-medium">
                {error.message}
              </div>
            )}

            <div className="flex justify-between items-center mt-6">
              <p className="text-indigo-600 font-semibold text-sm cursor-pointer">Forgot Password?</p>
              <button
                className={`bg-indigo-600 py-2 px-6 text-sm text-white rounded-lg transition duration-300 ease-in-out ${
                  loading ? "opacity-50 cursor-not-allowed" : "hover:bg-indigo-700"
                }`}
                type="submit"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>

            <p className="text-center text-sm mt-4">
              Don't have an account?{" "}
              <Link to="/register" className="text-indigo-600 font-bold">
                Register here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
