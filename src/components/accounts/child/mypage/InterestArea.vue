<template>
  <div class="interestarea">
    <div class="header">
      <div>관심등록</div>
      <div><router-link to="/housedeal"> 등록하러 가기</router-link></div>
    </div>

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
        <tr v-if="interest == null">
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
</template>

<script>
export default {
  data() {
    return {
      interestlsit: [],
    };
  },
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  margin-left: 7rem;
  margin-right: 7rem;
}
.interestarea {
  width: 100%;
  height: 80%;
}
table {
  width: 80%;
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
</style>
