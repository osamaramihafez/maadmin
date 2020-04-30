import React, { Component } from 'react'
// import PlayerRegistration from './Components/PlayerRegistration';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Navigation from './Components/Navigation';
import './App.css'
import TeamRegistration from './Components/TeamRegistration';
import PlayerRegistration from './Components/PlayerRegistration';

export class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route path='/' component={Navigation}></Route>
          <Switch>
          <Route path='/Register/Team' component={TeamRegistration}></Route>
          <Route path='/Register/Player' component={PlayerRegistration}></Route>
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App
