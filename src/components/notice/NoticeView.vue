<template>
  <section class="notice-container" id="notice-detail">
    <notice-view-header :notice="notice" />
    <notice-view-body :image="notice.image" :content="notice.content" />
  </section>
</template>

<script>
import { getNotice } from "@/api/notice";
import NoticeViewBody from "@/components/notice/child/NoticeViewBody.vue";
import NoticeViewHeader from "@/components/notice/child/NoticeViewHeader.vue";

export default {
  components: { NoticeViewHeader, NoticeViewBody },
  name: "NoticeView",
  data() {
    return {
      notice: {},
    };
  },
  async created() {
    this.notice = await getNotice(this.$route.params.no);
    console.log(this.notice);
    if (!this.notice) {
      alert("잘못된 접근입니다!");
      this.$router.push({ name: "Notice" });
    }
  },
};
</script>
