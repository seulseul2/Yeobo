import { useState } from 'react';
import BoddariSearch from './BoddariSearch';
import DestinationSearch from './DestinationSearch';
import UserSearch from './UserSearch';
import './Search.scss';
import axios from 'axios'
import { useSelector } from 'react-redux';

const Search = () => {
  const [ActiveTab, setActiveTab] = useState(0);
  const [searchText, setsearchText] = useState('');
  const [attrList, setattrList] = useState(null);
  const isLogin = useSelector((state) => state.authToken.authenticated);

  const onChange = (e) => {
    setTimeout(() => {
      setsearchText(e.target.value)
    }, WAITTIME);
  }
  const WAITTIME = 1000;

  const payload = {
    name: searchText,
    userId: 1,
  }

  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      onClick();
    }
  }
  const onClick = () => {
    if (isLogin === true){
      axios({
        url: `https://j7c103.p.ssafy.io:8080/api/temp/user/attraction/search/${payload.name}`,
        method: 'get',
        params: {
          userId: payload.userId
        }
      })
        .then((res) => {
          setattrList(res.data.data);
          console.log(res)
        })
        .catch((err) => {
          console.log(err);
          setattrList(null)
        })
    } else {
      axios({
        url: `https://j7c103.p.ssafy.io:8080/api/temp/attraction/search/${payload.name}`,
        method: 'get',
        // params: {
        //   userId: payload.userId
        // }
      })
        .then((res) => {
          setattrList(res.data.data);
          console.log(res)
        })
        .catch((err) => {
          console.log(err);
          setattrList(null)
        })
    }
  }
  const tabs = [
    {
      id: 0,
      title: '여행지',
      content: <DestinationSearch attrList={attrList} />
    },
    {
      id: 1,
      title: '보따리',
      content: <BoddariSearch searchText={searchText} />
    },
    {
      id: 2,
      title: '사용자',
      content: <UserSearch searchText={searchText} />
    }
  ]


  return (
    <div className='search'>
      <div className="Search">
        <div className="searchTop">
          <p>{searchText} 검색결과</p>
          <div className='searchBar'>
            <svg className='searchIcon searchItem' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z" /><path d="M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z" fill="rgba(69,69,69,1)" /></svg>
            <input className='searchText searchItem' onChange={onChange} onKeyPress={onKeyPress} />
            <svg className='searchDelete searchItem' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z" /><path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" fill="rgba(69,69,69,1)" /></svg>
          </div>
        </div>
      </div>
      <div className='tab'>
        {tabs.map(item => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}>{item.title}</button>
        ))}
        {tabs.filter(item => ActiveTab === item.id).map(item => (item.content))}
      </div>
    </div>
  )
}

export default Search;