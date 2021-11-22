import { httpClient } from ".";

const login = async (user, success, fail) => {
  return httpClient
    .axios("/auth/login", {
      method: "POST",
      params: {
        email: user.email,
        password: user.password,
      },
    })
    .then(success)
    .catch(fail);
};

const signup = async (user, success, fail) => {
  return httpClient
    .axios("/auth/signup", {
      method: "POST",
      params: {
        email: user.email,
        password: user.password,
        name: user.name,
      },
    })
    .then(success)
    .catch(fail);
};

const idcheck = async (email, success, fail) => {
  return httpClient
    .axios("/auth/signup/idcheck", {
      method: "POST",
      email,
    })
    .then(success)
    .catch(fail);
};

// const logout = async () => {
//   return httpClient.axios("/auth/logout", {
//     type: "POST",
//   });
// };

const findpwd = async (user, success, fail) => {
  return httpClient
    .axios("/auth/findpwd", {
      method: "POST",
      params: {
        email: user.email,
        name: user.name,
      },
    })
    .then(success)
    .catch(fail);
};
const getUserInfo = async (user) => {
  return httpClient.axios(`/auth/mypage/${user.no}`, {
    method: "POST",
    params: user.password,
  });
};
const updateUserInfo = async (user, success, fail) => {
  return httpClient
    .axios(`/auth/mypage/${user.no}`, {
      method: "PUT",
      params: {
        email: user.email,
        password: user.password,
        name: user.name,
      },
    })
    .then(success)
    .catch(fail);
};
const withdrawal = async (no, success, fail) => {
  return httpClient
    .axios(`/auth/mypage/${no}`, {
      method: "DELETE",
    })
    .them(success)
    .catch(fail);
};
const me = async (email, success, fail) => {
  return httpClient
    .axios(`/auth/me/${email}`, {
      headers: sessionStorage.getItem("access-token"),
      method: "GET",
    })
    .then(success)
    .catch(fail);
};

export {
  login,
  signup,
  idcheck,
  // logout,
  findpwd,
  getUserInfo,
  updateUserInfo,
  withdrawal,
  me,
};
