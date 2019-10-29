<template>
  <main id="loadrecipe" class="container-fluid mt-2">
    <div class="container bg-transparent">
      {{ recipes }}
      <recipeitem v-for="recipeval in recipes" v-bind:key="recipeval.id" :recipe="recipeval" class="mb-2 border rounded" />
  </div>
  </main>
</template>

<script>
import recipeitem from '../components/RecipeItem.vue';
import axios from 'axios';

export default {
name: 'recipelist',
components: { 
  recipeitem,
   },
data : () => ({
  apiUrl : 'http://localhost:8070/recipe/all', 
  recipes : [],
}),
methods : {
  getRecipes() {
    axios.get(this.apiUrl).then(response => {this.recipes = response.data});
    
  },
},
created () {
 this.getRecipes();
},
}

</script>
