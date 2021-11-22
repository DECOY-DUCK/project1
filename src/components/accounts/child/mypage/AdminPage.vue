<template>
  <div class="admin__page">
    <h2>관리자 페이지</h2>
    <div class="admin__cntnt">
      <div>
        <router-link :to="{ name: 'Admin' }"
          ><i class="fas fa-users fa-10x"></i><br />회원관리페이지</router-link
        >
      </div>
      <div>
        <router-link :to="{ name: qna }"
          ><i class="fas fa-headset fa-10x"></i><br />
          고객센터 바로가기</router-link
        >
      </div>
      <div>
        <router-link :to="{ name: 'NoticeWrite' }"
          ><i class="fas fa-bullhorn fa-10x"></i><br />
          공지사항 작성</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Admin",
};
</script>

<style scoped>
.admin__page {
  display: flex;
  text-align: center;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 2rem;
}
.admin__cntnt {
  display: flex;
  flex-direction: row;
  text-align: center;
  flex-wrap: wrap;
  gap: 5rem;
}
</style>
