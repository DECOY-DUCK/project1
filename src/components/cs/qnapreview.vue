<template>
  <div class="qna__pre">
    <ul>
      <li>
        <i class="fas fa-lock-open fa-6x"></i>
        <span>계정</span>
      </li>
      <li>
        <i class="fas fa-concierge-bell fa-6x"></i>
        <span>서비스</span>
      </li>
      <li>
        <i class="fas fa-map-marker-alt fa-6x"></i>
        <span>시스템</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.qna__pre {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
ul {
  display: grid;
  text-align: center;
  grid-template-columns: repeat(3, 1fr);
  width: 80%;
  list-style: none;
  margin: 0;
  padding: 0;
}
li {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;

  border: 0;
  margin: 2rem 2rem 2rem 2rem;
  padding: 1rem 1rem 1rem 1rem;
  text-align: center;
  float: left;
  background-color: var(--color-light-white);
  border-radius: 1rem;
}
li i {
  color: var(--color-dark-grey);
  text-align: center;
}
li span {
  font-size: var(--font-medium);
  color: var(--color-dark-grey);
}
</style>
