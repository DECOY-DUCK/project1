import { httpClient } from ".";

/**
 * 특정 사용자의 관심지역 목록을 받아온다.
 *
 * @param {Number} userNo : 사용자 고유 번호
 * @returns 해당 사용자의 관심지역 목록을 담은 Promise
 */
const getInterestAreas = async (userNo) => {
  return httpClient.axios(`/interest/${userNo}`, {
    method: "GET",
  });
};

/**
 * 해당 법정동 코드가 특정 사용자의 관심지역인지 여부를 받아온다.
 *
 * @param {Number} userNo : 사용자 고유 번호
 * @param {string} dongCode : 법정동 코드
 * @returns 관심지역인 경우 1, 아닌 경우 0을 담은 Promise
 */
const getInterestArea = async (userNo, dongCode) => {
  return httpClient.axios(`/interest/${userNo}/${dongCode}`, {
    method: "GET",
  });
};

/**
 * 해당 법정동 코드를 특정 사용자의 관심지역으로 설정한다.
 *
 * @param {Number} userNo : 사용자 고유 번호
 * @param {string} dongCode : 법정동 코드
 * @returns 성공 여부 문자열(success, fail)을 담은 Promise
 */
const saveInterestArea = async (userNo, dongCode) => {
  return httpClient.axios(`/interest/${userNo}/${dongCode}`, {
    method: "POST",
  });
};

/**
 * 해당 법정동 코드를 특정 사용자의 관심지역에서 삭제한다.
 *
 * @param {Number} userNo : 사용자 고유 번호
 * @param {string} dongCode : 법정동 코드
 * @returns 성공 여부 문자열(success, fail)을 담은 Promise
 */
const deleteInterestArea = async (userNo, dongCode) => {
  return httpClient.axios(`/interest/${userNo}/${dongCode}`, {
    method: "DELETE",
  });
};

export {
  getInterestAreas,
  getInterestArea,
  saveInterestArea,
  deleteInterestArea,
};
