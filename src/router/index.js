import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    // component: Home,
  },
  {
    path: "/housedeal",
    name: "housedeal",
    //component: HouseDeal,
  },
  {
    path: "/accounts",
    name: "Accounts",
    // component: Accounts,
    children: [
      {
        path: "login",
        name: "LogIn",
        // component: AccountsLogin,
      },
      {
        path: "signup",
        name: "SignUp",
        // component: AccountsJoin,
      },
      {
        path: "mypage",
        name: "MyPage",
        // beforeEnter: onlyAuthUser,
        // component: AccountsMyPage,
      },
      {
        path: "findPwd",
        name: "FindPwd",
        // component: AccountsFindPwd,
      },
    ],
  },
  {
    path: "/notice",
    name: "Notice",
    //component: Notice,
    redirect: "/notice/list",
    children: [
      {
        path: "list",
        name: "NoticeList",
        //component: NoticeList,
      },
      {
        path: "detail/:no",
        name: "NoticeView",
        //beforeEnter: onlyAuthUser,
        //component: NoticeView,
      },
    ],
  },
  {
    path: "/cs",
    name: "CS",
    //component: CS,
    children: [
      {
        path: "qna",
        name: "QnA",
        //beforeEnter: onlyAuthUser,
        //component: QnAWrite,
      },
      {
        path: "qna/write/:no",
        name: "QnAWrite",
        //beforeEnter: onlyAuthUser,
        //component: QnAWrite,
      },
      {
        path: "qna/detail/:no",
        name: "QnAView",
        //beforeEnter: onlyAuthUser,
        //component: QnAView,
      },
      {
        path: "qna/modify/:no",
        name: "QnAModify",
        //beforeEnter: onlyAuthUser,
        //component: QnAModify,
      },
      {
        path: "faq",
        name: "FAQ",
        //beforeEnter: onlyAuthUser,
        //component: FAQWrite,
      },
      {
        path: "faq/detail/:no",
        name: "FAQView",
        //beforeEnter: onlyAuthUser,
        //component: FAQView,
      },
    ],
  },
  {
    path: "/admin",
    name: "Admin",
    //component: Admin,
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
