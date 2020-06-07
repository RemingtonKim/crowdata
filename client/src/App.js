import React from 'react';
import Home from './components/home.jsx';
import Login from './components/login.jsx';
import MyListings from './components/myListings.jsx'
import { Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={Home}></Route>
        <Route exact path='/login' component={Login}></Route>
        <Route exact path='/mylistings' component={MyListings}></Route>
      </Switch>
    </div>
  );
}

export default App;
