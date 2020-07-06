import axios from "axios";

export default {
  install(Vue, options) {
    const apiUrl = options;

    Vue.prototype.$getPage = async function(pageNumber) {
      let url = `${apiUrl}/recipe/page/${pageNumber}`;
      let data = await axios.get(url, { withCredentials: true });
      return data.data;
    };

    Vue.prototype.$getCategory = async function(categoryName) {
      let url = `${apiUrl}/category/${categoryName}`;
      let data = await axios.get(url, { withCredentials: true });
      return data.data;
    };

    Vue.prototype.$getIngredient = async function(ingredientName) {
      let url = `${apiUrl}/ingredient/${ingredientName}`;
      let data = await axios.get(url, { withCredentials: true });
      return data.data;
    };

    Vue.prototype.$saveRecipe = async function(recipe) {
      let url = `${apiUrl}/recipe`;
      let result = false;

      axios
        .post(url, recipe, {
          withCredentials: true
        })
        .then(response => (result = true))
        .catch(error => (result = false));
      return result;
    };

    Vue.prototype.$getUsersLike = async function(recipeId) {
      let url = `${apiUrl}/recipe/getuserslike/${recipeId}`;
      let data = await axios.get(url, { withCredentials: true });
      return data.data;
    };

    Vue.prototype.$setUsersLike = async function(recipeId, likeValue) {
      let url = `${apiUrl}/recipe/like/${recipeId}/${likeValue}`;
      let result = false;
      await axios
        .get(url, { withCredentials: true })
        .then(response => (result = true))
        .catch(error => (result = false));
      return result;
    };

    Vue.prototype.$getRecipeRating = async function(recipeId) {
      let url = `${apiUrl}/recipe/getrating/${recipeId}`;
      let data = await axios.get(url, { withCredentials: true });
      return data.data;
    };

    Vue.prototype.$getGlobalSrchPage = async function(keyword, pageNumber) {
      let url = `${apiUrl}/recipe/pageglobal/${keyword}/${pageNumber}`;
      let data = await axios.get(url, { withCredentials: true });
      return data.data;
    };

    Vue.prototype.$getNameSrchPage = async function(keyword, pageNumber) {
      let url = `${apiUrl}/recipe/pagebyname/${keyword}/${pageNumber}`;
      let data = await axios.get(url, { withCredentials: true });
      return data.data;
    };

    Vue.prototype.$getCatSrchPage = async function(keyword, pageNumber) {
      let url = `${apiUrl}/recipe/pagebycat/${keyword}/${pageNumber}`;
      let data = await axios.get(url, { withCredentials: true });
      return data.data;
    };

    Vue.prototype.$getIngSrchPage = async function(keyword, pageNumber) {
      let url = `${apiUrl}/recipe/pagebying/${keyword}/${pageNumber}`;
      let data = await axios.get(url, { withCredentials: true });
      return data.data;
    };

    Vue.prototype.$getUsrSrchPage = async function(keyword, pageNumber) {
      let url = `${apiUrl}/recipe/pagebyuser/${keyword}/${pageNumber}`;
      let data = await axios.get(url, { withCredentials: true });
      return data.data;
    };

    Vue.prototype.$getUserInfo = async function() {
      let url = `${apiUrl}/user/getuser`;
      let data = await axios.get(url, { withCredentials: true });
      return data.data;
    };

    Vue.prototype.$signIn = async function(user, pass) {
      let result = null;
      let url = `${apiUrl}/login`;
      let formData = new FormData();
      formData.append("username", user);
      formData.append("password", pass);

      await axios
        .post(url, formData, { withCredentials: true })
        .then(response => (result = true))
        .catch(error => (result = false));

      return result;
    };

    Vue.prototype.$checkUserNameFree = async function(username) {
      let url = `${apiUrl}/user/register/checkusername/${username}`;
      let data = await axios.get(url, { withCredentials: true });
      return data.data;
    };

    Vue.prototype.$registerUser = async function(user) {
      let url = `${apiUrl}/user/register`;
      let result = null;
      await axios
        .post(url, user, {
          withCredentials: true
        })
        .then(response => (result = true))
        .catch(error => (result = false));
      return result;
    };

    Vue.prototype.$logout = async function() {
      let url = `${apiUrl}/logout`;
      let result = null;
      await axios
        .post(url, null, {
          withCredentials: true
        })
        .then(response => (result = true))
        .catch(error => (result = false));
      return result;
    };
  }
};
