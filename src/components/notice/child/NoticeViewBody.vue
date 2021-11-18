<template>
  <main class="view-body">
    <div class="img-container">
      <img src="@/assets/images/default_notice.png" alt="notice image" />
    </div>
    <div class="view-content">
      <p>{{ content }}</p>
    </div>
  </main>
</template>

<script>
export default {
  name: "NoticeViewBody",
  props: {
    image: String,
    content: String,
  },
};
</script>

<style scoped>
.view-body {
  padding: 0 var(--size-regular);
}

.img-container {
  max-width: 600px;
  padding-top: 33.3%;
  position: relative;
  margin: 0 auto;
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

.view-content {
  max-width: 768px;
  margin: 4rem auto;
  text-align: center;
}

.view-content p {
  line-height: 1.5;
}
</style>
