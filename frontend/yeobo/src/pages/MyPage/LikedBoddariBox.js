import React, { useState } from "react";
// Import Swiper React components
// import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";
import { useEffect } from "react";
import { Link , useNavigate} from "react-router-dom";
import { useSelector } from "react-redux";
import "./BoddariBox.scss";

function MypageList(props) {
  const navigate = useNavigate();
  const moveDetail = (bagId) => {
    navigate(`/Betail/${bagId}`)
  }
  return (
    <li>
      <div className="mypage-img-wrapper">
          <img className="mypage-img" src={props.src} alt="" onClick={() => {
            moveDetail(props.id)
          }}/>
          <p className="img-text">{props.name}</p>
      </div>
    </li>
  );
}

const Mypage = () => {
  const accessToken = useSelector((state) => state.authToken.accessToken);
  const userId = useSelector((state) => state.authToken.userId);
  const [list, setList] = useState();
  useEffect(() => {
    axios({
      url: `https://j7c103.p.ssafy.io:8080/api/bag/likelist/${userId}`,
      method: "get",
      headers: {
        "X-AUTH-TOKEN": accessToken,
      },
    })
      .then((res) => {
        console.log(res.data.data);
        setList(res.data.data);
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
            {list ? (
              list.map((l, i) => {
                return <MypageList name={l.name} src={l.image}  id={l.id}/>;
              })
            ) : (
              <p>보따리에 좋아요를 눌러보세요!</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Mypage;
