<template>
  <section class="custmer__Service">
    <div class="header">
      <header>
        <h1>무엇을</h1>
        <h1>도와드릴까요?</h1>
      </header>

      <div class="search__box">
        <i class="fas fa-search"></i>
        <input type="text" />
      </div>
    </div>
    <div class="qna__section">
      <div class="qna__head">
        <h1>QnA</h1>
        <i class="fas fa-chevron-right fa-2x"></i>
        <span>전체보기</span>
      </div>
      <qna-preview />
    </div>
    <div class="faq__section">
      <div class="faq__head">
        <h1>자주 묻는 질문</h1>
        <i class="fas fa-chevron-right fa-2x"></i>
        <span>전체보기</span>
      </div>
      <faq-preview />
    </div>
  </section>
</template>

<script>
import FaqPreview from "@/components/cs/faqpreview.vue";
import QnaPreview from "@/components/cs/qnapreview.vue";

export default {
  components: {
    FaqPreview,
    QnaPreview,
  },
  name: "CS",
  mounted() {
    window.scrollTo(0, 0);
  },
};
</script>

<style scoped>
.custmer__Service {
  width: 100%;
  margin-top: 5%;
  display: grid;
  /* gap: 1rem; */
  justify-content: center;
  align-items: center;
  grid-template-rows: repeat(3, 1fr);
  grid-template-areas:
    "h h h h h h h"
    "f f f f f f f"
    "q q q q q q q";
}
.header {
  padding: 10rem 22.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  grid-area: h;
  background: var(--color-light-white);
}
.header h1 {
  display: inline;
}
.header h1:nth-child(1) {
  margin-right: 1rem;
  color: var(--color-green);
}
.faq__section {
  grid-area: f;
  display: flex;
  flex-direction: column;
}
.qna__section {
  grid-area: q;
  display: flex;
  flex-direction: column;
}
header {
  padding: 2rem;
}
.search__box {
  position: relative;
}
.search__box i {
  position: absolute;
  bottom: 3px;
  left: 280px;
  padding: 0.2rem;
  color: var(--color-grey);
}
.search__box i:hover {
  cursor: pointer;
}
.search__box input {
  height: 2rem;
  width: 20rem;
}
div h1 {
  display: inline;
}
div i {
  margin-left: 1rem;
}
div > span {
  margin-left: 1rem;
}
</style>
