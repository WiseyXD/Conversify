import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    connection: null,
};

export const socketSlice = createSlice({
    name: "socket",
    initialState,
    reducers: {
        setConnection: (state, action) => {
            state.connection = action.payload;
        },
    },
});

export const { setConnection } = socketSlice.actions;

export default socketSlice.reducer;
