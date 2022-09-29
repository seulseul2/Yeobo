import axios from 'axios';

export const getDetail = (payload) => {
  axios({
    url: `http://j7c103.p.ssafy.io:8080/api/attraction/detail/${payload.attractionId}`,
    method: 'get',
  })
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  })
}

export const ratingScore = (payload) => {
  axios({
    url: 'http://j7c103.p.ssafy.io:8080/api/attraction/score',
    method: 'post',
    data: {
      attractionId: payload.attractionId,
      score: payload.score,
      userId: payload.userId
    }
  })
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err.response);
  })
}

export const getScoreList = (payload) => {
  axios({
    url: `http://j7c103.p.ssafy.io:8080/api/attraction/scorelist/${payload.userId}`,
    method: 'get'
  })
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err.response.request.status)
    const errorCode = err.response.request.status
    if (errorCode === 500) {
      alert('BAD_RESPONSE');
    }
    if (errorCode === 400) { 
      alert('BAD_REQUEST');
    }
  })
}

export const searchAttraction = (payload) => {
  axios({
    url: `http://j7c103.p.ssafy.io:8080/api/attraction/search/${payload.name}`,
    method: 'get',
    params: {
      userId: payload.userId
    }
  })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    })
}