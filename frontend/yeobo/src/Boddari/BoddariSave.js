import React from "react";
import luggage from '../images/luggage.png';
import './BoddariSave.scss';
function BoddariSave() {
  return (
    <div className="root">
      <div className='header'>
        <img src={luggage} alt="headerImage" />
      </div>
      <div className="inputForm">
        <div className="boddariInput">
          <label for="boddariName">보따리 이름</label>
          <input id="boddariName" type="text" placeholder="이름을 입력하세요." />
        </div>
        <div className="boddariInput">
          <label for="boddarimemo">메모 </label>
          <textarea id="boddarimemo" placeholder="메모를 입력하세요" />
        </div>
        <div className="boddariBtn">
          <div className="btn">
            <button>저장</button>
          </div>
          <div className="btn">
            <button>취소</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BoddariSave;