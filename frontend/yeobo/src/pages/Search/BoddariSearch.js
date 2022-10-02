
import axios from 'axios';
import { useEffect, useState } from 'react';
import './BoddariSearch.scss'

const BoddariSearch = (props) => {
  // const [value, setValue] = useState(0);
  const searchText = props.searchText;
  const userId = 1; // 나중에 redux되면 지우고 store에서 불러오기
  const [bagList, setbagList] = useState(null);
  
  useEffect(() => {
    axios({
      url:`http://j7c103.p.ssafy.io:8080/api/bag/${searchText}/${userId}`,
      method: 'get',
    })
      .then((res) => {
        setbagList(res.data.data);
        console.log('보따리검색',res.data.data);
      })
      .catch((err) => {
        console.log(err);
      })
    return () => {
      setbagList(null);
      console.log(bagList);
    }
  })
  return (
    <div className='BoddariSearc'>
      <div className='bagResult'>
      {bagList ? (
        bagList.map((el, index) => {
          return (
            <div className='bagResult_item' key={index}>
              <p className='bagREsult_item_name'>{el.name}</p>
              {/* 좋아요 버튼 들어가야함 */}
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