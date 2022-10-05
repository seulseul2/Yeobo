import { useState } from 'react';

const Btn = () => {
  const [btnText, setBtnText] = useState('담기');
  const changeText = () => {
    setBtnText(prev => prev === '담기' ? '빼기' : '담기');
  }
  return (
    <div className='Btn'>
      <button>{btnText}</button>
    </div>
  )
}


export default Btn;