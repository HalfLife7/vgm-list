import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/css/tailwind.css";
import VuePlyr from "vue-plyr";
import VueGoodTablePlugin from "vue-good-table";
import "vue-good-table/dist/vue-good-table.css";

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
Vue.config.devtools = true;
Vue.use(VuePlyr, {
  plyr: {
    fullscreen: { enabled: true },
  },
  emit: ["ended"],
});
Vue.use(VueGoodTablePlugin);
