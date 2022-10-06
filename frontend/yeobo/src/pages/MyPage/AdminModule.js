// import { Link } from 'react-router-dom';
import "./AdminModule.scss";
import { userDelete } from "../../api/user/userDelete";
// import { logout } from "../../api/user/logout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import axios from "axios";
import { getCookieToken, removeCookieToken } from "../../storage/Cookie";
import { DELETE_TOKEN } from "../../store/Auth";

const AdminModule = () => {
  // store에 저장된 Access Token 정보를 받아 온다
  const accessToken = useSelector((state) => state.authToken.accessToken);
  const userId = useSelector((state) => state.authToken.userId);
  const refreshToken = getCookieToken();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function userDeleteClick() {
    // const conf = confirm('정말?');
    if (!!window.confirm("정말?")) {
      axios({
        url: `https://j7c103.p.ssafy.io:8080/api/user/${userId}`,
        method: "delete",
        data: userId,
        headers: {
          "X-AUTH-TOKEN": accessToken,
        },
      })
        .then((res) => {
          dispatch(DELETE_TOKEN()); // store에 저장된 액세스 토큰 삭제
          removeCookieToken(); // cookie에 저장된 refresh token 삭제
          const response = res.data;
          alert("회원 정보가 삭제되었습니다.");
          console.log(response);
          navigate("/"); // 홈으로 이동
        })
        .catch((err) => {
          console.log(err);
          alert(err);
        });
    } else {
      alert("저희 서비스를 이용해주셔서 항상 감사합니다.");
    }
  }

  function logOutClick() {
    console.log("로그아웃시도");
    axios({
      url: "https://j7c103.p.ssafy.io:8080/api/logout",
      method: "get",
      headers: {
        "REFRESH-TOKEN": refreshToken,
      },
    })
      .then((res) => {
        dispatch(DELETE_TOKEN()); // store에 저장된 액세스 토큰 삭제
        removeCookieToken(); // cookie에 저장된 refresh token 삭제
        const response = res.data;
        alert(response.message); // 로그아웃 백요청 완료
        console.log(response.data);
        navigate("/"); // 홈으로 이동
      })
      .catch((err) => {
        console.log("logout err", err);
        alert(err);
      });
  }

  return (
    <div>
      <div className="box">
        <p className="boxIn" onClick={userDeleteClick}>
          회원 탈퇴하기
        </p>
        <p className="boxIn" onClick={logOutClick}>
          로그아웃
        </p>
      </div>
    </div>
  );
};

export default AdminModule;
