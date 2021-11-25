<template>
  <p :class="['banner', isAlert ? 'banner-error' : 'banner-info']">
    {{ text }}
  </p>
</template>

<script>
export default {
  name: "AlertBanner",
  props: {
    isAlert: Boolean,
    text: String,
  },
};
</script>

<style scoped>
.banner {
  margin: var(--size-regular);
  padding: var(--size-regular);
  font-size: var(--font-regular);
  font-weight: var(--weight-semi-bold);
}

.banner-error {
  background-color: var(--color-red);
}

.banner-info {
  background-color: var(--color-green);
}
</style>
