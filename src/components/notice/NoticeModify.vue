<template>
  <section class="notice-container" id="notice-modify">
    <header class="notice-header">
      <h2>공지사항 수정</h2>
    </header>

    <main class="notice-main">
      <!-- 폼 -->
      <notice-form :original="original" :onSubmitHandler="onSubmitHandler" />
    </main>
  </section>
</template>

<script>
import { getNotice, updateNotice } from "@/api/notice.js";

export default {
  name: "NoticeModify",
  data() {
    return {
      original: {
        no: 0,
        authorName: "",
        authorNo: "",
        title: "",
        content: "",
        image: "",
      },
    };
  },
  async created() {
    if (this.type === "modify") {
      try {
        this.notice = await getNotice(this.$route.params.no);
        // 로그인 유저 처리보고 수정해야할 부분
        if (this.loginUser.no !== this.notice.authorNo) {
          alert("잘못된 접근입니다!");
          this.moveList();
        }
      } catch (e) {
        console.error(e);
      }
    }
  },

  methods: {
    async onSubmitHandler(data) {
      try {
        await updateNotice(data);
      } catch (e) {
        console.error(e);
      }
    },
  },
};
</script>

<style scope>
#notice-modify .notice-main {
  padding: 2rem var(--size-large);
}
</style>
