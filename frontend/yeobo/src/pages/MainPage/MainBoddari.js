import { Link } from "react-router-dom";
import "./MainBoddari.scss";

// const testImage = 'https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=552b48fc-ce4a-43dc-adf2-1f854e4abd8f&mode=progress';

const MainBoddari = () => {
  return (
    <div className="mainBoddari">
      <div className="titleModule">
        <p className="mainTitle">여행 보따리</p>
        <p className="subTitle">
          나의 취향을 담은 보따리를 만들어보세요.
          <br />
          {/* 연인 혹은 친구와 함께 여행지를 추천받아보세요. */}
        </p>
      </div>
      <div className="buttons">
        <Link to="/Boddari">
          <button className="makeBoddari" type="">
            보따리 만들기
          </button>
        </Link>
        {/* <Link to="/Boddari">
          <button className="mergeBoddari" type="">
            보따리 합치기
          </button>
        </Link> */}
      </div>
    </div>
  );
};
export default MainBoddari;
