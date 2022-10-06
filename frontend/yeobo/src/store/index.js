// Auth.js에서 선언안 토큰리듀서 사용을 위한 configureStore 선언

import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./Auth";
import storage from "redux-persist/lib/storage/session";
import { persistReducer } from "redux-persist";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  authToken: tokenReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  // {
  //   authToken: tokenReducer,
  //   reducer: persistedReducer
  // },
});
