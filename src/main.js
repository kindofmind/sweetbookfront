import "@babel/polyfill";
import Vue from "vue";
import "./plugins/bootstrap-vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import apihelper from "./plugins/apihelper.js";

Vue.config.productionTip = false;
Vue.use(apihelper, "http://5.187.5.96:8070");

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
