import {
  getInterestAreas,
  // getInterestArea,
  // saveInterestArea,
  deleteInterestArea,
} from "@/api/interest";

const interestStore = {
  namespaced: true,
  state: {
    InterestAreaList: null,
  },
  getters: {
    InterestAreaList: function (state) {
      return state.InterestAreaList;
    },
  },
  mutations: {
    SET_INTEREST_LIST: (state, result) => {
      state.InterestAreaList = result;
    },
  },
  actions: {
    //사용자의 관심 지역을 받아온다
    asyncGetInterestAreas: async ({ commit }, user) => {
      try {
        const result = await getInterestAreas(user);
        commit("SET_INTEREST_LIST", result);
      } catch (e) {
        console.error(e);
      }
    },
    //사용자의 관심 지역을 삭제합니다.
    asyncDeleteInterestArea: async (commit, user) => {
      try {
        const no = user.no;
        const code = user.code;
        await deleteInterestArea(no, code);
      } catch (e) {
        console.error(e);
      }
    },
  },
};
export default interestStore;
