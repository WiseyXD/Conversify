import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./authSlice";
import chatReducer from "./chatSlice";

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["auth", "chat"],
};

const rootReducer = combineReducers({
    auth: authReducer,
    chat: chatReducer,
});

export default persistReducer(persistConfig, rootReducer);
