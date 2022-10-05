
import axios from 'axios';
import { useEffect, useState } from 'react';
import Loading from '../component/Loading';
import './BoddariSearch.scss'
import {Link} from 'react-router-dom';
import heart from '../../assets/images/icons/heart.png';
import unlike from '../../assets/images/icons/like.png'

const BoddariSearch = (props) => {
  // const [value, setValue] = useState(0);
  const searchText = props.searchText;
  const userId = 1; // 나중에 redux되면 지우고 store에서 불러오기
  const [bagList, setbagList] = useState(null);
  const [loading, setLoading] = useState(true);

  const getResult = async () => {
    setLoading(true);
    try {
      if (searchText !== '')
      { 
      const response = await axios({
       url: `https://j7c103.p.ssafy.io:8080/api/temp/bag/${searchText}/${userId}`,
       method: 'get'
      })
      console.log(response.data.data)
      setbagList(response.data.data)
      setLoading(false); 
      if (Object.keys(response.data.data).length === 0) {
        setbagList(null);
      }
      } else {
        setLoading(false);
      }
    } catch(err) {
      console.log(err);
      setLoading(false)
    }
  }
  // const like = async (bagId) => {
  //   try {
  //     const response = await axios({
  //       url: `https://j7c103.p.ssafy.io:8080/api/bag/like/${userId}/${bagId}`,
  //       method: 'post',
  //       headers: {
  //         'X-AUTH-TOKEN' : "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsZ2V1bjEyM0BuYXZlci5jb20iLCJyb2xlcyI6W10sImlhdCI6MTY2NDg2ODM2MSwiZXhwIjoxNjY0ODcxOTYxfQ._Tpnr21XvTa3c8ulvDn6MB1eCm59crNDO2bOkJQudXE"
  //       }
  //     })
  //     console.log(response);
  //     setChkLike(true)
  //   } catch(err) {
  //     console.log(err);
  //     setChkLike(false)
  //   }
  // }
  // const dislike = async (bagId) => {
  //   try {
  //     const response = await axios({
  //       url: `https://j7c103.p.ssafy.io:8080/api/bag/delete/like/${userId}/${bagId}`,
  //       method: 'delete',
  //       headers: {
  //         'X-AUTH-TOKEN' : "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsZ2V1bjEyM0BuYXZlci5jb20iLCJyb2xlcyI6W10sImlhdCI6MTY2NDg2ODM2MSwiZXhwIjoxNjY0ODcxOTYxfQ._Tpnr21XvTa3c8ulvDn6MB1eCm59crNDO2bOkJQudXE"
  //       }
  //     })
  //     console.log(response);
  //     setChkLike(false)

  //   } catch(err) { 
  //     console.log(err);
  //     setChkLike(true)
      
  //   }
  // }
  useEffect(() => {
    getResult();
    }, []);
  return (
    <div className='BoddariSearc'>
      <div className='bagResult'>
      {loading ? <Loading/> : null}
      {bagList ? (
        bagList.map((el, index) => {
          const check = el.check
          return (
            <div className='bagResult_item' key={index}>
             <Link to={'/Betail/' + el.bagId}><img src={el.image} alt='image'/></Link>
              <p className='bagREsult_item_name'>{el.name}</p>
              {/* {check === false ? 
              <img src={unlike} alt='like' width='25px'onClick={ () => {like(el.bagId); check = true}}/>
              : <img src={heart} alt='unlike' width='25px' onClick={() => {dislike(el.bagId); check = false}}/>} */}
            </div>
          )
        })
      ) : (
        <p className='No_bagResult'>검색 내역이 없습니다.</p>
      )}
      </div>
    </div>
  )
}

export default BoddariSearch;