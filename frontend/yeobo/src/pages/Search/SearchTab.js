import './SearchTab.scss';
import { useState } from 'react';
import DestinationSearch from './DestinationSearch';
import BoddariSearch from './BoddariSearch';
import UserSearch from './UserSearch';

const SearchTab = () => {
  const [activeId, setactiveId] = useState(0);
  const clickhandler = (id) => {
    setactiveId({ activeId: id });
  }
  const contents = {
    0: <DestinationSearch />,
    1: <BoddariSearch />,
    2: <UserSearch />
  }

  return (
    <div className="wrapper">
      <div className="tabs">
        <button onClick={() => clickhandler(0)}>여행지</button>
        <button onClick={() => clickhandler(1)}>보따리</button>
        <button onClick={() => clickhandler(2)}>사용자</button>
      </div>
      <div className='content'>
        {contents[activeId]}
      </div>
    </div>
  )
}

export default SearchTab;