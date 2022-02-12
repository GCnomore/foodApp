import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "../pages/Home/Home_Page";
import LoginPage from "../pages/Login/Login_Page";
import ProfilePage from "../pages/Profile/Profile_Page";
import RecipePage from "../pages/Recipe/Recipe_Page";
import RegisterPage from "../pages/Register/Register_Page";
import ResultPage from "../pages/Result/Result_Page";
import SaveEarth from "../pages/Save_Earth/Save_Earth";

export const ROUTES = {
  HOME_PAGE: "/",
  RESULT_PAGE: "/result",
  RECIPE_PAGE: "/recipe",
  PROFILE_PAGE: "/profile",
  LOGIN_PAGE: "/login",
  REGISTER_PAGE: "/register",
  SAVE_EARTH: "/saveearth",
};

const AppRouter: React.FC = () => {
  return (
    <Switch>
      <Route path={ROUTES.HOME_PAGE} exact component={HomePage} />
      <Route path={ROUTES.RESULT_PAGE} exact component={ResultPage} />
      <Route path={ROUTES.RECIPE_PAGE} component={RecipePage} />
      <Route path={ROUTES.PROFILE_PAGE} exact component={ProfilePage} />
      <Route path={ROUTES.LOGIN_PAGE} exact component={LoginPage} />
      <Route path={ROUTES.REGISTER_PAGE} exact component={RegisterPage} />
      <Route path={ROUTES.SAVE_EARTH} exact component={SaveEarth} />
    </Switch>
  );
};

export default AppRouter;
