import { httpClient } from ".";

const createQans = async (qna) => {
  return httpClient.axios("qna", {
    method: "POST",
    data: { ...qna },
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
export { createQans, qnaUserList, deleteQnA };
