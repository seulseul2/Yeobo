import "./BottomNavBar.scss";
import { Link } from "react-router-dom";
import bag from "../assets/images/icons/onebag.png";
import bags from "../assets/images/icons/mergeboddari.png";
import user from "../assets/images/icons/user.png";
import homeWhite from "../assets/images/icons/homewhite.png";
// import homePink from '../assets/images/icons/home-pink.png';
import search from "../assets/images/icons/searchicon.png";
import { useSelector } from "react-redux";

const BottomNavBar = () => {
  const authenticated = useSelector((state) => state.authToken.authenticated);

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
          <Link to="/MakeBoddari">
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
