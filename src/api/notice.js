import { httpClient } from ".";

const getNotices = async (pageNo = 0, sizePerPage = 15) => {
  return httpClient.axios("/notice", {
    method: "GET",
    params: {
      pageNo,
      sizePerPage,
    },
  });
};

const getNotice = async (no) => {
  return httpClient.axios(`/notice/${no}`, {
    method: "GET",
  });
};

const postNotice = async (data) => {
  return httpClient.axios("/notice", {
    method: "POST",
    data,
  });
};

const updateNotice = async (data) => {
  return httpClient.axios("/notice", {
    method: "PUT",
    data,
  });
};

const deleteNotice = async (no) => {
  return httpClient.axios(`/notice/${no}`, {
    method: "DELETE",
  });
};

export { getNotices, getNotice, postNotice, updateNotice, deleteNotice };
