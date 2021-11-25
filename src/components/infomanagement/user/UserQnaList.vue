<template>
  <div class="interestarea">
    <header class="admin-header">
      <p>QnA 내역</p>
    </header>
    <div class="interest__main">
      <table>
        <tHead>
          <tr>
            <th>글번호</th>
            <th>유형</th>
            <th>제목</th>
            <th>작성일</th>
            <th>답변</th>
            <th>삭제</th>
          </tr>
        </tHead>
        <tBody>
          <tr v-if="userQnaList.length == 0">
            <td Colspan="6">
              <div class="interest__empty">등록된 QnA가 없습니다.</div>
            </td>
          </tr>
          <tr v-else v-for="(list, index) in userQnaList" :key="index">
            <td>{{ list.no }}</td>
            <td>{{ list.category }}</td>
            <td>{{ list.title }}</td>
            <td>답변대기</td>
            <td>{{ list.createdAt }}</td>
            <td><button @click="confirm(list.no)">삭제</button></td>
          </tr>
        </tBody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import store from "@/store/index";
import { deleteQnA } from "@/api/qna";

const qnaStore = "qnaStore";
const accountsStore = "accountsStore";
export default {
  name: "UserQnAList",
  components: {},
  computed: {
    ...mapState(qnaStore, ["userQnaList"]),
    ...mapGetters(accountsStore, ["checkUserInfo"]),
  },
  methods: {
    ...mapActions(qnaStore, ["asyncQnaUserList"]),
    async confirm(no) {
      const result = await deleteQnA(no);
      if (result == "success") {
        alert("삭제되었습니다");
        this.asyncQnaUserList(no);
      } else {
        alert("문제발생");
      }
    },
  },
  created() {
    const no = this.checkUserInfo.no;
    this.asyncQnaUserList(no);
  },
  beforeRouteEnter(to, from, next) {
    if (store.getters["accountsStore/getResponse"] === "check") next();
    else {
      next(false);
    }
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
