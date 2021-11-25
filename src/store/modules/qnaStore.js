import { qnaUserList, qnaAllList } from "@/api/qna";

const qnaStore = {
  namespaced: true,
  state: {
    userQnaList: null,
    AllQnaList: null,
  },
  mutations: {
    SET_USER_QNA_LIST: (state, result) => {
      state.userQnaList = result;
    },
    SET_All_QNA_LIST: (state, result) => {
      state.AllQnaList = result;
    },
  },
  actions: {
    //qna 해당회원 글 보여주기
    asyncQnaUserList: async ({ commit }, no) => {
      const result = await qnaUserList(no);
      commit("SET_USER_QNA_LIST", result);
    },

    //qna 전체글 보기
    asyncQnaAllList: async ({ commit }) => {
      const result = await qnaAllList();
      commit("SET_All_QNA_LIST", result);
    },
  },
};

export default qnaStore;
