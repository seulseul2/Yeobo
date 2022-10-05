import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Rating from '@mui/material/Rating';

const Detail = () => {
  const params = useParams().attractionId;
  const [detailData, setDetailData] = useState('');
  const [value, setValue] = useState(0);
  const userId = 1;
  const detail = async () => {
    try {
      const response = await axios({
        url: `https://j7c103.p.ssafy.io:8080/api/attraction/detail/${params}`,
        method: 'get',
        headers: {
          'X-AUTH-TOKEN': "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJza3k5OTEyNEBuYXZlci5jb20iLCJyb2xlcyI6W10sImlhdCI6MTY2NDg4Mzk5MSwiZXhwIjoxNjY0ODg3NTkxfQ.ImOvovl1DjQ9kiewTLKrhUZGnrFQQXX0LkPrT8dsgyw",
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
      url: 'https://j7c103.p.ssafy.io:8080/api/attraction/score',
      method: 'post',
      headers: {
        'X-AUTH-TOKEN': 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsZ2V1bjEyM0BuYXZlci5jb20iLCJyb2xlcyI6W10sImlhdCI6MTY2NDg0OTIxNywiZXhwIjoxNjY0ODUyODE3fQ.ShUPQOTuXYI_k4KKRrUDpc4O_zr1YIqB-87Ty8j3rUY'
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