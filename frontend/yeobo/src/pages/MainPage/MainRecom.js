import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./MainRecom.scss";
import axios from "axios";
import { useSelector } from "react-redux";

// const testImage = 'https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=552b48fc-ce4a-43dc-adf2-1f854e4abd8f&mode=progress';

const MainRecom = () => {
  const userId = useSelector((state) => state.authToken.userId);
  const [recommendAttrs, setRecommendAttrs] = useState();

  useEffect(() => {
    axios({
      url: `https://j7c103.p.ssafy.io/django/MainPage/RecentHighScoreBasedRecommend/${userId}/`,
      method: "get",
    })
      .then((res) => {
        console.log(res.data);
        const data = res.data;
        setRecommendAttrs(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="mainRecom">
      <div className="titleModule">
        <p className="mainTitle">맞춤형 추천 여행지</p>
        <p className="subTitle">
          내가 최근 좋아했던 여행지를 좋아하는 다른 여행자는
          <br />
          어느 여행지를 선택했을까요?
        </p>
      </div>
      <div className="imageRecom">
        <div>
          {recommendAttrs ? (
            <Link to={`/Detail/${recommendAttrs[0].attraction_id}`}>
              <img className="firstImg" src={recommendAttrs[0].image} alt="" />
              <p className="text">
                최근 좋아한 여행지
                <span className="text-deco"> '{recommendAttrs[0].name}' </span>
                기반 추천 여행지
              </p>
            </Link>
          ) : (
            <></>
          )}
        </div>
        <ul className="imageLists">
          {recommendAttrs ? (
            recommendAttrs.slice(1, 7).map((attr, index) => {
              return (
                <li className="imageList" key={attr.attraction_id}>
                  <Link
                    className="imageAtag"
                    to={`/Detail/${attr.attraction_id}`}
                  >
                    <div
                      className="imageWrap"
                      style={{ backgroundImage: `url(${attr.image})` }}
                    ></div>
                  </Link>
                  <p className="imageText">{attr.name}</p>
                </li>
              );
            })
          ) : (
            <Link to="Login" className="no-login">
              로그인하고 여행지를 추천 받아보세요!
            </Link>
          )}
        </ul>
      </div>
    </div>
  );
};
export default MainRecom;
