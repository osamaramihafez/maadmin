import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import './Form.css'
import axios from 'axios'

export class CreateAccount extends Component {
    constructor(){
        super();
        this.state = {
            username: '',
            password: '',
            errorMsg: ''
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

    create(){
        console.log(this.state)
        axios.post('/maadmin/api/createAccount', {
            username: this.state.username,
            password: this.state.password
        })
        .then((response) => {
            console.log("Login response body:");
            console.log(response.data);
            if (!response.data.success){
                this.setState({
                    errorMsg: 'This username cannot be used.'
                })
            } else {
                this.setState({
                    errorMsg: ''
                })
                this.props.created();
            }
        });
    }

    render() {
        return (
            <div className="login">
                <h2>Admin creation</h2>
                <hr></hr>
                <br></br>
                <label>Username </label> <input type='text' name='userName' onChange={this.handleuserName.bind(this)}></input>
                <label>Password </label> <input type='password' name='password' onChange={this.handlepassword.bind(this)}></input>
                <br></br>
                <Button variant='info' onClick={this.create.bind(this)}>Create!</Button>
                <p className='error'>{this.state.errorMsg}</p>
            </div>
        )
    }
}

export default CreateAccount
