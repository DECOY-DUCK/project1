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
          <button type="button" @click="onCloseAll">Cancel</button>
        </div>
      </div>
    </div>
    <div class="content">
      <pre>{{ review.content }}</pre>
    </div>
    <div class="like-button">
      <save-button :button="button" v-if="!isOwner" />
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
import { mapState } from "vuex";
import { parseDate } from "@/utils/parse.js";
import {
  saveHouseReviewLike,
  deleteHouseReviewLike,
} from "@/api/houseReview.js";

import EditReviewForm from "@/components/houseDeal/child/EditReviewForm.vue";
import SaveButton from "@/components/buttons/SaveButton.vue";

const accountsStore = "accountsStore";

export default {
  components: { EditReviewForm, SaveButton },
  name: "ReviewCard",
  props: {
    isOwner: Boolean,
    isLike: Boolean,
    review: {
      no: Number,
      authorName: String,
      authorEmail: String,
      content: String,
      createdAt: String,
      modifiedAt: String,
      likeUsers: Array,
    },
    onUpdate: Function,
    onDelete: Function,
    onError: Function,
  },
  data() {
    return {
      isEditing: false,
      isOptionOpen: false,
      button: {
        title: "like",
        icon: '<i class="far fa-heart"></i>',
        onHandler: this.likeOnHandler,
        offHandler: this.likeOffHandler,
        isSaved: this.isLike,
        text: 0,
      },
      count: 0,
    };
  },
  mounted() {
    this.count = this.review.likeUsers.length;
    this.$set(this.button, "text", this.count);
  },
  computed: {
    ...mapState(accountsStore, ["userInfo"]),
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
    onCloseAll() {
      this.onCloseOption();
      this.onCloseEditor();
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

    async likeOnHandler() {
      try {
        const result = await saveHouseReviewLike(
          this.review.no,
          this.userInfo.no
        );
        console.log(result);

        if (result >= 0) {
          alert("좋아요 등록되었습니다.");
          this.$set(this.button, "isSaved", true);
          this.count = result;
          this.$set(this.button, "text", this.count);

          return true;
        }
        this.onError("처리 중 문제가 발생했습니다.");
        return false;
      } catch (e) {
        this.onError(e);
        return false;
      }
    },
    async likeOffHandler() {
      try {
        const result = await deleteHouseReviewLike(
          this.review.no,
          this.userInfo.no
        );
        console.log(result);
        if (result >= 0) {
          alert("좋아요 해제되었습니다.");
          this.$set(this.button, "isSaved", false);
          this.count = result;
          this.$set(this.button, "text", this.count);

          return true;
        }
        this.onError("처리 중 문제가 발생했습니다.");
        return false;
      } catch (e) {
        this.onError(e);
        return false;
      }
    },
  },
};
</script>

<style scoped>
.review-card {
  margin: var(--size-small) 0;
  padding: var(--size-regular);
  border-radius: var(--size-micro);
  background-color: var(--color-back);
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
  z-index: 99;
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

.content {
  padding: var(--size-regular);
}
</style>
