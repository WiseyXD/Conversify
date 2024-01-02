import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import rootReducer from "./slices/rootReducer";
import socketReducer from "./slices/socketSlice";
import { authApi } from "./services/authApi";
import { chatApi } from "./services/chatApi";
import { userApi } from "./services/userApi";
import { messageApi } from "./services/messageApi";
import { setupListeners } from "@reduxjs/toolkit/query";

const store = configureStore({
    reducer: {
        root: rootReducer,
        socket: socketReducer,
        [authApi.reducerPath]: authApi.reducer,
        [chatApi.reducerPath]: chatApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [messageApi.reducerPath]: messageApi.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            authApi.middleware,
            chatApi.middleware,
            userApi.middleware,
            messageApi.middleware
        ),
});

setupListeners(store.dispatch);
const persistor = persistStore(store);
export { store, persistor };
