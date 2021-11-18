<template>
  <main class="contents">
    <header class="header">
      <h3>공지사항</h3>
      <button>
        <router-link :to="{ name: 'Notice' }">
          더보기
          <b-icon icon="chevron-right" />
        </router-link>
      </button>
    </header>
    <home-notices />
  </main>
</template>

<script>
import HomeNotices from "@/components/home/child/HomeNotices.vue";
export default {
  components: { HomeNotices },
};
</script>

<style scoped>
.contents {
  padding: calc(var(--size-large) * 3) var(--size-large);
}

.header h3::before {
  content: "";
  width: 100%;
  height: 2px;
  margin-bottom: var(--size-small);
  display: block;
  background-color: var(--color-light-grey);
}

.header {
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--size-medium);
}
</style>
