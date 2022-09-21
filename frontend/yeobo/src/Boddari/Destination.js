import React from "react";
import image from '../images/daejeon.jpeg';
import './Destination.scss';

function Destination() {
  return (
    <div className="Destination">
      <div className="Image">
        <img src={image} alt="destinationImg"/>  
      </div>
      <div className="Name">
        <h2>여행지 이름</h2>
      <button>담기</button>
      </div>
    </div>
  );
};

export default Destination;