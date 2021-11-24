<template>
  <section class="body-container" id="notice-register">
    <header class="notice-header">
      <h2>공지사항 등록</h2>
    </header>

    <main class="notice-main">
      <!-- 폼 -->
      <notice-form :onSubmitHandler="onSubmitHandler" />
    </main>
  </section>
</template>

<script>
import { mapState } from "vuex";
import { postNotice } from "@/api/notice.js";
import NoticeForm from "@/components/notice/child/NoticeForm.vue";
import store from "@/store/index";

const accountsStore = "accountsStore";

export default {
  components: { NoticeForm },
  name: "NoticeWrite",
  methods: {
    async onSubmitHandler(data) {
      try {
        return await postNotice(data);
      } catch (e) {
        console.error(e);
      }
    },
  },
  computed: {
    ...mapState(accountsStore, ["userInfo"]),
  },
  created() {
    if (!this.userInfo || this.userInfo.authCode === "U") {
      alert("잘못된 접근입니다!");
      this.moveList();
    }
  },
  beforeRouteEnter(to, from, next) {
    if (store.getters["accountsStore/getResponse"] === "check") next();
    else {
      next(false);
    }
  },
};
</script>

<style scope>
#notice-register .notice-main {
  padding: 2rem var(--size-large);
}
h2 {
  text-align: center;
}
</style>
