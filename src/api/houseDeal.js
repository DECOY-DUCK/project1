import { httpClient } from ".";

/**
 * 전국에 있는 도.광역시 리스트를 받아온다.
 *
 * @returns 전국 도.광역시 리스트
 */
const getSidos = async () => {
  return httpClient.axios("/housedeal/sido", {
    method: "GET",
  });
};

/**
 * 해당 도.광역시에 속한 구.군 리스트를 받아온다.
 *
 * @param {String} sidoCode : 도.광역시 코드
 * @returns 해당 도.광역시에 속하는 구.군 리스트
 */
const getGuguns = async (sidoCode) => {
  return httpClient.axios("/housedeal/gugun", {
    method: "GET",
    params: {
      sidoCode,
    },
  });
};

/**
 * 해당 구.군에 속한 법정동 리스트를 받아온다.
 *
 * @param {String} gugunCode : 구군 코드
 * @returns 해당 구.군에 속하는 법정동 리스트
 */
const getDongs = async (gugunCode) => {
  return httpClient.axios("/housedeal/dong", {
    method: "GET",
    params: {
      gugunCode,
    },
  });
};

/**
 * 지역 정보를 이용하여 현재 페이지에 해당하는 아파트 정보를 받아온다.
 *
 * @param {Object} params : 구군 코드와 동 이름, 현재 페이지 번호, 페이지당 개수
 * @returns 해당 지역의 아파트 정보
 */
const getHouseInfos = async (params) => {
  return httpClient.axios("/housedeal/apt", {
    type: "GET",
    params,
  });
};

/**
 * 아파트 이름과 지역 정보를 이용하여 현재 페이지에 해당하는 아파트 메믈 정보를 받아온다.
 *
 * @param {String} aptName : 아파트 이름
 * @param {Object} params : 구군 코드와 동 이름, 현재 페이지 번호, 페이지당 개수
 * @returns 해당 아파트의 매물 정보
 */
const getHouseDeals = async (aptName, params) => {
  return httpClient.axios(`/housedeal/${aptName}`, {
    type: "GET",
    params,
  });
};

// apt & 평형 단위로 묶어서 3년간 변동 데이터 받아오기

export { getSidos, getGuguns, getDongs, getHouseInfos, getHouseDeals };
