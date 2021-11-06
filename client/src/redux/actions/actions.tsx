import ApiUtil from "../../data/api/apiUtil";
import { AppDispatch } from "../store";

export const SEARCH_BY = "SET_SEARCH_BY";
export const SEARCH = "SET_SEARCH";
export const INGREDIENTS = "SET_INGREDIENTS";
export const FOOD_TRIVIA = "SET_FOOD_TRIVIA";
export const SHOW_FILTER = "SET_SHOW_FILTER";
export const EXCLUDE = "SET_EXCLUDE";
export const CHECKED = "SET_CHECKED";
export const SEARCH_RECIPE_BY_INGREDIENTS = "SEARCH_RECIPE_BY_INGREDIENTS";

export const AppActions = {
  setSearchBy: (searchBy: string) => (dispatch: AppDispatch) => {
    dispatch({
      type: SEARCH_BY,
      payload: searchBy,
    });
  },

  setSearch: (search: string) => (dispatch: AppDispatch) => {
    dispatch({
      type: SEARCH,
      payload: search,
    });
  },

  setIngredients: (ingredients: string[]) => (dispatch: AppDispatch) => {
    dispatch({
      type: INGREDIENTS,
      payload: ingredients,
    });
  },

  setFoodTrivia: (foodTrivia: string) => (dispatch: AppDispatch) => {
    dispatch({
      type: FOOD_TRIVIA,
      payload: foodTrivia,
    });
  },

  setShowFilter: (showFilter: boolean) => (dispatch: AppDispatch) => {
    dispatch({
      type: SHOW_FILTER,
      payload: showFilter,
    });
  },

  setExclude: (exclude: string[]) => (dispatch: AppDispatch) => {
    dispatch({
      type: EXCLUDE,
      payload: exclude,
    });
  },

  setChecked:
    (check: { name: string; checked: boolean }[]) =>
    (dispatch: AppDispatch) => {
      dispatch({
        type: CHECKED,
        payload: check,
      });
    },

  searchRecipeByIngredients:
    (ingredients: string[]) => (dispatch: AppDispatch) => {
      ApiUtil.searchRecipeByIngredients(ingredients);
      dispatch({
        type: SEARCH_RECIPE_BY_INGREDIENTS,
        payload: ingredients,
      });
    },
};
