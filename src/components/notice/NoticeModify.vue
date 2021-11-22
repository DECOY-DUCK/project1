<template>
  <section class="notice-container" id="notice-modify">
    <header class="notice-header">
      <h2>공지사항 수정</h2>
    </header>

    <main class="notice-main">
      <!-- 폼 -->
      <notice-form
        :original="original"
        :onSubmitHandler="onSubmitHandler"
        type="modify"
      />
    </main>
  </section>
</template>

<script>
import { mapState } from "vuex";
import { getNotice, updateNotice } from "@/api/notice.js";
import NoticeForm from "@/components/notice/child/NoticeForm.vue";

const accountsStore = "accountsStore";
export default {
  components: { NoticeForm },
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
  computed: {
    ...mapState(accountsStore, ["userInfo"]),
  },
  async created() {
    try {
      this.original = await getNotice(this.$route.params.no);

      if (this.userInfo.no !== this.original.authorNo) {
        alert("잘못된 접근입니다!");
        this.moveList();
      }
    } catch (e) {
      console.error(e);
    }
  },

  methods: {
    async onSubmitHandler(data) {
      try {
        return updateNotice(data);
      } catch (e) {
        console.error(e);
      }
    },
    moveList() {
      this.$router.push({ name: "Notice" });
    },
  },
};
</script>

<style scope>
#notice-modify .notice-main {
  padding: 2rem var(--size-large);
}
</style>
