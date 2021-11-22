<template>
  <header class="view-header">
    <div class="info">
      <span>Notice</span>
      <span class="divider">·</span>
      <span class="date">{{ notice.modifiedAt || notice.createdAt }}</span>
    </div>
    <div class="title">
      <h2>{{ notice.title }}</h2>
      <span> <b-icon icon="eye-fill" /> {{ notice.viewCnt }}</span>
    </div>
    <div class="author">
      <a :href="`mailto:${notice.authorEmail}`" title="mail to author">{{
        notice.authorName
      }}</a>

      <!-- <div class="author-buttons" v-if="authorNo == loginUser.no">
        <button class="button-edit" type="button">
          Edit
        </button>
        <span class="divider"> · </span>
        <button class="button-delete" type="button">
          Delete
        </button>
      </div> -->
    </div>
  </header>
</template>

<script>
export default {
  name: "NoticeViewHeader",
  props: {
    notice: {
      no: Number,
      authorName: String,
      authorEmail: String,
      title: String,
      image: String,
      content: String,
      viewCnt: Number,
      createdAt: String,
      modifiedAt: String,
    },
  },
};
</script>

<style scoped>
.view-header {
  margin: 5rem auto 4rem;
  text-align: center;
  padding: 0 var(--size-large);
}

.info {
  line-height: 1.5;
  display: flex;
  align-items: center;
  justify-content: center;
}

.info span {
  font-size: var(--font-regular);
}

.info .divider {
  margin: 0 var(--size-regular);
}

.title {
  padding: 2.4rem;
}

.title h2 {
  margin-bottom: var(--size-large);
  font-weight: var(--weight-bold);
}

.author-buttons {
  margin-top: var(--size-small);
}
</style>
