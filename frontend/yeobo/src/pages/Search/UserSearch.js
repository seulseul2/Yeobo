import { useEffect, useState } from 'react';
import './UserSearch.scss';
import axios from 'axios';

const UserSearch = (props) => {
  const searchText = props.searchText;
  const [userList, setUserList] = useState(null);

  useEffect(() => {
    axios({
      url: `http://j7c103.p.ssafy.io:8080/api/user/search/${searchText}`,
      method: 'get',
    })
      .then((res) => {
        setUserList(res.data.data);
        console.log('user검색', res.data.data);
      })
      .catch((err) => {
        console.log(err)
      })
    return () => {
      console.log('컴포넌트가 화면에서 사라짐');
      setUserList(null);
      console.log(userList);
    }
  }, []);

  return (
    <div className='userSearch'>
      <div className='userResult'>
        {userList ? (
          userList.map((el, index) => {
            return (
              <div className='userList_item' key={index}>
                {/* <img className='userList_item_img' src={el.img} /> */}
                <p className='userList_item_name'>{el.nickname}</p>
              </div>
            )
          })
        ) : (
          <p className='No_userList'>검색 내역이 없습니다.</p>
        )}
      </div>
    </div>
  )
}

export default UserSearch;
