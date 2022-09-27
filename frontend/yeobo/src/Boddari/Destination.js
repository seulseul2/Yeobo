import React from "react";
import image from '../images/daejeon.jpeg';
import './Destination.scss';
import {useState} from 'react';

const Destination = () => {
  const [text, setText] = useState("담기");
  const [active, setActive] = useState('active');
  function changeText() {
   setText(prev => prev === "담기"? "빼기":"담기");
   setActive(prev => prev === "active"? "":"active");
  }

  return (
    <div className="Destination">
      <div className="Image">
        <img src={image} alt="destinationImg"/>  
      </div>
      <div className="Name">
        <h1>여행지 이름</h1>
        <button className={"btn" + (active === ""? "active" : "")} onClick={changeText}>{text}</button>
    </div>
  </div>
  );
  }

export default Destination;