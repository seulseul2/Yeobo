import React from "react";
import luggage from '../../assets/images/luggage.png';
import './BoddariSave.scss';
function BoddariSave() {
  return (
    <div className="BoddariSave">
      <div className="BoddariSave-top">
        <image src={luggage} alt='image'/>
      </div>
      <div className="BoddariSave-input">
        <label>보따리 이름<input id="Boddari-name" type='text' placeholder="보따리 이름을 입력하세요." /></label>
        <label>메모<input id="Boddari-memo" type='text' placeholder="메모를 입력하세요." /></label>
      </div>
      <div className="BoddariSave-btn">
        <button>완료</button>
        <button>취소</button>
      </div>
    </div>
  )
}

export default BoddariSave;