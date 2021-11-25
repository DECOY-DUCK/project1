<template>
  <form class="notice-form" @submit="onSubmit">
    <span class="info">(*)은 필수입력 항목입니다.</span>
    <label for="selected" class="required">category</label>
    <div class="item">
      <select
        name="selected"
        id="selected"
        @change="() => onDeleteError('selected')"
        v-model="qnaform.category"
      >
        <option disabled value="">선택하기</option>
        <option value="서비스">서비스</option>
        <option value="계정">계정</option>
        <option value="이용방법">이용방법</option>
      </select>
      <span class="error" id="content-error">{{ error.selected }}</span>
      <label for="title" class="required">Title</label>
      <input
        class="input"
        type="text"
        name="title"
        id="title"
        v-model="qnaform.title"
        placeholder="Enter a title (30 characters or less)"
        maxlength="30"
        @change="() => onDeleteError('title')"
      />
      <span class="error" id="title-error">{{ error.title }}</span>
    </div>
    <div class="item">
      <label for="authorName" class="required">Author Name</label>
      <input
        class="input"
        type="text"
        name="authorName"
        id="authorName"
        v-model="qnaform.authorName"
        readonly
        maxlength="50"
      />
    </div>
    <div class="item">
      <label for="content" class="required">Content</label>
      <textarea
        class="input"
        name="content"
        id="content"
        v-model="qnaform.content"
        placeholder="Enter your content (4000 characters or less)"
        maxlength="4000"
        @change="() => onDeleteError('content')"
      ></textarea>
      <span class="error" id="content-error">{{ error.content }}</span>
    </div>

    <div class="buttons">
      <button type="submit" class="button submit-button">등록</button>
      <button type="reset" class="button cancel-button" @click="moveList">
        Cancel
      </button>

      <form-button type="reset" title="Cancel" :onClick="onCancel" />
    </div>
  </form>
</template>

<script>
import { mapState } from "vuex";

import store from "@/store/index";
import { createQans } from "@/api/qna";

const accountsStore = "accountsStore";

export default {
  name: "QnAWrite",
  data() {
    return {
      qnaform: {
        category: "",
        no: "",
        authorName: "",
        authorNo: "",
        title: "",
        content: "",
      },
      error: {
        title: "",
        content: "",
        category: "",
      },
    };
  },
  created() {
    this.qnaform.authorNo = this.userInfo.no;
    this.qnaform.authorName = this.userInfo.name;
  },
  computed: {
    ...mapState(accountsStore, ["userInfo"]),
  },
  methods: {
    async onSubmit(e) {
      e.preventDefault();
      if (this.error.title || this.error.content || this.error.category) {
        alert("필수 입력 사항을 작성해 주세요");
        return;
      }
      if (!this.qnaform.category) {
        this.error.content = "카테고리를 설정 주세요.";
        this.scrollToError(document.querySelector("#selected"));
        return;
      }

      if (!this.qnaform.title) {
        this.error.title = "제목을 입력해 주세요.";
        this.scrollToError(document.querySelector("#title"));
        return;
      }
      if (!this.qnaform.content) {
        this.error.content = "내용을 입력해 주세요.";
        this.scrollToError(document.querySelector("#content"));
        return;
      }
      try {
        const result = await createQans(this.qnaform);

        let msg = "처리시 문제가 발생했습니다.";

        if (result === "success") {
          msg = "등록이 완료되었습니다.";
        }
        alert(msg);
        this.$router.push({ name: "UserQnaList" });
      } catch (e) {
        console.error(e);
      }
    },
    onDeleteError(type) {
      this.error[type] && (this.error[type] = "");
    },
    scrollToError(element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    },
    moveList() {
      this.$router.go(-1);
    },
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
.notice-form {
  max-width: 768px;
  margin: var(--size-large) auto;
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

.required::after {
  position: absolute;
  content: "(*)";
  margin-left: var(--size-small);
  font-size: var(--font-small);
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
