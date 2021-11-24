import { httpClient } from ".";

/**
 * 해당 아파트의 리뷰 목록을 받아온다.
 *
 * @param {Number} aptNo       : 아파트 식별 번호
 * @param {Number} pageNo      : 현재 페이지 번호
 * @param {Number} sizePerPage : 페이지당 개수
 * @returns 해당 페이지의 아파트 리뷰 목록을 담은 Promise
 */
const getHouseReviews = async (aptNo, pageNo = 0, sizePerPage = 15) => {
  return httpClient.axios("/housereview", {
    method: "GET",
    params: {
      aptNo,
      pageNo,
      sizePerPage,
    },
  });
};

/**
 * 식별 번호에 해당하는 아파트 리뷰를 받아온다.
 *
 * @param {Number} no : 아파트 리뷰 식별 번호
 * @returns 해당 아파트 리뷰 정보를 담은 Promise
 */
const getHouseReview = async (no) => {
  return httpClient.axios(`/housereview/${no}`, {
    method: "GET",
  });
};

/**
 * 등록할 아파트 리뷰 정보를 전달하여 등록한다.
 *
 * @param {Object} data : 아파트 리뷰 내용 (aptNo, authorNo, content)
 * @returns 성공 여부 문자열(success, fail)을 담은 Promise
 */
const postHouseReview = async (data) => {
  return httpClient.axios("/housereview", {
    method: "POST",
    data,
  });
};

/**
 * 아파트 리뷰 식별 번호와 수정할 내용을 전달하여 해당 아파트 리뷰을 수정한다.
 *
 * @param {Object} data : 아파트 리뷰 내용 (no, aptNo, authorNo, content)
 * @returns 성공 여부 문자열(success, fail)을 담은 Promise
 */
const updateHouseReview = async (data) => {
  const no = data["no"];
  delete data.no;

  return httpClient.axios(`/housereview/${no}`, {
    method: "PUT",
    data,
  });
};

/**
 * 아파트 리뷰 식별 번호에 해당하는 아파트 리뷰을 삭제한다.
 *
 * @param {Number} no : 아파트 리뷰 식별 번호
 * @returns 성공 여부 문자열(success, fail)을 담은 Promise
 */
const deleteHouseReview = async (no) => {
  return httpClient.axios(`/housereview/${no}`, {
    method: "DELETE",
  });
};

/**
 * 해당 아파트 리뷰를 특정 사용자의 좋아요 등록한다.
 *
 * @param {Number} reviewNo : 리뷰 고유 번호
 * @param {string} userNo : 사용자 고유 번호
 * @returns 성공 여부 문자열(success, fail)을 담은 Promise
 */
const saveHouseReviewLike = async (reviewNo, userNo) => {
  return httpClient.axios(`/housereview/${reviewNo}/${userNo}`, {
    method: "POST",
  });
};

/**
 * 해당 아파트 리뷰를 특정 사용자의 좋아요에서 삭제한다.
 *
 * @param {Number} reviewNo : 리뷰 고유 번호
 * @param {string} userNo : 사용자 고유 번호
 * @returns 성공 여부 문자열(success, fail)을 담은 Promise
 */
const deleteHouseReviewLike = async (reviewNo, userNo) => {
  return httpClient.axios(`/housereview/${reviewNo}/${userNo}`, {
    method: "DELETE",
  });
};

export {
  getHouseReviews,
  getHouseReview,
  postHouseReview,
  updateHouseReview,
  deleteHouseReview,
  saveHouseReviewLike,
  deleteHouseReviewLike,
};
