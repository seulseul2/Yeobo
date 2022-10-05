import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { Link } from 'react-router-dom';
import "./Mypage.scss";
import { useNavigate } from "react-router";
import profile from "../../assets/images/bag_image/boddari.png";

import NickDialog from "./NickDialog";
import axios from "axios";
import { getCookieToken, removeCookieToken } from "../../storage/Cookie";
import { DELETE_TOKEN } from "../../store/Auth";
import { TOKEN_TIME_OUT } from "../../store/Auth";

// images
import pink from "../../assets/images/icons/pinkCircle.png";
import purple from "../../assets/images/icons/purpleCircle.png";
import mint from "../../assets/images/icons/mintCircle.png";
import info from "../../assets/images/icons/info.png";

// modules
import BoddariBox from "./BoddariBox";
import VisitedBox from "./VisitedBox";
import LikedBoddariBox from "./LikedBoddariBox";
import AdminModule from "./AdminModule";

// mui delete
// import DeleteIcon from "@mui/icons-material/Delete";
// import IconButton from "@mui/material/IconButton";
// import Tooltip from "@mui/material/Tooltip";

const Mypage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // store에 저장된 Access Token 정보를 받아 온다
  const accessToken = useSelector((state) => state.authToken.accessToken);
  const expireTime = useSelector((state) => state.authToken.expireTime);
  const pictureUrl = useSelector((state) => state.authToken.pictureUrl);
  const nickname = useSelector((state) => state.authToken.nickname);

  // 임시 유저 아이디 15 = 6, 20 = 7
  const userId = 20;

  // 유저 닉네임, 나이, 성별 프레젠트
  const [userNick, setUserNick] = useState();
  const [userAge, setUserAge] = useState();
  const [userGender, setUserGender] = useState();
  const [profileImg, setProfileImg] = useState(profile);
  // const { email, password } = inputs;
  useEffect(() => {
    setProfileImg(profile);
    console.log("mypage rendering~");
    if (pictureUrl !== "") {
      setProfileImg(pictureUrl);
    }
    if (nickname !== "") {
      setUserNick(nickname);
    }
    console.log(userNick);
    // 액세스 토큰이 만료되었는지 확인 (30초 이내로 남았다면 요청)
    if (TOKEN_TIME_OUT <= 30000) {
      axios({
        url: 'https://j7c103.p.ssafy.io/api/refresh',
        method: 'post',
        headers: {
          "X-AUTH-TOKEN": accessToken,
          'REFRESH-TOKEN': getCookieToken,
        },
      })
      .then((res) => {
        console.log(res.data)
      })
      .catch((err) => {
        alert(err.response.data.message)
      })
    }
    axios({
      url: `https://j7c103.p.ssafy.io:8080/api/user/${userId}`,
      method: "get",
      headers: {
        "X-AUTH-TOKEN": accessToken,
      },
    })
      .then((res) => {
        const response = res.data.data;
        setUserNick(response.nickname);
        setUserAge(response.age);
        const gen = response.gender;
        if (gen === "FEMALE") {
          setUserGender("여성");
        } else if (gen === "MALE") {
          setUserGender("남성");
        }
      })
      .catch((err) => {
        alert(err.response.data.message)
      });
    if (!profileImg) {
      setProfileImg(profile);
    }
  }, []);

  const logout = () => {
    console.log("로그아웃 시도");
    axios({
      url: "https://j7c103.p.ssafy.io:8080/api/logout",
      method: "get",
      headers: {
        "X-AUTH-TOKEN": accessToken,
      },
    })
      .then((res) => {
        dispatch(DELETE_TOKEN()); // store에 저장된 액세스 토큰 삭제
        removeCookieToken(); // cookie에 저장된 refresh token 삭제
        const response = res.data;
        alert(response.message); // 로그아웃 백요청 완료
        console.log(response.data);
        navigate("/"); // 홈으로 이동
      })
      .catch((err) => {
        console.log(err);
        alert(err.response.data.message);
      });
  };

  return (
    <div className="mypage">
      <div className="mypageBox">
        <div className="mypageTop">
          <p className="mypageTopName">My Page</p>
          <NickDialog name={nickname} />
        </div>
        <div className="mypageProfileBox">
          <div className="mypageProfileText">
            <p className="mypageNickname">{userNick}</p>
            {userAge && (
              <div className="mypageSideInfo">
                {userAge}세, {userGender}
              </div>
            )}
            <div
              className="mypageSideInfo mypageLogoutBtn"
              to="/login"
              onClick={logout}
            >
              로그아웃
            </div>
          </div>
          <div className="mypage-profile-img-wrapper">
            <img className="mypage-profile-img" src={profileImg} alt="" />
          </div>
        </div>
      </div>
      <div className="mypageBox">
        <div className="mypageIcons">
          <a href="#boddariMade">
            <img src={pink} alt="" />
          </a>
          <a href="#boddariLiked">
            <img src={purple} alt="" />
          </a>
          <a href="#placeVisited">
            <img src={mint} alt="" />
          </a>
        </div>
      </div>
      <div className="mypageBox" id="boddariMade">
        <div className="mypageTitle">
          <p className="mypageTitleText">보따리 리스트</p>
          <img className="mypageTitleIcon" src={info} alt="" />
        </div>
        <BoddariBox />
      </div>
      <div className="mypageBox" id="boddariLiked">
        <div className="mypageTitle">
          <p className="mypageTitleText">좋아요한 보따리</p>
          <img className="mypageTitleIcon" src={info} alt="" />
        </div>
        <LikedBoddariBox />
      </div>
      <div className="mypageBox" id="placeVisited">
        <div className="mypageTitle">
          <p className="mypageTitleText">방문 여행지</p>
          <img className="mypageTitleIcon" src={info} alt="" />
        </div>
        <VisitedBox />
      </div>
      <div className="adminBox">
        <AdminModule />
      </div>
      <div className="bottomback"></div>
    </div>
  );
};

export default Mypage;
