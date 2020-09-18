import React from 'react';
import RegistrationForm from './components/session/RegistrationForm';
import LoginForm from './components/session/LoginForm';
import Profile from './components/Profile';
import Home from './components/Home';
import { NavLink, Switch } from "react-router-dom";
import { ProtectedRoute, AuthRoute } from "./Routes"


const App = (props) => (
  <div>
    <nav>
      <NavLink exact to="/">Home</NavLink>
      <NavLink to="/register">Register</NavLink>
      <NavLink to="/login">Login</NavLink>
    </nav>
    <h1>Twitter Lite</h1>
    <Switch>
      <ProtectedRoute exact path="/" component={Home} currentUserId={props.currentUserId}/>
      <ProtectedRoute exact path="/users/:userId" component={Profile} currentUserId={props.currentUserId}/>
      <AuthRoute path="/register" component={RegistrationForm} currentUserId={props.currentUserId}/>
      <AuthRoute path="/login" component={LoginForm} currentUserId={props.currentUserId}/>
    </Switch>
  </div>
);

export default App;
