import axios, { AxiosRequestConfig } from "axios";
import IRecipeInformation, {
  toRecipeInformation,
} from "../interfaces/Recipe_Information";
import IRecipeByIngredient, {
  toSearchByRecipe,
} from "../interfaces/Search_By_Recipe";

const ApiUtil = {
  searchRecipeByIngredients: async (
    ingredients: string[]
  ): Promise<IRecipeByIngredient[]> => {
    console.log("calling");
    const result = await axios.post(
      "http://localhost:3030/recipes/findByIngredients",
      ingredients
    );
    const recipeByIngredients = await result.data;
    return recipeByIngredients;
  },

  getFoodTrivia: async () => {
    console.log("get trivia");
    const response = await axios.get(
      "http://localhost:3030/information/foodTrivia"
    );
    sessionStorage.setItem("trivia", response.data);

    return response.data;
  },

  getRecipeInformation: async (id: string[]): Promise<IRecipeInformation[]> => {
    const ids = id.join(",");
    const response = await axios.post(
      "http://localhost:3030/recipes/recipeInformation",
      ids
    );
    const recipeInformation: IRecipeInformation[] = response.data.map(
      (data: any) => toRecipeInformation(data)
    );
    return recipeInformation;
  },
};

export default ApiUtil;
