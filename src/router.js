import Vue from "vue";
import Router from "vue-router";
// import addRecipe from "./view/addRecipe.vue";
import recipeList from "./view/recipeList.vue";
import loginPage from "./view/loginPage.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
   // {
   //   path: "/addrec",
   //   name: "addList",
   //   component: addRecipe
   // },
    {
      path: "/signup",
      name: "loginPage",
      component: loginPage
    },
    {
      path: "/:mode?/:keyword?/:page?",
      name: "searchList",
      component: recipeList,
      props: true
    }
  ]
});
