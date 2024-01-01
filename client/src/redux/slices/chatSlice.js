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
        unsetCurrentChat: (state) => {
            state.chat = null;
        },
    },
});

export const { setCurrentChat, unsetCurrentChat } = chatSlice.actions;

export default chatSlice.reducer;
