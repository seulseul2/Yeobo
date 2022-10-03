import axios from "axios";

export const signUp = async (inputs) => {
  axios({
    url: "https://j7c103.p.ssafy.io:8080/api/user/signUp",
    method: "post",
    data: inputs,
  })
    .then((res) => {
      const response = res.data;
      alert(response.message);
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });
};
