import axios from "axios";

export class apiFriend {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
  }

  async getPage(pageNumber) {
    let url = `${this.apiUrl}/recipe/page/${pageNumber}`;
    let data = await axios.get(url);
    return data.data;
  }

  async getCategory(categoryName) {
    let url = `${this.apiUrl}/category/${categoryName}`;
    let data = await axios.get(url);
    return data.data;
  }

  async getIngredient(ingredientName) {
    let url = `${this.apiUrl}/ingredient/${ingredientName}`;
    let data = await axios.get(url);
    return data.data;
  }

  saveRecipe(recipe) {
    let url = `${this.apiUrl}/recipe`;
    axios.post(url, recipe);
  }

  async getCatSrchPage(keyword, pageNumber) {
    let url = `${this.apiUrl}/recipe/pagebycat/${keyword}/${pageNumber}`;
    let data = await axios.get(url);
    return data.data;
  }

  async getIngSrchPage(keyword, pageNumber) {
    let url = `${this.apiUrl}/recipe/pagebying/${keyword}/${pageNumber}`;
    let data = await axios.get(url);
    return data.data;
  }
}
