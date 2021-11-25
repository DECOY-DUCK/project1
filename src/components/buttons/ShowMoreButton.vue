<template>
  <button class="show-more-button" @click="onClickHandler">
    {{ text }}
  </button>
</template>

<script>
export default {
  name: "ShowMoreButton",
  props: {
    text: String,
    onClick: Function,
  },
  methods: {
    onClickHandler() {
      this.onClick();
    },
  },
};
</script>

<style scoped></style>
