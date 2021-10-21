import { createStore, combineReducers } from "redux";
import { homeReducer } from "./reducer/reducer";

const rootReducer = combineReducers({
  homeReducer,
});

const store = createStore(rootReducer);

export default store;
