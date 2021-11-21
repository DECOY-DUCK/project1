<template>
  <form class="notice-form" @submit="onSubmit">
    <span class="info">(*)은 필수입력 항목입니다.</span>
    <div class="item">
      <label for="title" class="required">Title</label>
      <input
        class="input"
        type="text"
        name="title"
        id="title"
        v-model="notice.title"
        placeholder="Enter a title (50 characters or less)"
        maxlength="50"
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
        v-model="notice.authorName"
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
        v-model="notice.content"
        placeholder="Enter your content (4000 characters or less)"
        maxlength="4000"
        @change="() => onDeleteError('content')"
      ></textarea>
      <span class="error" id="content-error">{{ error.content }}</span>
    </div>
    <div class="item">
      <label for="attach">Attached photo (up to 1 photo, 5mb)</label>
      <input
        class="input"
        type="file"
        name="attach"
        id="attach"
        ref="attach"
        accept="image/*"
        @change="onUploadAttach"
      />
      <span class="error" id="attach-error">{{ error.attach }}</span>
      <div id="image-preview" v-if="previewImg">
        <img :src="previewImg" />
        <button
          type="button"
          class="delete-button"
          @click="onDeleteAttach"
        ></button>
      </div>
    </div>

    <div class="buttons">
      <button type="submit" class="button submit-button">
        {{ type === "modify" ? "Modify" : "Register" }}
      </button>
      <button type="reset" class="button cancel-button">Cancel</button>
    </div>
  </form>
</template>

<script>
export default {
  name: "NoticeForm",
  props: {
    type: String,
    original: {
      no: Number,
      authorName: String,
      authorNo: Number,
      title: String,
      content: String,
      image: String,
    },
    onSubmitHandler: Function,
  },
  data() {
    return {
      notice: {
        no: 0,
        authorName: "",
        authorNo: "",
        title: "",
        content: "",
        image: "",
      },
      error: {
        title: "",
        content: "",
        attach: "",
      },
      previewImg: "",
    };
  },
  created() {},
  methods: {
    async onSubmit(e) {
      e.preventDefault();
      if (!this.notice.title) {
        this.error.title = "제목을 입력해 주세요.";
        this.scrollToError(document.querySelector("#title"));
        return;
      }
      if (!this.notice.content) {
        this.error.content = "내용을 입력해 주세요.";
        this.scrollToError(document.querySelector("#content"));
        return;
      }
      const fd = new FormData(e.target);
      fd.append("attach", this.notice.image);

      // 로그인 유저 처리방식에 따라 변경
      fd.append("authorNo", 0);

      try {
        const result = await this.onSubmitHandler(fd);
        console.log(result);
        let msg = "처리시 문제가 발생했습니다.";
        if (result === "success") {
          msg = "등록이 완료되었습니다.";
        }
        alert(msg);
        this.moveList();
      } catch (e) {
        console.error(e);
      }
    },
    onUploadAttach(e) {
      this.onDeleteError("attach");

      if (!e.target.files[0]) {
        this.onDeleteAttach();
        return;
      }

      const attach = e.target.files[0];
      const MAX_BYTES = 1024 * 1024 * 5;
      if (!attach.type.includes("image")) {
        this.error.attach = "이미지 파일만 첨부 가능합니다.";
        e.target.value = null;
        return;
      }

      console.log(attach.size);
      if (attach.size > MAX_BYTES) {
        this.error.attach = "업로드 가능한 최대 크기는 5mb입니다.";
        e.target.value = null;
        return;
      }
      this.notice.image = attach;
      const reader = new FileReader();
      reader.addEventListener("load", (e) => {
        this.previewImg = e.target.result;
      });
      reader.readAsDataURL(this.notice.image);
    },
    onDeleteAttach() {
      this.$refs.attach.value = null;
      this.notice.image = "";
      this.previewImg = "";
    },
    onDeleteError(type) {
      this.error[type] && (this.error[type] = "");
    },
    scrollToError(element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    },
    moveList() {
      this.$router.push({ name: "Notice" });
    },
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
  height: 50vh;
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
  border-radius: var(--size-micro);
  border: 1px solid var(--color-grey);
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

#image-preview {
  align-self: baseline;
  position: relative;
  margin-bottom: var(--size-medium);
  transform: translateY(calc(-1 * var(--size-small)));
}

#image-preview img {
  height: 7rem;
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
