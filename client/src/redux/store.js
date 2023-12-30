import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import rootReducer from "./slices/rootReducer";
import { authApi } from "./services/authApi";
import { setupListeners } from "@reduxjs/toolkit/query";

const store = configureStore({
    reducer: { root: rootReducer, [authApi.reducerPath]: authApi.reducer },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware),
});

setupListeners(store.dispatch);
const persistor = persistStore(store);
export { store, persistor };
