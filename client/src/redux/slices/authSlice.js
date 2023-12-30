import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: null,
    email: null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuth: (state, action) => {
            state.token = action.payload.token;
            state.email = action.payload.email;
        },
        deleteAuth: (state, action) => {
            state.token = null;
            state.email = null;
        },
    },
});

export const { setAuth, deleteAuth } = authSlice.actions;

export default authSlice.reducer;
