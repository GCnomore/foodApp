import axios, { AxiosRequestConfig } from "axios";

import IRecipeInformation from "../../interfaces/Recipe_Information";
import { toRecipeInformation } from "../../models/Recipe_Information";
import { CONST } from "../../constants";
import Logger from "../../loaders/logger";
import { ISearchByRecipe } from "../../interfaces/Search_By_Recipes";

const HEADERS = {
  "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
  "x-rapidapi-key": CONST.API_KEY ?? "",
};

export const findByIngredients = async (
  ingredients: string[],
  number: string
): Promise<ISearchByRecipe[]> => {
  const config: AxiosRequestConfig = {
    method: "GET",
    url: `${CONST.API_URL}/recipes/findByIngredients`,
    params: {
      ingredients: ingredients?.join(","),
      number: number,
      ignorePantry: "true",
      ranking: "1",
    },
    headers: HEADERS,
  };
  Logger.info(`find by ingredients ${ingredients}`);

  let response;
  try {
    response = await axios(config);
    if (response.data) {
      Logger.info("received recipes by ingredients");
    }
  } catch (error) {
    response = { data: "error getting find by ingredients" };
    Logger.error("error getting recipes by ingredients", error);
  }

  return response.data;
};

export const getRecipeInformation = async (
  ids: string[]
): Promise<IRecipeInformation[]> => {
  const config: AxiosRequestConfig = {
    method: "GET",
    url: "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/informationBulk",
    params: { ids: ids.join(",") },
    headers: HEADERS,
  };
  Logger.info("get recipe information", ids);

  let response;
  let recipeInformation: IRecipeInformation[] = [];
  try {
    response = await axios(config);
    if (response.data) {
      Logger.info("received recipes by ingredients");
      recipeInformation = response.data.map((data: any) =>
        toRecipeInformation(data)
      );
      console.log("getRecipeInformation success");
    }
  } catch (error) {
    response = { msg: "error getting recipe information" };
    Logger.error("error getting recipes by ingredients", error);
  }
  return recipeInformation;
};
