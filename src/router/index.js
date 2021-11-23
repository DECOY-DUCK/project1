import Vue from "vue";
import VueRouter from "vue-router";

import Home from "@/views/Home.vue";
import HouseDeal from "@/views/HouseDeal.vue";
import HouseDealMain from "@/components/houseDeal/HouseDealMain.vue";
import HouseDealView from "@/components/houseDeal/HouseDealView.vue";

import Accounts from "@/views/Accounts.vue";
import AccountsLogin from "@/components/accounts/child/AccountsLogin.vue";
import AccountsJoin from "@/components/accounts/child/AccountsJoin.vue";
import AccountsMyPage from "@/components/accounts/child/AccountsMyPage.vue";
import AccountsFindPwd from "@/components/accounts/child/AccountsFindPwd.vue";
import AccountsModify from "@/components/accounts/child/AccountsModify.vue";

import Notice from "@/views/Notice.vue";
import NoticeMain from "@/components/notice/NoticeMain.vue";
import NoticeView from "@/components/notice/NoticeView.vue";
import NoticeWrite from "@/components/notice/NoticeWrite.vue";
import NoticeModify from "@/components/notice/NoticeModify.vue";

import CS from "@/views/CS.vue";

import Admin from "@/views/Admin.vue";

import store from "@/store/index.js";
Vue.use(VueRouter);

const onlyAuthUser = async (to, from, next) => {
  console.log(store);
  const checkUserInfo = store.getters["accountsStore/checkUserInfo"];
  const asyncGetUserInfo = store._actions["accountsStore/asyncGetUserInfo"];
  let token = sessionStorage.getItem("access-token");
  console.log(asyncGetUserInfo);
  if (checkUserInfo == null && token) {
    await asyncGetUserInfo(token);
  }
  if (checkUserInfo === null) {
    alert("로그인이 필요한 페이지입니다..");

    router.push({ name: "LogIn" });
  } else {
    // console.log("로그인 했다.");
    next();
  }
};
//로그인상태로 로그인 화면,회원가입 화면 접근할경우
const test = async (to, from, next) => {
  const checkUserInfo = store.getters["accountsStore/checkUserInfo"];
  const asyncGetUserInfo = store._actions["accountsStore/asyncGetUserInfo"];
  let token = sessionStorage.getItem("access-token");
  console.log(asyncGetUserInfo);
  if (checkUserInfo == null && token) {
    await asyncGetUserInfo(token);
  }
  if (checkUserInfo === null) {
    next();
  } else {
    router.push({ name: "Home" });
    alert("잘못된 접근 입니다.");
  }
};
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/housedeal",
    name: "HouseDeal",
    component: HouseDeal,
    redirect: HouseDealMain,
    children: [
      {
        path: "main",
        name: "HouseDealMain",
        component: HouseDealMain,
      },
      {
        path: ":aptName",
        name: "HouseDealView",
        component: HouseDealView,
      },
    ],
  },
  {
    path: "/accounts",
    name: "Accounts",
    component: Accounts,
    children: [
      {
        path: "login",
        name: "LogIn",
        beforeEnter: test,
        component: AccountsLogin,
      },
      {
        path: "signup",
        name: "SignUp",
        beforeEnter: test,
        component: AccountsJoin,
      },
      {
        path: "mypage",
        name: "MyPage",
        beforeEnter: onlyAuthUser,
        component: AccountsMyPage,
      },
      {
        path: "findPwd",
        name: "FindPwd",
        component: AccountsFindPwd,
      },
      {
        path: "modify",
        name: "Modify",
        component: AccountsModify,
      },
    ],
  },
  {
    path: "/notice",
    name: "Notice",
    component: Notice,
    redirect: NoticeMain,
    children: [
      {
        path: "main",
        name: "NoticeMain",
        component: NoticeMain,
      },
      {
        //관리자 페이지에 생성시 path 수정 필요
        path: "write",
        name: "NoticeWrite",
        beforeEnter: onlyAuthUser,
        component: NoticeWrite,
      },
      {
        path: "detail/:no",
        name: "NoticeView",
        component: NoticeView,
      },
      {
        path: "modify/:no",
        name: "NoticeModify",
        component: NoticeModify,
      },
    ],
  },
  {
    path: "/cs",
    name: "CS",
    component: CS,
    children: [
      {
        path: "qna",
        name: "QnA",
        beforeEnter: onlyAuthUser,
        //component: QnAWrite,
      },
      {
        path: "qna/write",
        name: "QnAWrite",
        beforeEnter: onlyAuthUser,
        //component: QnAWrite,
      },
      {
        path: "qna/detail/:no",
        name: "QnAView",
        beforeEnter: onlyAuthUser,
        //component: QnAView,
      },
      {
        path: "qna/modify/:no",
        name: "QnAModify",
        beforeEnter: onlyAuthUser,
        //component: QnAModify,
      },
      {
        path: "faq",
        name: "FAQ",
        beforeEnter: onlyAuthUser,
        //component: FAQWrite,
      },
      {
        path: "faq/detail/:no",
        name: "FAQView",
        beforeEnter: onlyAuthUser,
        //component: FAQView,
      },
    ],
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
    children: [],
  },
  {
    path: "*",
    redirect: "/",
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
