import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const BoddariDetail = () => {
  const params = useParams().BoddariId;
  const [detailData, setDetailData] = useState('');
  const [like, setLike] = useState(false);
  const userId = 1
  const getDetail = async () => {
    try {
      const response = await axios({
        url: `https://j7c103.p.ssafy.io:8080/api/bag/detail/${params}`,
        method: 'get',
        headers: {
          'X-AUTH-TOKEN' : "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJza3k5OTEyNEBuYXZlci5jb20iLCJyb2xlcyI6W10sImlhdCI6MTY2NDg5NjAzOSwiZXhwIjoxNjY0ODk5NjM5fQ.h7eZ4FFkm1hAnSURTUotBV0OaTB3akPOGeW7Qyf-y-M"
        }
      })
      setDetailData(response.data.data);
      console.log('bagDetail : ', response.data.data);
    } catch(err) { 
      console.log('bagDetailErr : ', err);
    }
  }
  useEffect(() => {
    getDetail();
  }, []);
  return (
    <div className='bagDetail'>
      <header>
        <h1>{detailData.name}</h1>
      </header>
      <label>보따리 메모<input type='textarea'/></label>
    </div>

  )

}

export default BoddariDetail;