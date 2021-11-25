import {
  getSidos,
  getGuguns,
  getDongs,
  getSidoGugunByDong,
  getHouseInfos,
} from "@/api/houseDeal";

const houseDealStore = {
  namespaced: true,
  state: {
    sidoCode: null,
    sidoName: "",
    gugunCode: null,
    gugunName: "",
    dongCode: null,
    dongName: "",
    sidos: [],
    guguns: [],
    dongs: [],
    houseInfos: [],
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
    SET_SIDO(state, { sidoName, sidoCode }) {
      state.sidoName = sidoName;
      state.sidoCode = sidoCode;
    },
    SET_GUGUN(state, { gugunName, gugunCode }) {
      state.gugunName = gugunName;
      state.gugunCode = gugunCode;
    },
    SET_DONG(state, { dongName, dongCode }) {
      state.dongName = dongName;
      state.dongCode = dongCode;
    },
    CLEAR_SIDO: (state) => {
      state.sidoName = null;
      state.sidoCode = null;
    },
    CLEAR_GUGUN: (state) => {
      state.gugunName = null;
      state.gugunCode = null;
    },
    CLEAR_DONG: (state) => {
      state.dongName = null;
      state.dongCode = null;
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
    SET_HOUSEINFO_LIST: (state, houseInfos) => {
      state.houseInfos = houseInfos;
    },
    CLEAR_HOUSEDEAL_LIST: (state) => {
      state.houseDeals = [];
    },
    CLEAR_HOUSEINFO_LIST: (state) => {
      state.houseInfos = [];
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

    asyncGetSidoGugunByDong: async ({ commit }, dongCode) => {
      try {
        const result = await getSidoGugunByDong(dongCode);
        commit("SET_SIDO", {
          sidoCode: result.sidoCode,
          sidoName: result.sidoName,
        });
        commit("SET_GUGUN", {
          gugunCode: result.gugunCode,
          gugunName: result.gugunName,
        });
      } catch (e) {
        console.error(e);
      }
    },

    asyncGetHouseInfos: async ({ commit }, { gugunCode, dongName, pageNo }) => {
      try {
        !pageNo && (pageNo = 0);

        const result = await getHouseInfos({
          gugunCode,
          dongName,
          pageNo,
        });
        commit("SET_HOUSEINFO_LIST", addAddress(result));
      } catch (e) {
        console.error(e);
      }
    },

    clearLocation: ({ commit }) => {
      commit("CLEAR_SIDO");
      commit("CLEAR_GUGUN");
      commit("CLEAR_DONG");
    },
  },
};

export default houseDealStore;

function addAddress(list) {
  return list.map((item) => {
    item["address"] = `${item.dong} ${item.jibun} ${item.aptName}`;
    return item;
  });
}
