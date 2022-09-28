import React from 'react';
import Destination from './Destination';
import './Boddari.scss';
// import luggage from '../images/luggage.png';
import {Link} from 'react-router-dom';

function Boddari() {
  return (
    <div className="boddariRoot">
      <div className="header">
        <Link to='/'>이전</Link>
        <p>보따리 만들기</p>
        <Link to='/SaveBoddari'>다음</Link>
      </div>
      <div className="recoList">
          <Destination />
          <Destination />
          <Destination />
      </div>
      <div className="boddari">
        <div className="image">
        </div>
      </div>
    </div>
  );
}
export default Boddari;