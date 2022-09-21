import './BottomNavBar.scss';
import { Link } from 'react-router-dom';
import bag from './images/icons/shopping-bag36.png';

const BottomNavBar = () => {
  return <div className='bottom'>
    <div className='bottomBox'>
      <div className='iconTab'>
        <Link to='/'>
          <svg className='homeIcon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="36"><path fill="none" d="M0 0h24v24H0z"/><path d="M21 20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.49a1 1 0 0 1 .386-.79l8-6.222a1 1 0 0 1 1.228 0l8 6.222a1 1 0 0 1 .386.79V20zm-2-1V9.978l-7-5.444-7 5.444V19h14z" fill="rgba(255,255,255,1)"/></svg>
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
        <Link to='/'>
          <svg className='homeIcon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="36"><path fill="none" d="M0 0h24v24H0z"/><path d="M21 20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.49a1 1 0 0 1 .386-.79l8-6.222a1 1 0 0 1 1.228 0l8 6.222a1 1 0 0 1 .386.79V20zm-2-1V9.978l-7-5.444-7 5.444V19h14z" fill="rgba(255,255,255,1)"/></svg>
          <p className='iconText'>홈</p>
        </Link>
      </div>
      <div className='iconTab'>
        <Link to='/Login'>
          <svg className='homeIcon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="36"><path fill="none" d="M0 0h24v24H0z"/><path d="M21 20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.49a1 1 0 0 1 .386-.79l8-6.222a1 1 0 0 1 1.228 0l8 6.222a1 1 0 0 1 .386.79V20zm-2-1V9.978l-7-5.444-7 5.444V19h14z" fill="rgba(255,255,255,1)"/></svg>
          <p className='iconText'>로그인</p>
        </Link>
      </div>
    </div>
  </div>
}

export default BottomNavBar;