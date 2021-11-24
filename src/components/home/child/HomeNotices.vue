<template>
  <ul class="home-notices">
    <notice-item
      v-for="(notice, index) in noticeSummary"
      :key="index"
      :notice="notice"
      location="home"
    />
  </ul>
</template>

<script>
import { mapState } from "vuex";
import NoticeItem from "@/components/notice/child/NoticeItem.vue";

const noticeStore = "noticeStore";

export default {
  components: { NoticeItem },
  name: "HomeNotices",
  data() {
    return {
      noticeSummary: [],
    };
  },
  computed: {
    ...mapState(noticeStore, ["notices", "totalCnt"]),
  },
  created() {
    this.noticeSummary = this.notices.slice(0, 5);
  },
};
</script>

<style scoped>
.home-notices {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(5, minmax(12.5rem, 1fr));
  overflow: auto;
}
</style>
