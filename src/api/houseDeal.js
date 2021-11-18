import { httpClient } from ".";

// 이런식으로 사용할 api 작성해서
// vue 파일에서 import해서 사용한 다음 반환받은 데이터를 사용하면 됩니다.
// ex - sidoList().then(data => data 처리로직).catch(에러 로직)
const sidoList = async () => {
  console.log("ss");
  return httpClient.axios("/housedeal/sido", {
    method: "GET",
  });
};

const gugunList = async () => {
  return httpClient.axios("/housedeal/gugun", {
    method: "GET",
  });
};

// 이건 post 예시
const postlist = async (username, name) => {
  return httpClient.axios("/housedeal/gugun", {
    method: "POST",
    data: {
      // 서버에 전달할 값들
      username,
      name,
    },
  });
};

//또는
const postlist2 = async (data) => {
  return httpClient.axios("/housedeal/gugun", {
    method: "POST",
    data,
  });
};

export { sidoList, gugunList, postlist, postlist2 };
