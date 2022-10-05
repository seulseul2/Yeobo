import "./BottomNavBar.scss";
import { Link } from "react-router-dom";
import bag from "../assets/images/icons/onebag.png";
import bags from "../assets/images/icons/mergeboddari.png";
import user from "../assets/images/icons/user.png";
import homeWhite from "../assets/images/icons/homewhite.png";
// import homePink from '../assets/images/icons/home-pink.png';
import search from "../assets/images/icons/searchicon.png";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const BottomNavBar = () => {
  const authenticated = useSelector((state) => state.authToken.authenticated);
  const location = useLocation();
  const [className, setClassName] = useState('');

    // console.log(location.pathname)
    // switch (location.pathname) {
    //   case '/' :
    //     setClassName('main')
    //   // break;
    //   case '/Search' : 
    //   setClassName('search')
    //   // break;
    //   case '/Boddari' :
    //     setClassName('boddari')
    //   // break
    //   case '/Login' :
    //     setClassName('login')
    //   // break
    //   case '/Mypage' :
    //     setClassName('mypage')
    //   default:
    //     setClassName('404')
    // }

    useEffect(() => {
      console.log(className)
    }, [])
  return (
    <div className="bottomnav">
      <div className="bottomBox">
        <div className="iconTab">
          <Link to="/">
            <img className="homeIcon" src={homeWhite} alt="" />
            <p className="iconText">홈</p>
          </Link>
        </div>
        <div className="iconTab">
          <Link to="/Search">
            <img className="homeIcon" src={search} alt="" />
            <p className="iconText">검색</p>
          </Link>
        </div>
        <div className="iconTab">
          <Link to="/Boddari">
            <img className="homeIcon" src={bag} alt="" />
            <p className="iconText">만들기</p>
          </Link>
        </div>
        <div className="iconTab">
          <Link to="/Login">
            <img className="homeIcon" src={bags} alt="" />
            <p className="iconText">합치기</p>
          </Link>
        </div>
        {}
        <div className="iconTab">
          {authenticated ? (
            <Link to="/Mypage">
              <img className="homeIcon" src={user} alt="" />
              <p className="iconText">마이페이지</p>
            </Link>
          ) : (
            <Link to="/Login">
              <img className="homeIcon" src={user} alt="" />
              <p className="iconText">로그인</p>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default BottomNavBar;
