<template>
  <div class="view-reviews">
    <h4>아파트 이야기 ({{ count }}개)</h4>
    <new-review-form v-if="isLogin" :onCreate="onCreate" :onError="onError" />
    <ul class="reviews">
      <span v-if="!count"
        >등록된 이야기가 없습니다. 아파트의 첫 이야기를 남겨주세요.</span
      >
      <review-card
        v-for="(review, index) in reviews"
        :key="index"
        :review="review"
        :onUpdate="onUpdate"
        :onDelete="onDelete"
        :isOwner="userInfo.no === review.authorNo"
      />
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";
import {
  getHouseReviews,
  //getHouseReview,
  postHouseReview,
  updateHouseReview,
  deleteHouseReview,
  //saveHouseReviewLike,
  //deleteHouseReviewLike,
} from "@/api/houseReview.js";

import NewReviewForm from "@/components/houseDeal/child/NewReviewForm.vue";
import ReviewCard from "@/components/houseDeal/child/ReviewCard.vue";

const accountsStore = "accountsStore";

export default {
  components: { NewReviewForm, ReviewCard },
  name: "Reviews",
  data() {
    return {
      aptNo: "",
      reviews: [],
      count: 0,
      error: "",
      authorNo: 0,
    };
  },
  computed: {
    ...mapState(accountsStore, ["isLogin", "userInfo"]),
  },
  created() {
    this.aptNo = this.$route.params.aptNo;
    this.authorNo = this.userInfo.no;
    this.getReviews();
  },

  methods: {
    async getReviews() {
      try {
        const result = await getHouseReviews(this.aptNo);
        this.setReviewInfo(result);
      } catch (e) {
        console.error(e);
      }
    },
    async onCreate(content) {
      try {
        const result = await postHouseReview({
          aptNo: this.aptNo,
          authorNo: this.authorNo,
          content,
        });

        if (result.msg === "success") {
          this.setReviewInfo(result);
          alert("등록 성공했습니다.");
        } else {
          this.onError("등록시 문제가 발생했습니다.");
        }
      } catch (e) {
        this.onError(e);
      }
    },
    async onUpdate(no, content) {
      try {
        const result = await updateHouseReview({
          no,
          aptNo: this.aptNo,
          authorNo: this.authorNo,
          content,
        });

        if (result.msg === "success") {
          this.setReviewInfo(result);
          alert("수정 성공했습니다.");
        } else {
          this.onError("수정시 문제가 발생했습니다.");
        }
      } catch (e) {
        this.onError(e);
      }
    },
    async onDelete(no) {
      try {
        const result = await deleteHouseReview(no, this.aptNo);

        if (result.msg === "success") {
          this.setReviewInfo(result);
          alert("삭제 성공했습니다.");
        } else {
          this.onError("삭제시 문제가 발생했습니다.");
        }
      } catch (e) {
        console.error(e);
        this.onError(e);
      }
    },
    onError(e) {
      this.error = e;
      setTimeout(() => {
        this.error = "";
      }, 3000);
    },
    setReviewInfo(result) {
      this.reviews = result.list;
      this.count = result.count;
    },
  },
};
</script>

<style scoped>
.view-reviews {
  width: 100%;
  border-radius: var(--size-micro);
  background-color: var(--color-white);
  padding: var(--size-large) 0;
}

.reviews {
  margin: var(--size-large) 0;
}

.reviews span {
  display: block;
  text-align: center;
}
</style>
