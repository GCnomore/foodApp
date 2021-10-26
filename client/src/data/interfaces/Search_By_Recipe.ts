import { Ingredients } from "./Ingredients";

export interface SearchByRecipe{
   id: number;
   title: string;
   image: string;
   missedIngredients: Ingredients[];
   usedIngredients: Ingredients[];
   unusedIngredients: Ingredients[];
   likes: number;
}