import React from 'react';
import RegistrationForm from './components/session/RegistrationForm';
import LoginForm from './components/session/LoginForm';
import Profile from './components/Profile';
import Home from './components/Home';
import { Route, NavLink, Switch } from "react-router-dom";
import { ProtectedRoute, AuthRoute } from "./Routes"


const App = () => (
  <div>
    <nav>
      <NavLink exact to="/">Home</NavLink>
      <NavLink to="/register">Register</NavLink>
      <NavLink to="/login">Login</NavLink>
    </nav>
    <h1>Twitter Lite</h1>
    <Switch>
      <ProtectedRoute exact path="/" component={Home} />
      <AuthRoute path="/register" component={RegistrationForm} />
      <AuthRoute path="/login" component={LoginForm} />
      <ProtectedRoute path="/users/:userId" component={Profile} />
    </Switch>
    <RegistrationForm />
  </div>
);

export default App;
