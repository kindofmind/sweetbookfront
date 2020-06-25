<template>
  <b-container fluid>
    <div class="container bg-transparent mt-2">
      <searchbar />
    </div>
    <h2 class="text-center">{{ caption }}</h2>
    <div class="container bg-transparent">
      <transition-group name="list">
        <recipeitem
          v-for="recipe in recipes.recipes"
          v-bind:key="'rec' + recipe.id"
          :recipe="recipe"
          class="my-2 border rounded"
        />
      </transition-group>

      <div class="nav justify-content-center overflow-auto">
        <b-pagination-nav
          v-if="showbar"
          :link-gen="linkGen"
          :number-of-pages="recipes.pageNumber"
          :value="param.page"
          use-router
        ></b-pagination-nav>
      </div>
    </div>
  </b-container>
</template>

<script>
import searchbar from "./searchBar.vue";
import recipeitem from "../components/RecipeItem.vue";

export default {
  name: "searchList",

  components: {
    recipeitem,
    searchbar
  },

  data: () => ({
    recipes: [],
    caption: "Все рецепты"
  }),

  computed: {
    showbar: function() {
      return this.recipes.pageNumber > 1;
    },

    param() {
      return {
        page: this.$route.params.page || 1,
        mode: this.$route.params.mode || "page",
        keyword: this.$route.params.keyword
      };
    }
  },

  watch: {
    param: function() {
      window.scroll({
        top: 0,
        behavior: "smooth"
      });
      this.getRecipes();
    },
    immediate: true
  },

  methods: {
    linkGen(pageNum) {
      return pageNum === `/${this.param.mode}/${this.param.keyword}/1`
        ? "?"
        : `/${this.param.mode}/${this.param.keyword}/${pageNum}`;
    },

    async getRecipes() {
      switch (this.param.mode) {
        case "page":
          this.caption = "Все рецепты";
          this.recipes = await this.$getPage(this.param.page - 1);
          break;

        case "globsrch":
          this.caption = `Глобальный поиск "${this.param.keyword}"`;
          this.recipes = await this.$getGlobalSrchPage(
            this.param.keyword,
            this.param.page - 1
          );
          break;

        case "namesrch":
          this.caption = `Поиск по названию "${this.param.keyword}"`;
          this.recipes = await this.$getNameSrchPage(
            this.param.keyword,
            this.param.page - 1
          );
          break;
        case "catsrch":
          this.caption = `Поиск по категории "${this.param.keyword}"`;
          this.recipes = await this.$getCatSrchPage(
            this.param.keyword,
            this.param.page - 1
          );
          break;
        case "ingsrch":
          this.caption = `Поиск по ингредиенту "${this.param.keyword}"`;
          this.recipes = await this.$getIngSrchPage(
            this.param.keyword,
            this.param.page - 1
          );
          break;
        case "autsrch":
          this.caption = `Поиск по автору "${this.param.keyword}"`;
          this.recipes = await this.$getUsrSrchPage(
            this.param.keyword,
            this.param.page - 1
          );
          break;
      }
    }
  },

  mounted() {
    this.getRecipes();
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
