<template>
  <form class="review-form" @submit="onCreateHandler">
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
import FormButton from "@/components/buttons/FormButton.vue";

export default {
  components: { FormButton },
  name: "NewReviewForm",
  props: { onCreate: Function, onError: Function },
  data() {
    return {
      review: "",
    };
  },
  methods: {
    async onCreateHandler(e) {
      e.preventDefault();

      this.onCreate(this.review);
      this.review = "";
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
