import image from '../images/daejeon.jpeg';
import './DestinationSearch.scss';
import Rating from '@mui/material/Rating';
import {useState} from 'react';

const DestinationSearch = () => {
  const [value, setValue] = useState(0);

  return (
    <div className='DestinationSearch'>
      <div className="Des_search_img">
        <img src={image} alt="sdsd" />
      </div>
      <div className="Des_search_name">
        <h1>여행지 이름</h1>
        <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          console.log('newValue', newValue);
          console.log('value', value);
        }}/>
      </div>
    </div>
  )
}

export default DestinationSearch;