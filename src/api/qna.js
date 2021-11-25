import { httpClient } from ".";

const createQans = async (qna) => {
  return httpClient.axios("qna", {
    method: "POST",
    data: { ...qna },
  });
};
const qnaAllList = async () => {
  return httpClient.axios("qna", {
    method: "GET",
  });
};
const qnaUserList = async (authorNo) => {
  return httpClient.axios(`qna/${authorNo}`, {
    method: "GET",
  });
};
const deleteQnA = async (no) => {
  return httpClient.axios(`qna/${no}`, {
    method: "DELETE",
  });
};
const modifyQnA = async (no, qna) => {
  return httpClient.axios(`qna/${no}`, {
    method: "PUT",
    data: { ...qna },
  });
};
const insertQnAReply = async (no, qnaReply) => {
  return httpClient.axios(`qna/reply/${no}`, {
    method: "POST",
    data: { ...qnaReply },
  });
};
export {
  createQans,
  qnaUserList,
  deleteQnA,
  modifyQnA,
  qnaAllList,
  insertQnAReply,
};
