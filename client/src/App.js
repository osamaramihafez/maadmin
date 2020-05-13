import React, { Component } from 'react'
import Login from './Components/Login'
import Leagues from './Components/Leagues.js'
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
                    : <Leagues username={this.state.admin} />
                }
            </div>
        )
      }
}

export default App
