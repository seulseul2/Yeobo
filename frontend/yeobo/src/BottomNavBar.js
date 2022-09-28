import './BottomNavBar.scss';
import { Link } from 'react-router-dom';
import bag from './images/icons/onebag.png';
import bags from './images/icons/mergeboddari.png';
import user from './images/icons/user.png';
import homeWhite from './images/icons/homewhite.png';
// import homePink from './images/icons/home-pink.png';
import search from './images/icons/searchicon.png';

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
        <Link to='/Search'>
          <img className='homeIcon' src={search} alt=""/>
          <p className='iconText'>검색</p>
        </Link>
      </div>
      <div className='iconTab'>
        <Link to='/Boddari'>
          <img className='homeIcon' src={bag} alt=""/>
          <p className='iconText'>만들기</p>
        </Link>
      </div>
      <div className='iconTab'>
        <Link to='/Login'>
          <img className='homeIcon' src={bags} alt=""/>
          <p className='iconText'>합치기</p>
        </Link>
      </div>
      <div className='iconTab'>
        <Link to='/Mypage'>
          <img className='homeIcon' src={user} alt=""/>
          <p className='iconText'>마이페이지</p>
        </Link>
      </div>
    </div>
  </div>
}

export default BottomNavBar;