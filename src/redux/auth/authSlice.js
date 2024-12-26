import { createSlice } from "@reduxjs/toolkit";


const initialState ={
    isAuthenticated:false,
    user:null,
    token:null
};


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            // Action payload should include user and token
            state.isAuthenticated = true;
            state.user = action.payload.user;  // Store user object
            state.token = action.payload.token;  // Store token
          },
          logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.token = null;  // Clear token on logout
          },
    }
});
export const { login } = authSlice.actions;
export default authSlice.reducer