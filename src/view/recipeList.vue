<template>
  <div class="container-fluid mt-2">
    <div class="container bg-transparent">
      <searchbar />
    </div>
    <h2 class="text-center">{{ caption }}</h2>
    <div class="container bg-transparent">
      <transition-group name="list">
        <recipeitem
          v-for="recipe in recipes.recipes"
          v-bind:key="recipe.id"
          :recipe="recipe"
          class="my-2 border rounded"
        />
      </transition-group>

      <div class="nav justify-content-center overflow-auto">
        <b-pagination-nav
          type="dark"
          :link-gen="linkGen"
          :number-of-pages="recipes.pageNumber"
          :value="param.page"
          use-router
        ></b-pagination-nav>
      </div>
    </div>
  </div>
</template>

<script>
import searchbar from "./searchBar.vue";
import recipeitem from "../components/RecipeItem.vue";
import { apiFriend } from "../apihelpers/apiFriend.js";
var api_Friend = new apiFriend("http://localhost:8070");

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
          this.recipes = await api_Friend.getPage(this.param.page - 1);
          break;
        case "catsrch":
          this.caption = `Поиск по категории "${this.param.keyword}"`;
          this.recipes = await api_Friend.getCatSrchPage(
            this.param.keyword,
            this.param.page - 1
          );
          break;
        case "ingsrch":
          this.caption = `Поиск по ингредиенту "${this.param.keyword}"`;
          this.recipes = await api_Friend.getIngSrchPage(
            this.param.keyword,
            this.param.page - 1
          );
          break;
        case "globsrch":
          this.recipes = await api_Friend.getRecSrchPage(
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
