<template>
  <ul class="home-notices">
    <home-notice
      v-for="(notice, index) in noticeSummary"
      :key="index"
      :notice="notice"
    />
  </ul>
</template>

<script>
import HomeNotice from "@/components/home/child/HomeNotice.vue";
import { mapState } from "vuex";

const noticeStore = "noticeStore";

export default {
  components: { HomeNotice },
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
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}
</style>
