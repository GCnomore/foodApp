import Ingredients from "./Ingredients";

export interface IAnalyzedInstructions {
  number: number;
  step: string;
  ingredients: {
    id: number;
    name: string;
    image: string;
  }[];
  equipment: {
    id: number;
    name: string;
    image: string;
  }[];
  length?: {
    number: number;
    unit: string;
  };
}

export default interface IRecipeInformation {
  id: number;
  title: string;
  image: string;
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
  extendedIngredients: Ingredients[];
  summary: string;
  dishTypes: string[];
  diets: string[];
  occasions: string[];
  equipments: string[];
  winePairing: {
    pairedWines: string[];
    pairingText: string;
  };
  instructions: string;
  analyzedInstructions: null | IAnalyzedInstructions[];
}
