import { httpClient } from ".";

/**
 * 지역 정보를 이용하여 주변 국민 안심 병원 정보를 받아온다.

 * @param {String} sidoName   : 도.광역시 이름
 * @param {String} gugunName  : 구.군 이름
 * @returns 인근 국민 안심 병원 목록
 */
const getSafeHospitals = async (sidoName, gugunName) => {
  return httpClient.axios("/environment/safehospital", {
    type: "GET",
    params: {
      sido: sidoName,
      gugun: gugunName,
    },
  });
};

/**
 * 지역 정보를 이용하여 주변 선별진료소 정보를 받아온다.

 * @param {String} sidoName   : 도.광역시 이름
 * @param {String} gugunName  : 구.군 이름
 * @returns 인근 선별진료소 목록
 */
const getSelectedClinics = async (sidoName, gugunName) => {
  return httpClient.axios("/environment/selectedclinic", {
    type: "GET",
    params: {
      sido: sidoName,
      gugun: gugunName,
    },
  });
};

export { getSafeHospitals, getSelectedClinics };
