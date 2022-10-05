
import axios from 'axios';
import { useEffect, useState } from 'react';
import Loading from '../component/Loading';
import './BoddariSearch.scss'

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
    }
  }

  useEffect(() => {
    getResult();
    }, []);
  return (
    <div className='BoddariSearc'>
      <div className='bagResult'>
      {loading ? <Loading/> : null}
      {bagList ? (
        bagList.map((el, index) => {
          return (
            <div className='bagResult_item' key={index}>
              <p className='bagREsult_item_name'>{el.name}</p>
              <p>{el.check}</p>
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