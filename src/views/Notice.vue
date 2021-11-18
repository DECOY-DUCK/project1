<template>
  <section id="notice">
    <router-view v-if="$route.path !== '/notice'" />
    <div v-else>
      <header class="notice-header">
        <h2>공지사항</h2>
        <p>Happy House의 뉴스 및 공지사항</p>
      </header>
      <main class="notice-main">
        <notice-items v-if="totalCnt > 0" />
        <p v-else>등록된 공지사항이 없습니다.</p>
      </main>
    </div>
  </section>
</template>

<script>
import NoticeItems from "@/components/notice/child/NoticeItems.vue";
import { mapState } from "vuex";

const noticeStore = "noticeStore";

export default {
  components: { NoticeItems },
  name: "Notice",
  computed: {
    ...mapState(noticeStore, ["totalCnt"]),
  },
};
</script>

<style>
#notice {
  padding: var(--size-large) 0;
}

.notice-header {
  position: relative;
  text-align: center;
}

.notice-header h2 {
  margin-bottom: var(--size-large);
  font-weight: var(--weight-bold);
}

.notice-header p {
  color: var(--color-dark-grey);
}

.notice-header::after {
  position: absolute;
  left: 45%;
  top: 135%;
  content: "";
  width: 10%;
  height: 2px;
  background-color: var(--color-light-grey);
}

.notice-main {
  min-height: 90%;
  max-width: var(--display-maxWidth);
  margin: 0 auto;
  padding: 4rem var(--size-large) 5rem;
  text-align: center;
}

.notice-main p {
  padding: 6rem 0;
}
</style>
