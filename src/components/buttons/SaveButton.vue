<template>
  <button
    :class="[
      button.isSaved ? onClass : offClass,
      button.onColor,
      'save-button',
    ]"
    :title="button.title"
    @click="onClickHandler"
  >
    <span v-html="button.icon"></span>
    <span class="button__text">{{ button.text }}</span>
  </button>
</template>

<script>
import { mapState } from "vuex";

const accountsStore = "accountsStore";

export default {
  name: "SaveButton",
  props: {
    button: {
      isSaved: Boolean,
      title: String,
      text: String,
      icon: String,
      onColor: String,
      onHandler: Function,
      offHandler: Function,
    },
  },
  data() {
    return {
      onClass: "button__on",
      offClass: "button__off",
    };
  },

  computed: {
    ...mapState(accountsStore, ["isLogin", "userInfo"]),
  },
  methods: {
    async onClickHandler() {
      if (!this.isLogin) {
        if (
          confirm(
            "로그인이 필요한 기능입니다. 로그인 페이지로 이동하시겠습니까?"
          )
        ) {
          this.$router.push({ name: "LogIn" });
        }
        return;
      }

      if (this.button.isSaved) {
        this.button.offHandler();
      } else {
        const result = await this.button.onHandler();
        if (!result) return;
      }
    },
  },
};
</script>

<style scoped>
.save-button span {
  line-height: var(--font-large);
  padding-left: 0.125rem;
}

.save-button i {
  font-size: var(--font-medium);
  color: var(--color-grey);
}

.save-button:hover i {
  font-weight: var(--weight-semi-bold);
}

.save-button:hover * {
  cursor: pointer;
}

.button__on i {
  font-weight: var(--weight-bold);
}

.button__off i {
  opacity: 0.75;
}

/* Media Query for below w640 */
@media screen and (max-width: 640px) {
  .button__text {
    display: none;
  }

  .save-buttons {
    display: flex;
    align-items: center;
  }
}
</style>
