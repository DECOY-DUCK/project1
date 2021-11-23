<template>
  <button
    @click="onClickHandler"
    :data-value="value"
    :class="selected == value ? onClass : offClass"
  >
    {{ title }}
  </button>
</template>

<script>
export default {
  name: "FilterButton",
  props: {
    title: String,
    value: String,
    selected: String,
    filterHandler: Function,
  },
  data() {
    return {
      onClass: "button__on",
      offClass: "button__off",
    };
  },
  methods: {
    onClickHandler(e) {
      const py = e.target.dataset.value;
      this.filterHandler(py);
    },
  },
};
</script>

<style scoped>
button {
  margin-top: 0;
  margin-left: var(--size-micro);
  padding: var(--size-micro) var(--size-small);
  border-radius: var(--size-micro);
  border: 1px solid var(--color-light-grey);
  transition: all 200ms ease-out;
}

button:hover {
  background-color: var(--color-back);
}

.button__on {
  background-color: var(--color-back);
}
</style>
