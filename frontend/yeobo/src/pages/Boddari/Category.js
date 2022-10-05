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

      <div className='category1'>
        <button onClick={() => {
          getCategory(1);
        }}>1</button>
        <button onClick={() => {
          getCategory(2);
        }}>2</button>
      </div>

      <div className='category2'>
        <button onClick={() => {
          getCategory(3);
        }}>3</button>
        <button onClick={() => {
          getCategory(4);
        }}>4</button>

      </div>

      <div className='category3'>
        <button onClick={() => {
          getCategory(5);
        }}>5</button>
        <button onClick={() => {
          getCategory(6);
        }}>6</button>
      </div>

      <div className='category4'>
        <button onClick={() => {
          getCategory(7);
        }}>7</button>
        <button onClick={() => {
          getCategory(8);
        }}>8</button>

      </div>

    </div>
  )
}

export default Category;