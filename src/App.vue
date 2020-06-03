<template>
  <div id="app">
    <b-navbar type="dark" variant="dark" sticky>
      <b-navbar-nav>
        <router-link to="/">
          <span class="navbar-brand mb-0 h1">Sweetbook</span>
        </router-link>

        <router-link
          v-if="this.$store.state.loggedIn"
          class="nav-link"
          to="/addrec"
        >
          <span>Добавить рецепт</span>
        </router-link>
      </b-navbar-nav>

      <b-navbar-nav class="ml-auto">
        <router-link
          v-if="!this.$store.state.loggedIn"
          class="nav-link"
          to="/signup"
        >
          <span>Вход</span>
        </router-link>

        <b-nav-item-dropdown
          v-if="this.$store.state.loggedIn"
          :text="
            this.$store.state.userInfo.firstName +
              ' ' +
              this.$store.state.userInfo.lastName
          "
          right
        >
          <b-dropdown-item href="#">Лич</b-dropdown-item>
          <b-dropdown-item href="#">Выход</b-dropdown-item>
        </b-nav-item-dropdown>
        <router-link class="nav-link" to="/signup">
          <span>zoo</span>
        </router-link>
      </b-navbar-nav>
    </b-navbar>
    <main class="container-fluid">
      <transition name="list">
        <router-view />
      </transition>
    </main>
  </div>
</template>

<script>
import { apiFriend } from "./apihelpers/apiFriend.js";
var api_Friend = new apiFriend("http://localhost:8070");

export default {
  data: () => ({}),

  methods: {
    async setUserInfo() {
      let userdata;
      let loggedIn = false;
      let userInfo = {
        username: null,
        firstName: null,
        lastName: null,
        moodMsg: null
      };

      userdata = await api_Friend.getUserInfo();
      if (userdata != null) {
        loggedIn = true;
        userInfo.username = userdata.username;
        userInfo.firstName = userdata.firstName;
        userInfo.lastName = userdata.lastName;
        userInfo.moodMsg = userdata.moodMsg;
        this.$store.commit("updateUserInfo", userInfo);
        this.$store.commit("updateLoggedIn", loggedIn);
      }
    }
  },

  created() {
    this.setUserInfo();
  }
};
</script>

<style>
.list-enter-active {
  transition: all 0.5s;
}
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateX(10px);
}
</style>
