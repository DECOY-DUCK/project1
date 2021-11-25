<template>
  <button
    :type="type"
    :class="['button', `${type}-button`]"
    @click="onClickHandler"
    v-html="title"
  ></button>
</template>

<script>
export default {
  name: "FormButton",
  props: {
    type: String,
    title: String,
    onClick: Function,
  },
  methods: {
    onClickHandler() {
      this.onClick && this.onClick();
    },
  },
};
</script>

<style scoped>
.button {
  border-radius: var(--size-micro);
}

.submit-button {
  color: var(--color-white);
  background-color: var(--color-dark-grey);
  border: 1px solid var(--color-grey);
}

.reset-button {
  color: var(--color-red);
  background-color: var(--color-white);
  border: 1px solid var(--color-red);
}

.submit-button:hover {
  background-color: var(--color-black);
}

.reset-button:hover {
  color: var(--color-white);
  background-color: var(--color-red);
}
</style>
