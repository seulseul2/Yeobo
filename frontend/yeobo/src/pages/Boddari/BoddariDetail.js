import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./BoddariDetail.scss";

// <-- 좋아요 하트 import -->
import heart from "../../assets/images/icons/heart.png";
import unlike from "../../assets/images/icons/like.png";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const BoddariDetail = () => {
  const navigate = useNavigate();
  const accessToken = useSelector((state) => state.authToken.accessToken);
  // const userId = useSelector((state) => state.authToken.userId);
  const params = useParams().BoddariId;
  const [detailData, setDetailData] = useState("");
  const [chkLike, setChkLike] = useState(false);
  const userId = useSelector((state) => state.authToken.userId);
  useEffect(() => {}, []);
  // <-- 디테일 정보 가져오기 useEffect 실행 -->
  const getDetail = async (params) => {
    try {
      const response = await axios({
        url: `https://j7c103.p.ssafy.io:8080/api/temp/bag/detail/${params}/${userId}`,
        method: "get",
        headers: {
          "X-AUTH-TOKEN": accessToken,
        },
      });
      setDetailData(response.data.data);
      setChkLike(response.data.data.pick);
      console.log("bagDetail : ", response.data.data);
    } catch (err) {
      console.log("bagDetailErr : ", err);
    }
  };
  // <-- 좋아요 -->
  const like = async (bagId) => {
    try {
      const response = await axios({
        url: `https://j7c103.p.ssafy.io:8080/api/bag/like/${userId}/${params}`,
        method: "post",
        headers: {
          "X-AUTH-TOKEN": accessToken,
        },
      });
      console.log(response);
      setChkLike(true);
    } catch (err) {
      console.log(err);
      setChkLike(false);
    }
  };
  // <-- 안좋아요 -->
  const dislike = async (bagId) => {
    try {
      const response = await axios({
        url: `https://j7c103.p.ssafy.io:8080/api/bag/delete/like/${userId}/${params}`,
        method: "delete",
        headers: {
          "X-AUTH-TOKEN": accessToken,
        },
      });
      console.log(response);
      setChkLike(false);
    } catch (err) {
      console.log(err);
      setChkLike(true);
    }
  };
  const hearted = () => {
    if (chkLike) {
      dislike();
    } else if (!chkLike) {
      like();
    }
  };
  const moveDetail = (id) => {
    navigate(`/Detail/${id}`);
  };

  useEffect(() => {
    getDetail(params);
  }, []);

  return (
    <div className="bagDetail">
      <header>
        <div onClick={() => navigate(-1)}>이전</div>
        <h1>[{detailData.name}] 보따리</h1>
        <p className="heart" onClick={() => hearted(chkLike)}>
          {chkLike ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </p>
      </header>
      <div className="detailContent">
        <label>memo</label>
        <input type="textarea" value={detailData.memo} />
      </div>
      <div className="detailData">
        {detailData.attraction &&
          detailData.attraction.map((el, index) => {
            // attraction 들
            return (
              <div className="detailData_item">
                <img
                  src={el.img}
                  alt="imgage"
                  onClick={() => {
                    moveDetail(el.id);
                  }}
                />
                <h1>{el.name}</h1>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default BoddariDetail;
