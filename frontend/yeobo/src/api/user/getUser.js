import axios from "axios";

const getUser = (userId) => {
  axios({
    url: `http://j7c103.p.ssafy.io:8080/api/user/${userId}`,
    method: "get",
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
export default getUser;
