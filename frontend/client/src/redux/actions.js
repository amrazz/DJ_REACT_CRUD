import axios from "axios";
import { loginSuccess, loginFail, registerSuccess, registerFail, logout } from "./reducers"; 

export const loginUser = (userData) => async (dispatch) => {
    console.log(`User Data: ${userData.username}, ${userData.password}`);
    try {
        const response = await axios.post("http://localhost:8000/api/login/", userData);
        console.log(`Login Response:`, response);

        if (response.status === 200) {
            const { access_token, refresh_token, user } = response.data;

            // Store tokens in localStorage
            localStorage.setItem("ACCESS_TOKEN", access_token);
            localStorage.setItem("REFRESH_TOKEN", refresh_token);

            dispatch(loginSuccess({ user: userData.username, token: access_token }));
            console.log("Login Success Dispatched");

            return { success: true, data: user };
        } else {
            const errorMsg = "Invalid username or password. Please try again.";
            dispatch(loginFail(errorMsg));
            return { error: { details: { general: errorMsg } } };
        }
    } catch (error) {
        console.error("Error logging in:", error);
        const errorMsg = error.response ? error.response.data : error.message;
        dispatch(loginFail(errorMsg)); // Dispatch login failure
        return { error: { details: errorMsg } };
    }
};

export const registerUser = (userData) => async (dispatch) => {
    try {
        const response = await axios.post("http://localhost:8000/api/register/", userData);
        const data = response.data;

        if (response.status === 201) {
            const { access_token, refresh_token } = data;

            // Store tokens in localStorage
            localStorage.setItem("ACCESS_TOKEN", access_token);
            localStorage.setItem("REFRESH_TOKEN", refresh_token);

            // Dispatch registration success with user data
            dispatch(registerSuccess(data));
            return { success: true, data };
        } else {
            throw new Error("Registration failed, please try again later.");
        }
    } catch (error) {
        const errorMsg = error.response?.data?.error || "Registration failed.";
        dispatch(registerFail(errorMsg)); // Dispatch registration failure

        return { error: { message: errorMsg, details: error.message } };
    }
};

export const logoutUser = () => async (dispatch) => {
    try {
        // Clear tokens from localStorage
        localStorage.removeItem("ACCESS_TOKEN");
        localStorage.removeItem("REFRESH_TOKEN");

        // Dispatch logout action
        dispatch(logout());
        return { success: true };
    } catch (error) {
        console.error("Error logging out:", error);
        return { error: error.message };
    }
};
