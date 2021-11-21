<template>
  <section class="notice-container" id="notice-register">
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
import { postNotice } from "@/api/notice.js";
import NoticeForm from "@/components/notice/child/NoticeForm.vue";

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
};
</script>

<style scope>
#notice-register .notice-main {
  padding: 2rem var(--size-large);
}
</style>
