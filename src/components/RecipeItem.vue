<template>
  <div class="px-2 py-2">
    <b-row>
      <b-col md="auto">
        <h2>{{ recipe.name }}</h2>
      </b-col>
      <b-col order="last" class="text-right">
        <h5>
          <b-badge
            :to="
              '/autsrch/' + recipe.user.firstName + ' ' + recipe.user.lastName
            "
            variant="dark"
            >{{ recipe.user.firstName + " " + recipe.user.lastName }}</b-badge
          >
        </h5>
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

    <!-- MODAL IS THERE!!!!!!!!!!!! -->

    <b-modal
      centered
      :id="'recipemodal' + recipe.id"
      size="lg"
      footer-bg-variant="light"
      header-bg-variant="light"
      @shown="getUsersLike"
    >
      <template slot="modal-header">
        <div class="w-100" inline>
          <b-button-close
            @click="$bvModal.hide('recipemodal' + recipe.id)"
          ></b-button-close>

          <h5 class="text-center">Просмотр рецепта</h5>
        </div>
      </template>
      <b-row>
        <b-col>
          <h3 class="text-black text-center">{{ recipe.name }}</h3>
          <h4 mx-0 class="text-muted text-center">{{ recipe.description }}</h4>
        </b-col>
      </b-row>
      <b-row>
        <b-col></b-col>
        <b-col md="auto">
          <hr />
          <h4 class="text-center">Блюдо из категорий</h4>
          <h5 class="text-center">
            <b-badge
              v-for="category in recipe.categories"
              :key="'cat' + category.id"
              variant="dark"
              class="mr-1"
              >{{ category.name }}</b-badge
            >
          </h5>
        </b-col>
        <b-col></b-col>
      </b-row>
      <b-row>
        <b-col></b-col>
        <b-col md="auto">
          <hr />
          <h4 class="text-center">Нам понадобятся</h4>
          <h5 class="text-center">
            <b-badge
              v-for="composition in recipe.compositions"
              :key="'comp' + composition.id"
              variant="dark"
              class="mr-1"
              >{{
                composition.ingredient.name + " - " + composition.count
              }}</b-badge
            >
          </h5>
        </b-col>
        <b-col></b-col>
      </b-row>
      <b-row>
        <b-col></b-col>
        <b-col md="auto">
          <hr />
          <h4 class="text-center">Алгоритм приготовления</h4>
          <p align="justify">{{ recipe.algorithm }}</p>
        </b-col>
        <b-col></b-col>
      </b-row>
      <template slot="modal-footer">
        <div class="w-100">
          <b-row align-v="center">
            <b-col>
              <h5>Рейтинг</h5>
              <b-form inline @change="setUsersLike">
                <b-form-checkbox
                  v-model="userslike"
                  :disabled="!this.$store.state.loggedIn"
                  value="-1"
                  button
                  button-variant="outline-dark"
                  unchecked-value="0"
                  size="sm"
                >
                  <b-icon icon="emoji-frown" font-scale="2"></b-icon>
                </b-form-checkbox>
                <h3>
                  <b-badge :variant="ratingvariant" class="mt-2 mx-1">
                    {{ recipe.sumRating }}
                  </b-badge>
                </h3>
                <b-form-checkbox
                  v-model="userslike"
                  :disabled="!this.$store.state.loggedIn"
                  button
                  button-variant="outline-dark"
                  value="1"
                  unchecked-value="0"
                  size="sm"
                >
                  <b-icon icon="emoji-laughing" font-scale="2"></b-icon>
                </b-form-checkbox>
              </b-form>
            </b-col>
            <b-col> <hr /> </b-col>
            <b-col order="last" class="text-right">
              <h5>Автор рецепта</h5>
              <h4>
                <b-badge variant="dark">{{
                  recipe.user.firstName + " " + recipe.user.lastName
                }}</b-badge>
              </h4>
            </b-col>
          </b-row>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "recipeitem",
  data: () => ({
    userslike: "",
    userrating: 0
  }),
  props: ["recipe"],

  computed: {
    rating: function() {
      return this.recipe.sumRating;
    },
    ratingvariant: function() {
      if (this.recipe.sumRating == 0) return "dark";
      else if (this.recipe.sumRating > 0) return "success";
      else return "danger";
    }
  },

  watch: {},

  methods: {
    async getUsersLike() {
      if (this.$store.state.loggedIn)
        this.userslike = await this.$getUsersLike(this.recipe.id);
    },
    async setUsersLike() {
      if (this.$store.state.loggedIn) {
        await this.$setUsersLike(this.recipe.id, this.userslike);
        this.recipe.sumRating = await this.$getRecipeRating(this.recipe.id);
      }
    }
  }
};
</script>
