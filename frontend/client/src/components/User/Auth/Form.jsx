import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../../../redux/actions";

const Form = ({ method }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password2, setPassword2] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, token } = useSelector((state) => state.auth);

  const isLogin = method === "login";

  useEffect(() => {
    if (token) {
      if (isLogin) {
        navigate("/");
      } else {
        navigate("/login");
      }
    }
  }, [token, navigate, isLogin]);

  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const isValidPassword = (password) => {
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/.test(password);
  };

  // General field validation
  const validateFields = () => {
    let formErrors = {};

    if (username.trim() === "") {
      formErrors.username = "Username is required and cannot be empty spaces.";
    }

    if (!isLogin && firstName.trim() === "") {
      formErrors.firstName =
        "First name is required and cannot be empty spaces.";
    }

    if (!isLogin && !isValidEmail(email)) {
      formErrors.email = "Please enter a valid email address.";
    }

    if (password.trim() === "") {
      formErrors.password = "Enter a valid password.";
    } else if (!isValidPassword(password)) {
      formErrors.password =
        "Password must be at least 8 characters long and include at least one number.";
    }

    if (!isLogin && password !== password2) {
      formErrors.password2 = "Passwords do not match.";
    }

    setErrors(formErrors);

    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!validateFields()) {
      setLoading(false);
      return;
    }

    const registrationData = {
      username,
      email,
      first_name: firstName,
      last_name: lastName,
      password,
      password2,
    };

    try {
      if (isLogin) {
        const result = await dispatch(loginUser({ username, password }));
        console.log(`he is arrived here`);

        if (result && result.success) {
          console.log("Navigating to /home");
          navigate("/home"); // Make sure this is the correct path
        } else if (result && result.error) {
          setErrors(
            result.error.details || {
              general: "Login failed, please check your credentials.",
            }
          );
        }
      } else {
        const result = await dispatch(registerUser(registrationData));

        if (result && result.success) {
          navigate("/home"); // Make sure this is the correct path
        } else if (result && result.error) {
          const apiErrors = result.error.details || {};
          const formErrors = {};

          Object.keys(apiErrors).forEach((field) => {
            formErrors[field] = apiErrors[field].join(", ");
          });

          setErrors(formErrors);
        } else {
          setErrors({ general: "Registration failed. Please try again." });
        }
      }
    } catch (error) {
      setErrors({ general: "An unexpected error occurred. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen font-montserrat">
      <div className="bg-black p-[2px] rounded-sm">
        <div className="flex flex-col justify-center items-center gap-8 p-12 bg-white rounded-lg w-full sm:w-96">
          <form onSubmit={handleSubmit}>
            <h1 className="text-center text-black font-bold text-3xl">
              {isLogin ? "Login" : "Register"}
            </h1>
            <div className="grid grid-cols-1 gap-5 w-full">
              {!isLogin && (
                <>
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
                  {errors.firstName && (
                    <p className="text-red-500 text-xs">{errors.firstName}</p>
                  )}
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
                  {errors.lastName && (
                    <p className="text-red-500 text-xs">{errors.lastName}</p>
                  )}
                </>
              )}
              <div className="flex items-center gap-3 border-b border-black py-2">
                <i className="fa-solid fa-user mr-2"></i>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                  className="focus:outline-none w-full tracking-widest"
                  required
                />
              </div>
              {errors.username && (
                <p className="text-red-500 text-xs">{errors.username}</p>
              )}
              {!isLogin && (
                <div className="flex items-center gap-3 border-b border-black py-2">
                  <i className="fa-solid fa-envelope mr-2"></i>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="focus:outline-none w-full tracking-widest"
                    required
                  />
                </div>
              )}
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email}</p>
              )}
              <div className="flex items-center gap-3 border-b border-black py-2">
                <i className="fa-solid fa-lock mr-2"></i>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="focus:outline-none w-full tracking-widest"
                  required
                />
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs">{errors.password}</p>
              )}
              {!isLogin && (
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
              )}
              {errors.password2 && (
                <p className="text-red-500 text-xs">{errors.password2}</p>
              )}
            </div>

            {/* General error message */}
            {errors.general && (
              <p className="text-red-500 text-xs text-center mt-2">
                {errors.general}
              </p>
            )}

            <div className="flex justify-center w-full items-center mt-6 p-2">
              <button
                className={`bg-indigo-600 px-6 py-3 text-sm text-white rounded-lg transition duration-300 ease-in-out ${
                  loading
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-indigo-700"
                }`}
                type="submit"
                disabled={loading}
              >
                {loading
                  ? isLogin
                    ? "Logging in..."
                    : "Registering..."
                  : isLogin
                  ? "Login"
                  : "Register"}
              </button>
            </div>

            <p className="text-center text-sm mt-4">
              {isLogin ? (
                <>
                  Don't have an account?{" "}
                  <Link to="/register" className="text-indigo-600 font-bold">
                    Register here
                  </Link>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <Link to="/login" className="text-indigo-600 font-bold">
                    Login here
                  </Link>
                </>
              )}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
