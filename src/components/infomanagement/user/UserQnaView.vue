<template>
  <section>
    <header class="admin-header">
      <p>QnA 내역</p>
    </header>
    <div class="qna-form">
      <label for="selected" class="required"
        >category
        <input
          disabled
          class="input"
          type="text"
          name="title"
          id="title"
          v-model="list.category"
        />
      </label>
      <div class="item">
        <label for="title" class="required">Title</label>
        <input
          disabled
          class="input"
          type="text"
          name="title"
          id="title"
          v-model="list.title"
        />
      </div>
      <div class="item">
        <label for="authorName" class="required">Author Name</label>
        <input
          class="input"
          type="text"
          name="authorName"
          id="authorName"
          readonly
          maxlength="50"
          v-model="list.authorName"
        />
      </div>
      <div class="item">
        <label for="content" class="required"></label>
        <textarea
          class="input"
          name="content"
          id="content"
          maxlength="4000"
          v-model="list.content"
        >
        </textarea>
      </div>

      <div class="buttons" v-if="this.list.replies.length == 0">
        <button class="button submit-button" @click="confirm">변경</button>
        <button class="button cancel-button" @click="moveList">Cancel</button>
      </div>
    </div>
  </section>
</template>

<script>
import { modifyQnA } from "@/api/qna";
import { mapState } from "vuex";
const qnaStore = "qnaStore";

export default {
  data() {
    return {
      num: "",
      list: null,
    };
  },
  computed: {
    ...mapState(qnaStore, ["userQnaList"]),
  },
  created() {
    this.num = this.$route.params.no;
    this.list = this.userQnaList[this.num];
  },
  methods: {
    moveList() {
      this.$router.go(-1);
    },
    async confirm() {
      const qna = {
        category: this.list.category,
        no: this.list.no,
        authorName: this.list.authorNo,
        authorNo: this.list.authorNo,
        title: this.list.title,
        content: this.list.content,
      };

      try {
        const result = await modifyQnA(this.list.no, qna);
        let msg = "처리시 문제가 발생했습니다.";
        if (result === "success") {
          msg = "수정이 완료되었습니다";
          alert(msg);
          this.$router.push({ name: "UserQnaList" });
        }
      } catch (e) {
        console.error(e);
      }
    },
  },
};
</script>

<style scoped>
.qna-form {
  max-width: 768px;
  margin-top: 5rem;
}

.info {
  display: block;
  text-align: right;
  margin-bottom: var(--size-regular);
}

.item {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
}

.item #content {
  resize: none;
  height: 20vh;
}

.input {
  width: 100%;
  margin-top: var(--size-small);
  margin-bottom: var(--size-medium);
  padding: var(--size-small);
  border: 1px solid var(--color-light-grey);
  border-radius: var(--size-micro);
}

.error {
  color: var(--color-red);
  font-weight: var(--weight-medium);
  transform: translateY(calc(-1 * var(--font-small)));
}

.buttons {
  display: flex;
  justify-content: space-between;
}

.button {
  width: 48.75%;
  padding: var(--size-regular) var(--size-medium);
}

.attach-error__container {
  transform: translateY(calc(-1 * var(--size-regular)));
}

.attach-error__container button:hover {
  color: var(--color-black);
}

.submit-button {
  color: var(--color-white);
  background-color: var(--color-dark-grey);
}

.cancel-button {
  color: var(--color-red);
  background-color: var(--color-white);
  border-color: var(--color-red);
}

.submit-button:hover {
  background-color: var(--color-black);
}

.cancel-button:hover {
  color: var(--color-white);
  background-color: var(--color-red);
}

.delete-button {
  position: absolute;
  right: 0;
  width: var(--font-regular);
  height: var(--font-regular);
  appearance: none;
  outline: none;
  box-shadow: none;
  background: center/contain no-repeat url("../../../assets/images/cancel.png")
    rgba(255, 255, 255, 0.9);
  margin: 0;
}

.delete-button:hover {
  cursor: pointer;
}
</style>
