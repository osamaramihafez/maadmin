import React, { Component } from 'react'
import axios from 'axios'
import Button from 'react-bootstrap/Button'

export class LeagueForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            leaguename: '',
            numDivs: 0,
            DivCapacity: 0
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

    handleDivCapacity(e){
        this.setState({
            divCapacity: e.target.value
        });
    }

    createLeague(){
        axios.post('/maadmin/api/' + this.props.username + '/createLeague', this.state)
        .then( (res) => {
            console.log('Created a new league')
            console.log(res);
            if (res.data.success){
                this.props.back()
            }
        })
    }

    render() {
        return (
            <center>
            <div className="Registration">
                <h2>Add a new League</h2>
                <hr></hr>
                <label>League name: </label> <input type='text' name='captainFirstName' onChange={this.handleLeagueName.bind(this)}></input>
                <label>Number of Divisions: </label><select name="teamDivision" onChange={this.handleDivisions.bind(this)}>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </select>
                <br></br>
                {/* Should probably switch all form buttons to be of type submit */}
                <label>Division Capacity: </label> <input type='number' min='1' max='16' name='divCapacity' onChange={this.handleDivCapacity.bind(this)}></input>
                <hr></hr>
                <Button variant='success' onClick={this.createLeague.bind(this)}>Create League</Button>
            </div>
            </center>
        )
    }
}

export default LeagueForm
