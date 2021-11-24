<template>
  <section clas="user__side">
    <ul>
      <li>계정 설정</li>
      <li><router-link :to="{ name: 'Modify' }">회원 수정</router-link></li>
      <li>
        <router-link :to="{ name: 'AccountsDelete' }">회원 탈퇴</router-link>
      </li>
    </ul>
    <ul>
      <li>관심지역</li>
      <li>
        <router-link :to="{ name: 'InterestArea' }">관심지역리스트</router-link>
      </li>
    </ul>
    <ul>
      <li>고객 센터</li>
      <li>
        <router-link :to="{ name: 'QnAWrite' }"> 1:1 문의 작성</router-link>
      </li>
      <li>QnA 내역</li>
      <li>FAQ</li>
    </ul>
  </section>
</template>

<script>
export default {};
</script>

<style scoped>
.user__side {
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
li:nth-child(1) {
  margin: 1rem;
  font-size: var(--font-medium);
}
li:nth-child(n + 2) {
  color: var(--color-grey);
  margin: 1rem;
}
li:nth-child(n + 2):hover {
  cursor: pointer;
  color: var(--color-black);
}
</style>
