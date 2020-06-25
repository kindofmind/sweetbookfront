<template>
  <div class="px-2 py-1">
    <div class="row">
      <div class="col-md-auto">
        <h2 class="h2">{{ recipe.name }}</h2>
      </div>
      <div class="col order-last text-right">
        <b-badge
          :to="'/autsrch/' + recipe.user.firstName + ' ' + recipe.user.lastName"
          variant="dark"
          >{{ recipe.user.firstName + " " + recipe.user.lastName }}</b-badge
        >
      </div>
    </div>

    <p class="h3 text-muted mr-1">{{ recipe.description }}</p>
    <hr />
    <div class="row">
      <div class="col-md-auto">
        <h1 class="h4">Категории</h1>
        <p>
          <router-link
            :to="'/catsrch/' + category.name"
            v-for="category in recipe.categories"
            :key="'cat' + category.id"
            class="badge badge-secondary mr-1"
          >
            {{ category.name }}
          </router-link>
        </p>
      </div>
      <div class="col-md-auto">
        <h1 class="h4">Ингредиенты</h1>
        <p>
          <router-link
            :to="'/ingsrch/' + composition.ingredient.name"
            v-for="composition in recipe.compositions"
            :key="'comp' + composition.id"
            class="badge badge-dark mr-1"
            >{{ composition.ingredient.name }}
          </router-link>
        </p>
      </div>
    </div>
    <hr class="mt-n2" />
    <div class="row">
      <div class="col-md-auto">
        <a class="btn btn-secondary mr-1" href="#" role="button"
          >Читать рецепт</a
        >

        <button type="button" class="btn btn-dark">
          Рейтинг
          <span class="badge badge-light">{{ recipe.sumRating }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "recipeitem",
  props: ["recipe"]
};
</script>
