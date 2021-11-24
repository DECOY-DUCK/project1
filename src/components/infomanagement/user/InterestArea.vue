<template>
  <div class="interestarea">
    <header class="admin-header">
      <p>관심등록 리스트</p>
    </header>
    <div class="interest__main">
      <table>
        <tHead>
          <tr>
            <th>시/도</th>
            <th>구/군</th>
            <th>동</th>
            <th>등록일</th>
            <th>삭제</th>
          </tr>
        </tHead>
        <tBody>
          <tr v-if="this.interestlist === null">
            <td Colspan="5">
              <div class="interest__empty">등록된 관심지역이 없습니다.</div>
            </td>
          </tr>
          <tr v-else>
            <td>1</td>
            <td>2</td>
            <td>3</td>
            <td>4</td>
            <td><button>삭제</button></td>
          </tr>
        </tBody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      interestlist: null,
    };
  },
};
</script>

<style scoped>
.admin-header {
  position: relative;
  padding-top: 5rem;
  text-align: center;
}

table {
  border-collapse: collapse;
  margin: auto;
  text-align: center;
}

th {
  color: var(--color-dark-grey);
  padding: 1rem;
  border-bottom: 1px solid var(--color-dark-grey);
}
.interest__empty {
  margin: 6rem;
  color: var(--color-grey);
}
.interest__main {
  min-height: 90%;
  max-width: var(--display-maxWidth);
  margin: 0 auto;
  padding: 4rem var(--size-large) 5rem;
  text-align: center;
}
</style>
