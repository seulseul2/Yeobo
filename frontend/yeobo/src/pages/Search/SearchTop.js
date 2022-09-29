import './SearchTop.scss';
import { useState } from 'react';

const SearchTop = () => {
  const [searchText, setsearchText] = useState(' ');
  return (
    <div className="Search">
      <div className="searchTop">
        <p>{searchText}의 검색결과...</p>
        <div className='searchBar'>
          <svg className='searchIcon searchItem' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z" /><path d="M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z" fill="rgba(69,69,69,1)" /></svg>
          <input className='searchText searchItem' value={searchText} onChange={event => setsearchText(event.target.value)} />
          <svg className='searchDelete searchItem' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z" /><path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" fill="rgba(69,69,69,1)" /></svg>
        </div>
      </div>
    </div>
  )
}
export default SearchTop;