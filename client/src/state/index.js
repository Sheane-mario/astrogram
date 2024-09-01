import { createSlice } from "@reduxjs/toolkit";

// we will use redux toolkit to create a slice that will hold the state of our app. so state management will be easier and more organized
// will change this later to include more states
const initialState = {
    mode: 'light',
    user: null,
    token: null,
    posts: [],
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === 'light' ? 'dark' : 'light'; 
        },
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        }
    }
});

export const { setMode, setLogin, setLogout } = authSlice.actions;
export default authSlice.reducer;