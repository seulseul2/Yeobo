// Auth.js에서 선언안 토큰리듀서 사용을 위한 configureStore 선언

import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./Auth";

export const store = configureStore({
  reducer: {
    authToken: tokenReducer,
  },
});
