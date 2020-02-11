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
import ShowByViewer from './Components/ShowByViewer'



class App extends React.Component {
  constructor() {
    super()
    this.state = {
      username: "Jon Snow",
      user_id: 1,
      avatar_url: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/kit-harington-hair-jon-snow-1569167827.jpg?crop=0.439xw:0.878xh;0.0221xw,0.0306xh&resize=480:*"
    }
  }

  usersRender = (routeProps) => { 
    return (
      <Users 
      username={this.state.username} 
      user_id={this.state.user_id} 
      avatar_url={this.state.avatar_url}
      match={routeProps.match}
      /> 
    )
  }

  addShowRender = (routeProps) => { 
    return (
      <AddShow 
        username={this.state.username} 
        user_id={this.state.user_id} 
        avatar_url={this.state.avatar_url}
        /> 
    )
  }

  ShowByViewerRender = (routeProps) => { 
    return (
    <ShowByViewer 
      username={this.state.username} 
      loggedInUserId={this.state.user_id} 
      avatar_url={this.state.avatar_url} 
      match={routeProps.match}
      /> 
    )
  }


  render() {
    return (
      <div className="App">
        <NavBar user_id={this.state.user_id} username={this.state.username}/>

        <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/about" component={About}/>
                <Route exact path="/users" render={this.usersRender} />
                <Route exact path="/users/:user_id" component={UserPage} />
                <Route exact path="/addShow" render={this.addShowRender}/>
                <Route exact path="/shows" component={Shows}/>
                <Route exact path="/shows/:show_id/users/:user_id" render={this.ShowByViewerRender}/>
        </Switch>
      </div>
    );
  }
}

export default App;
