import { IIngredients } from "./Ingredients";

export interface ISearchByRecipe {
  id: number;
  title: string;
  image: string;
  missedIngredients: IIngredients[];
  usedIngredients: IIngredients[];
  unusedIngredients: IIngredients[];
  likes: number;
}
