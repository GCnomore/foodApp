import _ from "lodash";

import { IRecipeByIngredients } from "../../interfaces/Recipe_By_Ingredients";
import IRecipeInformation from "../../interfaces/Recipe_Information";
import { ISearchByRecipe } from "../../interfaces/Search_By_Recipes";
import { findByIngredients, getRecipeInformation } from "../api/Recipe_Api";

const getRecipeByIngredients = async (
  _ingredients: string[],
  _number: string = "50"
): Promise<IRecipeByIngredients[]> => {
  const recipes: ISearchByRecipe[] = await findByIngredients(
    _ingredients,
    _number
  );
  const ids: string[] = recipes.map((recipe: ISearchByRecipe) =>
    recipe.id.toString()
  );
  console.log("idssssss", ids);
  const info: IRecipeInformation[] = await getRecipeInformation(ids);

  const orderedRecipes: ISearchByRecipe[] = _.orderBy(recipes, ["id"], ["asc"]);
  const orderedInfo: IRecipeInformation[] = _.orderBy(info, ["id"], ["asc"]);

  const recipeByIngredients: IRecipeByIngredients[] = orderedInfo.map(
    (item: IRecipeInformation, index: number) => {
      return {
        ...item,
        missedIngredients: orderedRecipes[index].missedIngredients,
        usedIngredients: orderedRecipes[index].usedIngredients,
        unusedIngredients: orderedRecipes[index].unusedIngredients,
      };
    }
  );

  return recipeByIngredients;
};

export default getRecipeByIngredients;
