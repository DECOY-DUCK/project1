<template>
  <header id="home-header">
    <img src="@/assets/images/home_cover.png" alt="main cover image" />
    <div class="contents">
      <h1>HappyHouse</h1>
      <p>원하시는 지역의 아파트 실거래가 정보를 찾아보세요</p>
      <div class="selector">
        <region-selector />
      </div>
    </div>
  </header>
</template>

<script>
import RegionSelector from "@/components/houseDeal/child/RegionSelector.vue";

export default {
  name: "HomeHeader",
  components: {
    RegionSelector,
  },
};
</script>

<style scoped>
#home-header {
  position: relative;
}

#home-header img {
  width: 100%;
  height: 35rem;
  object-fit: cover;
  filter: brightness(0.6);
}

.contents {
  position: absolute;
  top: 36%;
  left: 12.5%;
}
.contents h1 {
  font-family: "Crimson Text", serif;
}

.contents h1,
.contents p {
  color: var(--color-white);
}

.selector {
  margin-top: calc(var(--size-large) * 2);
  border-radius: var(--size-micro);
  background-color: var(--color-white);
}
</style>
