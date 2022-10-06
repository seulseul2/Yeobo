
import axios from 'axios';
import { useEffect, useState } from 'react';
import Loading from '../component/Loading';
import './BoddariSearch.scss'
import { Link } from 'react-router-dom';
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
      if (searchText !== '') {
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
    } catch (err) {
      console.log(err);
      setLoading(false)
    }
  }
  useEffect(() => {
    getResult();
  }, []);
  return (
    <div className='BoddariSearch'>
        {loading ? <Loading /> : null}
        {bagList ? (
          bagList.map((el, index) => {
            const check = el.check
            return (
              <div className='bagResult_item' key={index}>
                <div className='item1'>
                  <Link to={'/Betail/' + el.bagId}><img className='bagResult_item_img' src={el.image} alt='image' /></Link>
                </div>
                <div className='item2'>
                  <p className='bagREsult_item_name'>{el.name}</p>
                </div>
              </div>
            )
          })
        ) : (
          <p className='No_bagResult'>검색 내역이 없습니다.</p>
        )}
    </div>
  )
}

export default BoddariSearch;