<template>
  <main class="houseDeal-body">
    <section class="body-text">
      <p class="body-title">{{ dongName }} 아파트 정보</p>
      <house-deal-main-items />
    </section>
    <section class="body-map">
      <house-deal-map :map="map" />
    </section>
  </main>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import HouseDealMap from "@/components/houseDeal/child/HouseDealMap.vue";
import HouseDealMainItems from "@/components/houseDeal/child/HouseDealMainItems.vue";

const houseDealStore = "houseDealStore";
export default {
  components: { HouseDealMap, HouseDealMainItems },
  name: "HouseDealMainBody",
  props: {
    map: Object,
  },
  computed: {
    ...mapState(houseDealStore, ["dongName"]),
  },
  created() {
    !this.dongName && this.clearHouseInfos();
  },

  methods: {
    ...mapMutations(houseDealStore, ["CLEAR_HOUSEINFO_LIST"]),
    clearHouseInfos() {
      this.CLEAR_HOUSEINFO_LIST();
    },
  },
};
</script>

<style scoped>
.houseDeal-body {
  flex: auto;
  width: 100%;
  max-width: var(--display-maxWidth);
  margin: 0 auto;
  padding: 0 var(--size-large);
  padding-top: 2.5rem;
  display: flex;
}

.body-text {
  flex-basis: 25%;
}

.body-list {
  height: 85vh;
  overflow-y: auto;
}

.body-title {
  margin: 0;
  padding-top: var(--size-large);
  font-weight: var(--weight-semi-bold);
}

.body-title::after {
  content: "";
  display: block;
  width: 100%;
  height: 1px;
  margin-top: var(--size-large);
  background-color: var(--color-light-grey);
}

.body-map {
  width: 100%;
}

/* Media Query for below w640 */
@media screen and (max-width: 640px) {
  .houseDeal-body {
    padding: var(--size-large) 0 0;
    flex-direction: column-reverse;
  }
  .body-text {
    flex: auto;
  }
  .body-title {
    padding: var(--size-large);
    border-bottom: 1px solid var(--color-light-grey);
  }
  .body-title::after {
    display: none;
  }
  .body-map {
    height: 300px;
  }
}
</style>
