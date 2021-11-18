<template>
  <ul class="notice-items">
    <notice-item
      v-for="(notice, index) in notices"
      :key="index"
      :notice="notice"
    />
  </ul>
</template>

<script>
import NoticeItem from "@/components/notice/child/NoticeItem.vue";
import { mapState } from "vuex";

const noticeStore = "noticeStore";

export default {
  components: { NoticeItem },
  name: "NoticeItems",
  computed: {
    ...mapState(noticeStore, ["notices"]),
  },
};
</script>

<style scoped>
.notice-items {
  display: grid;
  gap: var(--size-regular);
  grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
}

.notice-items > span {
  grid-column: 1 / 5;
  padding: 22.5vh 0;
}
</style>
