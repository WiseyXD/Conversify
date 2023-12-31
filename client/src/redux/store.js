import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import rootReducer from "./slices/rootReducer";
import { authApi } from "./services/authApi";
import { chatApi } from "./services/chatApi";
import { userApi } from "./services/userApi";
import { setupListeners } from "@reduxjs/toolkit/query";

const store = configureStore({
    reducer: {
        root: rootReducer,
        [authApi.reducerPath]: authApi.reducer,
        [chatApi.reducerPath]: chatApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            authApi.middleware,
            chatApi.middleware,
            userApi.middleware
        ),
});

setupListeners(store.dispatch);
const persistor = persistStore(store);
export { store, persistor };
