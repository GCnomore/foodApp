import React from "react";
import "./App.css";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

import styled from "styled-components";

export default function App() {
  return (
    <AppContainer className="App">
      <Router>
        <Link to="/">Home</Link>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>

        <Switch>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/"></Route>
        </Switch>
      </Router>
    </AppContainer>
  );
}

const AppContainer = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  height: 100vh;
`;
