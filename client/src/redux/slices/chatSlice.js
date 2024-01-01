import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    chat: null,
};

export const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        setCurrentChat: (state, action) => {
            state.chat = action.payload;
        },
    },
});

export const { setCurrentChat } = chatSlice.actions;

export default chatSlice.reducer;
