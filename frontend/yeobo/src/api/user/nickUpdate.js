import axios from 'axios';

const nickUpdate = (obj) => {
  console.log(obj.nick)
  console.log(obj.userId)
  axios({
    url: `http://j7c103.p.ssafy.io:8080/api/user/${obj.userId}`,
    method: 'put',
    params: {
      nick: obj.nick,
    },
  })
    .then((res) => {
      const response = res.data;
      alert(response.message);
      console.log(response)
    })
    .catch((err) => {
      console.log(err);
    })
}
export default nickUpdate;