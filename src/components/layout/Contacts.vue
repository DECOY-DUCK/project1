<template>
  <footer class="container">
    <header class="header">
      <h3>Contact us</h3>
    </header>
    <ul class="items">
      <li class="item">
        <span class="icon">
          <b-icon icon="geo-fill"></b-icon>
        </span>
        <span>(SSAFY) 서울시 강남구 테헤란로 멀티스퀘어</span>
      </li>
      <li class="item">
        <span class="icon">
          <b-icon icon="telephone"></b-icon>
        </span>
        <span>1544-9001</span>
      </li>
      <li class="item">
        <span class="icon">
          <b-icon icon="envelope"></b-icon>
        </span>
        <span><a href="mailto:" target="__blank">admin@happyhouse.com</a></span>
      </li>
    </ul>
    <span class="description"> 2021 dohmoon - All rights reserved </span>
  </footer>
</template>

<script>
export default {
  name: "Contacts",
};
</script>

<style scoped>
.container {
  max-width: var(--display-maxWidth);
  margin: 0 auto;
  padding: var(--size-large);
}

.header {
  margin-bottom: var(--size-medium);
}

.items {
  margin-bottom: var(--size-large);
}

.item {
  margin-bottom: var(--size-small);
}

.item span {
  color: var(--color-black);
}

.icon {
  margin-right: var(--size-medium);
}
</style>
