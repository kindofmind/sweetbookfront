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
              minlength="4"
              maxlength="8"
            />
            <input
              v-model="password"
              ref="password"
              name="password"
              type="password"
              class="form-control my-1"
              placeholder="Пароль"
              @keyup.enter="signin"
              minlength="8"
              maxlength="12"
            />
            <button
              @click="signin"
              :disabled="disablelogin"
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
            :ok-disabled="disableregister"
            @ok="registerUser"
            @close="resetregdata"
            @cancel="resetregdata"
            title="Регистрация"
          >
            <div v-if="regerror">
              <b-alert
                variant="dark"
                show
                v-for="error in regerrorslist"
                :key="error.id"
                >{{ error }}</b-alert
              >
            </div>

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
    regerror: false,
    regerrorslist: []
  }),

  computed: {
    disablelogin: function() {
      return this.username.length < 4 || this.password.length < 8;
    },

    disableregister: function() {
      return (
        this.regusername.length < 4 ||
        this.regpassword.length < 8 ||
        this.regfirstname.length < 3
      );
    }
  },

  methods: {
    // LOGIN METHODS SECTION
    focuspass() {
      this.$refs.password.focus();
    },

    focususer() {
      this.$refs.user.focus();
    },

    showloginalert(msg) {
      this.loginalertmessage = msg;
      this.loginalertcaused = true;
    },

    hideloginalert() {
      this.loginalertmessage = "";
      this.loginalertcaused = false;
    },

    async signin() {
      this.hideloginalert;
      if (this.username == "" || this.password == "") {
        this.showalert("Заполните все поля");
        this.focususer();
      } else {
        this.result = await this.$signIn(this.username, this.password);
        if (this.result) {
          this.setUserInfo();
          this.$router.push({ path: "/" });
        } else {
          this.showloginalert("Неверные данные");
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

    // REGISTER METHODS SECTION
    async registerUser(bvModalEvt) {
      this.hideregerror();
      bvModalEvt.preventDefault();
      await this.checkUserData();
      if (!this.userdatacorrect) {
        this.showregerror();
      } else {
        let userData = {
          username: this.regusername,
          password: this.regpassword,
          firstName: this.regfirstname,
          lastName: this.reglastname,
          moodMsg: this.regmoodmsg
        };
        if (await this.$registerUser(userData)) {
          this.$bvModal.hide("reg-modal");
          this.$bvModal.msgBoxOk(`Добро пожаловать ${userData.firstName}`, {
            okVariant: "dark",
            okTitle: "Спасибо!",
            headerClass: "p-2 border-bottom-0",
            footerClass: "p-2 border-top-0",
            centered: true
          });
          this.resetregdata();
        }
      }
    },

    async checkUserData() {
      let usernamePattern = new RegExp(
        "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{4,8}$"
      );
      let passwordPattern = new RegExp(
        "^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,12}$"
      );
      this.hideregerror();
      let isUsernameFree = await this.$checkUserNameFree(this.regusername);
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
    },

    showregerror() {
      this.regerror = true;
    },

    hideregerror() {
      this.regerrorslist = [];
      this.regerror = false;
    },

    resetregdata() {
      this.regusername = "";
      this.regpassword = "";
      this.regfirstname = "";
      this.reglastname = "";
      this.regmoodmsg = "";
      this.userdatacorrect = false;
      this.regerror = false;
      this.regerrorslist = [];
    }
  },

  mounted() {
    //   this.focususer();
  }
};
</script>

<style></style>
