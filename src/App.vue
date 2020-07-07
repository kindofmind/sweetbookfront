<template>
  <div id="app">
    <b-navbar type="dark" variant="dark" sticky>
      <b-navbar-brand to="/">Sweetbook</b-navbar-brand>

      <b-navbar-nav>
        <b-nav-item v-if="this.$store.state.loggedIn" v-b-modal.addrecipe-modal
          >Добавить рецепт</b-nav-item
        >
      </b-navbar-nav>

      <b-navbar-nav class="ml-auto">
        <b-nav-item v-if="!this.$store.state.loggedIn" to="/signup"
          >Вход</b-nav-item
        >

        <b-nav-item-dropdown
          v-if="this.$store.state.loggedIn"
          :text="
            this.$store.state.userInfo.firstName +
              ' ' +
              this.$store.state.userInfo.lastName
          "
        >
          <b-dropdown-item @click="logout">Выход</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-navbar>
    <main class="container-fluid">
      <addrecipemodal />
      <transition name="list">
        <router-view />
      </transition>
    </main>
  </div>
</template>

<script>
import addrecipemodal from "./components/AddRecipeModal.vue";

export default {
  data: () => ({}),

  components: {
    addrecipemodal
  },

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

      userdata = await this.$getUserInfo();
      if (userdata != null) {
        loggedIn = true;
        userInfo.username = userdata.username;
        userInfo.firstName = userdata.firstName;
        userInfo.lastName = userdata.lastName;
        userInfo.moodMsg = userdata.moodMsg;
        this.$store.commit("updateUserInfo", userInfo);
        this.$store.commit("updateLoggedIn", loggedIn);
      }
    },

    resetuserdata() {
      this.$store.commit("updateUserInfo", null);
      this.$store.commit("updateLoggedIn", false);
    },

    async logout() {
      await this.$logout();
      this.resetuserdata();
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
