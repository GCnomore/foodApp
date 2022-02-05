import IIngredients from "./Ingredients";

export interface ISearchByIngredParam {
  ingredients: string[];
  number: string;
}

export default interface ISearchResult {
  id: number;
  image: string;
  imageType: string;
  likes: number;
  missedIngredientCount: number;
  missedIngredients: any[];
  title: string;
  usedIngredientCount: number;
  usedIngredients: Object[];
}

export interface IRecipeByIngredient {
  id: number;
  title: string;
  image: string;
  missedIngredients: IIngredients[];
  usedIngredients: IIngredients[];
  unusedIngredients: IIngredients[];
  likes: number;
}

export const toSearchByRecipe = (data: any): IRecipeByIngredient => {
  return {
    id: data.id,
    title: data.title,
    image: data.image,
    missedIngredients: data.missedIngredients,
    usedIngredients: data.usedIngredients,
    unusedIngredients: data.unusedIngredients,
    likes: data.likes,
  };
};
