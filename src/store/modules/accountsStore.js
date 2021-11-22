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

const accountsStore = {
  namespaced: true,
  state: {
    isLogin: false,
    isLoginError: false,
    userInfo: null,
    responseServer: "",
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
      state.isLogin = true;
      state.userInfo = userInfo;
    },
    SET_RES_SERVER: (state, msg) => {
      state.responseServer = msg;
    },
  },
  actions: {
    //로그인
    asyncGetLogin: async ({ commit }, user) => {
      try {
        await login(user, (res) => {
          commit("SET_USER_INFO", res);
          sessionStorage.setItem("access-token", res.token);
        });
      } catch (e) {
        console.log("로그인 실패");
        commit("SET_IS_LOGIN_ERROR", false);
        commit("SET_IS_LOGIN", false);
      }
    },
    //회원 정보변경
    asyncUpdateUserInfo: async ({ commit }, user) => {
      try {
        await updateUserInfo(user, (res) => {
          //userinfo 갱신
          console.log("updateUseInfo " + res);
          commit("SET_USER_INFO", res);
        });
      } catch (e) {
        console.log(e);
      }
    },
    //회원 탈퇴
    asyncdeleteUserInfo: async ({ commit, state }) => {
      try {
        console.log(state.userInfo.no);
        await withdrawal(state.userInfo.no, (res) => {
          console.log("회원 탈퇴" + res);
          if (res === "success") {
            commit("SET_USER_INFO", null);
            commit("SET_IS_LOGIN", false);
          }
        });
      } catch (e) {
        console.log(e);
      }
    },
    //비밀번호 찾기
    asyncFindpwd: async ({ commit }, user) => {
      try {
        await findpwd(
          user,
          (res) => {
            console.log("성공");
            commit("SET_RES_SERVER", res);
          },
          (error) => {
            console.log(error);
          }
        );
      } catch (e) {
        console.log("뭔가 잘못됨");
        console.log(e);
      }
    },
    getUserInfo({ commit }, token) {
      let decode_token = jwt_decode(token);
      me(
        decode_token.email,
        (res) => {
          if (res.data.message === "success") {
            commit("SET_USER_INFO", res.data.userInfo);
          } else {
            console.log("유저 정보 없음!!");
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
    //회원가입
    asyncSignup: async ({ commit }, user) => {
      try {
        console.log(user);
        await signup(user, (res) => {
          console.log(res);
          commit("SET_RES_SERVER", res);
        });
      } catch (e) {
        console.log(e);
      }
    },
  },
};

export default accountsStore;
