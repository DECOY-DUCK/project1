<template>
  <footer id="contacts">
    <div class="container">
      <header class="header">
        <h3>Contact us</h3>
      </header>
      <ul class="items">
        <li class="item">
          <span class="icon">
            <b-icon icon="geo-fill" />
          </span>
          <span>(SSAFY) 서울시 강남구 테헤란로 멀티스퀘어</span>
        </li>
        <li class="item">
          <span class="icon">
            <b-icon icon="telephone" />
          </span>
          <span>1544-9001</span>
        </li>
        <li class="item">
          <span class="icon">
            <b-icon icon="envelope" />
          </span>
          <span>
            <a href="mailto:" target="__blank">admin@happyhouse.com</a>
          </span>
        </li>
      </ul>
      <span class="description"> 2021 dohmoon - All rights reserved </span>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Contacts",
};
</script>

<style scoped>
#contacts {
  border-top: 1px solid var(--color-light-grey);
}

.container {
  width: 100%;
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

.cs-links {
  margin-top: var(--size-medium);
  display: flex;
}

.cs-link {
  display: flex;
  align-items: center;
  margin-right: var(--size-small);
  padding: var(--size-micro) var(--size-regular);
  background-color: var(--color-black);
  border-radius: 0.2rem;
}

.cs-link span {
  color: var(--color-white);
}

.cs-link i {
  margin-left: var(--size-small);
  font-size: var(--size-small);
}

.cs-link *:hover {
  cursor: pointer;
}

.cs-link:hover {
  transform: scale(1.02);
}
</style>
