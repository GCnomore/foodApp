import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import thunk from "redux-thunk";
import { applyMiddleware, createStore } from "redux";
import store from "./redux/store";
import { Provider } from "react-redux";

// const store = createStore(homeReducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
