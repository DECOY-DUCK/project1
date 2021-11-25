<template>
  <div class="interestarea">
    <header class="admin-header">
      <p>QnA</p>
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
          <tr v-if="AllQnaList.length == 0">
            <td Colspan="6">
              <div class="interest__empty">등록된 QnA가 없습니다.</div>
            </td>
          </tr>
          <tr v-else v-for="(list, index) in AllQnaList" :key="index">
            <td>{{ list.no }}</td>
            <td>{{ list.category }}</td>
            <td>
              <router-link
                :to="{ name: 'AdminQnaView', params: { no: index } }"
                >{{ list.title }}</router-link
              >
            </td>
            <td>{{ list.createdAt }}</td>
            <td>{{ list.replies.length }}</td>
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
  name: "AllQnaList",
  data() {
    return {};
  },
  computed: {
    ...mapState(qnaStore, ["AllQnaList"]),
    ...mapGetters(accountsStore, ["checkUserInfo"]),
  },
  methods: {
    ...mapActions(qnaStore, ["asyncQnaAllList"]),
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
    this.asyncQnaAllList();
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
