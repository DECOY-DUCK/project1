<template>
  <div class="admin__page">
    <h2>관리자 페이지</h2>
    <div>
      <router-link to="#"
        ><i class="fas fa-users fa-10x"></i><br />회원관리페이지</router-link
      >
    </div>
    <div>
      <router-link to="#"
        ><i class="fas fa-headset fa-10x"></i><br />
        고객센터 바로가기</router-link
      >
    </div>
    <div>
      <router-link to="/notice/write"
        ><i class="fas fa-bullhorn fa-10x"></i><br />
        공지사항 작성</router-link
      >
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped></style>
