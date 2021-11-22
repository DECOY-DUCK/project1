// style은 scoped로 작성해주세요! // 색상이나 폰트 크기 등은
assets/css/common.js에 있는 변수 활용 부탁드립니다! // 사용 예시 - span { color:
var(--color-black); }
<template>
  <div class="body-container">
    <router-view />
  </div>
</template>

<script>
export default {};
</script>

<style>
@import "../assets/css/account.css";
</style>
