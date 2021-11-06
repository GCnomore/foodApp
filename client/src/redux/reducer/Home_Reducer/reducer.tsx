import {
  CHECKED,
  EXCLUDE,
  FOOD_TRIVIA,
  INGREDIENTS,
  SEARCH,
  SEARCH_BY,
  SEARCH_RECIPE_BY_INGREDIENTS,
  SHOW_FILTER,
} from "../../actions/actions";

export interface AppState {
  searchBy: string;
  search: null | string;
  ingredients: string[] | null;
  foodTrivia: null | string;
  showFilter: boolean;
  exclude: string[] | null;
  checked: {
    name: string;
    checked: boolean;
  }[];
}

const initialState: AppState = {
  searchBy: "ingredients",
  search: null,
  ingredients: [],
  foodTrivia: null,
  showFilter: false,
  exclude: [],
  checked: [
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

export function homeReducer(
  state = initialState,
  action: { type: string; payload: any }
): AppState {
  switch (action.type) {
    case SEARCH_BY:
      return {
        ...state,
        searchBy: action.payload,
      };
    case SEARCH:
      return {
        ...state,
        search: action.payload,
      };
    case INGREDIENTS:
      return {
        ...state,
        ingredients: action.payload,
      };
    case FOOD_TRIVIA:
      return {
        ...state,
        foodTrivia: action.payload,
      };
    case SHOW_FILTER:
      return {
        ...state,
        showFilter: action.payload,
      };
    case EXCLUDE:
      return {
        ...state,
        exclude: action.payload,
      };
    case CHECKED:
      return {
        ...state,
        checked: action.payload,
      };
    case SEARCH_RECIPE_BY_INGREDIENTS:
      return {
        ...state,
        search: action.payload,
      };
    default:
      return state;
  }
}
