<template>
  <b-modal
    id="addrecipe-modal"
    centered
    size="lg"
    footer-bg-variant="light"
    header-bg-variant="light"
    @show="cleanForm()"
  >
    <template slot="modal-header">
      <div class="w-100">
        <b-button-close @click="closeModal()"></b-button-close>
        <h2 class="text-center">Добавить рецепт</h2>
      </div>
    </template>
    <!--Name and description row-->
    <b-row>
      <b-col>
        <b-input-group prepend="Название">
          <b-input
            v-model="recipeName"
            type="text"
            placeholder="Например: 'Торт Красный бархат'"
          />
        </b-input-group>
        <b-input-group class="mt-1" prepend="Описание">
          <b-input
            v-model="description"
            type="text"
            class="form-control"
            placeholder="Например: 'Бисквитный торт с крем-чиз и ягодной начинкой'"
          />
        </b-input-group>
      </b-col>
    </b-row>
    <!--End of Name and description row-->

    <!--Category row-->
    <b-row>
      <b-col class="mt-1">
        <b-input-group prepend="Категории">
          <b-input
            v-model="catKeyword"
            @keyup.enter="setCatData(catKeyword)"
            type="text"
            maxlength="30"
            placeholder="Например: 'Десерты'"
          />
          <b-button
            variant="secondary"
            @click="setCatData(catKeyword)"
            class="ml-1"
          >
            {{ labelCat }}
          </b-button>
          <b-input-group-append>
            <b-button
              v-for="cat in catFound"
              v-bind:key="cat.id"
              @click="setCatData(cat.name)"
              variant="outline-secondary"
            >
              {{ cat.name }}
            </b-button>
            <!--Cat live search results-->
          </b-input-group-append>
        </b-input-group>
        <b-input-group>
          <div
            class="mt-1 mr-1"
            v-for="(cat, index) in catSelected"
            v-bind:key="cat.id"
          >
            <b-button size="sm" variant="secondary" @click="setCatEdit(index)">
              <strong>{{ cat.name }}</strong>
            </b-button>
            <!--cat list-->
            <b-button-close @click="delCat(index)" />
          </div>
        </b-input-group>
      </b-col>
    </b-row>
    <!-- end of category row-->

    <!--Ingredient row-->
    <b-row>
      <b-col class="mt-1">
        <b-input-group prepend="Ингредиенты">
          <b-input
            v-model="ingKeyword"
            type="text"
            placeholder="Например: 'Мука'"
          />
          <b-input-group-append>
            <b-input-group prepend="Количество">
              <b-input
                v-model="ingCount"
                @keyup.enter="setIngData(ingKeyword, ingCount)"
                type="text"
                placeholder="Например: '350 грамм'"
              />
              <b-button
                variant="secondary"
                @click="setIngData(ingKeyword, ingCount)"
                class="ml-1"
              >
                {{ labelIng }}
              </b-button>
            </b-input-group>
          </b-input-group-append>
          <!--Ing live search-->
          <b-input-group-append>
            <b-button
              v-for="ing in ingFound"
              @click="useIngData(ing.name)"
              v-bind:key="ing.id"
              variant="outline-secondary"
            >
              {{ ing.name }}
            </b-button>
            <!--Ing live search results-->
          </b-input-group-append>
        </b-input-group>
        <b-input-group>
          <div
            class="mt-1 mr-1"
            v-for="(ingredient, index) in ingSelected"
            v-bind:key="ingredient.id"
          >
            <b-button size="sm" variant="secondary" @click="setIngEdit(index)">
              <strong>{{ ingredient.ingredient.name }} :</strong>
              {{ ingredient.count }}
            </b-button>
            <!--ingredient list-->
            <b-button-close @click="delIng(index)" />
          </div>
        </b-input-group>
      </b-col>
    </b-row>
    <!-- end of Ingredient row-->

    <!--Recipe row-->
    <b-row>
      <b-col class="mt-1">
        <b-input-group>
          <b-form-textarea
            v-model="algorithm"
            rows="7"
            placeholder="Подробно опишите алгоритм приготовления..."
          />
        </b-input-group>
      </b-col>
    </b-row>
    <!-- end of Recipe row-->

    <template slot="modal-footer">
      <div class="w-100">
        <!--Buttons row-->
        <b-row>
          <b-col>
            <b-input-group>
              <b-button variant="secondary" @click="saveRecipe()">
                Добавить рецепт
              </b-button>
              <b-button variant="outline-secondary" @click="cleanForm()">
                Очистить форму
              </b-button>
              <b-button variant="outline-secondary" @click="closeModal()">
                Закрыть
              </b-button>
            </b-input-group>
          </b-col>
        </b-row>
      </div>
    </template>
  </b-modal>
</template>

<script>
export default {
  name: "addRecipeModal",

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
    closeModal: function() {
      this.cleanForm();
      this.$bvModal.hide("addrecipe-modal");
    },

    /*Work with Categories*/

    getCatData: async function() {
      this.catFound = [];
      if (!this.editCat && this.catKeyword.length >= 3)
        this.catFound = await this.$getCategory(this.catKeyword);
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

    getIngData: async function() {
      this.ingFound = [];
      if (this.ingKeyword.length >= 3)
        this.ingFound = await this.$getIngredient(this.ingKeyword);
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

    saveRecipe: async function() {
      let recipe = {
        name: this.recipeName,
        description: this.description,
        algorithm: this.algorithm,
        categories: this.catSelected,
        compositions: this.ingSelected
      };
      await this.$saveRecipe(recipe);
    }
  }
};
</script>

<style></style>
