import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    onlineUsers: null,
};

export const socketSlice = createSlice({
    name: "socket",
    initialState,
    reducers: {
        setOnlineUsers: (state, action) => {
            state.onlineUsers = action.payload;
        },
    },
});

export const { setConnection } = socketSlice.actions;

export default socketSlice.reducer;
