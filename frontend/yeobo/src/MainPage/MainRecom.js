import { Link } from 'react-router-dom';
import './MainRecom.scss';

// const testImage = 'https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=552b48fc-ce4a-43dc-adf2-1f854e4abd8f&mode=progress';

const MainRecom = () => {
  return <div class="mainRecom">
    <div className='titleModule'>
      <p className='mainTitle'>맞춤형 추천 여행지</p>
      <p className='subTitle'>여행지 평점을 많이 매길수록,<br/>더 정확한 추천을 받을 수 있습니다</p>
    </div>
    <div className='imageRecom'>
      <ul className='imageLists'>
        <li className='imageList'>
          <Link className='imageAtag' to="/">
            <div className='imageWrap' style={{backgroundImage: `url(https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=552b48fc-ce4a-43dc-adf2-1f854e4abd8f&mode=progress)`}}>
            </div>
          </Link>
          <p className='imageText'>괴산 선유구곡</p>
        </li>
        <li className='imageList'>
          <Link className='imageAtag' to="/">
            <div className='imageWrap' style={{backgroundImage: `url(https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=281a24f8-baad-4f34-b871-f9079f7df57f&mode=progress)`}}>
            </div>
          </Link>
          <p className='imageText'>청양 휴식레스토랑</p>
        </li>
        <li className='imageList'>
          <Link className='imageAtag' to="/">
            <div className='imageWrap' style={{backgroundImage: `url(https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=639b8134-3f55-42b9-87b7-1be29f1694fe&mode=progress)`}}>
            </div>
          </Link>
          <p className='imageText'>여주 카페트로이</p>
        </li>
        <li className='imageList'>
          <Link className='imageAtag' to="/">
            <div className='imageWrap' style={{backgroundImage: `url(https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=506600b3-c883-48f0-98d2-4ce30521d0ff&mode=progress)`}}>
            </div>
          </Link>
          <p className='imageText'>서울 겟댓샷</p>
        </li>
        <li className='imageList'>
          <Link className='imageAtag' to="/">
            <div className='imageWrap' style={{backgroundImage: `url(https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=552b48fc-ce4a-43dc-adf2-1f854e4abd8f&mode=progress)`}}>
            </div>
          </Link>
          <p className='imageText'>괴산 선유구곡</p>
        </li>
        <li className='imageList'>
          <Link className='imageAtag' to="/">
            <div className='imageWrap' style={{backgroundImage: `url(https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=281a24f8-baad-4f34-b871-f9079f7df57f&mode=progress)`}}>
            </div>
          </Link>
          <p className='imageText'>청양 휴식레스토랑</p>
        </li>
      </ul>
    </div>
  </div>
}
export default MainRecom;