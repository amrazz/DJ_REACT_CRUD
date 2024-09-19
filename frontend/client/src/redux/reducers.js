import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    token: null,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            console.log("loginSuccess reducer called with payload in reducer:", action.payload);
            state.user = action.payload.user;   
            state.token = action.payload.token;
            state.loading = false;
            state.error = null;          
        },
        loginFail: (state, action) => {
            console.log("ERROR DURING LOGIN", action.payload);
            state.error = action.payload;
            state.loading = false;
        },

        registerSuccess: (state, action) => {
            state.user = action.payload;
            state.loading = false;
        },
        registerFail: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.error = null;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
    },
});

export const { loginSuccess, loginFail, logout, setLoading, registerSuccess, registerFail } = authSlice.actions;
export default authSlice.reducer;
