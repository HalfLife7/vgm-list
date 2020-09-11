import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/css/tailwind.css";
import VuePlyr from "vue-plyr";

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");

Vue.use(VuePlyr, {
  plyr: {
    fullscreen: { enabled: true },
  },
  emit: ["ended"],
});
