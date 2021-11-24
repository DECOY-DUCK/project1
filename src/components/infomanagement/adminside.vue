<template>
  <section clas="admin__side">
    <ul>
      <router-link :to="{ name: 'Admin' }"><li>사용자 관리</li></router-link>
      <router-link :to="{ name: '' }"><li>사이트 정보</li></router-link>
      <router-link :to="{ name: '' }"><li>QnA</li></router-link>
      <router-link :to="{ name: 'NoticeWrite' }"><li>공지사항</li></router-link>
    </ul>
  </section>
</template>

<script>
export default {};
</script>

<style scoped>
.admin_side {
  margin-top: 20rem;
  display: flex;
  justify-content: right;
  align-items: center;
  width: 100%;
  height: 100%;
}
ul {
  display: flex;
  flex-direction: column;
  justify-content: right;
  align-items: center;
}
li {
  margin: 1rem;
  font-size: var(--font-large);
  color: var(--color-grey);
}
li:hover {
  cursor: pointer;
  color: var(--color-black);
}
</style>
