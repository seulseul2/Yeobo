import { useEffect, useState } from 'react';
import './UserSearch.scss';
import axios from 'axios';
import Loading from '../component/Loading';


const UserSearch = (props) => {
  const searchText = props.searchText;
  const [userList, setUserList] = useState(null);
  const [loading, setLoading] = useState(true);

  const getResult = async () => {
    setLoading(true);
    try {
      if (searchText !== '')
      { 
      const response = await axios({
        url: `https://j7c103.p.ssafy.io:8080/api/temp/user/search/${searchText}`,
        method: 'get',
      })
      setUserList(response.data.data)
      setLoading(false);
      if (Object.keys(response.data.data).length === 0) {
        setUserList(null);
      }
      } else {
        setLoading(false);
      }
    } catch(err) {
      console.log(err);
      setLoading(false)

    }
  }

  useEffect(() => {
    getResult();
    }, []);

  return (
    <div className='userSearch'>
      {loading ? <Loading/> : null}
        {userList ? (
          userList.map((el, index) => {
            return (
              <div className='userList_item' key={index}>
                <img className='userList_item_img' src={el.img} />
                <p className='userList_item_name'>{el.nickname}</p>
              </div>
            )
          })
        ) : (
          <p className='No_userList'>사용자 검색 내역이 없습니다.</p>
        )}
    </div>
  )
}

export default UserSearch;
