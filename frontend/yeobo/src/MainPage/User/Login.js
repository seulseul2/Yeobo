import { Link } from 'react-router-dom';
import './User.scss';
import logo from '../../images/logos/logo-border.png';
import naver from '../../images/icons/social-naver.png';
import kakao from '../../images/icons/social-kakao.png';
import google from '../../images/icons/social-google.png';

// const testImage = 'https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=552b48fc-ce4a-43dc-adf2-1f854e4abd8f&mode=progress';

const Login = () => {
  return <div class="user-box">
    <div className='login-title'>
      <img className='login-logo' src={logo} alt="" />
      <div className='title-box'>
        <p className='title-top'>여보</p>
        <p className='title-mid'>여행 보따리</p>
      </div>
    </div>
    <div className='login-page'>
      <div className='login-page-name'>
        <p>로그인</p>
      </div>
      <div className='login-inputs'>
        <div className='login-input' >
          <p className='login-input-name' >이메일</p>
          <input className='login-input-text' />
        </div>
        <div className='login-input'>
          <p className='login-input-name'>비밀번호</p>
          <input className='login-input-text' />
        </div>
        <button className='login-button'>Login</button>
      </div>
      <div className='signup-link'>
        <p className='signup-text'>처음이신가요? <Link className='signup-btn' to="/Signup">회원가입</Link>하기</p>
      </div>
    </div>
    <div className='login-page'>
      <p className='social-title'>소셜로그인</p>
      <div className='social-btns'>
        <a className='social-btn' href="naver.com">
          <img src={naver} alt=""/>
        </a>
        <a className='social-btn' href="naver.com">
          <img src={kakao} alt=""/>
        </a>
        <a className='social-btn' href="google.com">
          <img src={google} alt=""/>
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
  </div>
}
export default Login;