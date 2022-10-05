// Refresh Token 저장소
// JWT(JSON Web Token) : 선택적 서명, 암호화를 사용하여 데이터를 만들기 위한 인터넷 표준
// 액세스 토큰은 실질적 인증을 위한 JWT로, 유효기간이 짧다는 특징
// 리프레시 토큰은 액세스 토큰의 짧은 유효기간 보완을 위함. 액세스 토큰 만료 시 재발급을 위해 사용됨.

// 리프레시 토큰은 브라우저 저장소(쿠키)에, 액세스 토큰은 리덕스 스토어에 저장할 것이다.
// 액세스 토큰의 경우 탈취 위험이 있어 쿠키가 아닌 스토어에 저장하며,
// 브라우저 새로고침마다 값이 초기화되는 불편함은 리프레시 토큰을 통한 재발급으로 해결할 것.
// 리프레시 토컨은 로컬스토리지-세션스토리지-쿠키 등의 방법이 있는데, 스토리지는 XSS 공격에 취약하여 쿠키에 저장하기로 함.

// npm i react-cookie, redux, react-redux, @reduxjs/toolkit

import { Cookies } from "react-cookie";

const cookies = new Cookies();

// RefreshToken을 Cookie에 저장하기 위한 함수
export const setRefreshToken = (refreshToken) => {
  const today = new Date();
  const expireDate = today.setDate(today.getDate() + 7);

  return cookies.set("refreshToken", refreshToken, {
    // refresh_token
    sameSite: "strict",
    path: "/",
    expires: new Date(expireDate),
  });
};

// 쿠키에 저장된 리프레시 토큰 값 가져오는 함수
export const getCookieToken = () => {
  return cookies.get("refreshToken"); // refresh_token
};

// 쿠키 삭제 함수. 로그아웃 시 사용
export const removeCookieToken = () => {
  return cookies.remove("refreshToken", { sameSite: "strict", path: "/" });
};
