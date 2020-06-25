<template>
  <div id="addrecipe" class="container-fluid mt-2">
    <h2 class="text-center">Добавить рецепт</h2>
    <div class="container bg-transparent">
      <!--Name and description row-->
      <div class="row border">
        <div class="input-group mx-1 my-1">
          <div class="input-group-prepend">
            <span class="input-group-text">Название</span>
          </div>
          <input
            v-model="recipeName"
            type="text"
            class="form-control"
            placeholder="Например: 'Торт Красный бархат'"
          />
        </div>

        <div class="input-group mx-1 my-1">
          <div class="input-group-prepend">
            <span class="input-group-text">Описание</span>
          </div>
          <input
            v-model="description"
            type="text"
            class="form-control"
            placeholder="Например: 'Бисквитный торт с крем-чиз и ягодной начинкой'"
          />
        </div>
      </div>
      <!--End of Name and description row-->

      <!--Category row-->
      <div class="row border mt-2">
        <div class="input-group mx-1 my-1">
          <span class="input-group-text">Категории</span>
          <input
            v-model="catKeyword"
            @keyup.enter="setCatData(catKeyword)"
            type="text"
            maxlength="30"
            class="form-control"
            placeholder="Например: 'Десерты'"
          />
          <div class="input-group-append">
            <button
              class="btn btn-outline-secondary"
              @click="setCatData(catKeyword)"
              type="button"
            >
              {{ labelCat }}
            </button>
          </div>
          <div>
            <button
              v-for="cat in catFound"
              v-bind:key="cat.id"
              @click="setCatData(cat.name)"
              type="button"
              class="btn btn-outline-secondary ml-1"
            >
              {{ cat.name }}
            </button>
            <!--Cat live search results-->
          </div>
        </div>

        <div class="input-group mx-1">
          <div
            class="mx-1"
            v-for="(cat, index) in catSelected"
            v-bind:key="cat.id"
          >
            <button class="border-0" @click="setCatEdit(index)">
              <strong>{{ cat.name }}</strong>
            </button>
            <!--cat list-->
            <button
              type="button"
              @click="delCat(index)"
              class="close"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        </div>
      </div>
      <!-- end of category row-->

      <!--Ingredient row-->
      <div class="row border mt-2">
        <div class="input-group mx-1 my-1">
          <div class="input-group-prepend">
            <span class="input-group-text">Ингредиенты</span>
          </div>
          <input
            v-model="ingKeyword"
            type="text"
            placeholder="Например: 'Мука'"
            class="form-control"
          />
          <div class="input-group-prepend">
            <span class="input-group-text">Количество</span>
          </div>
          <input
            v-model="ingCount"
            @keyup.enter="setIngData(ingKeyword, ingCount)"
            type="text"
            placeholder="Например: '350 грамм'"
            class="form-control"
          />
          <button
            class="btn btn-outline-secondary"
            @click="setIngData(ingKeyword, ingCount)"
            type="button"
          >
            {{ labelIng }}
          </button>

          <!--Ing live search-->
          <div>
            <button
              v-for="ing in ingFound"
              @click="useIngData(ing.name)"
              v-bind:key="ing.id"
              type="button"
              class="btn btn-outline-secondary ml-1"
            >
              {{ ing.name }}
            </button>
            <!--Ing live search results-->
          </div>
        </div>
        <div class="input-group mx-1">
          <div
            class="mx-1"
            v-for="(ingredient, index) in ingSelected"
            v-bind:key="ingredient.id"
          >
            <button class="border-0" @click="setIngEdit(index)">
              <strong>{{ ingredient.ingredient.name }} :</strong>
              {{ ingredient.count }}
            </button>
            <!--ingredient list-->
            <button
              type="button"
              @click="delIng(index)"
              class="close"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        </div>
      </div>
      <!-- end of Ingredient row-->

      <!--Recipe row-->
      <div class="row border mt-2">
        <div class="input-group mx-1 my-1">
          <textarea
            v-model="algorithm"
            class="form-control"
            rows="7"
            placeholder="Подробно опишите алгоритм приготовления..."
          ></textarea>
        </div>
      </div>
      <!-- end of Recipe row-->

      <!--Buttons row-->
      <div class="row border mt-2">
        <div>
          <div class="input-group mx-1 my-1">
            <button class="btn btn-secondary" type="button" @click="saveRecipe">
              Добавить рецепт
            </button>
            <button
              class="btn btn-outline-secondary ml-1"
              type="button"
              @click="cleanForm"
            >
              Очистить форму
            </button>
            <button
              class="btn btn-outline-secondary ml-1"
              type="button"
              @click="cleanForm"
            >
              Отменить
            </button>
          </div>
        </div>
        <div class="col"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    catKeyword: "",
    ingKeyword: "",
    ingCount: "",

    catFound: [],
    ingFound: [],

    editCat: false,
    editCatIndex: null,

    editIng: false,
    editIngIndex: null,

    labelCat: "Добавить",
    labelIng: "Добавить",

    recipeName: "",
    description: "",
    algorithm: "",
    catSelected: [],
    ingSelected: []
  }),
  watch: {
    catKeyword: function() {
      this.getCatCreatedData();
    },
    ingKeyword: function() {
      this.getIngCreatedData();
    }
  },

  created: function() {
    this.getCatCreatedData = this.getCatData;
    this.getIngCreatedData = this.getIngData;
  },

  methods: {
    /*Work with Categories*/

    getCatData: function() {
      this.catFound = [];
      if (!this.editCat && this.catKeyword.length >= 3)
        this.catFound = this.$getCategory(this.catKeyword);
    },

    setCatData: function(catItemName) {
      if (
        !this.editCat &&
        !this.catSelected.some(item => item.name === catItemName) &&
        catItemName != ""
      ) {
        this.catSelected.push({ name: catItemName });
      } else if (
        this.editCat &&
        !this.catSelected.some(item => item.name === catItemName)
      ) {
        this.catSelected[this.editCatIndex].name = catItemName;
      }
      this.editCat = false;
      this.labelCat = "Добавить";
      this.catKeyword = "";
    },

    setCatEdit: function(catId) {
      this.editCat = true;
      this.editCatIndex = catId;
      this.catKeyword = this.catSelected[catId].name;
      this.labelCat = "Обновить";
    },

    delCat: function(catId) {
      this.catSelected.splice(catId, 1);
    },

    /*Work with Ingredients (Compositions)  */

    getIngData: function() {
      this.ingFound = [];
      if (this.ingKeyword.length >= 3)
        this.ingFound = this.$getIngredient(this.ingKeyword);
    },

    useIngData: function(ingItemName) {
      if (!this.ingSelected.includes(ingItemName) && ingItemName != "") {
        this.ingKeyword = ingItemName;
      }
    },

    setIngData: function(ingName, ingCount) {
      if (
        !this.editIng &&
        !this.ingSelected.includes(ingName) &&
        ingName != ""
      ) {
        this.ingSelected.push({
          ingredient: { name: ingName },
          count: ingCount
        });
      } else if (this.editIng && !this.ingSelected.includes(ingName)) {
        this.ingSelected[this.editIngIndex].ingredient.name = ingName;
        this.ingSelected[this.editIngIndex].count = ingCount;
      }
      this.editIng = false;
      this.labelIng = "Добавить";
      this.ingKeyword = "";
      this.ingCount = "";
    },

    setIngEdit: function(ingId) {
      this.editIng = true;
      this.editIng = true;
      this.editIngIndex = ingId;
      this.ingKeyword = this.ingSelected[ingId].ingredient.name;
      this.ingCount = this.ingSelected[ingId].count;
      this.labelIng = "Обновить";
    },

    delIng: function(ingId) {
      this.ingSelected.splice(ingId, 1);
    },

    cleanForm: function() {
      this.recipeName = "";
      this.description = "";
      this.catKeyword = "";
      this.ingKeyword = "";
      this.ingCount = "";
      this.algorithm = "";
      this.catSelected = [];
      this.ingSelected = [];
    },

    saveRecipe: function() {
      let recipe = {
        name: this.recipeName,
        description: this.description,
        algorithm: this.algorithm,
        categories: this.catSelected,
        compositions: this.ingSelected
      };
      this.$saveRecipe(recipe);
    }
  }
};
</script>

<style></style>
