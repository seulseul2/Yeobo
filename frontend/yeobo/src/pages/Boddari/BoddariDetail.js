import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

// <-- 좋아요 하트 import -->
import heart from '../../assets/images/icons/heart.png';
import unlike from '../../assets/images/icons/like.png'

const BoddariDetail = () => {
  const accessToken = useSelector((state) => state.authToken.accessToken);
  // const userId = useSelector((state) => state.authToken.userId);
  const params = useParams().BoddariId;
  const [detailData, setDetailData] = useState('');
  const [chkLike, setChkLike] = useState(false);
  const userId = useSelector((state) => state.authToken.userId);


  // <-- 디테일 정보 가져오기 useEffect 실행 -->
  const getDetail = async (params) => {
    try {
      const response = await axios({
        url: `https://j7c103.p.ssafy.io:8080/api/temp/bag/detail/${params}`,
        method: 'get',
        headers: {
          'X-AUTH-TOKEN': accessToken
        }
      })
      setDetailData(response.data.data);
      console.log('bagDetail : ', response.data.data);
    } catch (err) {
      console.log('bagDetailErr : ', err);
    }
  }
  // <-- 좋아요 -->
  const like = async (bagId) => {
    try {
      const response = await axios({
        url: `https://j7c103.p.ssafy.io:8080/api/bag/like/${userId}/${bagId}`,
        method: 'post',
        headers: {
          'X-AUTH-TOKEN': accessToken
        }
      })
      console.log(response);
      setChkLike(true)
    } catch (err) {
      console.log(err);
      setChkLike(false)
    }
  }
  // <-- 안좋아요 -->
  const dislike = async (bagId) => {
    try {
      const response = await axios({
        url: `https://j7c103.p.ssafy.io:8080/api/bag/delete/like/${userId}/${bagId}`,
        method: 'delete',
        headers: {
          'X-AUTH-TOKEN': accessToken
        }
      })
      console.log(response);
      setChkLike(false)

    } catch (err) {
      console.log(err);
      setChkLike(true)

    }
  }
  useEffect(() => {
    getDetail(params);
  }, []);

  return (
    <div className='bagDetail'>
      <header>
        <h1>{detailData.name}</h1>
        {chkLike === false ?
          <img src={unlike} alt='like' width='25px' onClick={() => {
            like(params)
          }} />
          : <img src={heart} alt='unlike' width='25px' onClick={() => {
            dislike(params)
            }} />}
      </header>
      <label>보따리 메모<input type='textarea' value={detailData.memo} /></label>
      {detailData.attraction && detailData.attraction.map((el, index) => { // attraction 들 
        return (
          <div>
            <img src={el.img} alt='imgage'/>
            <h1>{el.name}</h1>
          </div>
        )
      })}

    </div>

  )
}

export default BoddariDetail;