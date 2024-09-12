const initialState = {
    user: null,
    token: null,
    loading: false,
    error: null,
};

const authReducer = (state = initialState, action) => {
    console.log(`this is action type: ${action.payload}`);
    switch (action.type) {
        case "LOGIN_SUCCESS":
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                loading: false,
            };

        case "LOGIN_FAIL":
            console.log("ERROR DURING LOGIN", action.payload);
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        case "LOGOUT":
            return {
                user: null,
                token: null,
                error: null,
            };
        default:
            return state;
    }
};

export default authReducer;