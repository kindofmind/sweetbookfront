import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loggedIn: false,
    userInfo: {
      username: null,
      firstName: null,
      lastName: null,
      moodMsg: null
    }
  },
  mutations: {
    updateUserInfo(state, newUserInfo) {
      state.userInfo = newUserInfo;
    },
    updateLoggedIn(state, newloggedIn) {
      state.loggedIn = newloggedIn;
    }
  },
  actions: {}
});
