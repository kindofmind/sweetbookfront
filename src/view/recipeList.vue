<template>
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
        :link-gen="linkGen"
        :number-of-pages="recipes.pageNumber"
        :value="page"
        use-router
      ></b-pagination-nav>
    </div>
  </div>
</template>

<script>
import recipeitem from "../components/RecipeItem.vue";
import { apiFriend } from "../apihelpers/apiFriend.js";
import { Script } from "vm";
var api_Friend = new apiFriend("http://localhost:8070");

export default {
  name: "recipeList",

  components: {
    recipeitem
  },

  data: () => ({
    recipes: null
  }),

  computed: {
    page() {
      return this.$route.params.page || 1;
    }
  },

  watch: {
    page: function() {
      this.getRecipes();
      window.scroll({
        top: 0,
        behavior: "smooth"
      });
    }
  },

  methods: {
    linkGen(pageNum) {
      return pageNum === "/page/1" ? "?" : `/page/${pageNum}`;
    },

    async getRecipes() {
      this.recipes = await api_Friend.getPage(this.page - 1);
    }
  },

  mounted() {
    this.getRecipes();
  }
};
</script>

<style>
.list-enter-active {
  transition: all 1s;
}
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateX(10px);
}
</style>