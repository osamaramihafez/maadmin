import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import './login.css'
import axios from 'axios'

export class Login extends Component {

    constructor(){
        super();
        this.state = {
            userName: '',
            password: '',
        }
    }

    handleuserName(e){
        this.setState({
            userName: e.target.value
        });
    }

    handlepassword(e){
        this.setState({
            password: e.target.value
        });
    }

   
    // logOn(){
    //     // this.logUsername();
    //     // this.logPassword();
    //     this.loginUser(); small brain 
    // }

/////// mueeza testing session 
loginUser(){
    axios.get('http://muslimathleticassociation.org:3001/maadmin/api/login', {
        username: this.userName,
        password: this.password
      })
      .then((response) => {
        console.log(response);
      });
}
/////// mueeza end test

    render() {
        return (
            <div className="Login">
                <h2>System Login</h2>
                <hr></hr>
                <h5>Sign In</h5>
                <label>Username: </label> <input type='text' name='userName' onChange={this.handleuserName.bind(this)}></input>
                <label>Password: </label> <input type='text' name='password' onChange={this.handlepassword.bind(this)}></input>
                <hr></hr>
                {/* For some reason, the bootstrap isn't working,
                but we're just looking for functionality rn so it's okay */}
                <Button variant='success' onClick={this.loginUser.bind(this)}>Log On</Button>
            </div>
        )
    }
}

export default Login