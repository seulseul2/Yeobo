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
  const userId = 20;

  // store에 저장된 Access Token 정보를 받아 온다
  const { accessToken } = useSelector((state) => state.token);

  const refreshToken = getCookieToken();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function userDeleteClick() {
    // const conf = confirm('정말?');
    if (!!window.confirm("정말?")) {
      alert("예");
      userDelete(userId);
    } else {
      alert("이용하면 좋은 점 다시 한 번 어필하기..");
    }
  }

  function logOutClick() {
    axios({
      url: "https://j7c103.p.ssafy.io:8080/api/logout",
      method: "get",
    })
      .then((res) => {
        dispatch(DELETE_TOKEN()); // store에 저장된 액세스 토큰 삭제
        removeCookieToken(); // cookie에 저장된 refresh token 삭제
        navigate("/"); // 홈으로 이동
        const response = res.data;
        alert(response.message); // 로그아웃 백요청 완료
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
        alert(err.response.data.message);
      });
  }

  return (
    <div>
      <div class="box">
        <p onClick={userDeleteClick}>회원 탈퇴하기</p>
        <p onClick={logOutClick}>로그아웃</p>
      </div>
    </div>
  );
};

export default AdminModule;
