import axios from 'axios';

export const searchBag = (payload) => {
  axios({
    url: `http://j7c103.p.ssafy.io:8080/api/bag/${payload.name}/${payload.userId}`,
    method: 'get',
  })
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log
  })
}

export const createBag = (payload) => {
  axios({
    url: `http://j7c103.p.ssafy.io:8080/api/bag/create/${payload.userId}`,
    method: 'post',
    data: {
      attractionId: payload.attractionList,
      memo: payload.memo,
      name: payload.name
    }
  })
  .then((res) => {
    console.log(res)
  })
  .catch((err) => {
    console.log(err)
  })
}

export const dislikeBag = (payload) => {
  axios({
    url:  `http://j7c103.p.ssafy.io:8080/api/bag/delete/like/${payload.userId}/${payload.bagId}`,
    method: 'delete'
  })
  .then((res) => {
    console.log(res)
  })
  .catch((err) => {
    console.log(err)
  })
}

export const detailBag = (payload) => {
  axios({
    url:  `http://j7c103.p.ssafy.io:8080/api/bag/detail/${payload.bagId}`,
    method: 'get'
  })
  .then((res) => {
    console.log(res)
  })
  .catch((err) => {
    console.log(err)
  })
}

export const likeBag = (payload) => {
  axios({
    url:  `http://j7c103.p.ssafy.io:8080/api/bag/like/${payload.userId}/${payload.bagId}`,
    method: 'post'
  })
  .then((res) => {
    console.log(res)
  })
  .catch((err) => {
    console.log(err)
  })
}

export const likeBagList = (payload) => {
  axios({
    url:  `http://j7c103.p.ssafy.io:8080/api/bag/likelist/${payload.userId}`,
    method: 'get'
  })
  .then((res) => {
    console.log(res)
  })
  .catch((err) => {
    console.log(err)
  })
}

export const listBag = (payload) => {
  axios({
    url:  `http://j7c103.p.ssafy.io:8080/api/bag/list/${payload.userId}`,
    method: 'get'
  })
  .then((res) => {
    console.log(res)
  })
  .catch((err) => {
    console.log(err)
  })
}

export const popularBagList = () => { // bagid가 필요하다고 swagger에 있음. 확인요망ㅇ
  axios({
    url:  `http://j7c103.p.ssafy.io:8080/api/bag/list/popular`,
    method: 'get'
  })
  .then((res) => {
    console.log(res)
  })
  .catch((err) => {
    console.log(err)
  })
}

export const updateBag = (payload) => {
  axios({
    url:  `http://j7c103.p.ssafy.io:8080/api/bag/update/${payload.bagId}/${payload.attractionId}`,
    method: 'delete'
  })
  .then((res) => {
    console.log(res)
  })
  .catch((err) => {
    console.log(err)
  })
}

export const updateBagInfo = (payload) => { // path로 userId를 요구함
  axios({
    url:  `http://j7c103.p.ssafy.io:8080/api/bag/update/name/${payload.bagId}`,
    method: 'get',
    data: {
      memo: payload.memo,
      name: payload.name,
    }
  })
  .then((res) => {
    console.log(res)
  })
  .catch((err) => {
    console.log(err)
  })
}