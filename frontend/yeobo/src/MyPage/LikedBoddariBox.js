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

const Mypage = () => {
  return (
    <div>
      <div class="box">
        <div id="tab">
          <ul>
            <li>
              <div className='mypage-img-wrapper'>
                <Link to="/">
                  <img className='mypage-img' src="https://a.cdn-hotels.com/gdcs/production145/d650/658ae687-dd9b-4d0b-a80a-41d3a53cc180.jpg" alt="" />
                  <p>여행지 이름</p>
                </Link> 
              </div>
            </li>
            <li>
              <div className='mypage-img-wrapper'>
                <Link to="/">
                  <img className='mypage-img' src="https://mblogthumb-phinf.pstatic.net/MjAyMDAyMDdfMTYw/MDAxNTgxMDg1NzUxMTUy.eV1iEw2gk2wt_YqPWe5F7SroOCkXJy2KFwmTDNzM0GQg.Z3Kd5MrDh07j86Vlb2OhAtcw0oVmGCMXtTDjoHyem9og.JPEG.7wayjeju/%EB%B0%B0%EC%9A%B0%ED%94%84%EB%A1%9C%ED%95%84%EC%82%AC%EC%A7%84_IMG7117.jpg?type=w800" alt="" />
                  <p>여행지 이름</p>
                </Link>  
              </div>
            </li>
            <li>
              <div className='mypage-img-wrapper'>
                <Link to="/">
                  <img className='mypage-img' src="https://t1.daumcdn.net/cfile/tistory/9987FB425C296B5203" alt="" />
                  <p>여행지 이름</p>
                </Link> 
              </div>
            </li>
            <li>
              <div className='mypage-img-wrapper'>
                <Link to="/">
                  <img className='mypage-img' src="http://newsimg.hankookilbo.com/2015/04/08/201504081416833028_5.jpg" alt="" />
                  <p>여행지 이름</p>
                </Link>
              </div>
            </li>
            <li>
              <div className='mypage-img-wrapper'>
                <Link to="/">
                  <img className='mypage-img' src="http://cdn.slist.kr/news/photo/201707/16399_49786_3015.jpg" alt="" />
                </Link> 
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    
  );
};

export default Mypage;