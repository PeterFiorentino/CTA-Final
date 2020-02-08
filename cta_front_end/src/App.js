import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom'

import NavBar from './Components/NavBar'
import Home from './Components/Home'

function App() {
  return (
    <div className="App">
      <NavBar />

      <Switch>
              <Route exact path="/" component={Home}/>
              {/* <Route exact path="/about" component={About}/>
              <Route exact path="/users" component={Users}/>
              <Route exact path="/shows" component={Shows}/> */}
      </Switch>
    </div>
  );
}

export default App;
