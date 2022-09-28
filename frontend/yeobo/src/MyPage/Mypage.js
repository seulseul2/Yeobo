import './Mypage.scss';
import settings from '../images/icons/settings.png';
import pink from '../images/icons/pinkCircle.png';
import purple from '../images/icons/purpleCircle.png';
import mint from '../images/icons/mintCircle.png';
import info from '../images/icons/info.png';
// import { Link } from 'react-router-dom';
import BoddariBox from './BoddariBox';
import VisitedBox from './VisitedBox';
import LikedBoddariBox from './LikedBoddariBox';
import AdminModule from './AdminModule';
import axios from 'axios';

const Mypage = () => {

  const logout = () => {
    console.log('로그아웃 시도');
    axios.get('http://j7c103.p.ssafy.io:8080/api/logout')
      .then((res) => {
        const response = res.data;
        alert(response.message);
        console.log(response.data)
      })
      .catch((err) => {
        console.log(err.response);
    })
  };

  return (
    <div className="mypage">
      <div className='mypageBox'>
        <div className='mypageTop'>
          <p className='mypageTopName'>My Page</p>
          <img className='mypageTopIcon' src={settings} alt="" />
        </div>
        <div className='mypageProfileBox'>
          <div className='mypageProfileText'>
            <p className='mypageNickname'>갓지은밥</p>
            <div className='mypageLogoutBtn' to="/login" onclick={logout}>로그아웃</div>
          </div>
          <div className='mypage-profile-img-wrapper'>
            <img className='mypage-profile-img' src="https://mblogthumb-phinf.pstatic.net/MjAyMDAyMDdfMTYw/MDAxNTgxMDg1NzUxMTUy.eV1iEw2gk2wt_YqPWe5F7SroOCkXJy2KFwmTDNzM0GQg.Z3Kd5MrDh07j86Vlb2OhAtcw0oVmGCMXtTDjoHyem9og.JPEG.7wayjeju/%EB%B0%B0%EC%9A%B0%ED%94%84%EB%A1%9C%ED%95%84%EC%82%AC%EC%A7%84_IMG7117.jpg?type=w800" alt="" />
          </div>
        </div>
      </div>
      <div className='mypageBox'>
        <div className='mypageIcons'>
          <img src={pink} alt=""/>
          <img src={purple} alt=""/>
          <img src={mint} alt=""/>
        </div>
      </div>
      <div className='mypageBox'>
        <div className='mypageTitle'>
          <p className='mypageTitleText'>보따리 리스트</p>
          <img className='mypageTitleIcon' src={info} alt=''/>
        </div>
        <BoddariBox />
      </div>
      <div className='mypageBox'>
        <div className='mypageTitle'>
          <p className='mypageTitleText'>좋아요한 보따리</p>
          <img className='mypageTitleIcon' src={info} alt=''/>
        </div>
        <LikedBoddariBox />
      </div>
      <div className='mypageBox'>
        <div className='mypageTitle'>
          <p className='mypageTitleText'>방문 여행지</p>
          <img className='mypageTitleIcon' src={info} alt=''/>
        </div>
        <VisitedBox />
      </div>
      <div className='adminBox'>
        <AdminModule/>
      </div>
      <div className='bottomback'>
      </div>
    </div>
  );
};

export default Mypage;