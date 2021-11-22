import { httpClient } from ".";

const getSafeHospitals = async (sidoName, gugunName) => {
  return httpClient.axios("/environment/safehospital", {
    type: "GET",
    params: {
      sido: sidoName,
      gugun: gugunName,
    },
  });
};

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
