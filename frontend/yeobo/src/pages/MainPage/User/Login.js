import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
// import { LoginApi } from "../../../api/user/login";
// import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setRefreshToken } from "../../../storage/Cookie";
import { SET_TOKEN } from "../../../store/Auth";
import axios from "axios";

import "./User.scss";
import logo from "../../../assets/images/logos/logo-border.png";
import naver from "../../../assets/images/icons/social-naver.png";
import kakao from "../../../assets/images/icons/social-kakao.png";
import google from "../../../assets/images/icons/social-google.png";
import GoogleLogIn from "./GoogleLogin";

// const testImage = 'https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=552b48fc-ce4a-43dc-adf2-1f854e4abd8f&mode=progress';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputs;
  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
    // console.log(inputs);
  };

  // 조건 1. 이메일 검사 (이메일 형식으로 했는지 검사해주기)
  const isValidEmail = email.includes("@") && email.includes(".");
  // 조건 2. 입력값 모두 작성 여부 검사
  const isValidInput = email.length >= 1 && password.length >= 1;
  // 조건 만족 여부
  const getIsActive = isValidEmail && isValidInput === true;

  const handleSubmit = () => {
    console.log(".", inputs);
    if (!isValidEmail) {
      alert("이메일 형식으로 입력해 주세요.");
    } else if (!isValidInput) {
      alert("모든 내용을 입력해 주세요.");
    }
    if (getIsActive) {
      axios({
        url: "https://j7c103.p.ssafy.io:8080/api/auth/user/login",
        method: "post",
        data: inputs,
      })
        .then((res) => {
          const response = res.data.data;
          // console.log(response);
          alert(res.data.message);
          const accessToken = response.accessToken;
          const refreshToken = response.refreshToken;
          console.log("access", accessToken);
          console.log("refresh", refreshToken);
          setRefreshToken(refreshToken);
          dispatch(
            SET_TOKEN({ accessToken: accessToken, email: response.email })
          );
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
          alert(err.response.data.message);
        });
    }
  };

  return (
    <div className="user-box">
      <div className="login-title">
        <img className="login-logo" src={logo} alt="" />
        <div className="title-box">
          <p className="title-top">여보</p>
          <p className="title-mid">여행 보따리</p>
        </div>
      </div>
      <div className="login-page">
        <div className="login-page-name">
          <p>로그인</p>
        </div>
        <div className="login-inputs">
          <div className="login-input">
            <p className="login-input-name">이메일</p>
            <input
              className="login-input-text"
              required
              autoFocus
              type="email"
              placeholder="이메일 주소"
              onChange={onChange}
              name="email"
            />
          </div>
          <div className="login-input">
            <p className="login-input-name">비밀번호</p>
            <input
              className="login-input-text"
              required
              type="password"
              placeholder="비밀번호 입력"
              onChange={onChange}
              name="password"
            />
          </div>
          <button className="login-button" onClick={handleSubmit}>
            Login
          </button>
        </div>
        <div className="signup-link">
          <p className="signup-text">
            처음이신가요?{" "}
            <Link className="signup-btn" to="/Signup">
              회원가입
            </Link>
            하기
          </p>
        </div>
      </div>
      <div className="login-page">
        <p className="social-title">소셜로그인</p>
        <div className="social-btns">
          <GoogleLogIn />
        </div>
      </div>
      <div className="bottomBack"></div>
    </div>
  );
};
export default Login;
