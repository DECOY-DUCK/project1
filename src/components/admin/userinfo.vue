<template>
  <div class="userinfo-items">
    <ul v-for="(list, index) in alluserlist" :key="index">
      <li class="userinfo-item">
        <div><i class="fas fa-user-circle fa-5x"></i></div>
        <span>no.{{ list.no }}</span>
        <span>email : {{ list.email }}</span>
        <span>name : {{ list.name }}</span>
        <span>{{ list.authCode }}</span>
        <span>delete : {{ list.deleteDate }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";

const accountsStore = "accountsStore";

export default {
  computed: {
    ...mapState(accountsStore, ["alluserlist"]),
  },
};
</script>

<style scoped>
.userinfo-items {
  display: grid;
  gap: var(--size-regular);
  grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
}

.userinfo-items > span {
  grid-column: 1 / 5;
  padding: 22.5vh 0;
}
.userinfo-item {
  min-width: 12.5rem;
  position: relative;
  background-color: var(--color-white);
  border-radius: var(--size-micro);
  display: flex;
  flex-direction: column;
  border: 1px solid var(--color-light-grey);
  transition: all 200ms cubic-bezier(0.25, 0.7, 0.25, 1);
}
.userinfo-item:hover {
  box-shadow: 0 35px 80px -20px rgba(0, 0, 0, 0.05),
    0 30px 60px -30px rgba(0, 0, 0, 0.15);
}
.userinfo-item > div {
  margin-top: 1rem;
  color: var(--color-light-grey);
}
</style>
