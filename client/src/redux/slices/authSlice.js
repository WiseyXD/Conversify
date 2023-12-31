import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: null,
    email: null,
    name: null,
    id: null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuth: (state, action) => {
            state.token = action.payload.token;
            state.email = action.payload.exists.email;
            state.name = action.payload.exists.name;
            state.id = action.payload.exists._id;
        },
        deleteAuth: (state) => {
            state.token = null;
            state.email = null;
            state.name = null;
            state.id = null;
        },
    },
});

export const { setAuth, deleteAuth } = authSlice.actions;

export default authSlice.reducer;
