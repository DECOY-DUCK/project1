<template>
  <ul class="notice-items">
    <notice-item
      v-for="(notice, index) in notices"
      :key="index"
      :notice="notice"
    />
    <span v-if="!totalCnt">등록된 공지사항이 없습니다.</span>
  </ul>
</template>

<script>
import NoticeItem from "@/components/notice/child/NoticeItem.vue";
import { mapActions, mapState } from "vuex";

const noticeStore = "noticeStore";

export default {
  components: { NoticeItem },
  name: "NoticeItems",
  computed: {
    ...mapState(noticeStore, ["notices", "totalCnt"]),
  },
  created() {
    this.asyncGetNotices({ pageNo: 0, sizePerPage: 15 });
  },
  methods: {
    ...mapActions(noticeStore, ["asyncGetNotices"]),
  },
};
</script>

<style scoped>
.notice-items {
  display: grid;
  gap: var(--size-regular);
  grid-template-columns: repeat(auto-fill, minmax(12.5rem, 1fr));
}

.notice-items > span {
  grid-column: 1 / 5;
  padding: 10rem 0;
}
</style>
