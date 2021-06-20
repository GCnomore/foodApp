import React from "react";
import "./App.css";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Home from "./components/Home";
import SearchResult from "./components/search/SearchResult";
// import { SearchContextProvider } from "./components/context/SearchContext";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  useLocation,
} from "react-router-dom";

import styled from "styled-components/macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobeAmericas } from "@fortawesome/free-solid-svg-icons";

export default function App() {
  return (
    <AppContainer className="App">
      {/* <SearchContextProvider> */}
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
      {/* </SearchContextProvider> */}
    </AppContainer>
  );
}

const AppContainer = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const NavBar = styled.nav`
  width: 100%;
  height: 2.5rem;
  background-color: rgba(0, 0, 0, 0.6);
  position: absolute;

  > div {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 100%;
    > * {
      color: white;
      font-weight: bold;
      text-decoration: none;
      margin: 0 1rem;
    }
  }
`;
