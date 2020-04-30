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
        var body = 
        axios.post('/maadmin/api/addTeam', this.state)
        .then( (res) => {
            console.log('?')
            console.log(res);
            // axios.get('/maadmin/api/getTeam', this.state.teamInfo.name)
            // .then( (res) => {
            //     console.log(res);
            // }
        // )
        }
        )
    }

    render() {
        return (
            <div className="TeamRegistration">
                <div id="captainInfo">
                <h3>Captain Information</h3>
                First Name: <input type='text' name='captainFirstName' onChange={this.handleFirstName.bind(this)}></input>
                <br></br>
                Last Name: <input type='text' name='captainLastName' onChange={this.handleLastName.bind(this)}></input>
                <br></br>
                Phone #: <input type='text' name='captainPhone' onChange={this.handlePhone.bind(this)}></input>
                <br></br>
                Email: <input type='email' name='captainPhone' onChange={this.handleEmail.bind(this)}></input>
                <br></br>
                </div>
                <div>
                <h3>Team Information</h3>
                Team Name: <input type='email' name='captainPhone' onChange={this.handleTeamName.bind(this)}></input>
                <br></br>
                Division:
                <select onChange={this.handleDivision.bind(this)}>
                    <option>1</option>
                    <option>2</option>
                </select>
                <br></br>
                </div>
                {/* For some reason, the bootstrap isn't working,
                but we're just looking for functionality rn so it's okay */}
                <Button variant='primary' onClick={this.register.bind(this)}>Register Team</Button>
            </div>
        )
    }
}

export default TeamRegistration