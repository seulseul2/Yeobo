import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Rating from '@mui/material/Rating';
import {useSelector} from 'react-redux';


const Detail = () => {
  const params = useParams().attractionId;
  const [detailData, setDetailData] = useState('');
  const [value, setValue] = useState(0);
  const userId = 1;
  const accessToken = useSelector((state) => state.authToken.accessToken);

  const detail = async () => {
    try {
      const response = await axios({
        url: `https://j7c103.p.ssafy.io:8080/api/temp/attraction/detail/${params}`,
        method: 'get',
        headers: {
          'X-AUTH-TOKEN': accessToken
        }
      })
      setDetailData(response.data.data);
      console.log(response.data.data)
    } catch (err) {
      console.log(err);
    }
  }
  const rating = (attractionId, userId, score) => {
    axios({
      url: 'https://j7c103.p.ssafy.io:8080/api/temp/attraction/score',
      method: 'post',
      headers: {
        'X-AUTH-TOKEN': accessToken
      },
      data:{
        attactionId: attractionId,
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
  useEffect(() => {
    detail();
  }, []);
  return (
    <div className='Detail'>
      <div>
        <img src={detailData.image} alt='detailImage' />
        <p>{detailData.name}</p>
        <Rating
          name="simple-controlled"
          value={detailData.score}
          onChange={(event, newValue) => {
            rating(detailData.id, userId, newValue);
            console.log('별점 수정');
            detailData.score = newValue;
          }} />
        <p>{detailData.address}</p>
        <p>{detailData.description}</p>
        <p>{ }</p>

      </div>

    </div>
  )
}
export default Detail;