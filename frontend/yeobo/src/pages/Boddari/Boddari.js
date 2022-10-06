import React from 'react';
import Destination from './Destination';
import './Boddari.scss';
import {Link} from 'react-router-dom';
import { useLocation } from 'react-router';
import {useState} from 'react';
import axios from 'axios';


const Boddari = () => {
  const location = useLocation();
  const recoList = location.state.result;
  const [attraction, setAttraction] = useState([]);
  const add = (attractionId) => {
    // setAttraction(attraction => [...attraction, attractionId])
    axios({
      url: `https://j7c103.p.ssafy.io/django/MakeBoddari/Recommend/${attractionId}/`,
      method: 'get'
    })
      .then((res) => {
        console.log(res.data)
        const response = res.data
        response.map((el, index) => {
          let attraction_id = el.attraction_id;
          setAttraction(attraction => [...attraction, 
            attraction_id
            // name: name,
            // image: image
          ]);
        })
      console.log('attraction:', attraction)
      })
      .catch((err) => {
        console.log(err);
      })
  } 
  // const remove = () => {
  //   const newAttraction = attraction.filter((el) => el !== targetId);
  //   setAttraction(newAttraction)
  // }
  return (
    <div className="boddariRoot">
      <div className="header">
        <Link to='/'>이전</Link>
        <p>보따리 만들기</p>
        <Link to='/SaveBoddari' state={{attraction:attraction}}>다음</Link>
      </div>
      <div className="recoList">
        {recoList && recoList.map((el, index) => {
          return (
          <div className='recoList_item2'>
            <Destination recoList={el}/>
            <button className='plus' onClick={() => {
              add(el.attraction_id)
            }}>담기</button>
            {/* <button className='minus' onClick={() => {
              remove(el.attraction_id)
            }}>빼기</button> */}
          </div>
          )
        })}
      </div>
    </div>
  );
}
export default Boddari;