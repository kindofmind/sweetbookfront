<template>
  <div class="px-2 py-2">
    <b-row>
      <b-col md="auto">
        <h2>{{ recipe.name }}</h2>
      </b-col>
      <b-col order="last" class="text-right">
        <b-badge
          :to="'/autsrch/' + recipe.user.firstName + ' ' + recipe.user.lastName"
          variant="dark"
          >{{ recipe.user.firstName + " " + recipe.user.lastName }}</b-badge
        >
      </b-col>
    </b-row>

    <h3 class="text-muted">{{ recipe.description }}</h3>
    <hr />
    <b-row>
      <b-col md="auto">
        <h4>Категории</h4>
        <b-badge
          v-for="category in recipe.categories"
          :key="'cat' + category.id"
          :to="'/catsrch/' + category.name"
          variant="secondary"
          class="mr-1"
          >{{ category.name }}</b-badge
        >
      </b-col>
      <b-col md="auto">
        <h4>Ингредиенты</h4>
        <b-badge
          v-for="composition in recipe.compositions"
          :key="'comp' + composition.id"
          :to="'/ingsrch/' + composition.ingredient.name"
          variant="secondary"
          class="mr-1"
          >{{ composition.ingredient.name }}</b-badge
        >
      </b-col>
    </b-row>
    <hr class="mt-2" />
    <b-row>
      <b-col md="auto">
        <b-button
          v-b-modal="'recipemodal' + recipe.id"
          variant="secondary"
          class="mr-1"
          >Читать рецепт</b-button
        >

        <b-button variant="dark"
          >Рейтинг
          <b-badge variant="light">{{ recipe.sumRating }}</b-badge></b-button
        >
      </b-col>
    </b-row>
    <b-modal :id="'recipemodal' + recipe.id" size="lg" :title="recipe.name"
      >Hello Large Modal!</b-modal
    >
  </div>
</template>

<script>
export default {
  name: "recipeitem",
  props: ["recipe"]
};
</script>
