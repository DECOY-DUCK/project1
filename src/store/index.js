import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

import accountsStore from "@/store/modules/accountsStore.js";
import noticeStore from "@/store/modules/noticeStore.js";
import houseDealStore from "@/store/modules/houseDealStore.js";
import interestStore from "@/store/modules/interestStore.js";

const store = new Vuex.Store({
  modules: {
    accountsStore,
    noticeStore,
    houseDealStore,
    interestStore,
  },
  plugins: [
    createPersistedState({
      // 브라우저 종료시 제거하기 위해 localStorage가 아닌 sessionStorage로 변경. (default: localStorage)
      storage: sessionStorage,
    }),
  ],
});

export default store;
