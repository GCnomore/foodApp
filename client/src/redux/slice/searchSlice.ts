import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ApiUtil from "../../data/api/apiUtil";
import ICheckFilters from "../../data/interfaces/Check_Filters";
import IRecipeInformation from "../../data/interfaces/Recipe_Information";
import IRecipeByIngredient from "../../data/interfaces/Search_By_Recipe";

export interface SearchState {
  searchBy: string;
  search: string;
  ingredients: string[];
  showFilter: boolean;
  checkFilters: ICheckFilters[];
  excludes: string[];
  foodTrivia: null | string;
  showLoading: boolean;
  recipeByIngredient: null | IRecipeByIngredient[];
  recipeInformation: null | IRecipeInformation[];
}

const initialState: SearchState = {
  searchBy: "ingredients",
  search: "",
  ingredients: [],
  showFilter: false,
  excludes: [],
  foodTrivia: null,
  showLoading: false,
  recipeByIngredient: null,
  recipeInformation: null,
  checkFilters: [
    {
      name: "Vegan",
      checked: false,
    },
    {
      name: "Vegitarian",
      checked: false,
    },
    {
      name: "Gluten Free",
      checked: false,
    },
    {
      name: "Dairy Free",
      checked: false,
    },
    {
      name: "No Missing Ingredients",
      checked: false,
    },
    {
      name: "Cuisine",
      checked: false,
    },
    {
      name: "Dish Type",
      checked: false,
    },
  ],
};

export const getFoodTrivia = createAsyncThunk(
  "search/getFoodTriviaStatus",
  async () => {
    const result = await ApiUtil.getFoodTrivia();
    return result;
  }
);

export const getRecipeByIngredients = createAsyncThunk(
  "search/getRecipeByIngredientsStatus",
  async (ingredients: string[]) => {
    const result = await ApiUtil.searchRecipeByIngredients(ingredients);
    return result;
  }
);

export const getRecipeInformation = createAsyncThunk(
  "search/getRecipeInformationStatus",
  async (id: string[]) => {
    const result = await ApiUtil.getRecipeInformation(id);
    return result;
  }
);

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchBy: (state, action) => {
      state.searchBy = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    addIngredients: (state, action) => {
      state.ingredients = [...state.ingredients, action.payload];
    },
    removeIngredients: (state, action) => {
      state.ingredients = state.ingredients.filter(
        (item) => item !== action.payload
      );
    },
    setShowFilter: (state, action) => {
      state.showFilter = action.payload;
    },
    addExcludes: (state, action) => {
      if (!state.excludes.includes(action.payload)) {
        state.excludes = [...state.excludes, action.payload];
      }
    },
    setFoodTrivia: (state, action) => {
      state.foodTrivia = action.payload;
    },
    removeExcludes: (state, action) => {
      state.excludes = state.excludes.filter((item) => item !== action.payload);
    },
    setCheckFilters: (state, action) => {
      state.checkFilters.forEach((item) => {
        if (item.name === action.payload.name) {
          item.checked = !item.checked;
        }
      });
    },
    setShowLoading: (state, action) => {
      state.showLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFoodTrivia.fulfilled, (state, action) => {
        state.foodTrivia = action.payload;
      })
      .addCase(getRecipeByIngredients.fulfilled, (state, action) => {
        state.recipeByIngredient = action.payload;
      })
      .addCase(getRecipeInformation.fulfilled, (state, action) => {
        state.recipeInformation = action.payload;
      });
  },
});

export const {
  setSearch,
  setSearchBy,
  setCheckFilters,
  addExcludes,
  removeExcludes,
  addIngredients,
  removeIngredients,
  setFoodTrivia,
  setShowFilter,
  setShowLoading,
} = searchSlice.actions;

export default searchSlice.reducer;
