import Vue from "vue";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";
import { IconsPlugin } from "bootstrap-vue";
Vue.use(IconsPlugin);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
