<template>
  <div class="container-fluid mt-2">
    <div class="container bg-transparent">
      <div class="row justify-content-center">
        <h2 class="text-center">Вход</h2>
        <div class="input-group justify-content-center">
          <div>
            <b-alert v-if="loginalertcaused" show variant="dark">{{
              loginalertmessage
            }}</b-alert>

            <input
              v-model="username"
              ref="user"
              name="username"
              type="text"
              class="form-control my-1"
              placeholder="Логин"
              @keyup.enter="focuspass"
            />
            <input
              v-model="password"
              ref="password"
              name="password"
              type="password"
              class="form-control my-1"
              placeholder="Пароль"
              @keyup.enter="signin"
            />
            <button
              @click="signin"
              name="submit"
              value="submit"
              type="submit"
              class="btn btn-secondary"
            >
              Вход
            </button>
            <b-button
              v-b-modal.reg-modal
              variant="outline-secondary"
              class="mx-2"
              >Регистрация</b-button
            >
          </div>

          <b-modal
            id="reg-modal"
            cancel-title="Отмена"
            cancel-variant="outline-secondary"
            ok-variant="secondary"
            ok-title="Зарегистрироваться"
            @ok="registerUser"
            title="Регистрация"
          >
            <b-alert show variant="dark">{{ regerrorslist }}</b-alert>

            <form>
              <b-form-input
                v-model="regusername"
                class="form-control my-1"
                id="inputUsername"
                aria-describedby="usernameHelp"
                placeholder="Логин"
                minlength="4"
                maxlength="8"
              />

              <b-tooltip
                target="inputUsername"
                variant="dark"
                placement="left"
                title="Логин должен содержать от 4 до 8 символов: Минимум одну заглавную, прописную латинскую букву и цифру (A-Z, a-z, 0-9) пример: PepsiCo2"
              >
              </b-tooltip>

              <b-form-input
                v-model="regpassword"
                class="form-control my-1"
                id="inputPassword1"
                placeholder="Пароль"
                minlength="8"
                maxlength="12"
              />

              <b-tooltip
                target="inputPassword1"
                variant="dark"
                placement="right"
                title="Пароль должен содержать от 8 до 12 символов: Минимум одну заглавную, прописную латинскую букву, спец-символ и цифру (A-Z, a-z, !@#$%^&*, 0-9) пример: PepsiCo@2"
              ></b-tooltip>

              <input
                v-model="regfirstname"
                class="form-control my-1"
                id="inputFirstname"
                aria-describedby="firstnameHelp"
                placeholder="Имя"
                minlength="3"
              />

              <b-tooltip
                target="inputFirstname"
                variant="dark"
                placement="left"
                title="Имя должно содержать хотябы 3 символа пример: Б-г"
              ></b-tooltip>

              <input
                v-model="reglastname"
                class="form-control my-1"
                id="inputLastname"
                aria-describedby="lastnameHelp"
                placeholder="Фамилия"
              />
              <input
                v-model="regmoodmsg"
                class="form-control my-1"
                id="inputMood"
                aria-describedby="moodHelp"
                placeholder="Статус / Настроение / bio"
              />
            </form>
          </b-modal>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { apiFriend } from "../apihelpers/apiFriend.js";
var api_Friend = new apiFriend("http://localhost:8070");

export default {
  data: () => ({
    //LOGIN SECTION
    username: "",
    password: "",
    loginalertmessage: "",
    loginalertcaused: false,
    result: false,

    // REGISTER DATA SECTION
    regusername: "",
    regpassword: "",
    regfirstname: "",
    reglastname: "",
    regmoodmsg: "",
    userdatacorrect: false,
    regerrorslist: []
  }),
  methods: {
    // LOGIN METHODS SECTION
        focuspass() {
      this.$refs.password.focus();
    },

    focususer() {
      this.$refs.user.focus();
    },

    showalert(msg) {
      this.loginalertmessage = msg;
      this.loginalertcaused = true;
    },

    async signin() {
      this.loginalertcaused = false;
      if (this.username == "" || this.password == "") {
        this.showalert("Заполните все поля");
        this.focususer();
      } else {
        this.result = await api_Friend.signIn(this.username, this.password);
        if (this.result) {
          this.setUserInfo();
          this.loginalertmessage = "";
          this.loginalertcaused = "";
          this.$router.push({ path: "/" });
        } else {
          this.showalert("Неверные данные");
          this.focususer();
        }
      }
    },

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
    },

    // REGISTER METHODS SECTION
    async registerUser() {
      await this.checkUserData();
      if (this.userdatacorrect) {
        let userData = {
          username: this.regusername,
          password: this.regpassword,
          firstName: this.regfirstname,
          lastName: this.reglastname,
          moodMsg: this.regmoodmsg
        };
        await api_Friend.registerUser(userData);
      }
    },

    async checkUserData() {
      let usernamePattern = new RegExp(
        "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{4,8}$"
      );
      let passwordPattern = new RegExp(
        "^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,12}$"
      );
      this.regerrorslist = [];
      let isUsernameFree = await api_Friend.checkUserNameFree(this.regusername);
      let isPasswordCorrect = passwordPattern.test(this.regpassword);
      let isUsernameCorrect = usernamePattern.test(this.regusername);
      let isFirstNameExists = this.regfirstname.length > 0;
      if (!isUsernameFree)
        this.regerrorslist.push("Данный логин занят, попробуйте другой");
      if (!isUsernameCorrect)
        this.regerrorslist.push("Формат логина не соответствует требованиям");
      if (!isPasswordCorrect)
        this.regerrorslist.push("Формат пароля не соответствует требованиям");
      if (!isFirstNameExists)
        this.regerrorslist.push("Введите ваше имя ради всего святого!");
      this.userdatacorrect =
        isUsernameFree &&
        isPasswordCorrect &&
        isUsernameCorrect &&
        isFirstNameExists;
    }
  },

  mounted() {
    //   this.focususer();
  }
};
</script>

<style></style>
