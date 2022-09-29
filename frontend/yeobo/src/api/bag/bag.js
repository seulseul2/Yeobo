import axios from 'axios';

export const searchAttraction = async (name) => {
  axios({
    url: `http://j7c103.p.ssafy.io:8080/api/attraction/search/${name}`,
    method: 'get',
    params: {
      userId: 1,
    }
  })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    })
}

