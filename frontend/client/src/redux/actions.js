import axiosInstance from "../utils/api";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const LOGOUT = "LOGOUT";

export const loginSuccess = (user, token) => ({
    type: LOGIN_SUCCESS,
    payload: { user, token },
});

export const loginFail = (error) => ({
    type: LOGIN_FAIL,
    payload: error,
});

export const logout = () => ({
    type: LOGOUT,
});

export const loginUser = (credentials) => async (dispatch) => {
    try {
        const response = await axiosInstance.post("/login/", credentials);
        const { user, token } = response.data;

        localStorage.setItem("token", token);

        dispatch(loginSuccess(user, token));
    } catch (error) {
        const errorMsg = error.response ? error.response.data : error.message;
        console.log(errorMsg);
        dispatch(loginFail(errorMsg));
    }
};

export const registerUser = (userData) => async (dispatch) => {
    console.log(`this is user data: ${userData}`);
    try {
        const response = await axiosInstance.post("/register/", userData);
        const { access_token, refresh_token } = response.data;
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("refresh_token", refresh_token);

        dispatch(loginSuccess(null, access_token));
    } catch (error) {
        const errorMsg = error.response ? error.response.data : error.message;
        dispatch(loginFail(errorMsg));
    }
};
