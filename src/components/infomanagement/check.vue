<template>
  <div>
    <h1>비밀번호 재확인</h1>
    <span>개인 정보 보호를 위해 비밀번호 재확인을 부탁드립니다</span>
    <div>
      <div>아이디 : {{ email }}</div>
      <label for="password"
        >비밀번호
        <input type="password" name="password" id="" />
      </label>
    </div>
  </div>
</template>

<script>
import store from "@/store/index";

export default {
  data() {
    return {
      email: "",
    };
  },
  created() {
    const userInfo = store.getters["accountsStore/checkUserInfo"];
    this.email = userInfo.email;
  },
};
</script>

<style scoped></style>
