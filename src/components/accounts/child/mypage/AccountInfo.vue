<template>
  <div>
    <div class="account_info">
      <ul class="accounts__info">
        <li class="accounts__info__item">
          <span class="info__item__title">Email</span>
          <p class="info__item__contents">{{ userInfo.email }}</p>
        </li>
        <li class="accounts__info__item">
          <span class="info__item__title">Name</span>
          <p class="info__item__contents">{{ userInfo.name }}</p>
        </li>
      </ul>
      <div class="accounts__info__btns" v-if="userInfo.authCode == 'U'">
        <router-link
          :to="{ name: 'Modify' }"
          class="accounts__info__btn btn__edit"
          >Edit</router-link
        >
        <button
          class="accounts__info__btn btn__delete"
          type="button"
          @click="confirm"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/store/index";
import { mapActions } from "vuex";

const accountsStore = "accountsStore";

export default {
  name: "AccountInfo",
  data() {
    return {
      userInfo: "",
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
.account_info {
  margin: 2rem;
}
</style>
