import React, { Component } from 'react'
// import PlayerRegistration from './Components/PlayerRegistration';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Navigation from './Components/Navigation';
import './App.css'
import TeamRegistration from './Components/TeamRegistration';
import PlayerRegistration from './Components/PlayerRegistration';
import Schedule from './Components/Schedule';
import axios from 'axios'

export class App extends Component {
  
  getLeague(){
    //We need to get the data that will contain everything we need.
    axios.get('maadmin/api/league').then({

    })
  }
  
  render() {
    return (
      <Router>
        <div className="App">
          <Route path='/' component={Navigation}></Route>
          <Switch>
          <Route path='/Register/Team' component={TeamRegistration}></Route>
          <Route path='/Register/Player' component={PlayerRegistration}></Route>
          <Route path='/Modify/Schedules' component={() => <Schedule />}></Route>
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App
