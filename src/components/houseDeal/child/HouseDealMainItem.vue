<template>
  <li class="houseDeal-item">
    <router-link
      :to="{ name: 'HouseDealView', params: { aptName: item.aptName } }"
      class="link"
    />
    <p>{{ item.aptName }}</p>
    <span>건축 연도: {{ item.buildYear }}년</span>
  </li>
</template>

<script>
export default {
  name: "HouseDealItem",
  props: {
    item: {
      no: String,
      aptName: String,
    },
  },
};
</script>

<style scoped>
.houseDeal-item::after {
  content: "";
  display: block;
  width: 100%;
  height: 1px;
  margin-top: var(--size-large);
  background-color: var(--color-light-grey);
}

.houseDeal-item::after {
  width: 72.5%;
}
.houseDeal-item:last-child::after {
  visibility: hidden;
}
.houseDeal-item {
  position: relative;
  padding-top: var(--size-large);
  display: flex;
  flex-direction: column;
  transition: all 200ms cubic-bezier(0.25, 0.7, 0.25, 1);
}

.houseDeal-item p {
  font-size: 0.9357rem;
  margin-bottom: var(--size-regular);
}

.houseDeal-item:hover {
  background-color: var(--color-shadow);
}

.link {
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

/* Media Query for below w640 */
@media screen and (max-width: 640px) {
  .houseDeal-item::after {
    width: 90%;
  }
}
</style>
