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
            <li><Link to="/"><img src="https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&amp;id=90de5b05-cd9f-4ff4-a9d1-b7cb06cbd89b" alt="위양지(양양지)"/><p>위양지(양양지)</p></Link> </li>
            <li><Link to="/"><img src="https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=55111e82-12bf-48b0-93cb-c3cff0c5b6f5" alt="위양지(양양지)"/></Link></li>
            <li><Link to="/"><img src="https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&amp;id=90de5b05-cd9f-4ff4-a9d1-b7cb06cbd89b" alt="위양지(양양지)"/></Link></li>
            <li><Link to="/"><img src="https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&amp;id=90de5b05-cd9f-4ff4-a9d1-b7cb06cbd89b" alt="위양지(양양지)"/></Link></li>
            <li><Link to="/"><img src="https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&amp;id=90de5b05-cd9f-4ff4-a9d1-b7cb06cbd89b" alt="위양지(양양지)"/></Link></li>
            <li><Link to="/"><img src="https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&amp;id=90de5b05-cd9f-4ff4-a9d1-b7cb06cbd89b" alt="위양지(양양지)"/></Link></li>
            <li><Link to="/"><img src="https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&amp;id=90de5b05-cd9f-4ff4-a9d1-b7cb06cbd89b" alt="위양지(양양지)"/></Link></li>
            <li><Link to="/"><img src="https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&amp;id=90de5b05-cd9f-4ff4-a9d1-b7cb06cbd89b" alt="위양지(양양지)"/></Link> </li>
            <li><Link to="/"><img src="https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=55111e82-12bf-48b0-93cb-c3cff0c5b6f5" alt="위양지(양양지)" /></Link></li>
            <li><Link to="/"><img src="https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&amp;id=90de5b05-cd9f-4ff4-a9d1-b7cb06cbd89b" alt="위양지(양양지)"/></Link> </li>
            <li><Link to="/"><img src="https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=55111e82-12bf-48b0-93cb-c3cff0c5b6f5" alt="위양지(양양지)"/></Link></li>
          </ul>
        </div>
      </div>
    </div>
    
  );
};

export default Mypage;