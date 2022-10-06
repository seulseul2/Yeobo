import axios from "axios";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setRefreshToken } from "../../storage/Cookie";
import { SET_TOKEN } from "../../store/Auth";

export const LoginApi = (inputs) => {
  // const navigate = useNavigate();
  // const dispatch = useDispatch();

  axios({
    url: "https://j7c103.p.ssafy.io:8080/api/auth/user/login",
    method: "post",
    data: inputs,
  })
    .then((res) => {
      console.log("b");
      const response = res.data.data;
      // console.log(response);
      alert(res.data.message);
      const accessToken = response.accessToken;
      const refreshToken = response.refreshToken;
      // console.log(accessToken);
      // console.log(refreshToken);
      // setRefreshToken(refreshToken);
      // dispatch(SET_TOKEN(accessToken));
      // navigate
    })
    .catch((err) => {
      console.log(err);
      alert(err.response.data.message);
    });
};
