<template>
  <button
    :class="[isOn ? onClass : offClass, button.onColor, 'on-off-button']"
    :title="button.title"
    @click="onClickHandler"
    v-if="button.title == '관심지역' ? isLogin : true"
  >
    <span v-html="button.icon"></span>
    <span class="button__text">{{
      button.title == "관심지역" ? "" : button.title
    }}</span>
  </button>
</template>

<script>
import { mapState } from "vuex";

const accountsStore = "accountsStore";

export default {
  name: "OnOffButton",
  props: {
    button: {
      title: String,
      icon: String,
      onColor: String,
      onHandler: Function,
      offHandler: Function,
    },
    isSaved: Boolean,
  },
  data() {
    return {
      isOn: false,
      onClass: "button__on",
      offClass: "button__off",
    };
  },

  created() {
    if (this.button.title !== "관심지역") return;
    this.isOn = this.isSaved;
  },

  watch: {
    isSaved() {
      if (this.button.title !== "관심지역") return;
      this.isOn = this.isSaved;
    },
  },
  computed: {
    ...mapState(accountsStore, ["isLogin", "userInfo"]),
  },
  methods: {
    async onClickHandler() {
      if (this.isOn) {
        this.button.offHandler();
        this.isOn = !this.isOn;
      } else {
        const result = await this.button.onHandler();
        if (!result) return;
        this.isOn = !this.isOn;
      }
    },
  },
};
</script>

<style scoped>
.on-off-button span {
  line-height: var(--font-large);
  padding-left: 0.125rem;
}

.on-off-button i {
  font-size: var(--font-medium);
  color: var(--color-grey);
}

.on-off-button:hover span {
  font-weight: var(--weight-semi-bold);
}

.on-off-button:hover * {
  cursor: pointer;
}

.button__on.button__blue * {
  color: var(--color-blue);
}

.button__on.button__red * {
  color: var(--color-red);
}

/* Media Query for below w640 */
@media screen and (max-width: 640px) {
  .button__text {
    display: none;
  }

  .on-off-buttons {
    display: flex;
    align-items: center;
  }
}
</style>
<style>
.button__on * {
  font-weight: var(--weight-bold);
}

.button__off i {
  opacity: 0.75;
}
</style>
