import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ApiUtil from "../../data/api/apiUtil";

export interface SearchState {
  searchBy: string;
  search: string;
  ingredients: string[];
  showFilter: boolean;
  checkFilters: { name: string; checked: boolean }[];
  excludes: string[];
  foodTrivia: null | string;
}

const initialState: SearchState = {
  searchBy: "ingredients",
  search: "",
  ingredients: [],
  showFilter: false,
  excludes: [],
  foodTrivia: null,
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
    const response = await ApiUtil.getFoodTrivia();
    return response;
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
      state.checkFilters.map((item) => {
        if (item.name === action.payload.name) {
          item.checked = !item.checked;
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getFoodTrivia.fulfilled, (state, action) => {
      state.foodTrivia = action.payload;
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
} = searchSlice.actions;

export default searchSlice.reducer;
