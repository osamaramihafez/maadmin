import React, { Component } from 'react'
import axios from 'axios'
import TeamRegistration from './TeamRegistration'
import Button from 'react-bootstrap/Button'
import './List.css'
import './Form.css'

export class Teams extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            teams: [],
            view: ''
        }
    }

    componentDidMount(){
        axios.get('/maadmin/api/'+ this.props.username +'/teamList/' + this.props.league).then((res) => {
            console.log(res.data)
            this.setState({
                teams: res.data.teams
            })
        })
    }

    updateList(){
        axios.get('/maadmin/api/' + this.props.username + '/teamList/' + this.props.league).then((res) => {
            console.log(res.data)
            this.setState({
                teams: res.data.teams
            })
        })
    }

    chooseLeague(team){
        this.setState({
            view: team
        });
    }
    

    render() {
        if (this.state.teams !== null){
            const teams = this.state.teams.map((team) =>
                        <div key={team}><Button variant="primary" onClick={() => this.chooseLeague(team)}>{team}</Button></div> 
                );
            var teamList = <div className='Container'><h2>Modify a team</h2><hr></hr> <div className='List'> {teams}</div></div>
        }
        return (
            <div className = 'Panel'>
                <TeamRegistration username={this.props.username} league={this.props.league} callBack={this.updateList.bind(this)} />
                {teamList}
            </div>
        ) 
    }
}

export default Teams
