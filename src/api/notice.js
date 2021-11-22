import { httpClient } from ".";

const getNotices = async (pageNo, sizePerPage) => {
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
    headers: {
      "Content-Type": "multipart/form-data",
    },
    method: "POST",
    data,
  });
};

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

const deleteNotice = async (nos) => {
  return httpClient.axios(`/notice/${nos}`, {
    method: "DELETE",
  });
};
export { getNotices, getNotice, postNotice, updateNotice, deleteNotice };
