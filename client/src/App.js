import React, { Component } from 'react'
import Login from './Components/Login'
import CreateAccount from './Components/CreateAccount'
import LeagueList from './Components/LeagueList.js'
import './App.css'
import Button from 'react-bootstrap/Button';
import axios from 'axios'

export class App extends Component {
    
    constructor(){
        super();
        this.state = {
          loggedIn: false,
          admin: '',
          create: false
        }
    }
    
    login(user){
        this.setState({
            loggedIn: true,
            admin: user
        })
    }

    create(){
        this.setState({
            create: true
        })
    }

    created(){
        this.setState({
            create: false
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
            <div>
            {!this.state.loggedIn
                    ? (!this.state.create
                        ? <div className='Title'>
                            <h1>Maadmin</h1>
                            <Button className='logout' variant='dark' onClick={this.create.bind(this)}>Create an Account</Button>
                            <h6>A league managment tool. Still under development.</h6>
                        </div>
                        : <div className='Title'>
                            <h1>Maadmin</h1>
                            <Button className='logout' variant='dark' onClick={this.created.bind(this)}>Back to login</Button>
                            <h6>A league managment tool. Still under development.</h6>
                        </div>
                    )
                    :<div className='Title'>
                        <h1>Maadmin</h1>
                        <Button className='logout' variant='dark' onClick={this.logout.bind(this)}>Logout</Button>
                        <h6>A league managment tool. Still under development.</h6>
                    </div>
            }
            <div className="App">
                {!this.state.loggedIn
                    ? (!this.state.create
                        ?<Login login={this.login.bind(this)}/>
                        :<CreateAccount created={this.created.bind(this)} />
                        )
                    : <div className='leagues'>
                        {/* <Button className='logout' variant='outline-primary' onClick={this.logout.bind(this)}>Logout</Button> */}
                        <LeagueList username={this.state.admin} />
                      </div>
                }
            </div>
            </div>
        )
      }
}

export default App
