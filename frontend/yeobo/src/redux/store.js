// // 리덕스 모듈 가져오기
// const { createStore } = require("redux");
// // data 기본
// const nameData = { name: "Hanamon" };
// // action 객체
// const actionChangeName = (newname) => {
//   return {
//     type: "ACTION_CHANGE_NAME",
//     payload: newname,
//   };
// };
// // reducer 함수
// const postReducer = (state = nameData, action) => {
//   switch (action.type) {
//     case "ACTION_CHANGE_NAME":
//       return Object.assign({}, state, { ...state, name: action.payload });
//       break;
//     default:
//       return state;
//   }
// };
// // store 생성 및 리듀서 등록
// const store = createStore(postReducer);
// // 수정 전 확인
// console.log(store.getState());
// // 수정 실행 (이 부분에서 예를들어 클릭 시 실행되게 끔 만들면 된다.)
// store.dispatch(actionChangeName("하나몬"));
// // 수정 후 확인
// console.log(store.getState());

// // console.log(store);

import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
