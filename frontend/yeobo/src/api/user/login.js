import axios from "axios";

export const login = async (inputs, { history }) => {
  axios({
    url: "https://j7c103.p.ssafy.io:8080/api/user/login",
    method: "post",
    data: inputs,
  })
    .then((res) => {
      const response = res.data;
      const { accessToken } = res.data.accessToken;
      alert(response.message);
      console.log(response.data);
    })
    .catch((err) => {
      console.log(err);
      alert(err.response.data.message);
    });
};
