// import React, { useRef, useState } from "react";
// Import Swiper React components
// import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from 'react-router-dom';
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./BoddariBox.scss";

// import required modules
// import { Pagination } from "swiper";

function MypageList(props) {
  return <li>
    <div className='mypage-img-wrapper'>
      <Link to="/">
        <img className='mypage-img' src={props.src} alt="" />
        <p>{props.name}</p>
      </Link>
    </div>
  </li>
}

const Mypage = () => {
  return (
    <div>
      <div class="box">
        <div id="tab">
          <ul>
            <MypageList name="프롭 테스트" src="https://velog.velcdn.com/images%2Fleeyoungwoozz%2Fpost%2Fc362e17d-7a41-40ea-89aa-371e48b84e54%2F1*srSO6S7Q0N-Y9iOwdVah0A.jpeg"/>
            <MypageList name="여행지 1" src="http://newsimg.hankookilbo.com/2015/04/08/201504081416833028_5.jpg"/>
            <MypageList name="여행지 2" src="https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=190adbd8-12d8-41b2-8a8b-8baba390b309"/>
            <MypageList name="여행지 3" src="http://cdn.slist.kr/news/photo/201707/16399_49786_3015.jpg"/>
            <MypageList name="여행지 4" src="https://a.cdn-hotels.com/gdcs/production145/d650/658ae687-dd9b-4d0b-a80a-41d3a53cc180.jpg"/>
            <MypageList name="여행지 5" src="https://mblogthumb-phinf.pstatic.net/MjAyMDAyMDdfMTYw/MDAxNTgxMDg1NzUxMTUy.eV1iEw2gk2wt_YqPWe5F7SroOCkXJy2KFwmTDNzM0GQg.Z3Kd5MrDh07j86Vlb2OhAtcw0oVmGCMXtTDjoHyem9og.JPEG.7wayjeju/%EB%B0%B0%EC%9A%B0%ED%94%84%EB%A1%9C%ED%95%84%EC%82%AC%EC%A7%84_IMG7117.jpg?type=w800"/>
          </ul>
        </div>
      </div>
    </div>
    
  );
};

export default Mypage;