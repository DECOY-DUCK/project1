<template>
  <ul class="houseDeal-list">
    <house-deal-main-item
      v-for="(item, index) in houseInfos"
      :key="index"
      :item="item"
    />
    <p v-if="!houseInfos.length">조회된 아파트가 없습니다.</p>
  </ul>
</template>

<script>
import { mapState } from "vuex";
import HouseDealMainItem from "@/components/houseDeal/child/HouseDealMainItem.vue";

const houseDealStore = "houseDealStore";

export default {
  components: { HouseDealMainItem },
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
