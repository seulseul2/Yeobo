import axios from 'axios';
import {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import './Category.scss';

const Category = () => {
  const [attractionList, setAttractionList] = useState(null)
  const navigate = useNavigate();
  const getCategory = async (categoryId) => {
    try {
      const response = await axios({
        url: `https://j7c103.p.ssafy.io/django/MakeBoddari/PickCategory/${categoryId}/`,
        method: 'get',
      })
      console.log(response.data);
      setAttractionList(response.data);
      const result = response.data
      setTimeout(() => {
        navigate('/Boddari', {state: {result: result}});
      }, 1000)
    } catch (err) {
      console.log(err);
      alert('에러발생! 다시 시도해주세요!')
    }
  }
  return (
    <div className='category'>
       <div className="header">
        <p>보따리 만들기</p>
      </div>

      <h1> 선호하시는 카테고리를 선택해주세요!</h1>
      <div className='category1'>
        <button className='categoryBtn categoryBtn1' onClick={() => {
          getCategory(1);
        }}>공원</button>
        <button className='categoryBtn categoryBtn2' onClick={() => {
          getCategory(2);
        }}>산</button>
      </div>

      <div className='category2'>
        <button className='categoryBtn categoryBtn3' onClick={() => {
          getCategory(3);
        }}>바다</button>
        <button className='categoryBtn categoryBtn4' onClick={() => {
          getCategory(4);
        }}>유원지</button>

      </div>

      <div className='category3'>
        <button className='categoryBtn categoryBtn5' onClick={() => {
          getCategory(5);
        }}>휴식</button>
        <button className='categoryBtn categoryBtn6' onClick={() => {
          getCategory(6);
        }}>이색</button>
      </div>

      <div className='category4'>
        <button className='categoryBtn categoryBtn7' onClick={() => {
          getCategory(7);
        }}>명소</button>
        <button className='categoryBtn categoryBtn8' onClick={() => {
          getCategory(8);
        }}>문화</button>

      </div>

    </div>
  )
}

export default Category;