<template>
  <div class="view-reviews">
    <h4>아파트 이야기 ({{ count }}개)</h4>
    <new-review-form :onCreate="onCreate" :onAlert="onAlert" />
    <ul class="reviews">
      <span v-if="!count">
        등록된 이야기가 없습니다. 아파트의 첫 이야기를 남겨주세요.
      </span>
      <review-card
        v-for="(review, index) in reviewData"
        :key="index"
        :review="review"
        :onUpdate="onUpdate"
        :onDelete="onDelete"
        :onAlert="onAlert"
        :isOwner="userNo === review.authorNo"
        :isLike="review.likeUsers.includes(userNo)"
      />
    </ul>
    <show-more-button
      :onClick="onShowMore"
      :text="`더보기 (+${restReviews})`"
      v-if="isShowMore"
    />
    <show-more-button :onClick="onHideMore" text="접기" v-if="isHideMore" />
    <alert-banner v-if="msg" :isAlert="isAlert" :text="msg" />
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
} from "@/api/houseReview.js";

import NewReviewForm from "@/components/houseDeal/child/NewReviewForm.vue";
import ReviewCard from "@/components/houseDeal/child/ReviewCard.vue";
import AlertBanner from "@/components/banner/AlertBanner.vue";
import ShowMoreButton from "@/components/buttons/ShowMoreButton.vue";

const REVIEW_SIZE = 5;
const accountsStore = "accountsStore";

export default {
  components: { NewReviewForm, ReviewCard, AlertBanner, ShowMoreButton },
  name: "Reviews",
  data() {
    return {
      aptNo: "",
      reviews: [],
      count: 0,
      isAlert: false,
      msg: "",
      userNo: null,
      isLike: false,
      reviewIdx: REVIEW_SIZE,
    };
  },
  computed: {
    ...mapState(accountsStore, ["isLogin", "userInfo"]),
    reviewData() {
      return this.reviews.slice(0, this.reviewIdx);
    },
    restReviews() {
      return this.reviews.length - this.reviewIdx;
    },
    isShowMore() {
      return this.restReviews > 0;
    },
    isHideMore() {
      return this.reviews.length != REVIEW_SIZE && this.restReviews == 0;
    },
  },
  created() {
    this.aptNo = this.$route.params.aptNo;
    this.userNo = this.userInfo && this.userInfo.no;
    this.getReviews();
  },

  methods: {
    async getReviews() {
      if (!this.aptNo) return;

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
          authorNo: this.userNo,
          content,
        });

        if (result.msg === "success") {
          this.setReviewInfo(result);
          this.onSuccess("등록");
        } else {
          this.onError("등록");
        }
      } catch (e) {
        this.onError("등록");
      }
    },
    async onUpdate(no, content) {
      try {
        const result = await updateHouseReview({
          no,
          aptNo: this.aptNo,
          authorNo: this.userNo,
          content,
        });

        if (result.msg === "success") {
          this.setReviewInfo(result);
          this.onSuccess("수정");
        } else {
          this.onError("수정");
        }
      } catch (e) {
        this.onError("수정");
      }
    },
    async onDelete(no) {
      try {
        const result = await deleteHouseReview(no, this.aptNo);

        if (result.msg === "success") {
          this.setReviewInfo(result);
          this.onSuccess("삭제");
        } else {
          this.onError("삭제");
        }
      } catch (e) {
        console.error(e);
        this.onError("삭제");
      }
    },

    onAlert(msg, isAlert) {
      this.msg = msg;
      this.isAlert = isAlert;
      setTimeout(() => {
        this.msg = "";
        this.isAlert = false;
      }, 2000);
    },

    onSuccess(type) {
      this.onAlert(`${type} 완료!`, false);
    },
    onError(type) {
      this.onAlert(`${type}시 문제가 발생했습니다.`, true);
    },

    setReviewInfo(result) {
      this.reviews = result.list;
      this.count = result.count;
    },
    onShowMore() {
      if (!this.isLogin) {
        if (confirm("로그인이 필요한 기능입니다. 로그인 하시겠습니까?")) {
          this.$router.push({ name: "LogIn" });
        }
        return;
      }

      this.reviewIdx =
        this.restReviews < REVIEW_SIZE
          ? this.reviews.length
          : this.reviewIdx + REVIEW_SIZE;
    },
    onHideMore() {
      this.initShowMore();
    },
    initShowMore() {
      this.reviewIdx = REVIEW_SIZE;
    },
  },
};
</script>

<style scoped>
.view-reviews {
  width: 100%;
  border-radius: var(--size-micro);
  /* background-color: var(--color-white); */
  padding: var(--size-large) var(--size-regular);
}

.reviews {
  margin: var(--size-large) 0;
}

.reviews span {
  display: block;
  text-align: center;
}

.show-more-button {
  margin: var(--size-regular) auto;
  display: block;
  text-align: center;
}

.show-more-button:hover {
  color: var(--color-dark-grey);
  animation: up-down 1500ms linear 3;
}

@keyframes up-down {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(var(--size-micro));
  }
}
</style>
