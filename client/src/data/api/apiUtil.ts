import axios, { AxiosRequestConfig } from "axios";
import {
  asSearchByRecipe,
  SearchByRecipe,
} from "../interfaces/Search_By_Recipe";

const ApiUtil = {
  searchRecipeByIngredients: async (
    ingredients: string[]
  ): Promise<SearchByRecipe[]> => {
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
    const searchByRecipe = result.data.map((item: SearchByRecipe) =>
      asSearchByRecipe(item)
    );

    return searchByRecipe;
  },

  getFoodTrivia: async () => {
    console.log("getfood");
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
};

export default ApiUtil;
