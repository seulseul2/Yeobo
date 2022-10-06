import { useState } from 'react';

const Btn = (attractionId) => {

  const [btnText, setBtnText] = useState('담기');
  const [active, setActive] = useState('active');
  const [attraction, setAttraction] = useState([]);


  const add = (attractionId) => {
    setAttraction(attraction => [...attraction, attractionId])
    onChangeText();
  } 

  const onChangeText = () => {
    setBtnText(prev => prev === '담기' ? '빼기' : '담기');
    setActive(prev => prev === "active" ? "" : "active");
    
  }
  return (
    <div className='Btn'>
      <button onClick={() => {
        add(attractionId)}}>{btnText}</button>
    </div>
  )
}


export default Btn;