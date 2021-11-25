<template>
  <div class="info__manage">
    <div class="title">
      <ul class="userinfo">
        <li>
          <span>등급</span>
          <em
            >{{ userInfo.authCode }}{{ userInfo.authCode
            }}{{ userInfo.authCode }}</em
          >
        </li>
        <li>
          <span>이름</span>
          <em>{{ userInfo.name }}</em>
        </li>
        <li>
          <span>이메일</span>
          <em>{{ userInfo.email }}</em>
        </li>
      </ul>
    </div>
    <div class="side__nav">
      <admin-side v-if="userInfo.authCode === 'S'" />
      <user-side v-else />
    </div>
    <div class="content"><router-view /></div>
  </div>
</template>

<script>
import store from "@/store/index";
import AdminSide from "@/components/infomanagement/adminside";
import UserSide from "@/components/infomanagement/userside";

export default {
  components: {
    AdminSide,
    UserSide,
  },
  data() {
    return {
      userInfo: null,
    };
  },
  created() {
    this.userInfo = store.getters["accountsStore/checkUserInfo"];
    window.scrollTo(0, 0);
  },
};
</script>

<style scoped>
.info__manage {
  margin-top: 5rem;
  display: grid;

  grid-template-areas:
    "s h h h h "
    "s b b b b "
    "s b b b b "
    "s b b b b ";
}
.title {
  width: 100%;
  font-size: var(--font-medium);
  grid-area: h;
}
.side__nav {
  height: 100%;
  grid-area: s;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 20rem;
}
.content {
  grid-area: b;
  margin-right: 20rem;
  height: 100vh;
}
.userinfo {
  display: flex;
  margin-right: 20rem;

  gap: 1rem;
  padding: 3rem 1rem 3rem 1rem;
  background-color: rgb(36, 36, 36);
  color: var(--color-white);
}

em {
  font-size: var(--font-large);
  margin-top: 1rem;
  margin-left: 7rem;
  margin-right: 1rem;
}
li {
  position: relative;
  display: flex;

  flex-direction: column;
  align-items: left;
}
li span {
  margin-left: 1rem;
}
span::after {
  content: ">";
}
.userinfo > li:nth-child(n + 2)::before {
  position: absolute;
  top: -15px;
  left: 0;
  width: 1px;
  height: 100px;
  background: #5d5d5d;
  content: "";
}
</style>
