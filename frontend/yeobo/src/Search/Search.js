import {useState} from 'react';
import BoddariSearch from './BoddariSearch';
import DestinationSearch from './DestinationSearch';
import UserSearch from './UserSearch';
import SearchTop from './SearchTop';
import './Search.scss';

const Search = () => {
  const tabs = [
    {id: 0,
    title: '여행지',
    content: <DestinationSearch/>
    },
    {id: 1,
    title: '보따리',
    content: <BoddariSearch/>},
    {id: 2,
    title: '사용자',
    content: <UserSearch/>}
  ]
  const [ActiveTab, setActiveTab] = useState(0);

  return (
    <div className='search'>
      <SearchTop/>
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