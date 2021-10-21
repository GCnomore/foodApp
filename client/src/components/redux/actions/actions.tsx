import {
  CHECKED,
  EXCLUDE,
  FOOD_TRIVIA,
  INGREDIENTS,
  SEARCH,
  SEARCH_BY,
  SHOW_FILTER,
} from "./action_types";

export const setSearchBy = (searchBy: string) => ({
  type: SEARCH_BY,
  payload: searchBy,
});

export const setSearch = (search: string) => ({
  type: SEARCH,
  payload: search,
});

export const setIngredients = (ingredients: string[]) => ({
  type: INGREDIENTS,
  payload: ingredients,
});

export const setFoodTrivia = (foodTrivia: string) => ({
  type: FOOD_TRIVIA,
  payload: foodTrivia,
});

export const setShowFilter = (showFilter: boolean) => ({
  type: SHOW_FILTER,
  payload: showFilter,
});

export const setExclude = (exclude: string[]) => ({
  type: EXCLUDE,
  payload: exclude,
});

export const setChecked = (check: { name: string; checked: boolean }[]) => ({
  type: CHECKED,
  payload: check,
});
