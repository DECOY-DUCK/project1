import Vue from "vue";
import VueRouter from "vue-router";
//홈페이지
import Home from "@/views/Home.vue";
import HouseDeal from "@/views/HouseDeal.vue";
import HouseDealMain from "@/components/houseDeal/HouseDealMain.vue";
import HouseDealView from "@/components/houseDeal/HouseDealView.vue";
//회원 관련
import Accounts from "@/views/Accounts.vue";
import AccountsLogin from "@/components/accounts/child/AccountsLogin.vue";
import AccountsJoin from "@/components/accounts/child/AccountsJoin.vue";
import AccountsFindPwd from "@/components/accounts/child/AccountsFindPwd.vue";
import AccountsModify from "@/components/accounts/child/AccountsModify.vue";

//공지 관련
import Notice from "@/views/Notice.vue";
import NoticeMain from "@/components/notice/NoticeMain.vue";
import NoticeView from "@/components/notice/NoticeView.vue";
import NoticeModify from "@/components/notice/NoticeModify.vue";

//정보관리-관리자
import Managemnet from "@/views/infomanagement";
import Check from "@/components/infomanagement/check.vue";
import Admin from "@/components/infomanagement/admin/useradmin.vue";
import NoticeWrite from "@/components/infomanagement/admin//NoticeWrite.vue";

//정보관리-유저
import QnAWrite from "@/components/infomanagement/user/QnAWrite.vue";
import InterestArea from "@/components/infomanagement/user/InterestArea.vue";
import AccountsDelete from "@/components/infomanagement/user/AccountsDelete.vue";

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
// 마이페이지 재확인
const checkUserInfoBefore = async (to, from, next) => {
  const serverres = store.getters["accountsStore/getResponse"];
  const userInfo = store.getters["accountsStore/checkUserInfo"];
  if (userInfo !== null && serverres == "check") {
    if (userInfo.authCode == "U") {
      router.push({ name: "InterestArea" });
    } else {
      router.push({ name: "Admin" });
    }
  } else {
    next();
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
        path: ":aptNo",
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
        path: "findPwd",
        name: "FindPwd",
        component: AccountsFindPwd,
      },
      {
        path: "accountmodify",
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
    // name: "CustomerService",
    // component: CustomerService,
    children: [
      {
        path: "qna",
        name: "QnA",
        beforeEnter: onlyAuthUser,
        //component: QnAWrite,
      },
      // {
      //   path: "qna/write",
      //   name: "QnAWrite",
      //   beforeEnter: onlyAuthUser,
      //   //component: QnAWrite,
      // },
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
    path: "/management",
    name: "Management",
    component: Managemnet,
    beforeEnter: onlyAuthUser,
    children: [
      {
        //accountsStore에서 responseServer가 check면 통과
        path: "check",
        name: "Check",
        beforeEnter: checkUserInfoBefore,
        component: Check,
      },
      {
        path: "qna/write",
        name: "QnAWrite",
        beforeEnter: onlyAuthUser,
        component: QnAWrite,
      },
      {
        //일반회원 못들어오게 막기
        path: "admin",
        name: "Admin",
        beforeEnter: onlyAuthUser,
        component: Admin,
      },
      {
        //일반회원 못들어오게 막기
        path: "write",
        name: "NoticeWrite",
        beforeEnter: onlyAuthUser,
        component: NoticeWrite,
      },
      {
        path: "interestarea",
        name: "InterestArea",
        beforeEnter: onlyAuthUser,
        component: InterestArea,
      },
      {
        path: "accountsdelete",
        name: "AccountsDelete",
        beforeEnter: onlyAuthUser,
        component: AccountsDelete,
      },
    ],
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
