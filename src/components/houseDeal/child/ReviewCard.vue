<template>
  <li class="review-card">
    <div class="info">
      <div class="author">
        <span class="author-icon">
          <b-icon icon="person-fill" />
        </span>
        <span>{{ review.authorName }} ({{ authorEmail }})</span>
        <span class="divider"> · </span>
        <span>{{ date }}</span>
      </div>
      <div class="more-button" v-if="isOwner">
        <button type="button" @click="onToggleOption">
          <i class="fas fa-ellipsis-v"></i>
        </button>
        <div class="more-options" v-if="isOptionOpen">
          <button type="button" @click="onOpenEditor">Edit</button>
          <button class="delete-button" type="button" @click="onDeleteHandler">
            Delete
          </button>
          <button type="button" @click="onCloseOption">Cancel</button>
        </div>
      </div>
    </div>
    <div class="content">
      <pre>{{ review.content }}</pre>
    </div>
    <div class="like-button">
      <!-- onOff 버튼 활용 -->
      <button type="button">
        <i class="far fa-heart"></i>
      </button>
    </div>
    <edit-review-form
      v-if="isEditing"
      :no="review.no"
      :content="review.content"
      :onSubmit="onUpdate"
      :onClose="onCloseEditor"
    />
  </li>
</template>

<script>
import { parseDate } from "@/utils/parse.js";
import EditReviewForm from "./EditReviewForm.vue";

export default {
  components: { EditReviewForm },
  name: "ReviewCard",
  props: {
    isOwner: Boolean,
    review: {
      no: Number,
      authorName: String,
      authorEmail: String,
      content: String,
      createdAt: String,
      modifiedAt: String,
    },
    onUpdate: Function,
    onDelete: Function,
  },
  data() {
    return {
      isEditing: false,
      isOptionOpen: false,
    };
  },

  computed: {
    authorEmail() {
      return this.review.authorEmail.split("@")[0];
    },
    date() {
      return this.review.modifiedAt
        ? `${parseDate(this.review.modifiedAt)} 수정됨`
        : parseDate(this.review.createdAt);
    },
  },

  methods: {
    onOpenEditor() {
      this.onCloseOption();
      this.isEditing = true;
    },
    onCloseEditor() {
      this.isEditing = false;
    },
    onToggleOption() {
      this.isOptionOpen = !this.isOptionOpen;
    },
    onCloseOption() {
      this.isOptionOpen = false;
    },
    onDeleteHandler() {
      if (confirm("정말 삭제하시겠습니까?")) {
        this.onDelete(this.review.no);
      }
      this.onCloseOption();
    },
  },
};
</script>

<style scoped>
.review-card {
  background-color: var(--color-back);
  padding: var(--size-regular);
}

.info {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.more-button {
  position: relative;
}

.more-options {
  position: absolute;
  left: var(--size-micro);
  border: 1px solid var(--color-light-grey);
  border-radius: var(--size-micro);
  background-color: var(--color-white);
  display: flex;
  flex-direction: column;
  box-shadow: 10px 10px 20px -10px rgba(0, 0, 0, 0.05),
    10px 10px 20px -10px rgba(0, 0, 0, 0.15);
}

.more-options::before {
  content: "";
  position: absolute;
  top: calc(var(--size-micro) * -1);
  left: var(--size-small);
  width: var(--size-micro);
  height: var(--size-micro);
  border-left: 1px solid var(--color-light-grey);
  border-top: 1px solid var(--color-light-grey);
  background-color: var(--color-white);
  transform: rotate(45deg);
}
.more-options button {
  margin: 0;
  padding: var(--size-micro) var(--size-regular);
  border-bottom: 1px solid var(--color-light-grey);
  color: var(--color-dark-grey);
}

.more-options button:last-child {
  border: none;
}

.more-options button:hover {
  background-color: var(--color-back);
}

.more-options .delete-button {
  color: var(--color-red);
}

.like-button {
  text-align: right;
}
</style>
