import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import './Form.css'
import axios from 'axios'

export class Login extends Component {

    constructor(){
        super();
        this.state = {
            username: '',
            password: '',
        }
    }

    handleuserName(e){
        this.setState({
            username: e.target.value
        });
    }

    handlepassword(e){
        this.setState({
            password: e.target.value
        });
    }

    login(){
        console.log(this.state)
        axios.get('http://ec2-15-222-234-4.ca-central-1.compute.amazonaws.com:3001/maadmin/api/login', {
            data:{
                username: this.state.username,
                password: this.state.password
            }
        })
        .then((response) => {
            console.log(response.data);
        });
    }

    render() {
        return (
            <div className="login">
                <h2>System Login</h2>
                <hr></hr>
                <h5>Sign In</h5>
                <label>Username: </label> <input type='text' name='userName' onChange={this.handleuserName.bind(this)}></input>
                <label>Password: </label> <input type='password' name='password' onChange={this.handlepassword.bind(this)}></input>
                <hr></hr>
                {/* For some reason, the bootstrap isn't working,
                but we're just looking for functionality rn so it's okay */}
                <Button variant='success' onClick={this.login.bind(this)}>Log In</Button>
            </div>
        )
    }
}

export default Login