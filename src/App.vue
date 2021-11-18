<template>
  <div id="app">
    <!-- navbar -->
    <nav-bar />

    <!-- router-view -->
    <router-view />

    <!-- footer -->
    <contacts />
  </div>
</template>

<script>
import { mapActions } from "vuex";

import NavBar from "@/components/layout/NavBar.vue";
import Contacts from "@/components/layout/Contacts.vue";

const noticeStore = "noticeStore";

export default {
  name: "App",
  components: {
    NavBar,
    Contacts,
  },
  created() {
    this.asyncGetNotices({ pageNo: 0, sizePerPage: 15 });
  },
  methods: {
    ...mapActions(noticeStore, ["asyncGetNotices"]),
  },
};
</script>

<style>
/* font */
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Crimson+Text:wght@600&family=Noto+Sans+KR:wght@300;400;500;700&display=swap");

/* global css */
@import "./assets/css/reset.css";
@import "./assets/css/common.css";

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
