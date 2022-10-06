import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Rating from "@mui/material/Rating";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import "./Detail.scss";

const Detail = () => {
  const params = useParams().attractionId;
  const [detailData, setDetailData] = useState("");
  const [value, setValue] = useState(0);
  const accessToken = useSelector((state) => state.authToken.accessToken);
  const userId = useSelector((state) => state.authToken.userId);
  const detail = async () => {
    try {
      const response = await axios({
        url: `https://j7c103.p.ssafy.io:8080/api/temp/attraction/detail/${params}`,
        method: "get",
        headers: {
          "X-AUTH-TOKEN": accessToken,
        },
      });
      setDetailData(response.data.data);
      console.log(response.data.data);
      setValue(response.data.data.score);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    detail();
  }, []);
  return (
    <div>
      <div className="attrDetail">
        <Link to="/">이전</Link>
        <img
          className="attrDetailImg"
          src={detailData.image}
          alt="detailImage"
        />
        <p className="attrDetailName">{detailData.name}</p>
        <Rating
          className="attrDetailRate"
          name="simple-controlled"
          value={value}
          size="large"
        />
        <p className="attrDetailAdress">{detailData.address}</p>
        <p className="attrDetailDesc">{detailData.description}</p>
      </div>
      <div className="bottomback"></div>
    </div>
  );
};
export default Detail;
