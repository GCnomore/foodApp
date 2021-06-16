import React from "react";
import "./App.css";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Home from "./components/Home";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

import styled from "styled-components";

export default function App() {
  return (
    <AppContainer className="App">
      <Router>
        <NavBar>
          <div>
            <Link to="/">Home</Link>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
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
        </Switch>
      </Router>
    </AppContainer>
  );
}

const AppContainer = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  height: 100vh;
`;

const NavBar = styled.nav`
  width: 100%;
  height: 2.5rem;
  background-color: rgba(0, 0, 0, 0.5);

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
