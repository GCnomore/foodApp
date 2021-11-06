import { AxiosResponse } from "axios";
import { Ingredients } from "./Ingredients";

export interface SearchByRecipe {
  id: number;
  title: string;
  image: string;
  missedIngredients: Ingredients[];
  usedIngredients: Ingredients[];
  unusedIngredients: Ingredients[];
  likes: number;
}

export const asSearchByRecipe = (data: any): SearchByRecipe => {
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
