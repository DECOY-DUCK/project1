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
import NavBar from "@/components/layout/NavBar.vue";
import Contacts from "@/components/layout/Contacts.vue";

export default {
  name: "App",
  components: {
    NavBar,
    Contacts,
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
</style>
