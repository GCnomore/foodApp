import "./App.css";
import React from "react";
import { Link, BrowserRouter as Router } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobeAmericas } from "@fortawesome/free-solid-svg-icons";
import * as AppStyled from "./App_Styled";
import AppRouter, { ROUTES } from "./routers/Routers";

export default function App() {
  return (
    <AppStyled.AppContainer className="App">
      <Router>
        <AppStyled.NavBar>
          <div>
            <Link to={ROUTES.HOME_PAGE}>Home</Link>
            {/* <Link to={ROUTES.REGISTER_PAGE}>Register</Link> */}
            {/* <Link to={ROUTES.LOGIN_PAGE}>Login</Link> */}
            <Link to={ROUTES.SAVE_EARTH}>
              Save <FontAwesomeIcon icon={faGlobeAmericas} />
            </Link>
          </div>
        </AppStyled.NavBar>
        <AppRouter />
      </Router>
    </AppStyled.AppContainer>
  );
}
