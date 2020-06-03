<template>
  <div>
    <b-form-input
      v-model="text"
      placeholder="Введите название, категорию, ингредиент или имя автора рецептика"
    ></b-form-input>
    <div class="text-center my-1">
      <b-form-radio-group
        v-if="results"
        id="btn-radios-1"
        v-model="selected"
        :options="options"
        buttons
        name="radios-btn-default"
      ></b-form-radio-group>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      results: false,
      selected: "allres",
      options: [
        { text: "по названию", value: "namesrch" },
        { text: "по категории", value: "catsrch" },
        { text: "по ингредиенту", value: "ingsrch" },
        { text: "по автору", value: "autsrch" },
        { text: "все результаты", value: "globsrch" }
      ],
      text: ""
    };
  },

  watch: {
    param: function() {
      this.results = !(this.param.mode == "page");
      this.selected = this.param.mode;
      this.text = this.results ? this.param.keyword : "";
    },
    immediate: true
  },

  computed: {
    param() {
      return {
        mode: this.$route.params.mode || "page",
        keyword: this.$route.params.keyword
      };
    }
  },

  methods: {
    findRecipes() {
      this.$router.go({ path: "/link/to/page" });
    }
  }
};
</script>
