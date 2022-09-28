import './User.scss';
import axios from 'axios';

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logos/logo-border.png';
import naver from '../../images/icons/social-naver.png';
import kakao from '../../images/icons/social-kakao.png';
import google from '../../images/icons/social-google.png';

const Signup = () => {

  const [inputs, setInputs] = useState({
    email: '',
    password: '',
    nickname: '',
    age: '',
    gender: '',
  })
  const [rePasswordInput, setRePasswordInput] = useState({
    re_password: '',
  })
  const { email, password, nickname, age, gender } = inputs;
  const { re_password } = rePasswordInput;
  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  }
  const onChangeRePassword = (e) => {
    setRePasswordInput({
      re_password: e.target.value,
    })
    console.log(inputs)
  };
  const onReset = () => {
    setInputs({
      email: '',
      password: '',
      re_password: '',
      nickname: '',
      age: '',
      gender: '',
    });
  };

  // 이메일 검사: '@', '.' 이 둘다 포함될것.
  const isValidEmail = email.includes('@') && email.includes('.');
  // 비밀번호 특수문자 검사를 위한 정규식표현.
  const specialLetter = password.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);
  // 특수문자 1자 이상, 전체 8자 이상일것.
  const isValidPassword = password.length >= 8 && specialLetter >= 1;
  // 모든 input의 value가 1자 이상이 되어야 한다
  const isValidInput = email.length >= 1 && password.length >= 1 && re_password.length >= 1;
  // 검사한 모든 로직의 유효성 검사가 true가 될때 getIsActive함수가 작동한다. 버튼 클릭 이벤트가 발생할때 넣어줄 함수.
  const getIsActive = isValidEmail && isValidPassword && isValidInput === true;
  // 유효성 검사 중 하나라도 만족하지못할때 즉, 버튼이 비활성화 될 때 버튼을 클릭하면 아래와 같은 경고창이 뜬다.
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const re_pass = password === re_password
    if (!isValidEmail) {
      alert('이메일 형식으로 입력해 주세요.');
    } else if (!isValidInput) {
      alert('모든 내용을 입력해 주세요.');
    } else if (!isValidPassword) {
      alert('비밀번호는 특수문자 1자 이상, 전체 8자 이상으로 작성해 주세요.')
    } else if (!re_pass) {
      alert('비밀번호가 일치하지 않습니다.')
    }
    if (!nickname) {
      console.log('닉네임 이메일로 대체함');
      const email_nick = email.split('@')[0]
      setInputs({
        ...inputs,
        nickname: email_nick,
      });
    }
    axios.post('http://j7c103.p.ssafy.io:8080/api/user/signUp', inputs)
      .then((res) => {
        const response = res.data;
        alert(response.message);
        console.log(response)
      })
      .catch((err) => {
        console.log(err.response);
      })
  }

    return <div className="user-box">
      <div className='login-title'>
        <img className='login-logo' src={logo} alt="" />
        <div className='title-box'>
          <p className='title-top'>여보</p>
          <p className='title-mid'>여행 보따리</p>
        </div>
      </div>
      <div className='login-page'>
        <div className='login-page-name'>
          <p>회원가입</p>
        </div>
        <form className='login-inputs' action="" method="">
          <div className='login-input' >
            <p className='login-input-name' >이메일<span className='color-red'> *</span></p>
            <input className='login-input-text' autoFocus type="email" required placeholder='이메일 주소' onChange={onChange} name="email" />
          </div>
          <div className='login-input'>
            <p className='login-input-name'>비밀번호<span className='color-red'> *</span></p>
            <input className='login-input-text' type="password" required placeholder='비밀번호(숫자, 영문자, 특수문자 8자리 이상)' onChange={onChange} name="password" />
          </div>
          <div className='login-input'>
            <p className='login-input-name'>비밀번호 확인<span className='color-red'> *</span></p>
            <input className='login-input-text' type="password" required placeholder='비밀번호 재입력' onChange={onChangeRePassword} name="re_password" />
          </div>
          <div className='login-input'>
            <p className='login-input-name'>닉네임</p>
            <input className='login-input-text' type="text" placeholder='닉네임을 입력해주세요.' onChange={onChange} name="nickname" />
          </div>
          <div className='display-flex'>
            <div className='login-input first'>
              <p className='login-input-name'>나이</p>
              <input className='login-input-text' type="number" placeholder='나이를 입력해주세요.' onChange={onChange} name="age" />
            </div>
            <div className='login-input'>
              <p className='login-input-name'>성별</p>
              <input className='login-input-text' type="text" placeholder='MALE  |  FEMALE' onChange={onChange} name="gender" />
            </div>
          </div>
          <button
            type="submit"
            // className={'login-buttonsss' + (getIsActive ? 'signUpButtonAction' : 'signUpButtonInaction')}
            className='login-button'
            onClick={handleSubmit}>Signup</button>
        </form>
        <div className='signup-link'>
          <p className='signup-text'>이미 계정이 있으신가요? <Link className='signup-btn' to="/Login">로그인</Link>하기</p>
        </div>
      </div>
      <div className='login-page'>
        <p className='social-title'>소셜로그인</p>
        <div className='social-btns'>
          <a className='social-btn' href="naver.com">
            <img src={naver} alt="" />
          </a>
          <a className='social-btn' href="naver.com">
            <img src={kakao} alt="" />
          </a>
          <a className='social-btn' href="google.com">
            <img src={google} alt="" />
          </a>
        </div>
      </div>
    </div>
  }
export default Signup;