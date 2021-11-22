<template>
  <li class="notice-item">
    <router-link
      :to="{ name: 'NoticeView', params: { no: notice.no } }"
      class="link"
    />
    <div class="img-container">
      <img :src="imageUrl" alt="notice content image" />
    </div>
    <div class="content">
      <div class="title">
        <span class="tag">Notice</span>
        <h5>{{ notice.title }}</h5>
      </div>
      <div class="info" v-if="location !== 'home'">
        <span>{{ notice.authorName }}</span>
        <span class="divider"> · </span>
        <span>{{ notice.modifiedAt || notice.createdAt }}</span>
      </div>
    </div>
  </li>
</template>

<script>
import { config } from "@/config/index.js";
import defaultImg from "@/assets/images/default_notice.png";

export default {
  name: "NoticeItem",
  props: {
    notice: {
      no: Number,
      authorName: String,
      authorEmail: String,
      title: String,
      image: String,
      createdAt: String,
      modifiedAt: String,
    },
    location: String,
  },
  data() {
    return {
      imageUrl: "",
    };
  },
  created() {
    const { saveFolder, saveFile } = this.notice.image;
    this.imageUrl =
      `${config.api.serverUrl}${saveFolder}/${saveFile}` || defaultImg;
  },
};
</script>

<style scoped>
.notice-item {
  min-width: 12.5rem;
  position: relative;
  background-color: var(--color-white);
  border-radius: var(--size-micro);
  display: flex;
  flex-direction: column;
  border: 1px solid var(--color-light-grey);
  transition: all 200ms cubic-bezier(0.25, 0.7, 0.25, 1);
}

.notice-item:hover {
  box-shadow: 0 35px 80px -20px rgba(0, 0, 0, 0.05),
    0 30px 60px -30px rgba(0, 0, 0, 0.15);
}

/* 관리자용 */
.notice-item__checkbox {
  position: absolute;
  z-index: 3;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.link {
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.img-container {
  padding-top: 56%;
  position: relative;
  border-bottom: 1px solid var(--color-light-grey);
  border-radius: var(--size-micro) var(--size-micro) 0 0;
  overflow: hidden;
}

.img-container img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.content {
  padding: var(--size-large);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.title h5 {
  margin: var(--size-small) 0 var(--size-large);
  font-size: var(--font-medium);
  line-height: 1.2;
}

.tag {
  font-size: var(--font-regular);
}
</style>
