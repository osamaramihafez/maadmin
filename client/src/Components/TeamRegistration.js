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
            division: 1,
            age: 18,
            league: this.props.league
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

    handleAge(e){
        this.setState({
            age: e.target.value
        });
    }

    register(){
        axios.post('/maadmin/api/addTeam', this.state)
        .then( (res) => {
            console.log('Adding Team')
            console.log(res);
        })
    }

    render() {
        return (
            <div className="TeamRegistration">
                <h2>Add a new team</h2>
                <hr></hr>
                <label>First Name </label> <input type='text' name='captainFirstName' onChange={this.handleFirstName.bind(this)}></input>
                <label>Last Name </label> <input type='text' name='captainLastName' onChange={this.handleLastName.bind(this)}></input>
                <label>Phone # </label> <input type='tel' name='captainPhone' onChange={this.handlePhone.bind(this)}></input>
                <label>Email </label> <input type='email' name='captainEmail' onChange={this.handleEmail.bind(this)}></input>
                <label>Age: {this.state.age}</label> <input className='slider' type='range' min='18' max='35' value={this.state.age} name='captainAge' onChange={this.handleAge.bind(this)}></input>
                <hr></hr>
                <label>Team Name </label> <input type='text' name='teamName' onChange={this.handleTeamName.bind(this)}></input>
                <label>Division </label>
                <select name="teamDivision" onChange={this.handleDivision.bind(this)}>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </select>
                <hr></hr>
                <Button variant='success' onClick={this.register.bind(this)}>Register Team</Button>
            </div>
        )
    }
}

export default TeamRegistration