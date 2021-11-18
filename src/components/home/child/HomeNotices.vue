<template>
  <ul class="items">
    <home-notice
      v-for="(notice, index) in notices"
      :key="index"
      :notice="notice"
    />
  </ul>
</template>

<script>
import HomeNotice from "@/components/home/child/HomeNotice.vue";
export default {
  components: { HomeNotice },
  name: "HomeNotices",
  data() {
    return {
      notices: [
        {
          no: 1,
          title: "2월 공지",
          image: "@/assets/images/marker.png",
        },
        {
          no: 2,
          title: "1월 공지",
          image: "",
        },
      ],
    };
  },
};
</script>

<style scoped>
.items {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}
</style>
