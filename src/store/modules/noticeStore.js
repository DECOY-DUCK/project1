import { getNotices } from "@/api/notice";

const noticeStore = {
  namespaced: true,
  state: {
    notices: [],
    totalCnt: 0,
  },

  mutations: {
    SET_NOTICE_LIST: (state, { notices, totalCnt }) => {
      state.notices = notices;
      state.totalCnt = totalCnt;
    },
  },
  actions: {
    asyncGetNotices: async ({ commit }, { pageNo, sizePerPage }) => {
      try {
        const result = await getNotices(pageNo, sizePerPage);

        commit("SET_NOTICE_LIST", {
          notices: result.list,
          totalCnt: result.count,
        });
      } catch (e) {
        console.error(e);
      }
    },
  },
};

export default noticeStore;
