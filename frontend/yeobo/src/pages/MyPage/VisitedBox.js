import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import "./BoddariBox.scss";

function MypageList(props) {
  return (
    <li>
      <div className="mypage-img-wrapper">
        <Link to={`/DestinationDetail/${props.id}`}>
          <img className="mypage-img" src={props.src} alt="" />
          <p>{props.name}</p>
        </Link>
      </div>
    </li>
  );
}

const Mypage = () => {
  const userId = useSelector((state) => state.authToken.userId);
  const accessToken = useSelector((state) => state.authToken.accessToken);
  const [visitedAttrs, setVisitedAttrs] = useState([]);

  useEffect(() => {
    axios({
      url: `https://j7c103.p.ssafy.io:8080/api/attraction/scorelist/${userId}`,
      method: "get",
      headers: {
        "X-AUTH-TOKEN": accessToken,
      },
    })
      .then((res) => {
        console.log("방문여행지임~", res.data.data);
        setVisitedAttrs(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(visitedAttrs.slice(0, 5));
  }, []);
  return (
    <div>
      <div className="box">
        <div id="tab">
          <ul>
            {visitedAttrs ? (
              visitedAttrs.slice(0, 20).map((Attrs, i) => {
                return (
                  <MypageList
                    key={Attrs.id}
                    name={Attrs.name}
                    src={Attrs.img}
                    memo={Attrs.memo}
                  />
                );
              })
            ) : (
              <p>방문해본 여행지에 평점을 남겨보세요!</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Mypage;
