import { ISearchByRecipe } from "../interfaces/Search_By_Recipes";

export const toSearchByRecipe = (data: any): ISearchByRecipe => {
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
