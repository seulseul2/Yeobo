import { Link } from "react-router-dom";
import "./MainPopularBoddari.scss";
import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";

function Like(like) {
  if (like === "True") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="18"
        height="18"
      >
        <path fill="none" d="M0 0H24V24H0z" />
        <path
          d="M16.5 3C19.538 3 22 5.5 22 9c0 7-7.5 11-10 12.5C9.5 20 2 16 2 9c0-3.5 2.5-6 5.5-6C9.36 3 11 4 12 5c1-1 2.64-2 4.5-2z"
          fill="rgba(244,155,155,1)"
        />
      </svg>
    );
  } else if (like === "False") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="18"
        height="18"
      >
        <path fill="none" d="M0 0H24V24H0z" />
        <path
          d="M16.5 3C19.538 3 22 5.5 22 9c0 7-7.5 11-10 12.5C9.5 20 2 16 2 9c0-3.5 2.5-6 5.5-6C9.36 3 11 4 12 5c1-1 2.64-2 4.5-2zm-3.566 15.604c.881-.556 1.676-1.109 2.42-1.701C18.335 14.533 20 11.943 20 9c0-2.36-1.537-4-3.5-4-1.076 0-2.24.57-3.086 1.414L12 7.828l-1.414-1.414C9.74 5.57 8.576 5 7.5 5 5.56 5 4 6.656 4 9c0 2.944 1.666 5.533 4.645 7.903.745.592 1.54 1.145 2.421 1.7.299.189.595.37.934.572.339-.202.635-.383.934-.571z"
          fill="rgba(244,155,155,1)"
        />
      </svg>
    );
  }
}

function BoddariRankComponent() {
  const accessToken = useSelector((state) => state.authToken.accessToken);
  const [ranks, setRanks] = useState([]);
  useEffect(() => {
    axios({
      url: "https://j7c103.p.ssafy.io:8080/api/temp/bag/list/popular",
      method: "get",
      headers: {
        "X-AUTH-TOKEN": accessToken,
      },
    })
      .then((res) => {
        console.log(res.data.data);
        const ranks = res.data.data;
        setRanks(ranks);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      {ranks.map((rank, i) => {
        return (
          <div key={i} className="boddariRank" key="data.id">
            <div className="boddari-ranking">
              <p className="boddari-ranking-p">
                {i + 1}
                <span className="boddari-ranking-span">위</span>
              </p>
            </div>
            <div className="profile-img-wrapper">
              {/* <Link to={data.link}> */}
              <img className="profile-img" src={rank.image} alt="" />
              {/* </Link> */}
            </div>
            <div className="boddari-info">
              <div className="boddari-title">
                <p className="boddari-name">{rank.name}</p>
                <p className="boddari-username">{rank.userName}</p>
              </div>
              <div className="boddari-desc">
                <p className="boddari-desc-text">{rank.memo}</p>
              </div>
            </div>
            {/* <div className="boddari-heart">{Like(data.like)}</div> */}
          </div>
        );
      })}
    </div>
  );
}

const MainPopularBoddari = () => {
  return (
    <div className="MainPopularBoddari">
      <div className="monthSection">
        <div className="titleModule">
          <p className="mainTitle">어제의 인기 보따리 TOP 5</p>
          <p className="subTitle">매일 자정 갱신됩니다.</p>
        </div>
      </div>
      <BoddariRankComponent />
    </div>
  );
};
export default MainPopularBoddari;
