import "./App.css";
import React from "react";
import { Link, Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobeAmericas } from "@fortawesome/free-solid-svg-icons";
import { AppContainer, NavBar } from "./App_Styled";
import HomePage from "./pages/Home/Home_Page";
import RecipePage from "./pages/Recipe_Page/Recipe_Page";
import ProfilePage from "./pages/Profile/Profile_Page";
import LoginPage from "./pages/Login/Login_Page";
import ROUTES from "./routers/Routers";
import RegisterPage from "./pages/Register/Register_Page";
import SaveEarth from "./pages/Save_Earth/Save_Earth";
import ResultPage from "./pages/Result/Result_Page";

export default function App() {
  return (
    <AppContainer className="App">
      <Router>
        <Switch>
          <Route path={ROUTES.HOME_PAGE} exact component={HomePage} />
          <Route path={ROUTES.RESULT_PAGE} exact component={ResultPage} />
          <Route
            path={`${ROUTES.RECIPE_PAGE}/:id`}
            exact
            component={RecipePage}
          />
          <Route path={ROUTES.PROFILE_PAGE} exact component={ProfilePage} />
          <Route path={ROUTES.LOGIN_PAGE} exact component={LoginPage} />
          <Route path={ROUTES.REGISTER_PAGE} exact component={RegisterPage} />
          <Route path={ROUTES.SAVE_EARTH} exact component={SaveEarth} />
        </Switch>
        <NavBar>
          <div>
            <Link to={ROUTES.HOME_PAGE}>Home</Link>
            <Link to={ROUTES.REGISTER_PAGE}>Register</Link>
            <Link to={ROUTES.LOGIN_PAGE}>Login</Link>
            <Link to={ROUTES.SAVE_EARTH}>
              Save <FontAwesomeIcon icon={faGlobeAmericas} />
            </Link>
          </div>
        </NavBar>
      </Router>
    </AppContainer>
  );
}
