import axios from "axios";

export const logout = async () => {
  axios({
    url: "https://j7c103.p.ssafy.io:8080/api/logout",
    method: "get",
  })
    .then((res) => {
      const response = res.data;
      alert(response.message);
      console.log(response.data);
    })
    .catch((err) => {
      console.log(err);
      alert(err.response.data.message);
    });
};
