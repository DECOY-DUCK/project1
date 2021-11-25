import { httpClient } from ".";

const SIZE_PER_PAGE = 15;
/**
 * 전국에 있는 도.광역시 리스트를 받아온다.
 *
 * @returns 전국 도.광역시 리스트를 담은 Promise
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
 * @returns 해당 도.광역시에 속하는 구.군 리스트를 담은 Promise
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
 * @returns 해당 구.군에 속하는 법정동 리스트를 담은 Promise
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
 * 해당 동이 속한 시.도와 구.군를 받아온다.
 *
 * @param {String} dongCode : 법정동 코드
 * @returns 해당 법정동의 시.도와 구.군을 담은 Promise
 */
const getSidoGugunByDong = async (dongCode) => {
  return httpClient.axios("/housedeal/sidogugun", {
    method: "GET",
    params: {
      dongCode,
    },
  });
};

/**
 * 지역 정보를 이용하여 현재 페이지에 해당하는 아파트 정보를 받아온다.
 *
 * @param {Object} params : 구군 코드와 동 이름, 현재 페이지 번호, 페이지당 개수
 * @returns 해당 지역의 아파트 정보를 담은 Promise
 */
const getHouseInfos = async (params) => {
  return httpClient.axios("/housedeal/apt", {
    type: "GET",
    params: {
      pageNo: 0,
      sizePerPage: SIZE_PER_PAGE,
      ...params,
    },
  });
};

/**
 * 아파트 번호를 이용하여 현재 페이지에 해당하는 아파트 정보를 받아온다.
 *
 * @param {Number} no: 아파트 번호
 * @returns 해당 번호의 아파트 정보를 담은 Promise
 */
const getHouseInfoByNo = async (no) => {
  return httpClient.axios(`/housedeal/apt/${no}`, {
    type: "GET",
  });
};

/**
 * 아파트 이름과 지역 정보를 이용하여 현재 페이지에 해당하는 아파트 매물 정보를 받아온다.
 *
 * @param {String} aptName : 아파트 이름
 * @param {Object} params : 구군 코드와 동 이름, 현재 페이지 번호, 페이지당 개수
 * @returns 해당 아파트의 매물 정보를 담은 Promise
 */
const getHouseDeals = async (aptName, params) => {
  return httpClient.axios(`/housedeal/${aptName}`, {
    type: "GET",
    params: {
      pageNo: 0,
      sizePerPage: SIZE_PER_PAGE,
      ...params,
    },
  });
};

export {
  getSidos,
  getGuguns,
  getDongs,
  getSidoGugunByDong,
  getHouseInfos,
  getHouseInfoByNo,
  getHouseDeals,
};
