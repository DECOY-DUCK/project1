<template>
  <section class="view-community">
    <reviews />
  </section>
</template>

<script>
import { mapState } from "vuex";

import Reviews from "@/components/houseDeal/child/Reviews.vue";

const accountsStore = "accountsStore";

export default {
  components: { Reviews },
  name: "HouseDealViewCommunity",
  computed: {
    ...mapState(accountsStore, ["isLogin", "userInfo"]),
  },
};
</script>

<style scoped>
.view-community {
  margin: var(--size-large) 0;
}
</style>
