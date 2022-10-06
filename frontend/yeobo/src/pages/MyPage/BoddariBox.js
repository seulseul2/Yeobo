import React, { useState } from "react";
// Import Swiper React components
// import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import { Link , useNavigate} from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getCookieToken } from "../../storage/Cookie";
import axios from "axios";
import "./BoddariBox.scss";

function BoddariBoxList(props) {
  const navigate = useNavigate();
  const moveDetail = (bagId) => {
    navigate(`/Betail/${bagId}`)
  }
  return (
    <li>
      <div className="mypage-img-wrapper">
          <img className="mypage-img" src={props.src} alt=""  onClick={() => {
            moveDetail(props.id)
          }}/>
          <p>{props.name}</p>
          {/* <p>{props.memo}</p> */}
      </div>
    </li>
  );
}

const BoddariBox = () => {
  const userId = useSelector((state) => state.authToken.userId);
  const accessToken = useSelector((state) => state.authToken.accessToken);
  const [boddariList, setBoddariList] = useState();

  useEffect(() => {
    axios({
      url: `https://j7c103.p.ssafy.io:8080/api/bag/list/${userId}`,
      method: "get",
      headers: {
        "X-AUTH-TOKEN": accessToken,
      },
    })
      .then((res) => {
        console.log("보따리야~", res.data.data);
        setBoddariList(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <div className="box">
        <div id="tab">
          <ul>
            {boddariList ? (
              boddariList.map((boddari, i) => {
                return (
                  <BoddariBoxList
                    key={i}
                    id={boddari.id}
                    name={boddari.name}
                    src={boddari.image}
                    memo={boddari.memo}
                  />
                );
              })
            ) : (
              <p>보따리를 만들어보세요!</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BoddariBox;
