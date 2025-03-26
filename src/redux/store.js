import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; 
import { combineReducers } from "redux";
import { apiSlice } from "./services/apiSlice"; 
import authSlice from "./features/authSlice";

const rootReducer = combineReducers({
  auth: authSlice,
  [apiSlice.reducerPath]: apiSlice.reducer, 
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], 
};

const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
  reducer: persistedReducer, 
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }).concat(apiSlice.middleware), 
});

export const persistor = persistStore(store);