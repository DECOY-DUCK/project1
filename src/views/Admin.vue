<template>
  <section id="admin" class="admin-container">
    <header class="admin-header">
      <h2>관리자 페이지</h2>
      <p>회원 정보 관리</p>
    </header>
    <main class="notice-main">
      <info-list v-if="alluserlist !== null" />
      <p v-else>등록된 회원이 없습니다.</p>
    </main>
  </section>
</template>
<script>
import InfoList from "@/components/admin/userinfo";
import { mapState, mapActions } from "vuex";

const accountsStore = "accountsStore";

export default {
  name: "Admin",
  components: {
    InfoList,
  },
  mounted() {
    window.scrollTo(0, 0);
  },
  created() {
    this.asyncGetUserInfoLIst();
  },
  methods: {
    ...mapActions(accountsStore, ["asyncGetUserInfoLIst"]),
  },
  computed: {
    ...mapState(accountsStore, ["alluserlist"]),
  },
};
</script>

<style>
#admin {
  padding-bottom: var(--size-large);
}

.admin-container {
  padding: var(--size-large) 0;
}

.admin-header {
  position: relative;
  padding-top: 5rem;
  text-align: center;
}

.admin-header h2 {
  margin-bottom: var(--size-large);
  font-weight: var(--weight-bold);
}

.admin-header p {
  color: var(--color-dark-grey);
}

.admin-header::after {
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
