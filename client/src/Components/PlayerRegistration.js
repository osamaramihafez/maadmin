import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import './Form.css'
import axios from 'axios'

export class TeamRegistration extends Component {

    constructor(props){
        super(props);
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

    handleDivision(e){
        this.setState({
            division: e.target.value
        });
    }

    handleTeamName(e){
        this.setState({
            teamName: e.target.value
        });
    }

    register(){
        this.registerPlayer();
        this.registerTeam();
    }

    registerPlayer(){
        axios.post('/maadmin/api/' + this.props.username + '/addPlayer', this.state)
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
        axios.post('/maadmin/api/' + this.props.username + '/addTeam', body)
        .then( (res) => {
            console.log('Adding Team')
            console.log(res);
        })
    }

    render() {
        return (
            <div className="Registration">
                <h2>Add a new player</h2>
                <hr></hr>
                <h5>Player info</h5>
                <label>First Name: </label> <input type='text' name='captainFirstName' onChange={this.handleFirstName.bind(this)}></input>
                <label>Last Name: </label> <input type='text' name='captainLastName' onChange={this.handleLastName.bind(this)}></input>
                <label>Phone #: </label> <input type='tel' name='captainPhone' onChange={this.handlePhone.bind(this)}></input>
                <label>Email: </label> <input type='email' name='captainEmail' onChange={this.handleEmail.bind(this)}></input>
                <hr></hr>
                <h5>Team info</h5>
                <label>Team Name: </label> <input type='text' name='teamName' onChange={this.handleTeamName.bind(this)}></input>
                <label>Division: </label>
                <select name="teamDivision" onChange={this.handleDivision.bind(this)}>
                    <option>1</option>
                    <option>2</option>
                </select>
                <hr></hr>
                <Button variant='success' onClick={this.register.bind(this)}>Register Team</Button>
            </div>
        )
    }
}

export default TeamRegistration