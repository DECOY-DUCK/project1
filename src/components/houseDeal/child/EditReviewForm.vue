<template>
  <form class="edit-form" @submit="onSubmitHandler">
    <textarea
      placeholder="이야기를 수정해 주세요 (20자 이상 200자 이하)"
      v-model="review"
      class="edit-input"
      required
      maxlength="200"
      autoFocus
    ></textarea>

    <div class="buttons">
      <form-button
        type="reset"
        title="<span><i class='fas fa-times'></i></span>"
        :onClick="onClose"
      />

      <div class="util">
        <span class="length">{{ this.review.length }} / 200</span>
        <form-button
          type="submit"
          title="<span><i class='fas fa-pen'></i></span>"
        />
      </div>
    </div>
  </form>
</template>

<script>
import FormButton from "@/components/buttons/FormButton.vue";
export default {
  components: { FormButton },
  name: "EditReviewForm",
  props: {
    no: Number,
    content: String,
    onSubmit: Function,
    onClose: Function,
  },
  data() {
    return {
      review: "",
    };
  },
  created() {
    this.review = this.content;
  },
  methods: {
    onSubmitHandler(e) {
      e.preventDefault();

      this.onSubmit(this.no, this.review);
      this.onClose();
    },
  },
};
</script>

<style scoped>
.edit-form {
  width: 100%;
  display: flex;
  border: 1px solid var(--color-light-grey);
  border-radius: var(--size-micro);
  margin: var(--size-large) 0 var(--size-small);
  padding: var(--size-small);
  background-color: var(--color-white);
}

.edit-input {
  flex-basis: 95%;
  resize: none;
  height: 6rem;
}

.buttons {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
}

.util {
  position: relative;
  display: flex;
}

.length {
  position: absolute;
  right: 0;
  bottom: var(--size-micro);
  width: 5rem;
  font-size: var(--size-regular);
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
