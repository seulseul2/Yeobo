import './User.scss';
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
    re_password: '',
    nickname: '',
    age: '',
    gender: '',
  })
  const { email, password, re_password, nickname, age, gender } = inputs;
  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
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
  const handleButtonValid = () => {
    if (
      !isValidInput ||
      !isValidEmail ||
      !isValidPassword
    ) {
      alert('please fill in the blanks');
    };
  }

    return <form class="user-box">
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
        <div className='login-inputs'>
          <div className='login-input' >
            <p className='login-input-name' >이메일<span className='color-red'> *</span></p>
            <input className='login-input-text' type="text" required placeholder='이메일을 입력해주세요.' onChange={onChange} name={email} />
          </div>
          <div className='login-input'>
            <p className='login-input-name'>비밀번호<span className='color-red'> *</span></p>
            <input className='login-input-text' type="text" required placeholder='비밀번호를 입력해주세요.' onChange={onChange} name={password} />
          </div>
          <div className='login-input'>
            <p className='login-input-name'>비밀번호 확인<span className='color-red'> *</span></p>
            <input className='login-input-text' required placeholder='비밀번호를 다시 입력해주세요.' onChange={onChange} name={re_password} />
          </div>
          <div className='login-input'>
            <p className='login-input-name'>닉네임</p>
            <input className='login-input-text' placeholder='닉네임을 입력해주세요.' onChange={onChange} name={nickname} />
          </div>
          <div className='display-flex'>
            <div className='login-input first'>
              <p className='login-input-name'>나이</p>
              <input className='login-input-text' placeholder='나이를 입력해주세요.' onChange={onChange} name={age} />
            </div>
            <div className='login-input'>
              <p className='login-input-name'>성별</p>
              <input className='login-input-text' placeholder='MALE  |  FEMALE' onChange={onChange} name={gender} />
            </div>
          </div>
          <button
            // className={'login-button' + (getIsActive ? 'signUpButtonAction' : 'signUpButtonInaction')}
            className='login-button'
            onClick={handleButtonValid}>Signup</button>
        </div>
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
      <div>
        <p>asdf</p>
        <p>asdf</p>
        <p>asdf</p>
        <p>asdf</p>
        <p>asdf</p>
      </div>
    </form>
  }
export default Signup;