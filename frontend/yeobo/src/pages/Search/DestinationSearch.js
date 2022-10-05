import './DestinationSearch.scss';
import Rating from '@mui/material/Rating';
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux';

const DestinationSearch = (props) => {
  const accessToken = useSelector((state) => state.authToken.accessToken);
  const [value, setValue] = useState(0);
  const attrList = props.attrList;
  const userId = 1;
  // 평점 주기 부분
  const rating = (attractionId, userId, score) => {
    axios({
      url: 'https://j7c103.p.ssafy.io:8080/api/temp/attraction/score',
      method: 'post',
      headers: {
        'X-AUTH-TOKEN': accessToken
      },
      data:{
        attractionId: attractionId,
        score: score,
        userId: userId,
      }
    })
    .then((res) => {
      console.log(res.data.data)
      setValue(res.data.data.score)
    })
    .catch((err) => {
      console.log(err)
    })
  }
  const detail = (attractionId) => {
    axios({
      url: `https://j7c103.p.ssafy.io/api/attraction/detail/${attractionId}`,
      method: 'get',

    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => { 
        console.log(err);
      })
  }

  return (
    <div className='DestinationSearch'>
      <div className='attrResult'>
        {attrList ? (
          attrList.map((el, index) => {
            return (
              <div className='attrResult_item' key={index}>
                <Link to={'/Detail/'+el.id}><img className='attrResult_item_img' src={el.img}/></Link>
                <p className='attrResult_item_name'>{el.name.split('(')[0]}</p>
                <div className='rating'>
                <Rating
                  name="simple-controlled"
                  value={el.score}
                  onChange={(event, newValue) => {
                    rating(el.id, userId, newValue);
                    console.log('별점 수정');
                    el.score = newValue;
                  }} />
                </div>
              </div>
            )
          })
        ) : (
          <p className='No_attrResult'>검색 내역이 없습니다.</p>
        )}
      </div>

    </div>
  )
}

export default DestinationSearch;