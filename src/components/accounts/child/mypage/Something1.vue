<template>
  <div class="accounts__container">
    <header class="accounts__header">
      <h2>{{ userInfo.email }}</h2>
    </header>
    <ul class="accounts__info">
      <li class="accounts__info__item">
        <span class="info__item__title">Email</span>
        <p class="info__item__contents"></p>
      </li>
      <li class="accounts__info__item">
        <span class="info__item__title">Name</span>
        <p class="info__item__contents">{{ userInfo.name }}</p>
      </li>
    </ul>
    <div class="accounts__info__btns">
      <router-link to="./modify" class="accounts__info__btn btn__edit"
        >Edit</router-link
      >
      <button
        class="accounts__info__btn btn__delete"
        type="button"
        @click="confirm"
      >
        Delete
      </button>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
