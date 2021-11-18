import { httpClient } from ".";

const getSidos = async () => {
  return httpClient.axios("/housedeal/sido", {
    method: "GET",
  });
};

const getGuguns = async (sidoCode) => {
  return httpClient.axios("/housedeal/gugun", {
    method: "GET",
    params: {
      sidoCode,
    },
  });
};

const getDongs = async (gugunCode) => {
  return httpClient.axios("/housedeal/dong", {
    method: "GET",
    params: {
      gugunCode,
    },
  });
};

const getHouseDeals = async (params) => {
  return httpClient.axios("/housedeal", {
    type: "GET",
    params,
  });
};

// apt & 평형 단위로 묶어서 3년간 변동 데이터 받아오기

export { getSidos, getGuguns, getDongs, getHouseDeals };
