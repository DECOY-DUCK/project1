import jwt_decode from "jwt-decode";
import {
  login,
  signup,
  // idcheck,
  findpwd,
  // getUserInfo,
  updateUserInfo,
  withdrawal,
  me,
} from "@/api/auth";
import { deleteUser, getUserInfolist } from "../../api/auth";

const accountsStore = {
  namespaced: true,
  state: {
    isLogin: false,
    isLoginError: false,
    userInfo: null,
    responseServer: "",
    alluserlist: [],
  },
  getters: {
    checkUserInfo: function (state) {
      return state.userInfo;
    },
  },
  mutations: {
    SET_IS_LOGIN: (state, isLogin) => {
      state.isLogin = isLogin;
    },
    SET_IS_LOGIN_ERROR: (state, isLoginError) => {
      state.isLoginError = isLoginError;
    },
    SET_USER_INFO: (state, userInfo) => {
      state.userInfo = userInfo;
    },
    SET_RES_SERVER: (state, msg) => {
      state.responseServer = msg;
    },
    SET_ALL_USER: (state, res) => {
      state.alluserlist = res.filter((user) => user.authCode == "U");
    },
  },
  actions: {
    //로그인
    asyncGetLogin: async ({ commit }, user) => {
      try {
        const result = await login(user);
        commit("SET_USER_INFO", result);
        commit("SET_IS_LOGIN", true);
        sessionStorage.setItem("access-token", result.token);
      } catch (e) {
        console.log("로그인 실패");
        console.error(e);
        commit("SET_IS_LOGIN_ERROR", false);
        commit("SET_IS_LOGIN", false);
      }
    },
    //회원 정보변경
    asyncUpdateUserInfo: async ({ commit }, user) => {
      try {
        const result = await updateUserInfo(user);
        console.log("updateUseInfo " + result);
        commit("SET_USER_INFO", result);
      } catch (e) {
        console.error(e);
      }
    },
    //회원 탈퇴
    asyncdeleteUserInfo: async ({ commit, state }) => {
      try {
        console.log(state.userInfo.no);

        const result = await withdrawal(state.userInfo.no);
        console.log("회원 탈퇴" + result);
        if (result === "success") {
          commit("SET_USER_INFO", null);
          commit("SET_IS_LOGIN", false);
        }
      } catch (e) {
        console.error(e);
      }
    },
    //비밀번호 찾기
    asyncFindpwd: async ({ commit }, user) => {
      try {
        const result = await findpwd(user);
        console.log("성공");
        commit("SET_RES_SERVER", result);
      } catch (e) {
        console.log("뭔가 잘못됨");
        console.error(e);
      }
    },
    asyncGetUserInfo: async ({ commit }, token) => {
      let decode_token = jwt_decode(token);
      try {
        const result = await me(decode_token.email);
        if (result.message === "success") {
          commit("SET_USER_INFO", result.userInfo);
        } else {
          console.log("유저 정보 없음!!");
        }
      } catch (e) {
        console.error(e);
      }
    },
    //회원가입
    asyncSignup: async ({ commit }, user) => {
      try {
        console.log(user);
        const result = await signup(user);
        console.log(result);
        commit("SET_RES_SERVER", result);
      } catch (e) {
        console.error(e);
      }
    },
    //회원정보 불러오기
    asyncGetUserInfoLIst: async ({ commit }) => {
      try {
        const result = await getUserInfolist();
        console.log(result);
        commit("SET_ALL_USER", result);
      } catch (e) {
        console.error(e);
      }
    },
    //회원 삭제
    asyncdeleteUserbyAdmin: async ({ commit, dispatch }, no) => {
      try {
        const result = await deleteUser(no);
        console.log(result);
        if (result == "success") {
          dispatch("asyncGetUserInfoLIst");
        }
        commit("SET_RES_SERVER", result);
      } catch (e) {
        console.error(e);
      }
    },
  },
};

export default accountsStore;
