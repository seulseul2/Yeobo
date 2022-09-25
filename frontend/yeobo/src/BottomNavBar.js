import './BottomNavBar.scss';
import { Link } from 'react-router-dom';
import bag from './images/icons/bag1.png';
import bags from './images/icons/bags.png';
import user from './images/icons/user.png';
import homeWhite from './images/icons/home-white.png';
// import homePink from './images/icons/home-pink.png';

const BottomNavBar = () => {
  return <div className='bottom'>
    <div className='bottomBox'>
      <div className='iconTab'>
        <Link to='/'>
          <img className='homeIcon' src={homeWhite} alt="" />
          <p className='iconText'>홈</p>
        </Link>
      </div>
      <div className='iconTab'>
        <Link to='/Boddari'>
          <img className='homeIcon' src={bag} alt=""/>
          <p className='iconText'>보따리 만들기</p>
        </Link>
      </div>
      <div className='iconTab'>
        <Link to='/Boddari'>
          <img className='homeIcon' src={bags} alt=""/>
          <p className='iconText'>보따리 합치기</p>
        </Link>
      </div>
      <div className='iconTab'>
        <Link to='/Mypage'>
          <img className='homeIcon' src={user} alt=""/>
          <p className='iconText'>마이페이지</p>
        </Link>
      </div>
      <div className='iconTab'>
        <Link to='/Login'>
          <img className='homeIcon' src={user} alt=""/>
          <p className='iconText'>로그인</p>
        </Link>
      </div>
    </div>
  </div>
}

export default BottomNavBar;