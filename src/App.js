import React from 'react';
import './App.css';
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard/Dashboard'
import ForgotPassword from './components/ForgotPassword'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
      <Switch>
        <Route exact path="/" component = {Login}/>
        <Route exact path="/login" component = {Login}/>
        <Route exact path="/register" component = {Register}/>
        <Route exact path="/dashboard" component = {Dashboard}/>
        <Route exact path="/forgot" component = {ForgotPassword} />
      </Switch>
      </Router>
    </div>
  );
}

export default App;
