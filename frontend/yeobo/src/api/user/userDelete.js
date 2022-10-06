import axios from "axios";

export const userDelete = async (userId) => {
  axios({
    url: `https://j7c103.p.ssafy.io:8080/api/user/${userId}`,
    method: "delete",
    data: userId,
    // headers: {
    //   "X-AUTH-TOKEN": accessToken,
    // },
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
