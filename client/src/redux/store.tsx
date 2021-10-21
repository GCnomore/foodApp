import { createStore, combineReducers } from "redux";
import { homeReducer } from "./reducer/Home_Reducer/reducer";

const rootReducer = combineReducers({
  homeReducer,
});

const store = createStore(rootReducer);

export default store;
