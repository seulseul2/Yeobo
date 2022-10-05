import './SearchTop.scss';
import { useState } from 'react';
import { searchAttraction } from '../../api/attraction/attraction';
import { useDispatch } from 'react-redux';
import { useLocation } from "react-router";
import { useEffect } from 'react';

const SearchTop = () => {
  const [searchText, setsearchText] = useState('');
  const WAITTIME = 2000;

  const location = useLocation();
  console.log(location);
  useEffect(() => {
    console.log(location);
    // console.log('state', location.state.text);
    // const { state } = location.state();
    // console.log('state', state)
    setsearchText(location.text)
    return () => {
      console.log(searchText)
    }
  }, [location])

  const payload = {
    name: searchText,
    userId: 1,
  }
  const onClick = () => {
    axios({
      url: `http://j7c103.p.ssafy.io:8080/api/temp/attraction/search/${payload.name}`,
      method: 'get',
      params: {
        userId: payload.userId
      }
    })
      .then((res) => {
        const payload = {
          attractionList: res.data.data
        }
        dispatch(SEARCHATTR(payload))
      })
      .catch((err) => {
        console.log(err);
      })
  }
  }
  const onKeyPress = (e) => {
    if (e.key === 'Enter'){
      onClick();
    }
  }
  const onChange = (e) => {
    setTimeout(() => {
      setsearchText(e.target.value)
    }, WAITTIME);
  }
  return (
    <div className="Search">
      <div className="searchTop">
      {/* <button type="button" onClick={}>asdfadf</button> */}
        <p>{searchText} 검색결과</p>
        <div className='searchBar'>
          <svg className='searchIcon searchItem' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z" /><path d="M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z" fill="rgba(69,69,69,1)" /></svg>
          <input className='searchText searchItem' onChange={onChange} onKeyPress={onKeyPress} value={searchText}/>
          <svg className='searchDelete searchItem' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z" /><path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" fill="rgba(69,69,69,1)" /></svg>
        </div>
      </div>
    </div>
  )
}
export default SearchTop;