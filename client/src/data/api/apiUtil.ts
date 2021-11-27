import axios, { AxiosRequestConfig } from "axios";
import {
  RecipeInformation,
  toRecipeInformation,
} from "../interfaces/Recipe_Information";
import {
  asSearchByRecipe,
  SearchByRecipe,
} from "../interfaces/Search_By_Recipe";

const ApiUtil = {
  searchRecipeByIngredients: async (
    ingredients: string[]
  ): Promise<SearchByRecipe[]> => {
    console.log("calling");
    const options: AxiosRequestConfig = {
      method: "GET",
      url: "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients",
      params: {
        ingredients: ingredients?.join(","),
        number: "5",
        ignorePantry: "true",
        ranking: "1",
      },
      headers: {
        "x-rapidapi-key": process.env.REACT_APP_KEY ?? "",
        "x-rapidapi-host":
          "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
      },
    };
    const result = await axios.request(options);
    const searchByRecipe: SearchByRecipe[] = result.data.map(
      (item: SearchByRecipe) => asSearchByRecipe(item)
    );
    console.log("searchByRecipe", ingredients);
    return searchByRecipe;
  },

  // searchRecipeByIngredients: async (
  //   ingredients: string[]
  // ): Promise<SearchByRecipe[]> => {
  //   console.log("calling");
  //   const result = await axios.post(
  //     "http://localhost:3030/recipes/findByIngredients",
  //     ingredients
  //   );
  //   const recipeByIngredients = await result.data;
  //   return recipeByIngredients;
  // },

  getFoodTrivia: async () => {
    console.log("get trivia");
    const trivia: string = await axios({
      method: "GET",
      url: "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/trivia/random",
      headers: {
        "x-rapidapi-key": process.env.REACT_APP_KEY ?? "",
        "x-rapidapi-host":
          "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
      },
    }).then((res) => res.data.text);
    sessionStorage.setItem("trivia", trivia);

    return trivia;
  },

  getRecipeInformation: async (id: string[]): Promise<RecipeInformation[]> => {
    const ids = id.join(",");
    const options: AxiosRequestConfig = {
      method: "GET",
      url: "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/informationBulk",
      params: { ids },
      headers: {
        "x-rapidapi-host":
          "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
        "x-rapidapi-key": process.env.REACT_APP_KEY ?? "",
      },
    };
    const response = await axios.request(options);
    const recipeInformation: RecipeInformation[] = response.data.map(
      (data: any) => toRecipeInformation(data)
    );
    return recipeInformation;
  },
};

export default ApiUtil;
