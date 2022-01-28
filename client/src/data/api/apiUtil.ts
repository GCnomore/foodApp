import axios from "axios";
import CONST from "../../constants";
import IRecipeInformation from "../interfaces/Recipe_Information";
import {
  IRecipeByIngredient,
  ISearchByIngredParam,
} from "../interfaces/Search";
import recipeByIngredients from "../Recipe_By_Ingredients_Sample.json";
import recipeInfo from "../Recipe_Info_Smaple.json";

const ApiUtil = {
  searchRecipeByIngredients: async ({
    ingredients,
    excludes,
  }: ISearchByIngredParam): Promise<IRecipeByIngredient[]> => {
    // console.log("calling");
    // let recipeByIngredients;

    // try {
    //   const result = await axios.post(
    //     `${CONST.API_URL}/recipes/findByIngredients`,
    //     ingredients
    //   );
    //   recipeByIngredients = await result.data;
    // } catch (e) {
    //   console.log(e);
    //   alert("Please check your input");
    // }
    return recipeByIngredients;
  },

  getFoodTrivia: async () => {
    console.log("get trivia");
    let trivia;
    try {
      const response = await axios.get(
        `${CONST.API_URL}/information/foodTrivia`
      );
      trivia = response.data;
    } catch (e) {
      trivia = "...";
    }
    sessionStorage.setItem("trivia", trivia);

    return trivia;
  },

  getRecipeInformation: async (id: string[]): Promise<any> => {
    // console.log("call getinfo");
    // let recipeInfo;
    // const ids = id.join(",");
    // try {
    //   const response = await axios.post(
    //     `${CONST.API_URL}/recipes/recipeInformation`,
    //     { ids }
    //   );
    //   recipeInfo = response.data;
    // } catch (e) {
    //   console.log(e);
    //   alert("Please check your input");
    // }

    return recipeInfo;
  },
};

export default ApiUtil;
