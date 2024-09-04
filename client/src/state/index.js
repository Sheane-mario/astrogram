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
        },
        setPosts: (state, action) => {
            state.posts = action.payload.posts;
        },
        setPost: (state, action) => {
            const updatedPosts = state.posts.map((post) => {
                if (post._id === action.payload.post._id) return action.payload.post;
                return post;
            });
            state.posts = updatedPosts;
        },
    }
});

export const { setMode, setLogin, setLogout, setPost, setPosts } = authSlice.actions;
export default authSlice.reducer;