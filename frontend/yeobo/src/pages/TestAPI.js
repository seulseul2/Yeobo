import {ratingScore, getScoreList, searchAttraction, getDetail} from '../api/attraction/attraction';
// import {useState} from 'react';
const testAPI = () => {
  // const [score, setScore] = useState(0);
  const payload = {
    userId: 1,
    attractionId: 1,
    name: '해수욕장',
    score: 5,
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