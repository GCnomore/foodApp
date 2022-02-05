import { IIngredients } from "./Ingredients";
import { IAnalyzedInstructions } from "./Recipe_Information";

export interface IRecipeByIngredients {
  id: number;
  title: string;
  image: string;
  missedIngredients: IIngredients[];
  usedIngredients: IIngredients[];
  unusedIngredients: IIngredients[];
  cusines: string[];
  readyInMinutes: number;
  vegitarian: boolean;
  vegan: boolean;
  glutenFree: boolean;
  dairyFree: boolean;
  veryPopular: boolean;
  ketogenic: boolean;
  whole30: boolean;
  servings: number;
  sourceName: string;
  sourceUrl: string;
  spoonacularSourceUrl: string;
  spoonacularScore: number;
  extendedIngredients: IIngredients[];
  summary: string;
  dishTypes: string[];
  diets: string[];
  occasions: string[];
  equipments: null | string[];
  winePairing: {
    pairedWines: string[];
    pairingText: string;
  };
  instructions: string;
  analyzedInstructions: null | IAnalyzedInstructions;
  cuisines: string[];
}
