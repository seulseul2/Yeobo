import React, { useEffect, useState } from "react";
import luggage from '../../assets/images/luggage.png';
import './BoddariSave.scss';
import {useLocation, Link} from 'react-router-dom';
import axios from "axios";
import { useSelector } from 'react-redux';

function BoddariSave() {
  const location = useLocation();
  const attraction = location.state.attraction;
  const [name, setName] = useState('');
  const [memo, setMemo] = useState('');
  const accessToken = useSelector((state) => state.authToken.accessToken)
  // const userId = useSelector((state) => state.authToken.userId);
  const userId = 1;

  const onChangeName = (e) => {
    setName(e.target.value)
  }
  const onChangeMemo = (e) => {
    setMemo(e.target.value)
  }

  const save = async () => {
    try {
      const response = await axios({
         url: `https://j7c103.p.ssafy.io:8080/api/bag/create/${userId}`,
         method: 'post',
         headers: {
           'X-AUTH-TOKEN' : accessToken,
         },
         data: {
           attractionId: attraction,
           memo: memo,
           name: name,
         }
        })
      console.log(response);
      alert('저장성공!')
    } catch (err) {
      console.log('save실패', err);
    }
  }
  return (
    <div className="BoddariSave">
      <div className="BoddariSave-top">
        <image src={luggage} alt='image'/>
      </div>
      <div className="BoddariSave-input">
        <label>보따리 이름<input id="Boddari-name" type='text' placeholder="보따리 이름을 입력하세요." onChange={onChangeName} /></label>
        <label>메모<input id="Boddari-memo" type='text' placeholder="메모를 입력하세요." name='boddariMemo'onChange={onChangeMemo} /></label>
      </div>
      <div className="BoddariSave-btn">
        <button onClick={ () => {save()}}>완료</button>
        <Link to='/'><button>취소</button></Link>
      </div>
    </div>
  )
}

export default BoddariSave;