<template>
  <li class="home-notice">
    <div>
      <img class="image" :src="imageUrl" alt="home notice image" />
    </div>

    <router-link
      :to="{ name: 'NoticeView', params: { no: notice.no } }"
      class="link"
    >
      <p>{{ notice.title }}</p>
      <b-icon icon="chevron-right" />
    </router-link>
  </li>
</template>

<script>
import defaultImg from "@/assets/images/default_notice.png";

export default {
  name: "HomeNotice",
  props: {
    notice: {
      no: Number,
      title: String,
      image: String,
    },
  },
  data() {
    return {
      imageUrl: "",
    };
  },

  created() {
    this.imageUrl = `@/assets/resources${this.image}` || defaultImg;
  },
};
</script>

<style scoped>
.home-notice {
  flex-basis: 19.5%;
  min-width: 12.5rem;
  height: 17.5rem;
  margin-top: var(--size-medium);
  margin-right: var(--size-medium);
  padding: var(--size-large) var(--size-small);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: var(--size-micro);
  background-color: var(--color-back);
}

.link {
  margin-top: var(--size-medium);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 var(--size-large);
}

.image {
  width: 100%;
  height: 12rem;
  object-fit: cover;
}
</style>
