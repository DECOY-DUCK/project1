<template>
  <div class="check">
    <h1>회원 탈퇴</h1>
    <span>탈퇴시 3개월간 동일한 이메일로 회원가입이 불가능 합니다.</span>
    <form @submit="onSubmit">
      <div>{{ userInfo.name }}님, 저희 서비스를 이용해주셔서 감사합니다.</div>
      <div>회원을 탈퇴하는 이유에 대해서 알려주세요</div>
      <div class="btn__area">
        <div>
          <select name="reason" id="reson">
            <option value="none">선택하기</option>
            <option value="1">정보부족</option>
            <option value="2">운영정책 불만족</option>
            <option value="3">사이트 불편</option>
            <option value="4">시스템 오류</option>
            <option value="5">보안 우려</option>
            <option value="6">검색 불편</option>
          </select>
        </div>
        <button @click="confirm">탈퇴하기</button>
      </div>
    </form>
  </div>
</template>

<script>
import store from "@/store/index";
import { mapActions } from "vuex";

const accountsStore = "accountsStore";

export default {
  data() {
    return {
      userInfo: "",
      password: "",
    };
  },
  created() {
    this.userInfo = store.getters["accountsStore/checkUserInfo"];
  },

  methods: {
    ...mapActions(accountsStore, ["asyncdeleteUserInfo"]),
    async confirm() {
      // let userInfo = store.getters["accountsStore/checkUserInfo"];
      if (
        confirm(
          "동일한 계정으로 회원가입이 불가능할수 있습니다. 탈퇴하시겠습니까?"
        )
      ) {
        await this.asyncdeleteUserInfo();
        //실패 조건문 추가하는게 좋을듯

        sessionStorage.removeItem("access-token");
        this.$router.push({ name: "Home" });
      }
    },
  },
};
</script>

<style scoped>
.check {
  margin-top: 10rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
}
.check h1 {
  display: inline;
  padding-right: 2rem;
}
form {
  border-top: 2px solid var(--color-black);
  border-bottom: 1px solid var(--color-black);
  font-size: var(--size-large);
}
form > div {
  margin: 1rem;
}
form input {
  border: 1px solid var(--color-black);
}
.btn__area {
  text-align: center;
}
</style>
