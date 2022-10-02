import './DestinationSearch.scss';
import Rating from '@mui/material/Rating';
import { useState } from 'react';
const DestinationSearch = (props) => {
  const [value, setValue] = useState(0);
  const attrList = props.attrList;
  return (
    <div className='DestinationSearch'>
      <div className='attrResult'>
        {attrList ? (
          attrList.map((el, index) => {
            return (
              <div className='attrResult_item' key={index}>
                <img className='attrResult_item_img' src={el.img} />
                <p className='attrResult_item_name'>{el.name.split('(')[0]}</p>
                <Rating
                  name="simple-controlled"
                  value={value}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                    console.log('newValue', newValue);
                    console.log('value', value);
                  }} />
              </div>
            )
          })
        ) : (
          <p className='No_attrResult'>검색 내역이 없습니다.</p>
        )}
      </div>
      {/* <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          console.log('newValue', newValue);
          console.log('value', value);
        }} /> */}
    </div>
  )
}

export default DestinationSearch;