import Ingredients from "./Ingredients";

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
  winePairing: {
    pairedWines: string[];
    pairingText: string;
  };
  instructions: string;
  analyzedInstructions: {
    steps: {
      number: number;
      stepTitle: string;
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
    };
  };
}

export const toRecipeInformation = (data: any): IRecipeInformation => {
  return {
    id: data.id,
    title: data.title,
    image: data.image,
    cusines: data.cusines,
    readyInMinutes: data.readyInMinutes,
    vegitarian: data.vegitarian,
    vegan: data.vegan,
    glutenFree: data.glutenFree,
    dairyFree: data.dairyFree,
    veryPopular: data.veryPopular,
    ketogenic: data.ketogenic,
    whole30: data.whole30,
    servings: data.servings,
    sourceName: data.sourceName,
    sourceUrl: data.sourceUrl,
    spoonacularSourceUrl: data.spoonacularSourceUrl,
    spoonacularScore: data.spoonacularScore,
    extendedIngredients: data.extendedIngredients,
    summary: data.summary,
    dishTypes: data.dishTypes,
    diets: data.diets,
    occasions: data.occasions,
    winePairing: {
      pairedWines: data.winePairing.pairedWines,
      pairingText: data.winePairing.pairingText,
    },
    instructions: data.instructions,
    analyzedInstructions: {
      steps: data.analyzedInstructions.steps,
    },
  };
};
