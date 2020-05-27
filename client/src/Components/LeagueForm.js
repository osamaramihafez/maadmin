import React, { Component } from 'react'
import axios from 'axios'
import Button from 'react-bootstrap/Button'

export class LeagueForm extends Component {
    constructor(){
        super();
        this.state = {
            leaguename: '',
            numDivs: 0
        }
    }

    handleLeagueName(e){
        this.setState({
            leaguename: e.target.value
        });
    }

    handleDivisions(e){
        this.setState({
            numDivs: e.target.value
        });
    }

    createLeague(){
        axios.post('/maadmin/api/teamList/createLeague', this.state)
        .then( (res) => {
            console.log('Created a new league')
            console.log(res);
        })
    }

    render() {
        return (
            <div className="PlayerRegistration">
                <h2>Add a new League</h2>
                <hr></hr>
                <label>League name: </label> <input type='text' name='captainFirstName' onChange={this.handleLeagueName.bind(this)}></input>
                <select name="teamDivision" onChange={this.handleDivisions.bind(this)}>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </select>
                <hr></hr>
                <Button variant='success' onClick={this.createLeague.bind(this)}>Create League</Button>
            </div>
        )
    }
}

export default LeagueForm
