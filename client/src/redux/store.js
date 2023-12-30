import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import rootReducer from "./slices/rootReducer";

const store = configureStore({
    reducer: { root: rootReducer },
});

const persistor = persistStore(store);
export { store, persistor };
