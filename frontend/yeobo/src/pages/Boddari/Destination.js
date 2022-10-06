import React from "react";
import image from '../../assets/images/daejeon.jpeg';
import './Destination.scss';
import {useState} from 'react';
import {useSelector} from 'react-redux';

const Destination = (props) => {
  // const g = useSelector((state) => state.recoList.recoList);
  const recoList = props.recoList;
  const [text, setText] = useState("담기");
  const [active, setActive] = useState('active');
  const [attraction, setAttraction] = useState([]);

  const add = (attractionId) => {
    setAttraction(attraction => [...attraction, attractionId])
    console.log(attraction);
  } 
  const del = (attractionId) => {
    setAttraction(attraction.filter((attractionId) => attraction.attractionId !== attractionId))
  }
  function changeText(attractionId) {
    setText(prev => prev === "담기"? "빼기":"담기");
    // setActive(prev => prev === "active"? "":"active");
  }

  return (
    <div className="Destination">
      <div className="Image">
        <img src={recoList.image} alt="destinationImg"/>  
      </div>
      <div className="Name">
        <h1>{recoList.name}</h1>
    </div>
  </div>
  );
  }

export default Destination;