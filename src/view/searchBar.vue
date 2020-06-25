<template>
  <div>
    <b-input-group>
      <b-form-input
        v-model="text"
        placeholder="Введите название, категорию, ингредиент или имя автора рецептика"
        @keyup.enter="findRecipes"
      ></b-form-input>
      <b-input-group-append>
        <b-button v-if="showbuttons" variant="dark" @click="resetSearch"
          >Сброс</b-button
        >
      </b-input-group-append>
    </b-input-group>
    <div class="text-center my-1">
      <b-form-radio-group
        v-if="showbuttons"
        id="btn-radios-1"
        v-model="selectedmode"
        :options="options"
        buttons
        name="radios-btn-default"
        @input="findRecipes"
      ></b-form-radio-group>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: "",
      showbuttons: false,
      selectedmode: "globsrch",
      options: [
        { text: "глобальный поиск", value: "globsrch" },
        { text: "по названию", value: "namesrch" },
        { text: "по категории", value: "catsrch" },
        { text: "по ингредиенту", value: "ingsrch" },
        { text: "по автору", value: "autsrch" }
      ]
    };
  },

  computed: {
    param() {
      return {
        mode: this.$route.params.mode || "globsrch",
        keyword: this.$route.params.keyword || ""
      };
    }
  },

  watch: {
    text: function() {
      this.showbuttons = this.text.length > 0;
    },
    param: function() {
      this.selectedmode = this.param.mode == "page" ? "" : this.param.mode;
      this.text = this.param.mode == "page" ? "" : this.param.keyword;
    },
    immediate: true
  },

  methods: {
    findRecipes() {
      if (this.showbuttons)
        this.$router
          .push({ path: `/${this.selectedmode}/${this.text}` })
          .catch(err => {});
    },

    resetSearch() {
      this.text = "";
      this.showbuttons = false;
      this.$router.push({ path: "/" }).catch(err => {});
    }
  }
};
</script>
