import "./App.css";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Home from "./components/pages/Home/Home";
import SearchResult from "./components/search/SearchResult";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  useLocation,
} from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobeAmericas } from "@fortawesome/free-solid-svg-icons";
import { AppContainer, NavBar } from "./App_Styled_Component";
import { Provider } from "react-redux";
import store from "./components/redux/store";

export default function App() {
  return (
    <Provider store={store}>
      <AppContainer className="App">
        <Router>
          <NavBar>
            <div>
              <Link to="/">Home</Link>
              <Link to="/register">Register</Link>
              <Link to="/login">Login</Link>
              <Link to="/saveearth">
                Save <FontAwesomeIcon icon={faGlobeAmericas} />{" "}
              </Link>
            </div>
          </NavBar>
          <Switch>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
            <Route
              path="/search/:Ingredients"
              render={({ match }) => {
                return <SearchResult />;
              }}
            />
          </Switch>
        </Router>
      </AppContainer>
    </Provider>
  );
}
