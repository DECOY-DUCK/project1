import { httpClient } from ".";

const getInterestAreas = async (userNo) => {
  return httpClient.axios(`/interest/${userNo}`, {
    type: "GET",
  });
};

const getInterestArea = async (userNo, dongCode) => {
  return httpClient.axios(`/interest/${userNo}/${dongCode}`, {
    type: "GET",
  });
};

const saveInterestArea = async (userNo, dongCode) => {
  return httpClient.axios(`/interest/${userNo}/${dongCode}`, {
    type: "POST",
  });
};

const deleteInterestArea = async (userNo, dongCode) => {
  return httpClient.axios(`/interest/${userNo}/${dongCode}`, {
    type: "DELETE",
  });
};

export {
  getInterestAreas,
  getInterestArea,
  saveInterestArea,
  deleteInterestArea,
};
