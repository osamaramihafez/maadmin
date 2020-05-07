import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import './Registration.css'
import axios from 'axios'

export class TeamRegistration extends Component {

    constructor(){
        super();
        this.state = {
            firstName: '',
            lastName: '',
            phone: '',
            email: '',
            teamName: '',
            division: 1
        }
    }

    handleFirstName(e){
        this.setState({
            firstName: e.target.value
        });
    }

    handleLastName(e){
        this.setState({
            lastName: e.target.value
        });
    }

    handlePhone(e){
        this.setState({
            phone: e.target.value
        });
    }

    handleEmail(e){
        this.setState({
            email: e.target.value
        });
    }

    handleTeamName(e){
        this.setState({
            teamName: e.target.value
        });
    }

    handleDivision(e){
        this.setState({
            division: e.target.value
        });
    }

    register(){
        this.registerPlayer();
        this.registerTeam();
    }

    registerPlayer(){
        axios.post('/maadmin/api/addPlayer', this.state)
        .then( (res) => {
            console.log('Adding Player')
            console.log(res);
        })
    }

    registerTeam(){
        var body = {
            teamName: this.state.teamName,
            division: this.state.division,
            captain: this.state.firstName + ' ' + this.lastName
        }
        axios.post('/maadmin/api/addTeam', body)
        .then( (res) => {
            console.log('Adding Team')
            console.log(res);
        })
    }

    render() {
        return (
            <div className="PlayerRegistration">
                <h2>Add a new player</h2>
                <hr></hr>
                <h5>Player info</h5>
                <label>First Name: </label> <input type='text' name='FirstName' onChange={this.handleFirstName.bind(this)}></input>
                <label>Last Name: </label> <input type='text' name='LastName' onChange={this.handleLastName.bind(this)}></input>
                <label>Phone #: </label> <input type='tel' name='Phone' onChange={this.handlePhone.bind(this)}></input>
                <label>Email: </label> <input type='email' name='Email' onChange={this.handleEmail.bind(this)}></input>
                <hr></hr>
                {/* For some reason, the bootstrap isn't working,
                but we're just looking for functionality rn so it's okay */}
                <Button variant='success' onClick={this.register.bind(this)}>Register Team</Button>
            </div>
        )
    }
}

export default TeamRegistration