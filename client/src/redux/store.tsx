import { createStore, combineReducers } from "redux";
import { homeReducer } from "./reducer/Home_Reducer/reducer";

const rootReducer = combineReducers({
  homeReducer,
});

const store = createStore(rootReducer);

export type AppDispatch = typeof store.dispatch;
export default store;
