import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../../redux/actions";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const { error, loading, token } = useSelector((state) => state.auth);

    const handleSubmit = (e) => {
      e.preventDefault();
  
      const registrationData = {
          username,
          email,
          first_name: firstName,
          last_name: lastName,
          password,
          password2,
      };
  
      dispatch(registerUser(registrationData));
  };
  

    useEffect(() => {
        if (token) {
            navigate("/home");
        }
    }, [token, navigate]);

  return (
    <div className="flex justify-center items-center h-screen font-montserrat">
      <div className="bg-black p-[2px] rounded-sm">
        <div className="flex flex-col justify-center items-center gap-8 p-12 bg-white rounded-lg w-full sm:w-96">
          <form onSubmit={handleSubmit}>
            <h1 className="text-center text-black font-bold text-3xl">
              Register
            </h1>
            <div className="grid grid-cols-1 gap-5 w-full">
              <div className="flex items-center gap-3 border-b border-black py-2">
                <i className="fa-regular fa-user mr-2"></i>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  className="focus:outline-none w-full tracking-widest"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                <div className="flex items-center gap-3 border-b border-black py-2">
                  <i className="fa-solid fa-user mr-2"></i>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First name"
                    className="focus:outline-none w-full tracking-widest"
                    required
                  />
                </div>
                <div className="flex items-center gap-3 border-b border-black py-2">
                  <i className="fa-solid fa-user mr-2"></i>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last name"
                    className="focus:outline-none w-full tracking-widest"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 border-b border-black py-2">
                <i className="fa-solid fa-envelope mr-2"></i>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="focus:outline-none w-full tracking-widest"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                <div className="flex items-center gap-3 border-b border-black py-2">
                  <i className="fa-solid fa-lock mr-2"></i>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="focus:outline-none w-full tracking-widest"
                    required
                  />
                </div>
                <div className="flex items-center gap-3 border-b border-black py-2">
                  <i className="fa-solid fa-lock mr-2"></i>
                  <input
                    type="password"
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                    placeholder="Confirm password"
                    className="focus:outline-none w-full tracking-widest"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-center w-full items-center mt-6 p-2">
              <button
                className="bg-indigo-600 px-6 py-3 text-sm text-white rounded-lg transition duration-300 ease-in-out hover:bg-indigo-700"
                type="submit"
                disabled={loading}
              >
                {loading ? "Registering..." : "Register"}
              </button>
            </div>
            {error && (
              <p className="text-red-500 text-start text-sm font-palanquin">
                {error.message}
              </p>
            )}
            <p className="text-center text-sm mt-4">
              Already have an account?{" "}
              <Link to="/login" className="text-indigo-600 font-bold">
                Login here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
