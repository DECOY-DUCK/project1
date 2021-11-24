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
          <tr v-if="InterestAreaList.length == 0">
            <td Colspan="5">
              <div class="interest__empty">등록된 관심지역이 없습니다.</div>
            </td>
          </tr>
          <tr v-else v-for="(list, index) in InterestAreaList" :key="index">
            <td>{{ list.city }}</td>
            <td>{{ list.gugun }}</td>
            <td>{{ list.dong }}</td>
            <td>{{ list.createdAt }}</td>
            <td><button @click="confirm(index)">삭제</button></td>
          </tr>
        </tBody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

const interestStore = "interestStore";
const accountsStore = "accountsStore";

export default {
  components: {},
  computed: {
    ...mapGetters(interestStore, ["InterestAreaList"]),
    ...mapGetters(accountsStore, ["checkUserInfo"]),
  },
  methods: {
    ...mapActions(interestStore, ["asyncGetInterestAreas"]),
    ...mapActions(interestStore, ["asyncDeleteInterestArea"]),
    async confirm(num) {
      if (confirm(`${this.InterestAreaList[num].dong}을 삭제하시겠습니까?`)) {
        const no = this.checkUserInfo.no;
        const code = this.InterestAreaList[num].code;
        await this.asyncDeleteInterestArea({ no, code });
        this.asyncGetInterestAreas(no);
      }
    },
  },
  created() {
    const user = this.checkUserInfo.no;
    this.asyncGetInterestAreas(user);
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
