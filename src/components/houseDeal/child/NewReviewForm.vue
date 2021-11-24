<template>
  <form class="review-form" @submit="onSubmit">
    <textarea
      placeholder="아파트와 관련된 이야기를 남겨주세요 (100자 이하)"
      v-model="review"
      class="review-input"
      required
      maxlength="100"
      autoFocus
    ></textarea>

    <div class="buttons">
      <form-button
        type="submit"
        title="<span><i class='fas fa-pen'></i></span>"
      />
    </div>
  </form>
</template>

<script>
import { mapState } from "vuex";
import { postHouseReview } from "@/api/houseReview.js";
import FormButton from "@/components/buttons/FormButton.vue";

const accountsStore = "accountsStore";

export default {
  components: { FormButton },
  name: "NewReviewForm",
  props: { onError: Function },
  data() {
    return {
      review: "",
      aptNo: 0,
      authorNo: 0,
    };
  },
  computed: {
    ...mapState(accountsStore, ["userInfo"]),
  },
  created() {
    this.aptNo = this.$route.params.aptNo;
    this.authorNo = this.userInfo.no;
  },
  methods: {
    async onSubmit(e) {
      e.preventDefault();

      try {
        const result = await postHouseReview({
          aptNo: this.aptNo,
          authorNo: this.authorNo,
          content: this.review,
        });
        if (result === "success") {
          this.content = "";
          alert("등록 성공했습니다.");
        } else {
          this.onError("등록시 문제가 발생했습니다.");
        }
      } catch (e) {
        this.onError(e);
      }
    },
  },
};
</script>

<style scoped>
.review-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--color-light-grey);
  border-radius: var(--size-micro);
  margin: var(--size-large) 0 var(--size-small);
  padding: var(--size-small);
}

.review-input {
  resize: none;
  height: 4rem;
}

.buttons {
  text-align: right;
}

.button {
  border: none;
  color: var(--color-dark-grey);
  background: none;
  transition: all 150ms linear;
}

.button:hover {
  background: none;
  transform: scale(1.08);
}
</style>
