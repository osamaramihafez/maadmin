import React, { Component } from 'react'
import Login from './Components/Login'
import LeagueList from './Components/LeagueList.js'
import './App.css'
import Button from 'react-bootstrap/Button';
import axios from 'axios'

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

    logout(){
        //We also need to logout by deleting the current admin inside of maadmin.js
        axios.post('/maadmin/api/logout').then((res) => {
            this.setState({
                loggedIn: false,
                admin: ''
            })
        })
    }

      render() {
        return (
            <div className="App">
                <h1 className='Title'>Maadmin</h1>
                {!this.state.loggedIn
                    ? <Login login={this.login.bind(this)}/>
                    : <div className='leagues'>
                        <Button className='logout' variant='outline-primary' onClick={this.logout.bind(this)}>Logout</Button>
                        <LeagueList username={this.state.admin} />
                      </div>
                }
            </div>
        )
      }
}

export default App
