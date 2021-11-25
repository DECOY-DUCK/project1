import { qnaUserList } from "@/api/qna";

const qnaStore = {
  namespaced: true,
  state: {
    userQnaList: null,
  },
  mutations: {
    SET_USER_QNA_LIST: (state, result) => {
      state.userQnaList = result;
    },
  },
  actions: {
    //qna 해당회원 글 보여주기
    asyncQnaUserList: async ({ commit }, no) => {
      const result = await qnaUserList(no);
      commit("SET_USER_QNA_LIST", result);
    },
  },
};

export default qnaStore;
