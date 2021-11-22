import { httpClient } from ".";

const getInterestAreas = async (userNo) => {
  return httpClient.axios(`/interest/${userNo}`, {
    method: "GET",
  });
};

const getInterestArea = async (userNo, dongCode) => {
  return httpClient.axios(`/interest/${userNo}/${dongCode}`, {
    method: "GET",
  });
};

const saveInterestArea = async (userNo, dongCode) => {
  return httpClient.axios(`/interest/${userNo}/${dongCode}`, {
    method: "POST",
  });
};

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
