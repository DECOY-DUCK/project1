<template>
  <div class="check">
    <h1>비밀번호 재확인</h1>
    <span>개인 정보 보호를 위해 비밀번호 재확인을 부탁드립니다</span>
    <form @submit="onSubmit">
      <div>아이디 : {{ userInfo.email }}</div>
      <label for="password"
        >비밀번호 :
        <input
          type="password"
          name="password"
          id="password"
          v-model="password"
        />
      </label>
      <div class="btn__area">
        <button>확인</button>
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
    ...mapActions(accountsStore, ["asyncCheckUserInfo"]),
    async onSubmit(e) {
      e.preventDefault();

      console.log(this.password);
      if (this.password == "") {
        alert("비밀번호를 확인하세요");
      } else {
        const user = {
          no: this.userInfo.no,
          password: this.password,
        };
        //성공시 userInfo 반환
        await this.asyncCheckUserInfo(user);
        console.log(store.getters["accountsStore/getResponse"]);
        if (store.getters["accountsStore/getResponse"] === "check") {
          if (this.userInfo.authCode == "U") {
            this.$router.push({ name: "InterestArea" });
          } else {
            this.$router.push({ name: "Admin" });
          }
        } else {
          alert("비밀번호를 다시 입력해 주세요");
        }
      }
    },
  },
};
</script>

<style scoped>
.check {
  margin-top: 15rem;
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
