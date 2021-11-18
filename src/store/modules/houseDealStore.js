import { getSidos, getGuguns, getDongs, getHouseDeals } from "@/api/houseDeal";

const houseDealStore = {
  namespaced: true,
  state: {
    sidos: [],
    guguns: [],
    dongs: [],
    houseDeals: [],
  },

  mutations: {
    SET_SIDO_LIST: (state, sidos) => {
      state.sidos = sidos.map(({ sidoCode, sidoName }) => ({
        value: sidoCode,
        text: sidoName,
      }));
    },
    SET_GUGUN_LIST: (state, guguns) => {
      state.guguns = guguns.map(({ gugunCode, gugunName }) => ({
        value: gugunCode,
        text: gugunName,
      }));
    },
    SET_DONG_LIST: (state, dongs) => {
      state.dongs = dongs.map(({ code, dong }) => ({
        value: code,
        text: dong,
      }));
    },
    CLEAR_SIDO_LIST: (state) => {
      state.sidos = [];
    },
    CLEAR_GUGUN_LIST: (state) => {
      state.guguns = [];
    },

    CLEAR_DONG_LIST: (state) => {
      state.dongs = [];
    },
    SET_HOUSEDEAL_LIST: (state, houseDeals) => {
      state.houseDeals = houseDeals;
    },
  },
  actions: {
    asyncGetSidos: async ({ commit }) => {
      try {
        const result = await getSidos();
        commit("SET_SIDO_LIST", result);
      } catch (e) {
        console.error(e);
      }
    },

    asyncGetGuguns: async ({ commit }, sidoCode) => {
      try {
        const result = await getGuguns(sidoCode);
        commit("SET_GUGUN_LIST", result);
      } catch (e) {
        console.error(e);
      }
    },

    asyncGetDongs: async ({ commit }, gugunCode) => {
      try {
        const result = await getDongs(gugunCode);
        commit("SET_DONG_LIST", result);
      } catch (e) {
        console.error(e);
      }
    },

    asyncGetHouseDeals: async (
      { commit },
      { gugunCode, dongName, pageNo, sizePerPage }
    ) => {
      try {
        const result = await getHouseDeals({
          gugunCode,
          dongName,
          pageNo,
          sizePerPage,
        });
        console.log(result);
        commit("SET_HOUSEDEAL_LIST", result);
      } catch (e) {
        console.error(e);
      }
    },
  },
};

export default houseDealStore;
