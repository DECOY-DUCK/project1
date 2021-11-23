import { httpClient } from ".";

const login = async ({ email, password }) => {
  return httpClient.axios("/auth/login", {
    method: "POST",
    data: {
      email,
      password,
    },
  });
};

const signup = async (user) => {
  return httpClient.axios("/auth/signup", {
    method: "POST",
    data: {
      ...user,
    },
  });
};

const idcheck = async (email) => {
  return httpClient.axios("/auth/signup/idcheck", {
    method: "POST",
    data: { email },
  });
};

// const logout = async () => {
//   return httpClient.axios("/auth/logout", {
//     type: "POST",
//   });
// };

const findpwd = async ({ email, name }) => {
  return httpClient.axios("/auth/findpwd", {
    method: "POST",
    data: {
      email,
      name,
    },
  });
};
const getUserInfo = async (user) => {
  const { no, password } = user;
  return httpClient.axios(`/auth/mypage/${no}`, {
    method: "POST",
    data: { password },
  });
};

const updateUserInfo = async (user) => {
  const { no, email, password, name } = user;
  console.log(user);
  return httpClient.axios(`/auth/mypage/${no}`, {
    method: "PUT",
    data: {
      email,
      password,
      name,
    },
  });
};
const withdrawal = async (no) => {
  return httpClient.axios(`/auth/mypage/${no}`, {
    method: "DELETE",
  });
};
const me = async (email) => {
  return httpClient.axios(`/auth/me/${email}`, {
    headers: {
      "access-token": sessionStorage.getItem("access-token"),
    },
    method: "GET",
  });
};
const getUserInfolist = async () => {
  return httpClient.axios("/auth/userinfo", {
    method: "GET",
  });
};
const deleteUser = async (no) => {
  return httpClient.axios(`/auth/admin/${no}`, {
    method: "DELETE",
  });
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
  getUserInfolist,
  deleteUser,
};
