import React, { Component } from 'react'
import Login from './Components/Login'
import LeagueList from './Components/LeagueList.js'
import './App.css'

export class App extends Component {
    
    constructor(){
        super();
        this.state = {
          loggedIn: false,
          admin: ''
        }
    }
    
    login(user){
        this.setState({
            loggedIn: true,
            admin: user
        })
    }

      render() {
        return (
            <div className="App">
                {!this.state.loggedIn
                    ? <Login login={this.login.bind(this)}/>
                    : <LeagueList username={this.state.admin} />
                }
            </div>
        )
      }
}

export default App
