import "@babel/polyfill";
import "mutationobserver-shim";
import Vue from "vue";
import "./plugins/bootstrap-vue";
import App from "./App.vue";
import router from "./router";
//import axios from "axios";

Vue.config.productionTip = false;

//Vue.prototype.$xios = axios;
//this.$xios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
