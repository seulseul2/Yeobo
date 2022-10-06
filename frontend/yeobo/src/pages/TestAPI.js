import {ratingScore, getScoreList, searchAttraction, getDetail} from '../api/attraction/attraction';
// import {useState} from 'react';
const testAPI = () => {
  // const [score, setScore] = useState(0);
  const payload = {
    userId: 1,
    attractionId: 127484,
    name: '산',
    score: 4.0,
  }
  return (
    <div>
      <button onClick={() => {ratingScore(payload)}}>ratingScore</button>
      <button onClick={() => {getScoreList(payload)}}>getScoreList</button>
      <button onClick={() => {searchAttraction(payload)}}>searchAttraction</button>
      <button onClick={() => {getDetail(payload)}}>getDetail</button>
    </div>
  )
}
export default testAPI;