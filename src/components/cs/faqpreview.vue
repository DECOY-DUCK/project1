<template>
  <div class="faq__pre">
    <ul>
      <li>
        <i class="far fa-lightbulb"></i><span>해피하우스의 주요기능</span>
      </li>
      <li><i class="far fa-bookmark"></i><span>해피하우스 운영정책</span></li>
      <li><i class="fas fa-book"></i><span>커뮤니티 가이드라인</span></li>
      <li>
        <i class="fas fa-question"></i><span>해피하우스의 뜻이 뭔가요</span>
      </li>
      <li><i class="far fa-address-book"></i><span>개인정보 및 보안</span></li>
      <li><i class="far fa-check-circle"></i><span>계정 도움말</span></li>
      <li><i class="fas fa-times"></i><span>이용 제재</span></li>
    </ul>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.faq__pre {
  display: flex;
  justify-content: center;
  align-items: center;
}
ul {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 80%;
  list-style: none;
  margin: 0;
  padding: 0;
}
li {
  border: 1px solid var(--color-light-grey);
  margin: 2rem 2rem 2rem 2rem;
  padding: 1rem 1rem 1rem 1rem;
  border-radius: calc(0.5 * var(--size-large));
  float: left;
}
li i {
  margin-right: 1rem;
}
</style>
