import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom'

import NavBar from './Components/NavBar'
import About from './Components/About'
import Users from './Components/Users'
import UserPage from './Components/UserPage'
import Shows from './Components/Shows'
import Home from './Components/Home'
import AddShow from './Components/AddShow'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      username: "Jon Snow",
      user_id: 1
    }
  }

  render() {
    return (
      <div className="App">
        <NavBar />

        <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/about" component={About}/>
                <Route exact path="/users" component={Users}/>
                <Route exact path="/users/:user_id" component={UserPage}/>
                <Route exact path="/users/:user_id/addShow" component={AddShow}/>
                <Route exact path="/shows" component={Shows}/>
        </Switch>
      </div>
    );
  }
}

export default App;
