import axios from "axios";

export class apiFriend {
  constructor(api) {
    this.apiUrl = api;
  }

  async getPage(pageNumber) {
    let url = `${this.apiUrl}/recipe/page/${pageNumber}`;
    let data = await axios.get(url, { withCredentials: true });
    return data.data;
  }

  async getCategory(categoryName) {
    let url = `${this.apiUrl}/category/${categoryName}`;
    let data = await axios.get(url, { withCredentials: true });
    return data.data;
  }

  async getIngredient(ingredientName) {
    let url = `${this.apiUrl}/ingredient/${ingredientName}`;
    let data = await axios.get(url, { withCredentials: true });
    return data.data;
  }

  async saveRecipe(recipe) {
    let url = `${this.apiUrl}/recipe`;
    let result = false;

    axios
      .post(url, recipe, {
        withCredentials: true
      })
      .then(response => (result = true))
      .catch(error => (result = false));
    return result;
  }

  async getCatSrchPage(keyword, pageNumber) {
    let url = `${this.apiUrl}/recipe/pagebycat/${keyword}/${pageNumber}`;
    let data = await axios.get(url, { withCredentials: true });
    return data.data;
  }

  async getIngSrchPage(keyword, pageNumber) {
    let url = `${this.apiUrl}/recipe/pagebying/${keyword}/${pageNumber}`;
    let data = await axios.get(url, { withCredentials: true });
    return data.data;
  }

  async getRecSrchPage(keyword, pageNumber) {
    let url = `${this.apiUrl}/recipe/pagebyname/${keyword}/${pageNumber}`;
    let data = await axios.get(url, { withCredentials: true });
    return data.data;
  }

  async getUsrSrchPage(keyword, pageNumber) {
    let url = `${this.apiUrl}/recipe/pagebyuser/${keyword}/${pageNumber}`;
    let data = await axios.get(url, { withCredentials: true });
    return data.data;
  }

  async getUserInfo() {
    let url = `${this.apiUrl}/user/getuser`;
    let data = await axios.get(url, { withCredentials: true });
    return data.data;
  }

  async signIn(user, pass) {
    let result = null;
    let url = `${this.apiUrl}/login`;
    let formData = new FormData();
    formData.append("username", user);
    formData.append("password", pass);

    await axios
      .post(url, formData, { withCredentials: true })
      .then(response => (result = true))
      .catch(error => (result = false));

    return result;
  }

  async checkUserNameFree(username) {
    let url = `${this.apiUrl}/user/register/checkusername/${username}`;
    let data = await axios.get(url, { withCredentials: true });
    return data.data;
  }

  async registerUser(user) {
    let url = `${this.apiUrl}/user/register`;

    axios
      .post(url, user, {
        withCredentials: true
      })
      .then(response => (result = true))
      .catch(error => (result = false));
    return result;
  }
}
