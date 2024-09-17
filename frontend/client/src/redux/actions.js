import axiosInstance from "../utils/api";
import axios from "axios";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAIL = "REGISTER_FAIL";
export const LOGOUT = "LOGOUT";

export const loginSuccess = (user, token) => ({
    type: LOGIN_SUCCESS,
    payload: { user, token },
});

export const registerSuccess = (user) => ({
    type: REGISTER_SUCCESS,
    payload: user,
});

export const registerFail = (error) => ({
    type: REGISTER_FAIL,
    payload: error,
});

export const loginFail = (error) => ({
    type: LOGIN_FAIL,
    payload: error,
});

export const logout = () => ({
    type: LOGOUT,
});

export const loginUser = (userData) => async (dispatch) => {
    console.log(`this is user data : ${userData.username} and ${userData.password}`);
    try {
        const response = await axios.post("http://localhost:8000/api/login/", userData);
        console.log(` this is the response of the login : ${response}`);

        if (response.status === 200) {
            const { access_token, refresh_token, user } = response.data;
            localStorage.setItem("ACCESS_TOKEN", access_token);
            localStorage.setItem("REFRESH_TOKEN", refresh_token);
            dispatch(loginSuccess(user, access_token));
            console.log(`he is going....`);
            return { success: true, data: user };
        } else {
            const errorMsg = "Invalid username or password please try again.";
            dispatch(loginFail(errorMsg));
            return { error: { details: { general: errorMsg } } }; 
        }
    } catch (error) {
        console.error('Error logging in:', error);
        const errorMsg = error.response ? error.response.data : error.message;
        dispatch(loginFail(errorMsg));
        return { error: { details: errorMsg } }; // Return errors in a consistent format
    }
};


export const registerUser = (userData) => async (dispatch) => {
    try {
        const response = await axios.post("http://localhost:8000/api/register/", userData);
        const data = response.data;
        if (response.status === 201) {
            const { access_token, refresh_token } = response.data;
            localStorage.setItem("ACCESS_TOKEN", access_token);
            localStorage.setItem("REFRESH_TOKEN", refresh_token);
            dispatch(registerSuccess(data));
            return {success : true, data};
        } else {
            throw new Error("Registration failed please try again later.");
        }
    } catch (error) {
        const errorMsg = error.response?.data?.error || "Registration failed";
        dispatch(registerFail(errorMsg));


        return { error: { message: errorMsg, details: errorDetails } };
    }
};
