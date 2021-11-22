<template>
  <div class="admin__page">
    <h2>관리자 페이지</h2>
    <div>
      <router-link to="#"
        ><i class="fas fa-users"></i>회원관리페이지</router-link
      >
    </div>
    <div>
      <router-link to="#"
        ><i class="fas fa-headset"></i>고객센터 바로가기</router-link
      >
    </div>
    <div>
      <router-link to="/notice/write"
        ><i class="fas fa-bullhorn"></i> 공지사항 작성</router-link
      >
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
admin__page {
  display: flex;
  flex-direction: column;
}
</style>
