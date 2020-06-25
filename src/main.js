import "@babel/polyfill";
import Vue from "vue";
import "./plugins/bootstrap-vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import apihelper from "./apihelpers/apihelper.js";

Vue.config.productionTip = false;
Vue.use(apihelper, "http://localhost:8070");

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
