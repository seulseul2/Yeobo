import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../component/Loading";
import "./BoddariSearch.scss";
import { Link } from "react-router-dom";
// import heart from "../../assets/images/icons/heart.png";
// import unlike from "../../assets/images/icons/like.png";
import { useSelector } from "react-redux";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

function Like(like) {
  if (like) {
    return <FavoriteIcon />;
  } else if (!like) {
    return <FavoriteBorderIcon />;
  }
}

const BoddariSearch = (props) => {
  // const [value, setValue] = useState(0);
  const searchText = props.searchText;
  const accessToken = useSelector((state) => state.authToken.accessToken);
  const userId = useSelector((state) => state.authToken.userId);

  const [bagList, setbagList] = useState(null);
  const [loading, setLoading] = useState(true);

  const getResult = async () => {
    setLoading(true);
    try {
      if (searchText !== "") {
        const response = await axios({
          url: `https://j7c103.p.ssafy.io:8080/api/temp/bag/${searchText}/${userId}`,
          method: "get",
        });
        console.log(response.data.data);
        setbagList(response.data.data);
        setLoading(false);
        if (Object.keys(response.data.data).length === 0) {
          setbagList(null);
        }
      } else {
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  useEffect(() => {
    getResult();
  }, []);

  const hearted = (check, bagId) => {
    if (check) {
      console.log(check, bagId, "좋아요눌림");
      axios({
        // 좋아요 취소
        url: `https://j7c103.p.ssafy.io:8080/api/bag/delete/like/${userId}/${bagId}`,
        method: "delete",
        headers: {
          "X-AUTH-TOKEN": accessToken,
        },
      })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log("좋아요 취소 에러", err);
        });
    } else if (!check) {
      console.log(check, bagId, "좋아요X");
      axios({
        url: `https://j7c103.p.ssafy.io:8080/api/bag/delete/like/${userId}/${bagId}`,
        method: "delete",
        headers: {
          "X-AUTH-TOKEN": accessToken,
        },
      })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log("좋아요 취소 에러", err);
        });
    }
  };

  return (
    <div className="BoddariSearch">
      {loading ? <Loading /> : null}
      {bagList ? (
        bagList.map((el, index) => {
          const check = el.check;
          return (
            <div className="bagResult_item" key={index}>
              <div className="item1">
                <Link class="item1-link" to={"/Betail/" + el.bagId}>
                  <img
                    className="bagResult_item_img"
                    src={el.image}
                    alt="image"
                  />
                </Link>
                <div className="bagInfo">
                  <p className="bagName">{el.name}</p>
                  <div
                    // onClick={() => hearted(el.check, el.bagId)}
                    className="bagHeart"
                  >
                    {Like(el.check)}
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <p className="No_bagResult"> 보따리 검색 내역이 없습니다.</p>
      )}
    </div>
  );
};

export default BoddariSearch;
