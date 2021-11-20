<template>
  <ul class="houseDeal-list">
    <house-deal-item
      v-for="(item, index) in houseInfos"
      :key="index"
      :item="item"
    />
    <p v-if="!houseInfos.length">조회된 아파트가 없습니다.</p>
  </ul>
</template>

<script>
import { mapState } from "vuex";
import HouseDealItem from "@/components/houseDeal/child/HouseDealItem.vue";

const houseDealStore = "houseDealStore";

export default {
  components: { HouseDealItem },
  name: "HouseDealItems",
  computed: {
    ...mapState(houseDealStore, ["houseInfos"]),
  },
};
</script>

<style scoped>
.houseDeal-list {
  overflow-y: auto;
}
.houseDeal-list p {
  font-size: var(--font-small);
  padding-top: var(--size-large);
}

/* Media Query for below w640 */
@media screen and (max-width: 640px) {
  .houseDeal-list {
    padding: var(--size-large);
    padding-top: 0;
  }
}
</style>
