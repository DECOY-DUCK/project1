import { getNotices, deleteNotice } from "@/api/notice";

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
        !pageNo && (pageNo = 0);
        !sizePerPage && (sizePerPage = 15);

        const result = await getNotices(pageNo, sizePerPage);

        commit("SET_NOTICE_LIST", {
          notices: result.list,
          totalCnt: result.count,
        });
      } catch (e) {
        console.error(e);
      }
    },
    asyncDeleteNotice: async ({ dispatch }, no) => {
      try {
        const result = await deleteNotice(no);
        if (result === "sucess") {
          console.log("삭제처리완료");
          dispatch("asyncGetNotices");
        }
      } catch (e) {
        console.error(e);
      }
    },
    // asyncUpdateNotice: async ({ dispatch }, data) => {
    //   try {
    //     const result = await updateNotice(data);
    //     if (result === "sucess") {
    //       console.log("변경완료");
    //       dispatch("asyncGetNotices");
    //     }
    //   } catch (e) {
    //     console.error(e);
    //   }
    // },
  },
};

export default noticeStore;
