import { httpClient } from ".";

const SIZE_PER_PAGE = 15;

/**
 * 현재 페이지의 공지사항 목록을 받아온다.
 *
 * @param {Number} pageNo      : 현재 페이지 번호
 * @param {Number} sizePerPage : 페이지당 개수
 * @returns 해당 페이지의 공지사항 목록을 담은 Promise
 */
const getNotices = async (pageNo) => {
  return httpClient.axios("/notice", {
    method: "GET",
    params: {
      pageNo,
      sizePerPage: SIZE_PER_PAGE,
    },
  });
};

/**
 * 식별 번호에 해당하는 공지사항을 받아온다.
 *
 * @param {Number} no : 공지사항 식별 번호
 * @returns 해당 공지사항 정보를 담은 Promise
 */
const getNotice = async (no) => {
  return httpClient.axios(`/notice/${no}`, {
    method: "GET",
  });
};

/**
 * 등록할 공지사항 정보를 전달하여 등록한다.
 *
 * @param {Object} data : 공지사항 내용 (title, authorNo, content, image)
 * @returns 성공 여부 문자열(success, fail)을 담은 Promise
 */
const postNotice = async (data) => {
  return httpClient.axios("/notice", {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    method: "POST",
    data,
  });
};

/**
 * 공지사항 식별 번호와 수정할 내용을 전달하여 해당 공지사항을 수정한다.
 *
 * @param {Object} data : 공지사항 내용 (no, title, authorNo, content, image)
 * @returns 성공 여부 문자열(success, fail)을 담은 Promise
 */
const updateNotice = async (data) => {
  const no = data.get("no");
  data.delete("no");
  return httpClient.axios(`/notice/${no}`, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    method: "PUT",
    data,
  });
};

/**
 * 공지사항 식별 번호에 해당하는 공지사항을 삭제한다.
 *
 * @param {Number} no : 공지사항 식별 번호
 * @returns 성공 여부 문자열(success, fail)을 담은 Promise
 */
const deleteNotice = async (no) => {
  return httpClient.axios(`/notice/${no}`, {
    method: "DELETE",
  });
};
export { getNotices, getNotice, postNotice, updateNotice, deleteNotice };
